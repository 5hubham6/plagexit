"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BookOpen, FileCheck, FileText, Home, LayoutDashboard, Shield, Users, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';

export function StudentSidebar({ 
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
      href: '/student/dashboard',
      active: pathname === '/student/dashboard',
    },
    {
      label: 'Assignments',
      icon: FileText,
      href: '/student/assignments',
      active: pathname === '/student/assignments',
    },
    {
      label: 'Submissions',
      icon: FileCheck,
      href: '/student/submissions',
      active: pathname === '/student/submissions',
    },
    {
      label: 'Feedback',
      icon: BookOpen,
      href: '/student/feedback',
      active: pathname === '/student/feedback',
    },
  ];
  
  return (
    <>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="left" className="p-0">
          <div className="flex flex-col h-full">
            <div className="p-4 border-b">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">Student Portal</h2>
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
            <h2 className="text-lg font-semibold">Student Portal</h2>
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