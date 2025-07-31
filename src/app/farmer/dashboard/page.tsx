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
  { name: 'Suresh Raman', age: 34, skills: ['Urban Farming', 'Rooftop Gardening'], location: 'Mylapore, Chennai', image: 'https://placehold.co/300x300.png?text=SR', hint: 'man portrait', phone: '9123456780' },
  { name: 'Priya Krishnan', age: 29, skills: ['Hydroponics', 'Organic Inputs'], location: 'Adyar, Chennai', image: 'https://placehold.co/300x300.png?text=PK', hint: 'woman portrait', phone: '9123456781' },
  { name: 'Karthik Raja', age: 40, skills: ['Tractor Operation', 'Coconut Plucking'], location: 'Pollachi, Coimbatore', image: 'https://placehold.co/300x300.png?text=KR', hint: 'man portrait', phone: '9234567890' },
  { name: 'Deepa Selvi', age: 32, skills: ['Vegetable Farming', 'Poultry Care'], location: 'Mettupalayam, Coimbatore', image: 'https://placehold.co/300x300.png?text=DS', hint: 'woman portrait', phone: '9234567891' },
  { name: 'Muthu Pandi', age: 45, skills: ['Paddy Cultivation', 'Jasmine Harvesting'], location: 'Thirumangalam, Madurai', image: 'https://placehold.co/300x300.png?text=MP', hint: 'farmer portrait', phone: '9345678901' },
  { name: 'Meenakshi Sundaram', age: 38, skills: ['Banana Cultivation', 'Sugarcane Cutting'], location: 'Usilampatti, Madurai', image: 'https://placehold.co/300x300.png?text=MS', hint: 'woman in a field', phone: '9345678902' },
  { name: 'Ravi Chandran', age: 37, skills: ['Irrigation Management', 'Farm Machinery'], location: 'Lalgudi, Tiruchirappalli', image: 'https://placehold.co/300x300.png?text=RC', hint: 'man smiling', phone: '9456789012' },
  { name: 'Sangeetha Bala', age: 30, skills: ['Flower Cultivation', 'Nursery Management'], location: 'Srirangam, Tiruchirappalli', image: 'https://placehold.co/300x300.png?text=SB', hint: 'young woman', phone: '9456789013' },
  { name: 'Vignesh Kumar', age: 28, skills: ['Mango Farming', 'Grafting'], location: 'Attur, Salem', image: 'https://placehold.co/300x300.png?text=VK', hint: 'young man', phone: '9567890123' },
  { name: 'Anitha Murugan', age: 33, skills: ['Tapioca Cultivation', 'Sago Production'], location: 'Mettur, Salem', image: 'https://placehold.co/300x300.png?text=AM', hint: 'indian woman', phone: '9567890124' },
  { name: 'Arumugam Pillai', age: 52, skills: ['Palm Tree Climbing', 'Paddy Harvesting'], location: 'Palayamkottai, Tirunelveli', image: 'https://placehold.co/300x300.png?text=AP', hint: 'older man', phone: '9678901234' },
  { name: 'Esakki Ammal', age: 46, skills: ['Chilli Farming', 'Cotton Picking'], location: 'Ambasamudram, Tirunelveli', image: 'https://placehold.co/300x300.png?text=EA', hint: 'older indian woman', phone: '9678901235' },
  { name: 'Senthil Nathan', age: 39, skills: ['Turmeric Cultivation', 'Textile Crop Mgmt.'], location: 'Bhavani, Erode', image: 'https://placehold.co/300x300.png?text=SN', hint: 'man portrait', phone: '9789012345' },
  { name: 'Kavitha Loganathan', age: 31, skills: ['Sugarcane Harvesting', 'Poultry Farming'], location: 'Gobichettipalayam, Erode', image: 'https://placehold.co/300x300.png?text=KL', hint: 'woman smiling', phone: '9789012346' },
  { name: 'Gopalakrishnan V', age: 41, skills: ['Leather Tanning (Agri-use)', 'Paddy Cultivation'], location: 'Ambur, Vellore', image: 'https://placehold.co/300x300.png?text=GV', hint: 'man with a beard', phone: '9890123456' },
  { name: 'Brindha Sarathy', age: 27, skills: ['Jasmine Plucking', 'Brinjal Farming'], location: 'Vaniyambadi, Vellore', image: 'https://placehold.co/300x300.png?text=BS', hint: 'young indian woman', phone: '9890123457' },
  { name: 'Antony Raja', age: 36, skills: ['Salt Pan Work', 'Fishing (Coastal Agri)'], location: 'Tiruchendur, Thoothukudi', image: 'https://placehold.co/300x300.png?text=AR', hint: 'man on a boat', phone: '9901234567' },
  { name: 'Maria Selvam', age: 34, skills: ['Moringa Cultivation', 'Banana Farming'], location: 'Srivaikuntam, Thoothukudi', image: 'https://placehold.co/300x300.png?text=MS', hint: 'woman portrait', phone: '9901234568' },
  { name: 'Cholan Murthy', age: 48, skills: ['Paddy Cultivation (Delta)', 'Coconut Farming'], location: 'Kumbakonam, Thanjavur', image: 'https://placehold.co/300x300.png?text=CM', hint: 'farmer portrait', phone: '9012345678' },
  { name: 'Kamala Devi', age: 40, skills: ['Traditional Rice Varieties', 'Seed Saving'], location: 'Pattukkottai, Thanjavur', image: 'https://placehold.co/300x300.png?text=KH', hint: 'woman in a field', phone: '9012345679' },
  { name: 'Velu Kumar', age: 35, skills: ['Floriculture', 'Grape Pruning'], location: 'Kodaikanal, Dindigul', image: 'https://placehold.co/300x300.png?text=VK', hint: 'man smiling', phone: '9123456789' },
  { name: 'Fathima Beevi', age: 29, skills: ['Guava Picking', 'Onion Farming'], location: 'Palani, Dindigul', image: 'https://placehold.co/300x300.png?text=FB', hint: 'woman portrait', phone: '9123456790' },
  { name: 'Kandasamy Gounder', age: 55, skills: ['Cotton Farming', 'Ginning'], location: 'Avinashi, Tiruppur', image: 'https://placehold.co/300x300.png?text=KG', hint: 'older man', phone: '9234567891' },
  { name: 'Prema Sundar', age: 42, skills: ['Maize Cultivation', 'Cattle Rearing'], location: 'Dharapuram, Tiruppur', image: 'https://placehold.co/300x300.png?text=PS', hint: 'indian woman', phone: '9234567892' },
  { name: 'David Nadar', age: 43, skills: ['Rubber Tapping', 'Spice Cultivation'], location: 'Nagercoil, Kanyakumari', image: 'https://placehold.co/300x300.png?text=DN', hint: 'man with a beard', phone: '9345678903' },
  { name: 'Stella Mary', age: 37, skills: ['Clove Harvesting', 'Fisheries'], location: 'Colachel, Kanyakumari', image: 'https://placehold.co/300x300.png?text=SM', hint: 'woman smiling', phone: '9345678904' },
  { name: 'Ramesh Pandian', age: 33, skills: ['Drumstick Farming', 'Textile Crop Handling'], location: 'Kulithalai, Karur', image: 'https://placehold.co/300x300.png?text=RP', hint: 'young man', phone: '9456789014' },
  { name: 'Saranya Devi', age: 28, skills: ['Betel Vine Cultivation', 'Coir Making'], location: 'Aravakurichi, Karur', image: 'https://placehold.co/300x300.png?text=SD', hint: 'young woman', phone: '9456789015' },
  { name: 'Jayaraman M', age: 47, skills: ['Cashew Nut Processing', 'Groundnut Cultivation'], location: 'Panruti, Cuddalore', image: 'https://placehold.co/300x300.png?text=JM', hint: 'man portrait', phone: '9567890125' },
  { name: 'Vanitha Rani', age: 39, skills: ['Jackfruit Harvesting', 'Sugarcane Work'], location: 'Chidambaram, Cuddalore', image: 'https://placehold.co/300x300.png?text=VR', hint: 'woman portrait', phone: '9567890126' },
  { name: 'Mani Sekar', age: 44, skills: ['Paddy Cultivation', 'Silk Cocoon Rearing'], location: 'Cheyyar, Kanchipuram', image: 'https://placehold.co/300x300.png?text=MS', hint: 'farmer portrait', phone: '9678901236' },
  { name: 'Geetha Govindan', age: 36, skills: ['Vegetable Vending', 'Nursery Management'], location: 'Sriperumbudur, Kanchipuram', image: 'https://placehold.co/300x300.png?text=GG', hint: 'woman with vegetables', phone: '9678901237' },
  { name: 'Ayyanar V', age: 38, skills: ['Groundnut Harvesting', 'Millet Farming'], location: 'Tindivanam, Villupuram', image: 'https://placehold.co/300x300.png?text=AV', hint: 'man in a field', phone: '9789012347' },
  { name: 'Mallika Selvaraj', age: 31, skills: ['Cashew Processing', 'Black Gram Cultivation'], location: 'Kallakurichi, Villupuram', image: 'https://placehold.co/300x300.png?text=MS', hint: 'woman working', phone: '9789012348' },
  { name: 'Muthusamy G', age: 50, skills: ['Poultry Farm Management', 'Egg Collection'], location: 'Rasipuram, Namakkal', image: 'https://placehold.co/300x300.png?text=MG', hint: 'older man', phone: '9890123458' },
  { name: 'Parvathi Senthil', age: 41, skills: ['Tapioca Processing', 'Cattle Feed Preparation'], location: 'Tiruchengode, Namakkal', image: 'https://placehold.co/300x300.png?text=PS', hint: 'older indian woman', phone: '9890123459' },
  { name: 'Karuppasamy Thevar', age: 49, skills: ['Cardamom Curing', 'Coffee Plantation Work'], location: 'Bodinayakanur, Theni', image: 'https://placehold.co/300x300.png?text=KT', hint: 'man with a beard', phone: '9901234569' },
  { name: 'Lakshmi Priya', age: 26, skills: ['Grape Harvesting', 'Cotton Picking'], location: 'Uthamapalayam, Theni', image: 'https://placehold.co/300x300.png?text=LP', hint: 'young woman in vineyard', phone: '9901234570' },
  { name: 'Veerappan Raja', age: 42, skills: ['Groundnut Cultivation', 'Cashew Farming'], location: 'Aranthangi, Pudukkottai', image: 'https://placehold.co/300x300.png?text=VR', hint: 'man portrait', phone: '9012345680' },
  { name: 'Chellamma P', age: 39, skills: ['Millet Farming', 'Livestock Rearing'], location: 'Alangudi, Pudukkottai', image: 'https://placehold.co/300x300.png?text=CP', hint: 'woman with goats', phone: '9012345681' },
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
              <Label htmlFor="salary" className="text-right">Salary/Day (₹)</Label>
              <Input id="salary" type="number" placeholder="500" className="col-span-3" />
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
