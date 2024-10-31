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
import { GithubChart } from "../components/githubchart"
import { TwitterChart } from "../components/twitterchart"
import { NearChart } from "../components/nearchart"
import GithubReport from '@/markdown/githubreport'
import TwitterReport from '@/markdown/twitterreport'
import NearReport from '@/markdown/nearreport'
import React from 'react';
import { MDXProvider } from '@mdx-js/react';
import { OverallScore } from "@/components/overallscorecard";
import { GithubScore } from "@/components/githubscorecard";
import { NearScore } from "@/components/nearscorecard copy 4";
import { IsAliveScore } from "@/components/isalivecard";
import { TwitterScore } from "@/components/twitterscorecard";



export default function Page() {


  return (
    <>
      <div className="hidden flex-col md:flex">
        <div className="flex-1 space-y-4 p-8 pt-6">
          <div className="flex items-center justify-between space-y-2">
          </div>
          <Tabs defaultValue="overview" className="space-y-4">
            <TabsContent value="overview" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
                <TwitterScore/>
                <GithubScore/>
                <NearScore/>
                <IsAliveScore/>
                <OverallScore/>
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
                        <GithubReport /> 
                      </MDXProvider>
                    </CardContent>
                </Card>
                <Card className=" h-[340px]">
                <CardHeader>
                <CardTitle>Twitter Report</CardTitle>
                  </CardHeader>
                    <CardContent>
                    <MDXProvider>
                        <TwitterReport /> 
                      </MDXProvider>
                    </CardContent>
                </Card>
                <Card className=" h-[340px]">
                <CardHeader>
                <CardTitle>NEAR Report</CardTitle>
                  </CardHeader>
                    <CardContent>
                      <MDXProvider>
                        <NearReport /> 
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
  )
}
