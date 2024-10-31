import { Card, CardHeader, CardContent } from "./ui/card";
import { useSearchParams } from "next/navigation";
import axios from "axios";
import { useState, useEffect } from "react";
import { Icons } from "./icons";

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

export function TwitterScore() {
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
  
    return (
      <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <Icons.twitter className="mr-2 h-6 w-6" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">+{activityData?.score_overview.twitter.score}</div>
      </CardContent>
    </Card>
    )
}