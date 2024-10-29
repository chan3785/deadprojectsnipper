'use client'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Tabs,
  TabsContent,
} from "@/components/ui/tabs"
import { MainNav } from "./components/main-nav"
import { Overview } from "./components/overview"
import { Search } from "./components/search"
import { UserNav } from "./components/user-nav"
import { Icons } from "./components/icons";
import { TrendingUp } from "lucide-react"
import { ScoreChart } from "./components/scorechart"
import { GithubChart } from "./components/githubchart"
import { TwitterChart } from "./components/twitterchart"
import { NearChart } from "./components/nearchart"
import Welcome from '@/markdown/welcome.mdx'
import React, { useState, useEffect } from 'react';
import axios from 'axios';

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

export default function DashboardPage() {
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

  const totalTwitterScore = activityData?.activity_data_list.reduce((total, activity) => {
    return total + activity.score_overview.twitter.score;
  }, 0) || 0; // activityData가 null일 경우 기본값 0 반환

  const totalGithubScore = activityData?.activity_data_list.reduce((total, activity) => {
    return total + activity.score_overview.github.score;
  }, 0) || 0; // activityData가 null일 경우 기본값 0 반환

  const totalTransactions = activityData?.activity_data_list.reduce((total, activity) => {
    return total + activity.score_overview.near.score;
  }, 0) || 0; // activityData가 null일 경우 기본값 0 반환

  const totalOverallScore = activityData?.activity_data_list.reduce((total, activity) => {
    return total + activity.score_overview.overall_total_score;
  }, 0) || 0; // activityData가 null일 경우 기본값 0 반환

  return (
    <>
      <div className="hidden flex-col md:flex">
        <div className="border-b">
          <div className="flex h-16 items-center px-4">
            <MainNav className="mx-6" />
            <div className="ml-auto flex items-center space-x-4">
              <Search />
              <UserNav />
            </div>
          </div>
        </div>
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
                    <div className="text-2xl font-bold">+{totalTwitterScore}</div>
                    <p className="text-xs text-muted-foreground">
                      +100.13% from last month
                      </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <Icons.gitHub className="mr-2 h-6 w-6" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">+{totalGithubScore}</div>
                    <p className="text-xs text-muted-foreground">
                      +180.1% from last month
                    </p>
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
                    <div className="text-2xl font-bold">+{totalTransactions}</div>
                    <p className="text-xs text-muted-foreground">
                      +19% from last month
                    </p>
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
                    <div className="text-3xl font-bold text-green-400">Alive</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Rate Of Change
                    </CardTitle>
                    <TrendingUp className="h-4 w-4"/>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">+{totalOverallScore}</div>
                    <p className="text-xs text-muted-foreground">
                      +10.1% from last month
                    </p>
                  </CardContent>
                </Card>
              </div>
              <div className="grid gap-4 gap-y-4 *:md:grid-cols-2 lg:grid-cols-7">
                <div className="col-span-4 gap-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Overview</CardTitle>
                  </CardHeader>
                  <CardContent className="pl-2">
                    <Overview />
                  </CardContent>
                </Card>
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
                  <Card>
                <CardHeader>
                    <CardTitle>Total Score</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ScoreChart/>
                  </CardContent>
                </Card>
                <Card className=" h-[340px]">
                <CardHeader>
                    <CardTitle>Report for Github</CardTitle>
                  </CardHeader>
                    <CardContent>
                      <Welcome/>
                    </CardContent>
                </Card>
                <Card className=" h-[340px]">
                <CardHeader>
                    <CardTitle>Report for Twitter</CardTitle>
                  </CardHeader>
                    <CardContent>
                    <Welcome/>
                      
                    </CardContent>
                </Card>
                <Card className=" h-[340px]">
                <CardHeader>
                    <CardTitle>Report for Near</CardTitle>
                  </CardHeader>
                    <CardContent>
                    <Welcome/>
                      
                    </CardContent>
                </Card>

                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  )
}
