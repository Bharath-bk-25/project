'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { DashboardHeader } from '@/components/dashboard-header';
import { Calendar, DollarSign, MapPin, Tractor, Phone, Mail, Star } from 'lucide-react';
import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';

type JobPost = {
  title: string;
  farmer: string;
  location: string;
  salary: number;
  date: string;
  farmerEmail: string;
  farmerPhone: string;
  farmerRating: number;
  farmerImage: string;
  farmerImageHint: string;
};

const jobPosts: JobPost[] = [
  {
    title: 'Strawberry Harvesting',
    farmer: 'Pachai Pallathakku Pannai',
    location: 'Watsonville, CA',
    salary: 500,
    date: '2024-08-15',
    farmerEmail: 'p.pannai@example.com',
    farmerPhone: '9876543210',
    farmerRating: 4.7,
    farmerImage: 'https://placehold.co/100x100.png?text=PP',
    farmerImageHint: 'farmer portrait',
  },
  {
    title: 'Grape Pruning',
    farmer: 'Sooriya Muththam Thottangal',
    location: 'Napa, CA',
    salary: 600,
    date: '2024-08-20',
    farmerEmail: 's.thottangal@example.com',
    farmerPhone: '9876543211',
    farmerRating: 4.9,
    farmerImage: 'https://placehold.co/100x100.png?text=SM',
    farmerImageHint: 'smiling farmer',
  },
  {
    title: 'Almond Shaking Operator',
    farmer: 'Maiya Pallathakku Vivasayigal',
    location: 'Modesto, CA',
    salary: 750,
    date: '2024-09-01',
    farmerEmail: 'm.vivasayigal@example.com',
    farmerPhone: '9876543212',
    farmerRating: 4.5,
    farmerImage: 'https://placehold.co/100x100.png?text=MV',
    farmerImageHint: 'man on tractor',
  },
  {
    title: 'General Farm Hand',
    farmer: 'Pazhaya MacDonald Pannai',
    location: 'Dixon, CA',
    salary: 450,
    date: '2024-08-12',
    farmerEmail: 'p.macdonald@example.com',
    farmerPhone: '9876543213',
    farmerRating: 4.8,
    farmerImage: 'https://placehold.co/100x100.png?text=PM',
    farmerImageHint: 'woman in field',
  },
];

export default function WorkerDashboard() {
  const [isApplyDialogOpen, setApplyDialogOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState<JobPost | null>(null);

  const handleApplyClick = (job: JobPost) => {
    setSelectedJob(job);
    setApplyDialogOpen(true);
  };
  
  return (
    <div className="min-h-screen w-full bg-secondary/50">
      <DashboardHeader title="Worker Dashboard" userType="worker" />
      
      <main className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-6 font-headline">Available Job Postings</h1>
        <div className="flex flex-col gap-4">
          {jobPosts.map((post, index) => (
            <Card key={index} className="flex flex-col sm:flex-row">
              <CardHeader className="flex-1">
                <CardTitle className="text-xl">{post.title}</CardTitle>
                <CardDescription className="flex items-center pt-1">
                  <Tractor className="mr-2 h-4 w-4" />
                  {post.farmer}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-1 flex-col justify-center gap-2 border-t p-4 sm:border-l sm:border-t-0 sm:p-6">
                <div className="flex items-center text-sm">
                  <MapPin className="mr-2 h-4 w-4 text-muted-foreground" />
                  <span>{post.location}</span>
                </div>
                 <div className="flex items-center text-sm">
                  <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                  <span>{new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                </div>
                <div className="flex items-center text-sm font-semibold text-primary">
                  <DollarSign className="mr-2 h-4 w-4" />
                  <span>{post.salary} / day</span>
                </div>
              </CardContent>
              <CardFooter className="flex items-center justify-center p-4 sm:p-6 sm:border-l">
                <Button className="w-full sm:w-auto" onClick={() => handleApplyClick(post)}>Apply Now</Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </main>

       {/* Apply for Job Dialog */}
      {selectedJob && (
         <Dialog open={isApplyDialogOpen} onOpenChange={setApplyDialogOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <div className="flex items-center gap-4">
                 <Avatar className="h-24 w-24">
                    <AvatarImage src={selectedJob.farmerImage} alt={selectedJob.farmer} data-ai-hint={selectedJob.farmerImageHint} />
                    <AvatarFallback>{selectedJob.farmer.charAt(0)}</AvatarFallback>
                  </Avatar>
                <div>
                  <DialogTitle className="text-2xl">{selectedJob.farmer}</DialogTitle>
                   <DialogDescription>
                     Contact details for this job posting.
                   </DialogDescription>
                </div>
              </div>
            </DialogHeader>
            <div className="py-4 space-y-4">
               <div className="flex items-center">
                  <DollarSign className="mr-3 h-5 w-5 text-muted-foreground" />
                  <span>Salary: ₹{selectedJob.salary} / day for {selectedJob.title}</span>
                </div>
                <div className="flex items-center">
                    <Star className="mr-3 h-5 w-5 text-amber-400 fill-amber-400" />
                    <span>Farmer Rating: {selectedJob.farmerRating}/5.0</span>
                </div>
               <div className="flex items-center">
                  <Phone className="mr-3 h-5 w-5 text-muted-foreground" />
                  <a href={`tel:${selectedJob.farmerPhone}`} className="text-primary hover:underline">{selectedJob.farmerPhone}</a>
                </div>
                <div className="flex items-center">
                    <Mail className="mr-3 h-5 w-5 text-muted-foreground" />
                    <a href={`mailto:${selectedJob.farmerEmail}`} className="text-primary hover:underline">{selectedJob.farmerEmail}</a>
                </div>
            </div>
            <DialogFooter>
               <Button variant="outline" onClick={() => setApplyDialogOpen(false)}>Close</Button>
               <Button asChild>
                <a href={`tel:${selectedJob.farmerPhone}`}>
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
