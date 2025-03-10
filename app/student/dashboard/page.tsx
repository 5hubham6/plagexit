"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { StudentHeader } from "@/components/student/header";
import { StudentSidebar } from "@/components/student/sidebar";
import { SubmitAssignment } from "@/components/student/submit-assignment";
import { StudentAssignments } from "@/components/student/student-assignments";
import { GradingFeedback } from '@/components/student/grading-feedback';

export default function StudentDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <StudentHeader setSidebarOpen={setSidebarOpen} />

      <div className="flex-1 flex">
        <StudentSidebar open={sidebarOpen} setOpen={setSidebarOpen} />

        <main className="flex-1 p-6 overflow-y-auto">
          <div className="max-w-7xl mx-auto space-y-6">
            <h1 className="text-3xl font-bold tracking-tight">
              Student Dashboard
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <DashboardCard
                title="Pending Assignments"
                value="3"
                description="Due this week"
                alert
              />
              <DashboardCard
                title="Completed Assignments"
                value="8"
                description="This semester"
              />
              <DashboardCard
                title="Average Score"
                value="87%"
                description="All assignments"
              />
            </div>

            <Tabs defaultValue="assignments" className="w-full">
              <TabsList className="grid w-full max-w-md grid-cols-3">
                <TabsTrigger value="assignments">Assignments</TabsTrigger>
                <TabsTrigger value="submit">Submit</TabsTrigger>
                <TabsTrigger value="feedback">Feedback</TabsTrigger>
              </TabsList>

              <TabsContent value="assignments" className="mt-6">
                <StudentAssignments />
              </TabsContent>

              <TabsContent value="submit" className="mt-6">
                <SubmitAssignment />
              </TabsContent>

              <TabsContent value="feedback" className="mt-6">
                <GradingFeedback />
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  );
}

function DashboardCard({
  title,
  value,
  description,
  alert = false,
}: {
  title: string;
  value: string;
  description: string;
  alert?: boolean;
}) {
  return (
    <Card className={alert ? "border-destructive/50" : ""}>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold">{value}</div>
        <CardDescription>{description}</CardDescription>
      </CardContent>
    </Card>
  );
}
