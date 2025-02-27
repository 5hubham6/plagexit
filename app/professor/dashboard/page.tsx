"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ProfessorHeader } from '@/components/professor/header';
import { ProfessorSidebar } from '@/components/professor/sidebar';
import { UploadAnswerKey } from '@/components/professor/upload-answer-key';
import { AssignmentList } from '@/components/professor/assignment-list';
import { PlagiarismReports } from '@/components/professor/plagiarism-reports';
import { GradingResults } from '@/components/professor/grading-results';

export default function ProfessorDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <ProfessorHeader setSidebarOpen={setSidebarOpen} />
      
      <div className="flex-1 flex">
        <ProfessorSidebar open={sidebarOpen} setOpen={setSidebarOpen} />
        
        <main className="flex-1 p-6 overflow-y-auto">
          <div className="max-w-7xl mx-auto space-y-6">
            <h1 className="text-3xl font-bold tracking-tight">Professor Dashboard</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <DashboardCard 
                title="Total Assignments" 
                value="12" 
                description="Active assignments" 
              />
              <DashboardCard 
                title="Pending Reviews" 
                value="28" 
                description="Submissions to review" 
              />
              <DashboardCard 
                title="Plagiarism Alerts" 
                value="5" 
                description="Potential cases detected" 
                alert
              />
            </div>
            
            <Tabs defaultValue="assignments" className="w-full">
              <TabsList className="grid w-full max-w-md grid-cols-4">
                <TabsTrigger value="assignments">Assignments</TabsTrigger>
                <TabsTrigger value="upload">Upload</TabsTrigger>
                <TabsTrigger value="grading">Grading</TabsTrigger>
                <TabsTrigger value="plagiarism">Plagiarism</TabsTrigger>
              </TabsList>
              
              <TabsContent value="assignments" className="mt-6">
                <AssignmentList />
              </TabsContent>
              
              <TabsContent value="upload" className="mt-6">
                <UploadAnswerKey />
              </TabsContent>
              
              <TabsContent value="grading" className="mt-6">
                <GradingResults />
              </TabsContent>
              
              <TabsContent value="plagiarism" className="mt-6">
                <PlagiarismReports />
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
  alert = false 
}: { 
  title: string; 
  value: string; 
  description: string; 
  alert?: boolean;
}) {
  return (
    <Card className={alert ? "border-destructive/50" : ""}>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold">{value}</div>
        <CardDescription>{description}</CardDescription>
      </CardContent>
    </Card>
  );
}