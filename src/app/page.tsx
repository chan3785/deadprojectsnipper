"use client"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Tabs,
  TabsContent,
} from "@/components/ui/tabs"
import { Icons } from "./components/icons";
import { TrendingUp } from "lucide-react"
import { GithubChart } from "./components/githubchart"
import { TwitterChart } from "./components/twitterchart"
import { NearChart } from "./components/nearchart"
import GithubReport from '@/markdown/githubreport.mdx'
import TwitterReport from '@/markdown/twitterreport.mdx'
import NearReport from '@/markdown/nearreport.mdx'
import React, { useState, useEffect, Suspense } from 'react';
import axios from 'axios';
import { useSearchParams } from "next/navigation"
import { MDXProvider } from '@mdx-js/react';

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

export default function DashboardPage() {
  const [activityData, setActivityData] = useState<ApiResponse | null>(null);
  const searchParams = useSearchParams()
  const [value, setValue] = useState<string | null>('tenkdao.near');
  const [githubreport, setGithubData] = useState<string | null>(null);
  const [twitterreport, setTwitterData] = useState<string | null>(null);
  const [nearreport, setNearData] = useState<string | null>(null);
// value 상태를 업데이트하는 useEffect
useEffect(() => {
  const newValue = searchParams.get('value');
  if (newValue) {
    setValue(newValue);  // 상태 업데이트
  }
}, [searchParams]);
  
  useEffect(() => {
    if (!value) return
    const fetchActivityData = async (apiUrl: string, near_address: string) => {
      try {
        const response = await axios.get<ApiResponse>(`${apiUrl}?near_address=${near_address}`);
        setActivityData(response.data)
        setGithubData(response.data.reports.github_report);
        setTwitterData(response.data.reports.twitter_report);
        setNearData(response.data.reports.near_report);
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching activity data:', error);
      }
    };

    fetchActivityData('https://h03g0va5si.execute-api.us-east-1.amazonaws.com/getdata', `${value}`);
    console.log(value);
  }, [value]);

  // const totalTwitterScore = activityData?.activity_data_list.reduce((total, activity) => {
  //   return total + activity.score_overview.twitter.score;
  // }, 0) || 0; // activityData가 null일 경우 기본값 0 반환

  // const totalGithubScore = activityData?.activity_data_list.reduce((total, activity) => {
  //   return total + activity.score_overview.github.score;
  // }, 0) || 0; // activityData가 null일 경우 기본값 0 반환

  // const totalTransactions = activityData?.activity_data_list.reduce((total, activity) => {
  //   return total + activity.score_overview.near.score;
  // }, 0) || 0; // activityData가 null일 경우 기본값 0 반환

  // const totalOverallScore = activityData?.activity_data_list.reduce((total, activity) => {
  //   return total + activity.score_overview.overall_total_score;
  // }, 0) || 0; // activityData가 null일 경우 기본값 0 반환

  return (
    <Suspense>
    <>
      <div className="hidden flex-col md:flex">
        <div className="flex-1 space-y-4 p-8 pt-6">
          <div className="flex items-center justify-between space-y-2">
          </div>
          <Tabs defaultValue="overview" className="space-y-4">
            <TabsContent value="overview" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
              <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <Icons.twitter className="mr-2 h-6 w-6" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">+{activityData?.score_overview.twitter.score}</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <Icons.gitHub className="mr-2 h-6 w-6" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">+{activityData?.score_overview.github.score}</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="h-6 w-6 text-muted-foreground"
                    >
                      <rect width="20" height="14" x="2" y="5" rx="2" />
                      <path d="M2 10h20" />
                    </svg>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">+{activityData?.score_overview.near.score}</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Active Now
                    </CardTitle>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="h-5 w-5 text-muted-foreground"
                    >
                      <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                    </svg>
                  </CardHeader>
                  <CardContent>
                    <div className={`text-3xl font-bold ${
                         activityData?.score_overview.isAlive ? "text-green-400" : "text-red-400"
                       }`}>
                        {activityData?.score_overview.isAlive ? "Alive" : "Dead"}
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Overall Score
                    </CardTitle>
                    <TrendingUp className="h-5 w-5"/>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">+{activityData?.score_overview.overall_total_score}</div>
                  </CardContent>
                </Card>
              </div>
              <div className="grid gap-4 gap-y-4 *:md:grid-cols-2 lg:grid-cols-7">
                <div className="col-span-4 gap-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Github Chart</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <GithubChart/>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Twitter Chart</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <TwitterChart/>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Near Chart</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <NearChart/>
                  </CardContent>
                </Card>
                </div>
                <div className="col-span-3">
                <Card className=" h-[340px]">
                <CardHeader>
                <CardTitle>Github Report</CardTitle>
                  </CardHeader>
                    <CardContent>
                      <MDXProvider>
                        <GithubReport apiData={githubreport} /> 
                      </MDXProvider>
                    </CardContent>
                </Card>
                <Card className=" h-[340px]">
                <CardHeader>
                <CardTitle>Twitter Report</CardTitle>
                  </CardHeader>
                    <CardContent>
                    <MDXProvider>
                        <TwitterReport apiData={twitterreport} /> 
                      </MDXProvider>
                    </CardContent>
                </Card>
                <Card className=" h-[340px]">
                <CardHeader>
                <CardTitle>NEAR Report</CardTitle>
                  </CardHeader>
                    <CardContent>
                      <MDXProvider>
                        <NearReport apiData={nearreport} /> 
                      </MDXProvider>
                    </CardContent>
                </Card>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
    </Suspense>
  )
}
