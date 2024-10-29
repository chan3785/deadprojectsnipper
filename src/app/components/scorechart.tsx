"use client"

import { CartesianGrid, Line, LineChart, ResponsiveContainer, XAxis } from "recharts"

import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import React, { useState, useEffect } from 'react';
import axios from 'axios';

export const description = "A linear line chart"

interface ScoreOverview {
  github: { score: number };
  twitter: { score: number };
  near: { score: number };
  overall_total_score: number;
}

interface ActivityData {
  record_date: string;
  score_overview: ScoreOverview;
}

interface ApiResponse {
  activity_data_list: ActivityData[];
}

const chartConfig = {
  score: {
    label: "score per day",
    color: "hsl(var(--chart-4))",
  },
} satisfies ChartConfig

export function ScoreChart() {
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
    { month: activityData?.activity_data_list[5].record_date, score: activityData?.activity_data_list[5].score_overview.overall_total_score },
    { month: activityData?.activity_data_list[4].record_date, score: activityData?.activity_data_list[4].score_overview.overall_total_score },
    { month: activityData?.activity_data_list[3].record_date, score: activityData?.activity_data_list[3].score_overview.overall_total_score },
    { month: activityData?.activity_data_list[2].record_date, score: activityData?.activity_data_list[2].score_overview.overall_total_score },
    { month: activityData?.activity_data_list[1].record_date, score: activityData?.activity_data_list[1].score_overview.overall_total_score },
    { month: activityData?.activity_data_list[0].record_date, score: activityData?.activity_data_list[0].score_overview.overall_total_score },
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
              tickMargin={8}
              tickFormatter={(value) => value.slice(5, 10)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <ChartLegend content={<ChartLegendContent />} />
            <Line
              dataKey="score"
              type="linear"
              stroke="var(--color-score)"
              strokeWidth={2}
              dot={true}
            />
          </LineChart>
        </ChartContainer>
    </ResponsiveContainer>
  )
}
