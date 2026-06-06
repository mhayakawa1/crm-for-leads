"use client";
import { User } from "@/contexts/DataContext";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { useState, useEffect } from "react";

export const description = "A bar chart";

interface ChartProps {
  leads: User[];
}

interface Status {
  status: string;
  count: number;
}

const chartConfig = {
  count: {
    label: "Leads",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

export function StatusChart({ leads }: ChartProps) {
  const [chartData, setChartData] = useState<Status[]>([
    { status: "New", count: 0 },
    { status: "Contacted", count: 0 },
    { status: "Qualified", count: 0 },
    { status: "Closed", count: 0 },
  ]);

  useEffect(() => {
    let newChartData = [...chartData];
    newChartData = newChartData.map((item) => {
      const { status } = item;
      const newCount = leads.filter((lead) => lead.status === status).length;
      const newItem = { ...item };
      newItem.count = newCount;
      return newItem;
    });
    setChartData(newChartData);
  }, [leads]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Leads by Status</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="status"
              tickLine={false}
              tickMargin={1}
              axisLine={false}
              className="border border-solid"
            />
            <YAxis allowDecimals={false} width={10} />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="count" fill="var(--color-count)" radius={8} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
