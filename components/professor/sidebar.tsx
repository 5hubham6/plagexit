"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BookOpen, FileCheck, FileText, Home, LayoutDashboard, Shield, Users, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';

export function ProfessorSidebar({ 
  open, 
  setOpen 
}: { 
  open: boolean; 
  setOpen: (open: boolean) => void 
}) {
  const pathname = usePathname();
  
  const routes = [
    {
      label: 'Dashboard',
      icon: LayoutDashboard,
      href: '/professor/dashboard',
      active: pathname === '/professor/dashboard',
    },
    {
      label: 'Assignments',
      icon: FileText,
      href: '/professor/assignments',
      active: pathname === '/professor/assignments',
    },
    {
      label: 'Grading',
      icon: FileCheck,
      href: '/professor/grading',
      active: pathname === '/professor/grading',
    },
    {
      label: 'Plagiarism Reports',
      icon: Shield,
      href: '/professor/plagiarism',
      active: pathname === '/professor/plagiarism',
    },
    {
      label: 'Students',
      icon: Users,
      href: '/professor/students',
      active: pathname === '/professor/students',
    },
  ];
  
  return (
    <>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="left" className="p-0">
          <div className="flex flex-col h-full">
            <div className="p-4 border-b">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">Professor Portal</h2>
                <Button variant="ghost" size="icon" onClick={() => setOpen(false)}>
                  <X className="h-5 w-5" />
                </Button>
              </div>
            </div>
            <ScrollArea className="flex-1">
              <div className="p-4 space-y-1">
                {routes.map((route) => (
                  <Button
                    key={route.href}
                    variant={route.active ? "secondary" : "ghost"}
                    className="w-full justify-start"
                    asChild
                  >
                    <Link href={route.href}>
                      <route.icon className="mr-2 h-5 w-5" />
                      {route.label}
                    </Link>
                  </Button>
                ))}
              </div>
            </ScrollArea>
          </div>
        </SheetContent>
      </Sheet>
      
      <div className="hidden border-r bg-background md:block w-64">
        <div className="flex flex-col h-full">
          <div className="p-4 border-b">
            <h2 className="text-lg font-semibold">Professor Portal</h2>
          </div>
          <ScrollArea className="flex-1">
            <div className="p-4 space-y-1">
              {routes.map((route) => (
                <Button
                  key={route.href}
                  variant={route.active ? "secondary" : "ghost"}
                  className="w-full justify-start"
                  asChild
                >
                  <Link href={route.href}>
                    <route.icon className="mr-2 h-5 w-5" />
                    {route.label}
                  </Link>
                </Button>
              ))}
            </div>
          </ScrollArea>
        </div>
      </div>
    </>
  );
}