import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { DashboardHeader } from '@/components/dashboard-header';
import { Calendar, DollarSign, MapPin, Tractor } from 'lucide-react';

const jobPosts = [
  {
    title: 'Strawberry Harvesting',
    farmer: 'Pachai Pallathakku Pannai',
    location: 'Watsonville, CA',
    salary: 180,
    date: '2024-08-15',
  },
  {
    title: 'Grape Pruning',
    farmer: 'Sooriya Muththam Thottangal',
    location: 'Napa, CA',
    salary: 200,
    date: '2024-08-20',
  },
  {
    title: 'Almond Shaking Operator',
    farmer: 'Maiya Pallathakku Vivasayigal',
    location: 'Modesto, CA',
    salary: 220,
    date: '2024-09-01',
  },
  {
    title: 'General Farm Hand',
    farmer: 'Pazhaya MacDonald Pannai',
    location: 'Dixon, CA',
    salary: 160,
    date: '2024-08-12',
  },
];

export default function WorkerDashboard() {
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
                  <span>${post.salary} / day</span>
                </div>
              </CardContent>
              <CardFooter className="flex items-center justify-center p-4 sm:p-6 sm:border-l">
                <Button className="w-full sm:w-auto">Apply Now</Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}
