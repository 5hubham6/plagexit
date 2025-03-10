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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";

export function GradingFeedback() {
  const [feedback, setFeedback] = useState({
    assignmentName: "Midterm Exam",
    score: 85,
    comments: "Your answers were clear and concise. Keep up the good work!",
    questionFeedback: [
      {
        question: "What is the significance of the OSI model?",
        yourAnswer:
          "The OSI model divides network communication into seven layers...",
        score: 90,
        feedback: "Correct! Your explanation was thorough.",
      },
      {
        question: "Explain the difference between TCP and UDP.",
        yourAnswer: "TCP is connection-oriented while UDP is connectionless...",
        score: 80,
        feedback: "Mostly correct, but you missed some minor details.",
      },
    ],
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Grading Feedback</CardTitle>
        <CardDescription>
          Review detailed feedback and suggestions for improvement
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold">
              Assignment: {feedback.assignmentName}
            </h3>
            <div className="mt-2 flex items-center">
              <Progress value={feedback.score} className="h-4 w-full" />
              <span className="ml-2 text-sm">Score: {feedback.score}%</span>
            </div>
            <p className="mt-4 text-sm">{feedback.comments}</p>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Question</TableHead>
                <TableHead>Your Answer</TableHead>
                <TableHead>Score</TableHead>
                <TableHead>Feedback</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {feedback.questionFeedback.map((item, index) => (
                <TableRow key={index}>
                  <TableCell>{item.question}</TableCell>
                  <TableCell>{item.yourAnswer}</TableCell>
                  <TableCell>{item.score}%</TableCell>
                  <TableCell>{item.feedback}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
