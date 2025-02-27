"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Eye, Filter, Download, CheckCircle, XCircle, HelpCircle } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Mock data for grading results
const mockGradingResults = [
  {
    id: 1,
    assignment: "Midterm Exam",
    student: "John Doe",
    score: 85,
    status: "graded",
    submissionDate: "2025-04-01",
    questions: [
      { id: 1, score: 90, status: "correct" },
      { id: 2, score: 75, status: "partial" },
      { id: 3, score: 100, status: "correct" },
      { id: 4, score: 60, status: "partial" },
    ]
  },
  {
    id: 2,
    assignment: "Midterm Exam",
    student: "Jane Smith",
    score: 92,
    status: "graded",
    submissionDate: "2025-04-01",
    questions: [
      { id: 1, score: 95, status: "correct" },
      { id: 2, score: 85, status: "correct" },
      { id: 3, score: 100, status: "correct" },
      { id: 4, score: 80, status: "partial" },
    ]
  },
  {
    id: 3,
    assignment: "Quiz 3",
    student: "Michael Johnson",
    score: 78,
    status: "graded",
    submissionDate: "2025-03-28",
    questions: [
      { id: 1, score: 80, status: "partial" },
      { id: 2, score: 70, status: "partial" },
      { id: 3, score: 90, status: "correct" },
      { id: 4, score: 70, status: "partial" },
    ]
  },
  {
    id: 4,
    assignment: "Final Project",
    student: "Emily Williams",
    score: 0,
    status: "pending",
    submissionDate: "2025-04-02",
    questions: []
  },
  {
    id: 5,
    assignment: "Homework 5",
    student: "David Miller",
    score: 65,
    status: "graded",
    submissionDate: "2025-03-25",
    questions: [
      { id: 1, score: 60, status: "partial" },
      { id: 2, score: 50, status: "incorrect" },
      { id: 3, score: 80, status: "partial" },
      { id: 4, score: 70, status: "partial" },
    ]
  },
];

// Mock data for detailed grading
const mockDetailedGrading = {
  assignment: "Midterm Exam",
  student: "John Doe",
  submissionDate: "2025-04-01",
  score: 85,
  questions: [
    {
      id: 1,
      question: "Explain the concept of inheritance in object-oriented programming.",
      answer: "Inheritance is a mechanism where a new class inherits properties and behaviors from an existing class. The existing class is called the parent or base class, and the new class is called the child or derived class. This allows for code reuse and establishes a relationship between the parent and child classes.",
      correctAnswer: "Inheritance is a mechanism in object-oriented programming where a class (child/derived class) can inherit properties and behaviors from another class (parent/base class). This promotes code reuse, extensibility, and the establishment of hierarchical relationships between classes.",
      score: 90,
      status: "correct",
      feedback: "Good explanation of inheritance. Covered all the key points about parent/child classes and code reuse.",
      similarityScore: 85
    },
    {
      id: 2,
      question: "Describe the difference between stack and heap memory allocation.",
      answer: "Stack memory is used for static memory allocation and heap memory is used for dynamic memory allocation. Variables allocated on the stack are stored directly in memory and access to this memory is very fast. The heap is used for dynamic memory allocation and is typically slower than stack allocation.",
      correctAnswer: "Stack memory is used for static memory allocation where variables are allocated and deallocated in a last-in-first-out manner. It's faster but limited in size. Heap memory is used for dynamic memory allocation, managed by the programmer, larger in size but slower access. Stack stores local variables while heap stores objects and may cause memory leaks if not properly managed.",
      score: 75,
      status: "partial",
      feedback: "You covered the basic difference but missed details about memory management, potential issues like memory leaks, and when to use each type.",
      similarityScore: 65
    },
    {
      id: 3,
      question: "What is the time complexity of quicksort in the worst case?",
      answer: "The worst-case time complexity of quicksort is O(n²), which occurs when the pivot chosen is either the smallest or largest element, resulting in highly unbalanced partitions.",
      correctAnswer: "The worst-case time complexity of quicksort is O(n²), which occurs when the pivot chosen is either the smallest or largest element in each recursive call, resulting in highly unbalanced partitions.",
      score: 100,
      status: "correct",
      feedback: "Perfect answer with correct time complexity and explanation of the worst-case scenario.",
      similarityScore: 95
    },
    {
      id: 4,
      question: "Explain the concept of virtual memory in operating systems.",
      answer: "Virtual memory is a memory management technique that provides an idealized abstraction of the storage resources that are actually available on a given machine. It maps memory addresses used by a program, called virtual addresses, into physical addresses in computer memory.",
      correctAnswer: "Virtual memory is a memory management technique that provides an idealized abstraction of the storage resources. It creates an illusion to users of a very large main memory. The operating system maps virtual addresses to physical addresses, allowing programs to use more memory than physically available by using disk space as an extension. This involves concepts like paging, segmentation, and page faults.",
      score: 60,
      status: "partial",
      feedback: "Your definition is correct but incomplete. You didn't mention paging, segmentation, or how virtual memory allows programs to use more memory than physically available.",
      similarityScore: 55
    }
  ]
};

export function GradingResults() {
  const [results, setResults] = useState(mockGradingResults);
  const [selectedResult, setSelectedResult] = useState<number | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [filterAssignment, setFilterAssignment] = useState<string>("all");
  
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "graded":
        return <Badge variant="default">Graded</Badge>;
      case "pending":
        return <Badge variant="secondary">Pending</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };
  
  const getQuestionStatusIcon = (status: string) => {
    switch (status) {
      case "correct":
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case "partial":
        return <HelpCircle className="h-5 w-5 text-yellow-500" />;
      case "incorrect":
        return <XCircle className="h-5 w-5 text-red-500" />;
      default:
        return null;
    }
  };
  
  const filteredResults = results.filter(result => {
    if (filterStatus !== "all" && result.status !== filterStatus) return false;
    if (filterAssignment !== "all" && result.assignment !== filterAssignment) return false;
    return true;
  });
  
  const uniqueAssignments = Array.from(new Set(results.map(result => result.assignment)));
  
  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <CardTitle>Grading Results</CardTitle>
              <CardDescription>
                Review automated grading results for student submissions
              </CardDescription>
            </div>
            <div className="flex flex-col sm:flex-row gap-2">
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="graded">Graded</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
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
                <TableHead>Student</TableHead>
                <TableHead>Score</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Submission Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredResults.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-6 text-muted-foreground">
                    No grading results found matching your filters
                  </TableCell>
                </TableRow>
              ) : (
                filteredResults.map((result) => (
                  <TableRow key={result.id}>
                    <TableCell className="font-medium">{result.assignment}</TableCell>
                    <TableCell>{result.student}</TableCell>
                    <TableCell>
                      {result.status === "pending" ? (
                        <span className="text-muted-foreground">Pending</span>
                      ) : (
                        <div className="flex items-center gap-2">
                          <Progress value={result.score} className="w-[60px]" />
                          <span>{result.score}%</span>
                        </div>
                      )}
                    </TableCell>
                    <TableCell>{getStatusBadge(result.status)}</TableCell>
                    <TableCell>{new Date(result.submissionDate).toLocaleDateString()}</TableCell>
                    <TableCell className="text-right">
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => setSelectedResult(result.id)}
                        disabled={result.status === "pending"}
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
      
      <Dialog open={selectedResult !== null} onOpenChange={(open) => !open && setSelectedResult(null)}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Grading Details</DialogTitle>
            <DialogDescription>
              Detailed grading results for {mockDetailedGrading.student} - {mockDetailedGrading.assignment}
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Submission Date</p>
                <p className="font-medium">{new Date(mockDetailedGrading.submissionDate).toLocaleDateString()}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Overall Score</p>
                <p className="font-medium text-xl">{mockDetailedGrading.score}%</p>
              </div>
              <Button variant="outline">
                <Download className="mr-2 h-4 w-4" />
                Download Report
              </Button>
            </div>
            
            <Tabs defaultValue="questions">
              <TabsList className="grid w-full max-w-md grid-cols-2">
                <TabsTrigger value="questions">Questions</TabsTrigger>
                <TabsTrigger value="summary">Summary</TabsTrigger>
              </TabsList>
              
              <TabsContent value="questions" className="space-y-6 mt-6">
                {mockDetailedGrading.questions.map((question) => (
                  <Card key={question.id}>
                    <CardHeader className="pb-2">
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="text-base">Question {question.id}</CardTitle>
                          <CardDescription className="mt-1">{question.question}</CardDescription>
                        </div>
                        <div className="flex items-center gap-2">
                          {getQuestionStatusIcon(question.status)}
                          <span className="font-bold">{question.score}%</span>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <h4 className="text-sm font-medium mb-1">Student's Answer</h4>
                        <p className="text-sm p-3 bg-muted rounded-md">{question.answer}</p>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium mb-1">Correct Answer</h4>
                        <p className="text-sm p-3 bg-muted rounded-md">{question.correctAnswer}</p>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium mb-1">Feedback</h4>
                        <p className="text-sm">{question.feedback}</p>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium mb-1">Similarity Score</h4>
                        <div className="flex items-center gap-2">
                          <Progress value={question.similarityScore} className="w-[100px]" />
                          <span className="text-sm">{question.similarityScore}%</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>
              
              <TabsContent value="summary" className="space-y-6 mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Performance Summary</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h4 className="text-sm font-medium mb-2">Score Distribution</h4>
                        <div className="h-4 bg-muted rounded-full overflow-hidden">
                          <div className="h-full bg-green-500" style={{ width: '60%' }}></div>
                        </div>
                        <div className="flex justify-between text-xs mt-1">
                          <span>Correct: 60%</span>
                          <span>Partial: 30%</span>
                          <span>Incorrect: 10%</span>
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="text-sm font-medium mb-2">Strengths</h4>
                        <ul className="list-disc pl-5 text-sm space-y-1">
                          <li>Strong understanding of algorithms (Q3)</li>
                          <li>Good grasp of object-oriented concepts (Q1)</li>
                        </ul>
                      </div>
                      
                      <div>
                        <h4 className="text-sm font-medium mb-2">Areas for Improvement</h4>
                        <ul className="list-disc pl-5 text-sm space-y-1">
                          <li>Operating systems concepts need more detail (Q4)</li>
                          <li>Memory management understanding is incomplete (Q2)</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Plagiarism Check</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm mb-4">No significant similarities detected with other student submissions.</p>
                    <Button variant="outline" size="sm">View Detailed Report</Button>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
            
            <div className="flex justify-between">
              <Button variant="outline">Adjust Scores Manually</Button>
              <Button>Approve and Finalize</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}