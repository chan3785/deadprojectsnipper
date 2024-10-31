"use client"

import { Bar, BarChart, CartesianGrid, ResponsiveContainer, XAxis } from "recharts"

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
export const description = "A stacked bar chart with a legend"

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
  tweets: {
    label: "tweets",
    color: "hsl(var(--chart-3))",
  },
  likes: {
    label: "likes",
    color: "hsl(var(--chart-1))"
  },
  reply: {
    label: "replies",
    color: "hsl(var(--chart-2))",
  },
  retweets: {
    label: "retweets",
    color: "hsl(var(--chart-4))"
  },
  followers: {
    label: "followers",
    color: "hsl(var(--chart-5))"
  },
} satisfies ChartConfig

export function TwitterChart() {
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
  

  const chartdata = [
    { month: activityData?.activity_data_list[5].record_date, tweets: activityData?.activity_data_list[5].twitter.count, likes: activityData?.activity_data_list[5].twitter.like_per_tweet, reply: activityData?.activity_data_list[5].twitter.reply_per_tweet, retweets: activityData?.activity_data_list[5].twitter.retweet_per_tweet, followers: activityData?.activity_data_list[5].twitter.followers },
    { month: activityData?.activity_data_list[4].record_date, tweets: activityData?.activity_data_list[4].twitter.count, likes: activityData?.activity_data_list[4].twitter.like_per_tweet, reply: activityData?.activity_data_list[4].twitter.reply_per_tweet, retweets: activityData?.activity_data_list[4].twitter.retweet_per_tweet, followers: activityData?.activity_data_list[4].twitter.followers },
    { month: activityData?.activity_data_list[3].record_date, tweets: activityData?.activity_data_list[3].twitter.count, likes: activityData?.activity_data_list[3].twitter.like_per_tweet, reply: activityData?.activity_data_list[3].twitter.reply_per_tweet, retweets: activityData?.activity_data_list[3].twitter.retweet_per_tweet, followers: activityData?.activity_data_list[3].twitter.followers },
    { month: activityData?.activity_data_list[2].record_date, tweets: activityData?.activity_data_list[2].twitter.count, likes: activityData?.activity_data_list[2].twitter.like_per_tweet, reply: activityData?.activity_data_list[2].twitter.reply_per_tweet, retweets: activityData?.activity_data_list[2].twitter.retweet_per_tweet, followers: activityData?.activity_data_list[2].twitter.followers },
    { month: activityData?.activity_data_list[1].record_date, tweets: activityData?.activity_data_list[1].twitter.count, likes: activityData?.activity_data_list[1].twitter.like_per_tweet, reply: activityData?.activity_data_list[1].twitter.reply_per_tweet, retweets: activityData?.activity_data_list[1].twitter.retweet_per_tweet, followers: activityData?.activity_data_list[1].twitter.followers },
    { month: activityData?.activity_data_list[0].record_date, tweets: activityData?.activity_data_list[0].twitter.count, likes: activityData?.activity_data_list[0].twitter.like_per_tweet, reply: activityData?.activity_data_list[0].twitter.reply_per_tweet, retweets: activityData?.activity_data_list[0].twitter.retweet_per_tweet, followers: activityData?.activity_data_list[0].twitter.followers },
  ]
  return (
    <Suspense>
    <ResponsiveContainer width="100%" height={250}>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartdata}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(5, 10)}
            />
            <ChartTooltip content={<ChartTooltipContent hideLabel />} />
            <ChartLegend content={<ChartLegendContent />} />
            <Bar
              dataKey="tweets"
              fill="var(--color-tweets)"
              radius={4}
            />
            <Bar
              dataKey="likes"
              stackId="a"
              fill="var(--color-likes)"
              radius={[0, 0, 4, 4]}
            />
            <Bar
              dataKey="reply"
              stackId="a"
              fill="var(--color-reply)"
              radius={[0, 0, 0, 0]}
            />
            <Bar
              dataKey="retweets"
              stackId="a"
              fill="var(--color-retweets)"
              radius={[4, 4, 0, 0]}
            />
            <Bar
              dataKey="followers"
              fill="var(--color-followers)"
              radius={4}
            />
          </BarChart>
        </ChartContainer>
    </ResponsiveContainer>
    </Suspense>
  )
}
