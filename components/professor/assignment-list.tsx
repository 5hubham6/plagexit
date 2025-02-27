"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Eye, MoreHorizontal, Pencil, Trash2 } from 'lucide-react';

// Mock data for assignments
const mockAssignments = [
  {
    id: 1,
    name: "Midterm Exam",
    course: "CS101: Introduction to Computer Science",
    dueDate: "2025-04-15",
    submissions: 28,
    status: "active",
  },
  {
    id: 2,
    name: "Final Project",
    course: "CS201: Data Structures",
    dueDate: "2025-05-20",
    submissions: 15,
    status: "active",
  },
  {
    id: 3,
    name: "Quiz 3",
    course: "CS301: Algorithms",
    dueDate: "2025-04-05",
    submissions: 42,
    status: "completed",
  },
  {
    id: 4,
    name: "Homework 5",
    course: "CS401: Artificial Intelligence",
    dueDate: "2025-04-10",
    submissions: 31,
    status: "active",
  },
];

export function AssignmentList() {
  const [assignments, setAssignments] = useState(mockAssignments);
  
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Assignments</CardTitle>
          <CardDescription>Manage your course assignments</CardDescription>
        </div>
        <Button>Create Assignment</Button>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Course</TableHead>
              <TableHead>Due Date</TableHead>
              <TableHead>Submissions</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {assignments.map((assignment) => (
              <TableRow key={assignment.id}>
                <TableCell className="font-medium">{assignment.name}</TableCell>
                <TableCell>{assignment.course}</TableCell>
                <TableCell>{new Date(assignment.dueDate).toLocaleDateString()}</TableCell>
                <TableCell>{assignment.submissions}</TableCell>
                <TableCell>
                  <Badge variant={assignment.status === "active" ? "default" : "secondary"}>
                    {assignment.status === "active" ? "Active" : "Completed"}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Actions</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Eye className="mr-2 h-4 w-4" />
                        View Details
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Pencil className="mr-2 h-4 w-4" />
                        Edit Assignment
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive">
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete Assignment
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}