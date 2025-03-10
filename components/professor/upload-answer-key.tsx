// components/professor/upload-answer-key.tsx
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { FileUp, Upload } from "lucide-react";
import axios from "axios";

interface FormValues {
  assignmentName: string;
  course: string;
  description: string;
  similarityThreshold: number;
  plagiarismThreshold: number;
  file: File | null;
}

export function UploadAnswerKey() {
  const { toast } = useToast();
  const [formValues, setFormValues] = useState<FormValues>({
    assignmentName: "",
    course: "",
    description: "",
    similarityThreshold: 70,
    plagiarismThreshold: 80,
    file: null,
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormValues((prev) => ({
        ...prev,
        file: e.target.files[0],
      }));
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSelectChange = (
    name: keyof FormValues,
    value: string | number
  ) => {
    setFormValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formValues.file) {
      toast({
        title: "Error",
        description: "Please select a file to upload",
        variant: "destructive",
      });
      return;
    }

    const formData = new FormData();
    formData.append("file", formValues.file);
    formData.append("assignmentName", formValues.assignmentName);
    formData.append("course", formValues.course);
    formData.append("description", formValues.description);
    formData.append(
      "similarityThreshold",
      formValues.similarityThreshold.toString()
    );
    formData.append(
      "plagiarismThreshold",
      formValues.plagiarismThreshold.toString()
    );

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/professor-answer`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      toast({
        title: "Success",
        description: "Answer key uploaded successfully",
      });

      setFormValues({
        assignmentName: "",
        course: "",
        description: "",
        similarityThreshold: 70,
        plagiarismThreshold: 80,
        file: null,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to upload answer key",
        variant: "destructive",
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Upload Answer Key</CardTitle>
        <CardDescription>
          Upload the answer key PDF for automatic grading of student submissions
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="assignment-name">Assignment Name</Label>
            <Input
              id="assignment-name"
              name="assignmentName"
              placeholder="Midterm Exam"
              value={formValues.assignmentName}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="course">Course</Label>
            <Select
              required
              value={formValues.course}
              onValueChange={(value) => handleSelectChange("course", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a course" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="cs101">
                  CS101: Introduction to Computer Science
                </SelectItem>
                <SelectItem value="cs201">CS201: Data Structures</SelectItem>
                <SelectItem value="cs301">CS301: Algorithms</SelectItem>
                <SelectItem value="cs401">
                  CS401: Artificial Intelligence
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              placeholder="Enter assignment description"
              value={formValues.description}
              onChange={handleInputChange}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="similarity-threshold">
              Similarity Threshold (%)
            </Label>
            <Input
              id="similarity-threshold"
              type="number"
              min="0"
              max="100"
              name="similarityThreshold"
              value={formValues.similarityThreshold}
              onChange={handleInputChange}
              required
            />
            <p className="text-sm text-muted-foreground">
              Minimum similarity score required for an answer to be considered
              correct
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="plagiarism-threshold">
              Plagiarism Threshold (%)
            </Label>
            <Input
              id="plagiarism-threshold"
              type="number"
              min="0"
              max="100"
              name="plagiarismThreshold"
              value={formValues.plagiarismThreshold}
              onChange={handleInputChange}
              required
            />
            <p className="text-sm text-muted-foreground">
              Similarity threshold between student submissions to flag for
              potential plagiarism
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="file-upload">Upload Answer Key (PDF)</Label>
            <div className="border-2 border-dashed rounded-md p-6 flex flex-col items-center justify-center">
              <FileUp className="h-10 w-10 text-muted-foreground mb-2" />
              <p className="text-sm text-muted-foreground mb-2">
                {formValues.file?.name ||
                  "Drag and drop your file here or click to browse"}
              </p>
              <Input
                id="file-upload"
                type="file"
                accept=".pdf"
                className="hidden"
                onChange={handleFileChange}
              />
              <Button
                type="button"
                variant="outline"
                onClick={() => document.getElementById("file-upload")?.click()}
              >
                Select File
              </Button>
            </div>
          </div>

          <Button type="submit" className="w-full">
            <Upload className="mr-2 h-4 w-4" />
            Upload Answer Key
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
