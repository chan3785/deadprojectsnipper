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
import React, { useState, useEffect, Suspense } from 'react';
import axios from 'axios';
import { useSearchParams } from "next/navigation";

export const description = "A linear line chart"

interface ActivityData {
  record_date: string
  github: {
    commit_count: number
    open_issues: number
    closed_issues: number
    merged_requests: number
    pull_requests: number
    forks: number
    watchers: number
    followers: number
  }
  twitter: {
    count: number
    like_per_tweet: number
    retweet_per_tweet: number
    reply_per_tweet: number
    followers: number
  }
  near_transactions: {
    count: number
  }
}

interface ApiResponse {
  activity_data_list: ActivityData[]
  reports: {
    overall_report: string
    github_report: string
    twitter_report: string
    near_report: string
  }
  score_overview: {
    github: { score: number }
    twitter: { score: number }
    near: { score: number }
    overall_total_score: number
    isAlive: boolean
  }
}

const chartConfig = {
  score: {
    label: "score per day",
    color: "hsl(var(--chart-4))",
  },
} satisfies ChartConfig

export function ScoreChart() {
  const [activityData, setActivityData] = useState<ApiResponse | null>(null);
  const searchParams = useSearchParams()
  const value = searchParams.get('value')
  
  useEffect(() => {
    if (!value) return
    const fetchActivityData = async (apiUrl: string, near_address: string) => {
      try {
        const response = await axios.get<ApiResponse>(`${apiUrl}?near_address=${near_address}`);
        setActivityData(response.data)
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching activity data:', error);
      }
    };

    fetchActivityData('https://h03g0va5si.execute-api.us-east-1.amazonaws.com/getdata', `${value}`);
    console.log(value);
  }, [value]);

  const chartData = [
    { month: activityData?.activity_data_list[5].record_date, score: activityData?.score_overview.overall_total_score },
    { month: activityData?.activity_data_list[4].record_date, score: activityData?.score_overview.overall_total_score },
    { month: activityData?.activity_data_list[3].record_date, score: activityData?.score_overview.overall_total_score },
    { month: activityData?.activity_data_list[2].record_date, score: activityData?.score_overview.overall_total_score },
    { month: activityData?.activity_data_list[1].record_date, score: activityData?.score_overview.overall_total_score },
    { month: activityData?.activity_data_list[0].record_date, score: activityData?.score_overview.overall_total_score },
  ]
  return (
    <ResponsiveContainer width="100%" height={250}>
      <Suspense>
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
        </Suspense>
    </ResponsiveContainer>
  )
}
