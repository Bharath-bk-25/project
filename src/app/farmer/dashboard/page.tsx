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
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { DashboardHeader } from '@/components/dashboard-header';
import Image from 'next/image';
import { Contact, MapPin, Briefcase, Phone, User as UserIcon, Calendar as CalendarIconLucide } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

type Worker = {
  name: string;
  age: number;
  skills: string[];
  location: string;
  image: string;
  hint: string;
  phone: string;
};

const workers: Worker[] = [
  { name: 'Anjali Devi', age: 28, skills: ['Harvesting', 'Pruning', 'Packing'], location: 'Chennai, TN', image: 'https://placehold.co/300x300.png?text=AD', hint: 'woman portrait', phone: '9876543210' },
  { name: 'Rajesh Kumar', age: 35, skills: ['Tractor Operation', 'Irrigation', 'Planting'], location: 'Coimbatore, TN', image: 'https://placehold.co/300x300.png?text=RK', hint: 'man portrait', phone: '9876543211' },
  { name: 'Suresh Gupta', age: 42, skills: ['Pest Control', 'Greenhouse Mgmt.'], location: 'Madurai, TN', image: 'https://placehold.co/300x300.png?text=SG', hint: 'asian man', phone: '9876543212' },
  { name: 'Priya Sharma', age: 24, skills: ['Fruit Picking', 'Sorting'], location: 'Tiruchirappalli, TN', image: 'https://placehold.co/300x300.png?text=PS', hint: 'young woman', phone: '9876543213' },
  { name: 'Muthu Krishnan', age: 45, skills: ['Livestock care', 'Fencing'], location: 'Salem, TN', image: 'https://placehold.co/300x300.png?text=MK', hint: 'indian man', phone: '9876543214' },
  { name: 'Lakshmi Patel', age: 31, skills: ['Weeding', 'Sowing', 'Organic Farming'], location: 'Tirunelveli, TN', image: 'https://placehold.co/300x300.png?text=LP', hint: 'indian woman', phone: '9876543215' },
  { name: 'Arun Selvam', age: 29, skills: ['Driving', 'Mechanical Repair'], location: 'Erode, TN', image: 'https://placehold.co/300x300.png?text=AS', hint: 'man smiling', phone: '9876543216' },
  { name: 'Kavitha Ramasamy', age: 38, skills: ['Crop Dusting', 'Seed selection'], location: 'Vellore, TN', image: 'https://placehold.co/300x300.png?text=KR', hint: 'woman in a field', phone: '9876543217' },
  { name: 'Ganesh Pillai', age: 50, skills: ['Supervising', 'Warehouse Management'], location: 'Thoothukudi, TN', image: 'https://placehold.co/300x300.png?text=GP', hint: 'older man', phone: '9876543218' },
  { name: 'Meena Kumari', age: 22, skills: ['Flower Cutting', 'Landscaping'], location: 'Thanjavur, TN', image: 'https://placehold.co/300x300.png?text=MK', hint: 'young indian woman', phone: '9876543219' },
  { name: 'Velu Murugan', age: 33, skills: ['Ploughing', 'Fertilizing'], location: 'Dindigul, TN', image: 'https://placehold.co/300x300.png?text=VM', hint: 'farmer portrait', phone: '9876543220' },
  { name: 'Saravanan Suresh', age: 41, skills: ['Irrigation Systems', 'Farm Maintenance'], location: 'Tiruppur, TN', image: 'https://placehold.co/300x300.png?text=SS', hint: 'man with a beard', phone: '9876543221' },
  { name: 'Deepa Venkatesh', age: 27, skills: ['Vegetable Picking', 'Quality Check'], location: 'Nagercoil, TN', image: 'https://placehold.co/300x300.png?text=DV', hint: 'woman smiling', phone: '9876543222' },
  { name: 'Karthik Raja', age: 36, skills: ['Heavy Machinery', 'Welding'], location: 'Pollachi, TN', image: 'https://placehold.co/300x300.png?text=KR', hint: 'welder portrait', phone: '9876543223' },
  { name: 'Sivakami Murthy', age: 48, skills: ['Livestock Breeding', 'Animal Health'], location: 'Karur, TN', image: 'https://placehold.co/300x300.png?text=SM', hint: 'older indian woman', phone: '9876543224' },
  { name: 'Prakash Rajendran', age: 25, skills: ['Drone Operation', 'Data Collection'], location: 'Ooty, TN', image: 'https://placehold.co/300x300.png?text=PR', hint: 'young man with drone', phone: '9876543225' },
];

export default function FarmerDashboard() {
  const [isCreatePostOpen, setCreatePostOpen] = useState(false);
  const [isContactWorkerOpen, setContactWorkerOpen] = useState(false);
  const [selectedWorker, setSelectedWorker] = useState<Worker | null>(null);
  const [date, setDate] = useState<Date | undefined>(new Date());

  const handleContactClick = (worker: Worker) => {
    setSelectedWorker(worker);
    setContactWorkerOpen(true);
  };
  
  return (
    <div className="min-h-screen w-full bg-secondary/50">
      <DashboardHeader title="Farmer Dashboard" userType="farmer" onCreatePost={() => setCreatePostOpen(true)} />
      
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
                <Button className="w-full" onClick={() => handleContactClick(worker)}>
                  <Contact className="mr-2 h-4 w-4" />
                  Contact Worker
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </main>

      {/* Create Job Post Dialog */}
      <Dialog open={isCreatePostOpen} onOpenChange={setCreatePostOpen}>
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
                    <CalendarIconLucide className="mr-2 h-4 w-4" />
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
            <Button type="submit" onClick={() => setCreatePostOpen(false)}>Save Post</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Contact Worker Dialog */}
      {selectedWorker && (
         <Dialog open={isContactWorkerOpen} onOpenChange={setContactWorkerOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <div className="flex items-center gap-4">
                <div className="relative h-24 w-24 rounded-full overflow-hidden">
                  <Image src={selectedWorker.image} alt={selectedWorker.name} layout="fill" objectFit="cover" data-ai-hint={selectedWorker.hint} />
                </div>
                <div>
                  <DialogTitle className="text-2xl">{selectedWorker.name}</DialogTitle>
                   <DialogDescription>
                     Contact details and information
                   </DialogDescription>
                </div>
              </div>
            </DialogHeader>
            <div className="py-4 space-y-4">
               <div className="flex items-center">
                  <Phone className="mr-3 h-5 w-5 text-muted-foreground" />
                  <a href={`tel:${selectedWorker.phone}`} className="text-primary hover:underline">{selectedWorker.phone}</a>
                </div>
              <div className="flex items-center">
                <UserIcon className="mr-3 h-5 w-5 text-muted-foreground" />
                <span>{selectedWorker.age} years old</span>
              </div>
              <div className="flex items-center">
                <MapPin className="mr-3 h-5 w-5 text-muted-foreground" />
                <span>{selectedWorker.location}</span>
              </div>
              <div className="flex items-start">
                 <Briefcase className="mr-3 mt-1 h-5 w-5 text-muted-foreground" />
                 <div className="flex flex-wrap gap-2">
                   {selectedWorker.skills.map((skill) => (
                     <Badge key={skill} variant="secondary">{skill}</Badge>
                   ))}
                 </div>
              </div>
            </div>
            <DialogFooter>
               <Button onClick={() => setContactWorkerOpen(false)}>Close</Button>
               <Button asChild>
                <a href={`tel:${selectedWorker.phone}`}>
                  <Phone className="mr-2 h-4 w-4" />
                  Call Now
                </a>
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

    </div>
  );
}
