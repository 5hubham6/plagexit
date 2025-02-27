import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, FileCheck, Shield, Users } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-20 px-4 md:px-6 bg-gradient-to-b from-background to-muted">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center space-y-4">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight">Academic Integrity System</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Automated grading and plagiarism detection for academic assignments
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
              <Link href="/login?role=professor">
                <Button size="lg" className="w-full sm:w-auto">Professor Login</Button>
              </Link>
              <Link href="/login?role=student">
                <Button size="lg" variant="outline" className="w-full sm:w-auto">Student Login</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 md:px-6">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-3xl font-bold text-center mb-12">Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<FileCheck className="h-10 w-10 text-primary" />}
              title="Automated Grading"
              description="Automatically grade student submissions by comparing them with professor's answer keys using advanced NLP techniques."
            />
            <FeatureCard 
              icon={<Shield className="h-10 w-10 text-primary" />}
              title="Plagiarism Detection"
              description="Detect copied content between student submissions using MinHash and LSH algorithms for exact and paraphrased matches."
            />
            <FeatureCard 
              icon={<BookOpen className="h-10 w-10 text-primary" />}
              title="OCR Technology"
              description="Extract text from PDF submissions regardless of format, font, or layout using advanced OCR technology."
            />
            <FeatureCard 
              icon={<Users className="h-10 w-10 text-primary" />}
              title="User-Friendly Dashboard"
              description="Intuitive dashboards for both professors and students to manage assignments and view results."
            />
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 px-4 md:px-6 bg-muted">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="space-y-6">
              <h3 className="text-2xl font-semibold">For Professors</h3>
              <ol className="space-y-4 list-decimal list-inside">
                <li className="text-lg">Upload answer keys and assignment details</li>
                <li className="text-lg">Set grading parameters and similarity thresholds</li>
                <li className="text-lg">Review automated grading results</li>
                <li className="text-lg">Analyze plagiarism detection reports</li>
                <li className="text-lg">Provide feedback to students</li>
              </ol>
            </div>
            <div className="space-y-6">
              <h3 className="text-2xl font-semibold">For Students</h3>
              <ol className="space-y-4 list-decimal list-inside">
                <li className="text-lg">View assigned tasks and deadlines</li>
                <li className="text-lg">Upload assignment submissions</li>
                <li className="text-lg">Receive automated grading feedback</li>
                <li className="text-lg">View detailed assessment reports</li>
                <li className="text-lg">Track academic progress over time</li>
              </ol>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <Card className="h-full">
      <CardHeader>
        <div className="mb-4">{icon}</div>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-base">{description}</CardDescription>
      </CardContent>
    </Card>
  );
}