"use client";
import { User } from "@/contexts/DataContext";
import { useEffect, useState } from "react";
import { TrendingUp } from "lucide-react";
import { Pie, PieChart } from "recharts";
import { Label } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";

export const description = "A donut chart";

interface ChartProps {
  leads: User[];
  conversion: string;
}

const chartConfig = {
  converted: {
    label: "Converted",
    color: "var(--chart-1)",
  },
  total: {
    label: "Unconverted",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig;

export function ConversionChart({ leads, conversion }: ChartProps) {
  const [chartData, setChartData] = useState([
    {
      value: "Converted",
      count: 1,
      fill: "var(--chart-2)",
    },
    {
      value: "Unconverted",
      count: 1,
      fill: "var(--chart-1)",
    },
  ]);
  const [percent, setPercent] = useState("0%");

  useEffect(() => {
    const convertedLeads = leads.filter((lead) =>
      lead.activity.some((action) =>
        action.descriptions.find((desc) => desc?.includes(conversion)),
      ),
    );
    let newChartData = [...chartData];
    const converted = convertedLeads.length;
    const unconverted = leads.length - converted;
    newChartData = newChartData.map((data) => {
      const { value } = data;
      let newCount = 0;
      if (value === "Converted") {
        newCount = converted;
      } else {
        newCount = unconverted;
      }
      return { ...data, count: newCount };
    });
    setChartData(newChartData);
    const newPercent = Math.round(
      (converted / (converted + unconverted)) * 100,
    );
    if (newPercent) {
      setPercent(`${newPercent || 0}%`);
    }
  }, [leads]);

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle className='text-sm'>{conversion}</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="count"
              nameKey="value"
              innerRadius={60}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {percent}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Conversion Rate
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
