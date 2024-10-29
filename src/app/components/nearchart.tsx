"use client"

import { CartesianGrid, Line, LineChart, ResponsiveContainer, XAxis } from "recharts"
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegendContent
} from "@/components/ui/chart"

export const description = "A stacked bar chart with a legend"

interface NearTransactions {
  count: number;
}

interface ActivityData {
  record_date: string;
  near_transactions: NearTransactions;
}

interface ApiResponse {
  activity_data_list: ActivityData[];
}

const chartConfig = {
  transactions: {
    label: "transactions per day",
    color: "hsl(var(--chart-5))",
  },
} satisfies ChartConfig

export function NearChart() {
  const [activityData, setActivityData] = useState<ApiResponse | null>(null);

  useEffect(() => {
    const fetchActivityData = async (apiUrl: string) => {
      try {
        const response = await axios.get<ApiResponse>(apiUrl);
        const data: ApiResponse = JSON.parse(response.data.body);
        setActivityData(data);
        console.log(data);
      } catch (error) {
        console.error('Error fetching activity data:', error);
      }
    };

    fetchActivityData('https://h03g0va5si.execute-api.us-east-1.amazonaws.com/getdata');
  }, []);

  const chartData = [
    { month: activityData?.activity_data_list[5].record_date, transactions: activityData?.activity_data_list[5].near_transactions.count },
    { month: activityData?.activity_data_list[4].record_date, transactions: activityData?.activity_data_list[4].near_transactions.count },
    { month: activityData?.activity_data_list[3].record_date, transactions: activityData?.activity_data_list[3].near_transactions.count },
    { month: activityData?.activity_data_list[2].record_date, transactions: activityData?.activity_data_list[2].near_transactions.count },
    { month: activityData?.activity_data_list[1].record_date, transactions: activityData?.activity_data_list[1].near_transactions.count },
    { month: activityData?.activity_data_list[0].record_date, transactions: activityData?.activity_data_list[0].near_transactions.count },
  ]
  return (
    <ResponsiveContainer width="100%" height={250}>
        <ChartContainer config={chartConfig}>
        <LineChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 18,
              right: 18,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={true}
              axisLine={false}
              tickMargin={6}
              tickFormatter={(value) => value.slice(5, 10)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <ChartLegend content={<ChartLegendContent />} />
            <Line
              dataKey="transactions"
              type="linear"
              stroke="var(--color-transactions)"
              strokeWidth={2}
              dot={true}
            />
          </LineChart>
        </ChartContainer>
    </ResponsiveContainer>
  )
}
