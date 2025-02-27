"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Eye, Filter, Download } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';

// Mock data for plagiarism reports
const mockReports = [
  {
    id: 1,
    assignment: "Midterm Exam",
    student1: "John Doe",
    student2: "Jane Smith",
    similarityScore: 92,
    status: "high",
    date: "2025-04-02",
  },
  {
    id: 2,
    assignment: "Final Project",
    student1: "Michael Johnson",
    student2: "Emily Williams",
    similarityScore: 85,
    status: "high",
    date: "2025-04-01",
  },
  {
    id: 3,
    assignment: "Quiz 3",
    student1: "Robert Brown",
    student2: "Sarah Davis",
    similarityScore: 78,
    status: "medium",
    date: "2025-03-30",
  },
  {
    id: 4,
    assignment: "Homework 5",
    student1: "David Miller",
    student2: "Jennifer Wilson",
    similarityScore: 65,
    status: "medium",
    date: "2025-03-28",
  },
  {
    id: 5,
    assignment: "Midterm Exam",
    student1: "James Taylor",
    student2: "Lisa Anderson",
    similarityScore: 45,
    status: "low",
    date: "2025-03-25",
  },
];

// Mock data for detailed comparison
const mockComparisonData = {
  assignment: "Midterm Exam",
  question: "Explain the concept of inheritance in object-oriented programming.",
  student1: {
    name: "John Doe",
    answer: "Inheritance is a mechanism where a new class inherits properties and behaviors from an existing class. The existing class is called the parent or base class, and the new class is called the child or derived class. This allows for code reuse and establishes a relationship between the parent and child classes.",
  },
  student2: {
    name: "Jane Smith",
    answer: "Inheritance is a mechanism in object-oriented programming where a new class inherits properties and behaviors from an existing class. The existing class is called the parent class, and the new class is called the child class. This enables code reuse and establishes a parent-child relationship between classes.",
  },
  highlightedSections: [
    { start: 0, end: 120, student: "both" },
    { start: 121, end: 180, student: "student1" },
    { start: 121, end: 170, student: "student2" },
    { start: 181, end: 230, student: "both" },
  ],
};

export function PlagiarismReports() {
  const [reports, setReports] = useState(mockReports);
  const [selectedReport, setSelectedReport] = useState<number | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [filterAssignment, setFilterAssignment] = useState<string>("all");
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case "high":
        return "destructive";
      case "medium":
        return "warning";
      case "low":
        return "secondary";
      default:
        return "secondary";
    }
  };
  
  const getStatusVariant = (status: string): "default" | "destructive" | "outline" | "secondary" => {
    switch (status) {
      case "high":
        return "destructive";
      case "medium":
        return "default";
      case "low":
        return "secondary";
      default:
        return "secondary";
    }
  };
  
  const filteredReports = reports.filter(report => {
    if (filterStatus !== "all" && report.status !== filterStatus) return false;
    if (filterAssignment !== "all" && report.assignment !== filterAssignment) return false;
    return true;
  });
  
  const uniqueAssignments = Array.from(new Set(reports.map(report => report.assignment)));
  
  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <CardTitle>Plagiarism Reports</CardTitle>
              <CardDescription>
                Review potential cases of academic dishonesty
              </CardDescription>
            </div>
            <div className="flex flex-col sm:flex-row gap-2">
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="high">High Similarity</SelectItem>
                  <SelectItem value="medium">Medium Similarity</SelectItem>
                  <SelectItem value="low">Low Similarity</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={filterAssignment} onValueChange={setFilterAssignment}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by assignment" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Assignments</SelectItem>
                  {uniqueAssignments.map((assignment) => (
                    <SelectItem key={assignment} value={assignment}>
                      {assignment}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
                <span className="sr-only">Filter</span>
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Assignment</TableHead>
                <TableHead>Student 1</TableHead>
                <TableHead>Student 2</TableHead>
                <TableHead>Similarity</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredReports.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-6 text-muted-foreground">
                    No plagiarism reports found matching your filters
                  </TableCell>
                </TableRow>
              ) : (
                filteredReports.map((report) => (
                  <TableRow key={report.id}>
                    <TableCell className="font-medium">{report.assignment}</TableCell>
                    <TableCell>{report.student1}</TableCell>
                    <TableCell>{report.student2}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Progress value={report.similarityScore} className="w-[60px]" />
                        <span>{report.similarityScore}%</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={getStatusVariant(report.status)}>
                        {report.status === "high" ? "High" : report.status === "medium" ? "Medium" : "Low"}
                      </Badge>
                    </TableCell>
                    <TableCell>{new Date(report.date).toLocaleDateString()}</TableCell>
                    <TableCell className="text-right">
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => setSelectedReport(report.id)}
                      >
                        <Eye className="h-4 w-4" />
                        <span className="sr-only">View Details</span>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      
      <Dialog open={selectedReport !== null} onOpenChange={(open) => !open && setSelectedReport(null)}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Plagiarism Comparison</DialogTitle>
            <DialogDescription>
              Detailed comparison between student submissions
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="text-lg font-semibold mb-2">{mockComparisonData.student1.name}</h3>
                <div className="p-4 border rounded-md bg-muted/30">
                  {mockComparisonData.student1.answer}
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">{mockComparisonData.student2.name}</h3>
                <div className="p-4 border rounded-md bg-muted/30">
                  {mockComparisonData.student2.answer}
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-2">Similarity Analysis</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-green-500"></div>
                  <span>Exact match</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-yellow-500"></div>
                  <span>Similar phrasing</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-blue-500"></div>
                  <span>Unique content</span>
                </div>
              </div>
            </div>
            
            <div className="flex justify-between">
              <Button variant="outline">Mark as False Positive</Button>
              <div className="space-x-2">
                <Button variant="outline">
                  <Download className="mr-2 h-4 w-4" />
                  Download Report
                </Button>
                <Button variant="destructive">Flag for Review</Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}