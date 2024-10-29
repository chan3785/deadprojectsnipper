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

import axios from 'axios';
import { useEffect, useState } from "react";

interface GitHubData {
  commit_count: number;
  open_issues: number;
  closed_issues: number;
  merged_requests: number;
  pull_requests: number;
  forks: number;
  watchers: number;
  followers: number;
}

interface ActivityData {
  record_date: string;
  github: GitHubData;
}

interface ApiResponse {
  body: string;
  activity_data_list: ActivityData[];
}




export const description = "A stacked bar chart with a legend"



const chartConfig = {
  commits: {
    label: "commits",
    color: "hsl(var(--chart-3))",
  },
  opened: {
    label: "opened issues",
    color: "hsl(var(--chart-1))"
  },
  closed: {
    label: "closed issues",
    color: "hsl(var(--chart-2))",
  },
  pulls: {
    label: "pulled",
    color: "hsl(var(--chart-4))"
  },
  merge: {
    label: "merged",
    color: "hsl(var(--chart-5))"
  },
  fork: {
    label: "forked",
    color: "hsl(var(--chart-1))"
  },
  watch: {
    label: "watched",
    color: "hsl(var(--chart-2))"
  },
  follow: {
    label: "followers",
    color: "hsl(var(--chart-5))"
  },
} satisfies ChartConfig



export function GithubChart() {
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
  const commitchartData = [
    { date: `${activityData?.activity_data_list[5].record_date}`, commits: activityData?.activity_data_list[5].github.commit_count, opened: activityData?.activity_data_list[5].github.open_issues, closed: activityData?.activity_data_list[5].github.closed_issues, pulls: activityData?.activity_data_list[5].github.pull_requests, merge: activityData?.activity_data_list[5].github.merged_requests, fork: activityData?.activity_data_list[5].github.forks, watch: activityData?.activity_data_list[5].github.watchers, follow: activityData?.activity_data_list[5].github.followers },
    { date: `${activityData?.activity_data_list[4].record_date}`, commits: activityData?.activity_data_list[4].github.commit_count, opened: activityData?.activity_data_list[4].github.open_issues, closed: activityData?.activity_data_list[4].github.closed_issues, pulls: activityData?.activity_data_list[4].github.pull_requests, merge: activityData?.activity_data_list[4].github.merged_requests, fork: activityData?.activity_data_list[4].github.forks, watch: activityData?.activity_data_list[4].github.watchers, follow: activityData?.activity_data_list[4].github.followers },
    { date: `${activityData?.activity_data_list[3].record_date}`, commits: activityData?.activity_data_list[3].github.commit_count, opened: activityData?.activity_data_list[3].github.open_issues, closed: activityData?.activity_data_list[3].github.closed_issues, pulls: activityData?.activity_data_list[3].github.pull_requests, merge: activityData?.activity_data_list[3].github.merged_requests, fork: activityData?.activity_data_list[3].github.forks, watch: activityData?.activity_data_list[3].github.watchers, follow: activityData?.activity_data_list[3].github.followers },
    { date: `${activityData?.activity_data_list[2].record_date}`, commits: activityData?.activity_data_list[2].github.commit_count, opened: activityData?.activity_data_list[2].github.open_issues, closed: activityData?.activity_data_list[2].github.closed_issues, pulls: activityData?.activity_data_list[2].github.pull_requests, merge: activityData?.activity_data_list[2].github.merged_requests, fork: activityData?.activity_data_list[2].github.forks, watch: activityData?.activity_data_list[2].github.watchers, follow: activityData?.activity_data_list[2].github.followers },
    { date: `${activityData?.activity_data_list[1].record_date}`, commits: activityData?.activity_data_list[1].github.commit_count, opened: activityData?.activity_data_list[1].github.open_issues, closed: activityData?.activity_data_list[1].github.closed_issues, pulls: activityData?.activity_data_list[1].github.pull_requests, merge: activityData?.activity_data_list[1].github.merged_requests, fork: activityData?.activity_data_list[1].github.forks, watch: activityData?.activity_data_list[1].github.watchers, follow: activityData?.activity_data_list[1].github.followers },
    { date: `${activityData?.activity_data_list[0].record_date}`, commits: activityData?.activity_data_list[0].github.commit_count, opened: activityData?.activity_data_list[0].github.open_issues, closed: activityData?.activity_data_list[0].github.closed_issues, pulls: activityData?.activity_data_list[0].github.pull_requests, merge: activityData?.activity_data_list[0].github.merged_requests, fork: activityData?.activity_data_list[0].github.forks, watch: activityData?.activity_data_list[0].github.watchers, follow: activityData?.activity_data_list[0].github.followers },
  ]

  return (
    <ResponsiveContainer width="100%" height={250}>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={commitchartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(5, 10)}
            />
            <ChartTooltip content={<ChartTooltipContent hideLabel />} />
            <ChartLegend content={<ChartLegendContent />} />
            <Bar
              dataKey="commits"
              fill="var(--color-commits)"
              radius={4}
            />
            <Bar
              dataKey="opened"
              stackId="a"
              fill="var(--color-opened)"
              radius={[0, 0, 4, 4]}
            />
            <Bar
              dataKey="closed"
              stackId="a"
              fill="var(--color-closed)"
              radius={[4, 4, 0, 0]}
            />
            <Bar
              dataKey="pulls"
              stackId="b"
              fill="var(--color-pulls)"
              radius={[0, 0, 4, 4]}
            />
            <Bar
              dataKey="merge"
              stackId="b"
              fill="var(--color-merge)"
              radius={[4, 4, 0, 0]}
            />
            <Bar
              dataKey="fork"
              stackId="c"
              fill="var(--color-fork)"
              radius={[0, 0, 4, 4]}
            />
            <Bar
              dataKey="watch"
              stackId="c"
              fill="var(--color-watch)"
              radius={[0, 0, 0, 0]}
            />
            <Bar
              dataKey="follow"
              stackId="c"
              fill="var(--color-follow)"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ChartContainer>
    </ResponsiveContainer>
  )
}
