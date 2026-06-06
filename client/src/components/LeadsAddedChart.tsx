"use client";
import { User } from "@/contexts/DataContext";
import { useState, useEffect } from "react";
import { DefaultButton } from "./DefaultButton";
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";

export const description = "A line chart with a label";

interface ChartProps {
  leads: User[];
}

interface ChartData {
  day: string;
  count: number;
}

const chartConfig = {
  count: {
    label: "count",
    color: "var(--chart-1)",
  },
  mobile: {
    label: "Mobile",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig;

export function LeadsAddedChart({ leads }: ChartProps) {
  const [isMonth, setIsMonth] = useState(true);
  const [chartData, setChartData] = useState<ChartData[]>([]);

  useEffect(() => {
    let newChartData = [];
    for (let index = 29; index >= 0; index--) {
      const start = new Date();
      const day = new Date(
        start.getFullYear(),
        start.getMonth(),
        start.getDate() - index,
      )
        .toISOString()
        .slice(0, 10);
      newChartData.push({
        day: day,
        count: 0,
      });
    }

    newChartData = newChartData.map((item) => {
      const newCount = leads.filter((lead) =>
        lead.created_at.includes(item.day),
      ).length;
      return { ...item, count: newCount };
    });
    setChartData(newChartData);
  }, [leads]);

  const toggleXAxis = (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsMonth((current) => !current);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          Leads Added this {`${isMonth ? "Month" : "Week"}`}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <LineChart
            accessibilityLayer
            data={
              isMonth
                ? chartData
                : chartData.slice(chartData.length - 7, chartData.length)
            }
            margin={{
              top: 20,
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="day"
              tickLine={true}
              axisLine={true}
              interval={isMonth ? 1 : 0}
              tickFormatter={
                isMonth
                  ? (_, index) => String(index * 2)
                  : (_, index) => String(index + 1)
              }
            />

            <YAxis allowDecimals={false} width={10} />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            <Line
              dataKey="count"
              type="linear"
              stroke="var(--color-count)"
              strokeWidth={2}
              dot={false}
            ></Line>
          </LineChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <form onSubmit={toggleXAxis}>
          <DefaultButton
            id="week"
            className={`${isMonth ? "" : "pointer-events-none border-[2px]"}`}
          >
            Week
          </DefaultButton>
          <DefaultButton
            id="month"
            className={`${isMonth ? "pointer-events-none border-[2px]" : ""}`}
          >
            Month
          </DefaultButton>
        </form>
      </CardFooter>
    </Card>
  );
}
