"use client"

import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import {  Bar, BarChart, CartesianGrid, ResponsiveContainer, XAxis } from "recharts"
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
  github: {
    label: "github",
    color: "hsl(var(--chart-1))",
  },
  twitter: {
    label: "twitter",
    color: "hsl(var(--chart-2))",
  },
  near: {
    label: "near",
    color: "hsl(var(--chart-3))",
  },
} satisfies ChartConfig




export function Overview() {
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
    { month: activityData?.activity_data_list[5].record_date, github: activityData?.activity_data_list[5].score_overview.github.score, twitter: activityData?.activity_data_list[5].score_overview.twitter.score, near: activityData?.activity_data_list[5].score_overview.near.score },
    { month: activityData?.activity_data_list[4].record_date, github: activityData?.activity_data_list[4].score_overview.github.score, twitter: activityData?.activity_data_list[4].score_overview.twitter.score, near: activityData?.activity_data_list[4].score_overview.near.score },
    { month: activityData?.activity_data_list[3].record_date, github: activityData?.activity_data_list[3].score_overview.github.score, twitter: activityData?.activity_data_list[3].score_overview.twitter.score, near: activityData?.activity_data_list[3].score_overview.near.score },
    { month: activityData?.activity_data_list[2].record_date, github: activityData?.activity_data_list[2].score_overview.github.score, twitter: activityData?.activity_data_list[2].score_overview.twitter.score, near: activityData?.activity_data_list[2].score_overview.near.score },
    { month: activityData?.activity_data_list[1].record_date, github: activityData?.activity_data_list[1].score_overview.github.score, twitter: activityData?.activity_data_list[1].score_overview.twitter.score, near: activityData?.activity_data_list[1].score_overview.near.score },
    { month: activityData?.activity_data_list[0].record_date, github: activityData?.activity_data_list[0].score_overview.github.score, twitter: activityData?.activity_data_list[0].score_overview.twitter.score, near: activityData?.activity_data_list[0].score_overview.near.score },
  ]
  return (
    <ResponsiveContainer width="100%" height={250}>
      
      <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(5, 10)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dashed" />}
            />
            <Bar dataKey="github" fill="var(--color-github)" radius={4} />
            <Bar dataKey="twitter" fill="var(--color-twitter)" radius={4} />
            <Bar dataKey="near" fill="var(--color-near)" radius={4} />
          </BarChart>
        </ChartContainer>  
    </ResponsiveContainer>
  )
}
