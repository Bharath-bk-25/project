'use client';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { DashboardHeader } from '@/components/dashboard-header';
import Image from 'next/image';
import { Contact, MapPin, Briefcase } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar as CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

const workers = [
  { name: 'Anjali Devi', age: 28, skills: ['Harvesting', 'Pruning', 'Packing'], location: 'Salinas, CA', image: 'https://placehold.co/300x300.png?text=AD', hint: 'woman portrait' },
  { name: 'Rajesh Kumar', age: 35, skills: ['Tractor Operation', 'Irrigation', 'Planting'], location: 'Fresno, CA', image: 'https://placehold.co/300x300.png?text=RK', hint: 'man portrait' },
  { name: 'Suresh Gupta', age: 42, skills: ['Pest Control', 'Greenhouse Mgmt.'], location: 'Watsonville, CA', image: 'https://placehold.co/300x300.png?text=SG', hint: 'asian man' },
  { name: 'Priya Sharma', age: 24, skills: ['Fruit Picking', 'Sorting'], location: 'Bakersfield, CA', image: 'https://placehold.co/300x300.png?text=PS', hint: 'young woman' },
  { name: 'Muthu Krishnan', age: 45, skills: ['Livestock care', 'Fencing'], location: 'Chennai, TN', image: 'https://placehold.co/300x300.png?text=MK', hint: 'indian man' },
  { name: 'Lakshmi Patel', age: 31, skills: ['Weeding', 'Sowing', 'Organic Farming'], location: 'Coimbatore, TN', image: 'https://placehold.co/300x300.png?text=LP', hint: 'indian woman' },
  { name: 'Arun Selvam', age: 29, skills: ['Driving', 'Mechanical Repair'], location: 'Madurai, TN', image: 'https://placehold.co/300x300.png?text=AS', hint: 'man smiling' },
  { name: 'Kavitha Ramasamy', age: 38, skills: ['Crop Dusting', 'Seed selection'], location: 'Trichy, TN', image: 'https://placehold.co/300x300.png?text=KR', hint: 'woman in a field' },
  { name: 'Ganesh Pillai', age: 50, skills: ['Supervising', 'Warehouse Management'], location: 'Salem, TN', image: 'https://placehold.co/300x300.png?text=GP', hint: 'older man' },
  { name: 'Meena Kumari', age: 22, skills: ['Flower Cutting', 'Landscaping'], location: 'Erode, TN', image: 'https://placehold.co/300x300.png?text=MK', hint: 'young indian woman' },
  { name: 'Velu Murugan', age: 33, skills: ['Ploughing', 'Fertilizing'], location: 'Tirunelveli, TN', image: 'https://placehold.co/300x300.png?text=VM', hint: 'farmer portrait' },
];

export default function FarmerDashboard() {
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [date, setDate] = useState<Date | undefined>(new Date());
  
  return (
    <div className="min-h-screen w-full bg-secondary/50">
      <DashboardHeader title="Farmer Dashboard" userType="farmer" onCreatePost={() => setDialogOpen(true)} />
      
      <main className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-6 font-headline">Available Workers</h1>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {workers.map((worker, index) => (
            <Card key={index} className="overflow-hidden">
              <CardHeader className="p-0">
                <div className="relative h-48 w-full">
                  <Image src={worker.image} alt={worker.name} layout="fill" objectFit="cover" data-ai-hint={worker.hint} />
                </div>
              </CardHeader>
              <CardContent className="p-4">
                <CardTitle className="text-xl">{worker.name}</CardTitle>
                <CardDescription>{worker.age} years old</CardDescription>
                <div className="mt-4 space-y-2 text-sm">
                  <div className="flex items-center">
                    <MapPin className="mr-2 h-4 w-4 text-muted-foreground" />
                    <span>{worker.location}</span>
                  </div>
                  <div className="flex items-start">
                    <Briefcase className="mr-2 mt-1 h-4 w-4 text-muted-foreground" />
                    <div className="flex flex-wrap gap-1">
                      {worker.skills.map((skill) => (
                        <Badge key={skill} variant="secondary">{skill}</Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full">
                  <Contact className="mr-2 h-4 w-4" />
                  Contact Worker
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </main>

      <Dialog open={isDialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Create Job Post</DialogTitle>
            <DialogDescription>
              Specify the details of the work you need done. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="work-type" className="text-right">Type of Work</Label>
              <Input id="work-type" placeholder="e.g., Strawberry Harvesting" className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="salary" className="text-right">Salary/Day ($)</Label>
              <Input id="salary" type="number" placeholder="150" className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="date" className="text-right">Date</Label>
               <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-[240px] justify-start text-left font-normal col-span-3",
                      !date && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" onClick={() => setDialogOpen(false)}>Save Post</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
