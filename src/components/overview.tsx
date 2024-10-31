"use client"

import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import {  Bar, BarChart, CartesianGrid, ResponsiveContainer, XAxis } from "recharts"
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
    { month: activityData?.activity_data_list[5].record_date, github: activityData?.score_overview.github.score, twitter: activityData?.score_overview.twitter.score, near: activityData?.score_overview.near.score },
    { month: activityData?.activity_data_list[4].record_date, github: activityData?.score_overview.github.score, twitter: activityData?.score_overview.twitter.score, near: activityData?.score_overview.near.score },
    { month: activityData?.activity_data_list[3].record_date, github: activityData?.score_overview.github.score, twitter: activityData?.score_overview.twitter.score, near: activityData?.score_overview.near.score },
    { month: activityData?.activity_data_list[2].record_date, github: activityData?.score_overview.github.score, twitter: activityData?.score_overview.twitter.score, near: activityData?.score_overview.near.score },
    { month: activityData?.activity_data_list[1].record_date, github: activityData?.score_overview.github.score, twitter: activityData?.score_overview.twitter.score, near: activityData?.score_overview.near.score },
    { month: activityData?.activity_data_list[0].record_date, github: activityData?.score_overview.github.score, twitter: activityData?.score_overview.twitter.score, near: activityData?.score_overview.near.score },
  ]
  return (
    <Suspense>
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
    </Suspense>
  )
}
