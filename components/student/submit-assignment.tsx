"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { FileUp, Upload, AlertCircle, Clock } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

// Mock data for assignments
const mockAssignments = [
  {
    id: "cs101-midterm",
    name: "Midterm Exam",
    course: "CS101: Introduction to Computer Science",
    dueDate: "2025-04-15T23:59:59",
    description: "Comprehensive exam covering all topics from weeks 1-8.",
  },
  {
    id: "cs201-final",
    name: "Final Project",
    course: "CS201: Data Structures",
    dueDate: "2025-05-20T23:59:59",
    description: "Implement a data structure of your choice with practical applications.",
  },
  {
    id: "cs301-quiz3",
    name: "Quiz 3",
    course: "CS301: Algorithms",
    dueDate: "2025-04-05T23:59:59",
    description: "Short quiz on graph algorithms and dynamic programming.",
  },
];

export function SubmitAssignment() {
  const { toast } = useToast();
  const [file, setFile] = useState<File | null>(null);
  const [selectedAssignment, setSelectedAssignment] = useState<string>("");
  const [assignment, setAssignment] = useState<typeof mockAssignments[0] | null>(null);
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };
  
  const handleAssignmentChange = (value: string) => {
    setSelectedAssignment(value);
    const selected = mockAssignments.find(a => a.id === value) || null;
    setAssignment(selected);
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedAssignment) {
      toast({
        title: "Error",
        description: "Please select an assignment",
        variant: "destructive",
      });
      return;
    }
    
    if (!file) {
      toast({
        title: "Error",
        description: "Please select a file to upload",
        variant: "destructive",
      });
      return;
    }
    
    // In a real app, you would upload the file to your API here
    toast({
      title: "Success",
      description: "Assignment submitted successfully",
    });
    
    // Reset form
    setFile(null);
    setSelectedAssignment("");
    setAssignment(null);
  };
  
  const isDeadlineNear = (dueDate: string) => {
    const due = new Date(dueDate);
    const now = new Date();
    const diffTime = due.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 2;
  };
  
  const formatTimeRemaining = (dueDate: string) => {
    const due = new Date(dueDate);
    const now = new Date();
    const diffTime = due.getTime() - now.getTime();
    
    if (diffTime <= 0) {
      return "Deadline passed";
    }
    
    const days = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diffTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    
    if (days > 0) {
      return `${days} day${days !== 1 ? 's' : ''} and ${hours} hour${hours !== 1 ? 's' : ''} remaining`;
    } else {
      const minutes = Math.floor((diffTime % (1000 * 60 * 60)) / (1000 * 60));
      return `${hours} hour${hours !== 1 ? 's' : ''} and ${minutes} minute${minutes !== 1 ? 's' : ''} remaining`;
    }
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Submit Assignment</CardTitle>
        <CardDescription>
          Upload your assignment submission for grading
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="assignment">Assignment</Label>
            <Select value={selectedAssignment} onValueChange={handleAssignmentChange}>
              <SelectTrigger>
                <SelectValue placeholder="Select an assignment" />
              </SelectTrigger>
              <SelectContent>
                {mockAssignments.map((assignment) => (
                  <SelectItem key={assignment.id} value={assignment.id}>
                    {assignment.name} - {assignment.course}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          {assignment && (
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-medium">Assignment Details</h4>
                <p className="text-sm mt-1">{assignment.description}</p>
              </div>
              
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">
                  Due: {new Date(assignment.dueDate).toLocaleString()}
                </span>
              </div>
              
              {isDeadlineNear(assignment.dueDate) && (
                <Alert variant="warning">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Deadline Approaching</AlertTitle>
                  <AlertDescription>
                    {formatTimeRemaining(assignment.dueDate)}
                  </AlertDescription>
                </Alert>
              )}
            </div>
          )}
          
          <div className="space-y-2">
            <Label htmlFor="file-upload">Upload Submission (PDF)</Label>
            <div className="border-2 border-dashed rounded-md p-6 flex flex-col items-center justify-center">
              <FileUp className="h-10 w-10 text-muted-foreground mb-2" />
              <p className="text-sm text-muted-foreground mb-2">
                {file ? file.name : "Drag and drop your file here or click to browse"}
              </p>
              <Input
                id="file-upload"
                type="file"
                accept=".pdf"
                className="hidden"
                onChange={handleFileChange}
              />
              <Button type="button" variant="outline" onClick={() => document.getElementById('file-upload')?.click()}>
                Select File
              </Button>
            </div>
          </div>
          
          <Button type="submit" className="w-full">
            <Upload className="mr-2 h-4 w-4" />
            Submit Assignment
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}