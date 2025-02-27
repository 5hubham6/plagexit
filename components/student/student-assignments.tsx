"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Clock, Filter, FileText } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

// Mock data for student assignments
const mockAssignments = [
  {
    id: 1,
    name: "Midterm Exam",
    course: "CS101: Introduction to Computer Science",
    dueDate: "2025-04-15",
    status: "pending",
    progress: 0,
  },
  {
    id: 2,
    name: "Final Project",
    course: "CS201: Data Structures",
    dueDate: "2025-05-20",
    status: "in_progress",
    progress: 35,
  },
  {
    id: 3,
    name: "Quiz 3",
    course: "CS301: Algorithms",
    dueDate: "2025-04-05",
    status: "submitted",
    progress: 100,
  },
  {
    id: 4,
    name: "Homework 5",
    course: "CS401: Artificial Intelligence",
    dueDate: "2025-04-10",
    status: "graded",
    progress: 100,
    score: 85,
  },
];

export function StudentAssignments() {
  const [assignments, setAssignments] = useState(mockAssignments);
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [filterCourse, setFilterCourse] = useState<string>("all");
  
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return <Badge variant="outline">Not Started</Badge>;
      case "in_progress":
        return <Badge variant="secondary">In Progress</Badge>;
      case "submitted":
        return <Badge variant="primary">Submitted</Badge>;
      case "graded":
        return <Badge variant="default">Graded</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };
  
  const getDaysRemaining = (dueDate: string) => {
    const due = new Date(dueDate);
    const now = new Date();
    const diffTime = due.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) {
      return "Overdue";
    } else if (diffDays === 0) {
      return "Due today";
    } else {
      return `${diffDays} day${diffDays !== 1 ? 's' : ''} left`;
    }
  };
  
  const filteredAssignments = assignments.filter(assignment => {
    if (filterStatus !== "all" && assignment.status !== filterStatus) return false;
    if (filterCourse !== "all" && !assignment.course.includes(filterCourse)) return false;
    return true;
  });
  
  const uniqueCourses = Array.from(new Set(assignments.map(assignment => {
    const match = assignment.course.match(/^(CS\d+)/);
    return match ? match[1] : assignment.course;
  })));
  
  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <CardTitle>My Assignments</CardTitle>
            <CardDescription>
              View and manage your course assignments
            </CardDescription>
          </div>
          <div className="flex flex-col sm:flex-row gap-2">
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="pending">Not Started</SelectItem>
                <SelectItem value="in_progress">In Progress</SelectItem>
                <SelectItem value="submitted">Submitted</SelectItem>
                <SelectItem value="graded">Graded</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={filterCourse} onValueChange={setFilterCourse}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by course" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Courses</SelectItem>
                {uniqueCourses.map((course) => (
                  <SelectItem key={course} value={course}>
                    {course}
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
              <TableHead>Course</TableHead>
              <TableHead>Due Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Progress</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredAssignments.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-6 text-muted-foreground">
                  No assignments found matching your filters
                </TableCell>
              </TableRow>
            ) : (
              filteredAssignments.map((assignment) => (
                <TableRow key={assignment.id}>
                  <TableCell className="font-medium">{assignment.name}</TableCell>
                  <TableCell>{assignment.course}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <div>{new Date(assignment.dueDate).toLocaleDateString()}</div>
                        <div className="text-xs text-muted-foreground">
                          {getDaysRemaining(assignment.dueDate)}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{getStatusBadge(assignment.status)}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Progress value={assignment.progress} className="w-[60px]" />
                      <span>
                        {assignment.status === "graded" 
                          ? `${assignment.score}%` 
                          : `${assignment.progress}%`}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="outline" size="sm">
                      <FileText className="mr-2 h-4 w-4" />
                      {assignment.status === "pending" || assignment.status === "in_progress" 
                        ? "Start" 
                        : assignment.status === "submitted" 
                        ? "View Submission" 
                        : "View Feedback"}
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}