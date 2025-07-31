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
    // Coimbatore
    { name: 'Karthik Raja', age: 40, skills: ['Tractor Operation', 'Coconut Plucking'], location: 'Pollachi, Coimbatore', image: 'https://placehold.co/300x300.png?text=KR', hint: 'man portrait', phone: '9234567890' },
    { name: 'Deepa Selvi', age: 32, skills: ['Vegetable Farming', 'Poultry Care'], location: 'Mettupalayam, Coimbatore', image: 'https://placehold.co/300x300.png?text=DS', hint: 'woman portrait', phone: '9234567891' },
    { name: 'Arun Kumar', age: 28, skills: ['Irrigation Setup', 'Pest Control'], location: 'Annur, Coimbatore', image: 'https://placehold.co/300x300.png?text=AK', hint: 'young man', phone: '9234567892' },
    { name: 'Saravanan M', age: 42, skills: ['Maize Cultivation', 'Harvesting'], location: 'Sulur, Coimbatore', image: 'https://placehold.co/300x300.png?text=SM', hint: 'farmer portrait', phone: '9234567893' },
    { name: 'Priya Mohan', age: 35, skills: ['Organic Farming', 'Grafting'], location: 'Kinathukadavu, Coimbatore', image: 'https://placehold.co/300x300.png?text=PM', hint: 'woman smiling', phone: '9234567894' },

    // Madurai
    { name: 'Muthu Pandi', age: 45, skills: ['Paddy Cultivation', 'Jasmine Harvesting'], location: 'Thirumangalam, Madurai', image: 'https://placehold.co/300x300.png?text=MP', hint: 'farmer portrait', phone: '9345678901' },
    { name: 'Meenakshi Sundaram', age: 38, skills: ['Banana Cultivation', 'Sugarcane Cutting'], location: 'Usilampatti, Madurai', image: 'https://placehold.co/300x300.png?text=MS', hint: 'woman in a field', phone: '9345678902' },
    { name: 'David Nadar', age: 43, skills: ['Rubber Tapping', 'Spice Cultivation'], location: 'Melur, Madurai', image: 'https://placehold.co/300x300.png?text=DN', hint: 'man with a beard', phone: '9345678903' },
    { name: 'Stella Mary', age: 37, skills: ['Clove Harvesting', 'Fisheries'], location: 'Peraiyur, Madurai', image: 'https://placehold.co/300x300.png?text=SM', hint: 'woman smiling', phone: '9345678904' },
    { name: 'Ganesan P', age: 50, skills: ['Cotton Farming', 'Millet Cultivation'], location: 'Vadipatti, Madurai', image: 'https://placehold.co/300x300.png?text=GP', hint: 'older man', phone: '9345678905' },

    // Tiruchirappalli
    { name: 'Ravi Chandran', age: 37, skills: ['Irrigation Management', 'Farm Machinery'], location: 'Lalgudi, Tiruchirappalli', image: 'https://placehold.co/300x300.png?text=RC', hint: 'man smiling', phone: '9456789012' },
    { name: 'Sangeetha Bala', age: 30, skills: ['Flower Cultivation', 'Nursery Management'], location: 'Srirangam, Tiruchirappalli', image: 'https://placehold.co/300x300.png?text=SB', hint: 'young woman', phone: '9456789013' },
    { name: 'Ramesh Pandian', age: 33, skills: ['Drumstick Farming', 'Textile Crop Handling'], location: 'Manapparai, Tiruchirappalli', image: 'https://placehold.co/300x300.png?text=RP', hint: 'young man', phone: '9456789014' },
    { name: 'Saranya Devi', age: 28, skills: ['Betel Vine Cultivation', 'Coir Making'], location: 'Thuraiyur, Tiruchirappalli', image: 'https://placehold.co/300x300.png?text=SD', hint: 'young woman', phone: '9456789015' },
    { name: 'Balamurugan K', age: 41, skills: ['Paddy Harvesting', 'Seed Treatment'], location: 'Musiri, Tiruchirappalli', image: 'https://placehold.co/300x300.png?text=BK', hint: 'man portrait', phone: '9456789016' },
    
    // Salem
    { name: 'Vignesh Kumar', age: 28, skills: ['Mango Farming', 'Grafting'], location: 'Attur, Salem', image: 'https://placehold.co/300x300.png?text=VK', hint: 'young man', phone: '9567890123' },
    { name: 'Anitha Murugan', age: 33, skills: ['Tapioca Cultivation', 'Sago Production'], location: 'Mettur, Salem', image: 'https://placehold.co/300x300.png?text=AM', hint: 'indian woman', phone: '9567890124' },
    { name: 'Selvaraj S', age: 45, skills: ['Coffee Plantation', 'Pepper Cultivation'], location: 'Yercaud, Salem', image: 'https://placehold.co/300x300.png?text=SS', hint: 'farmer portrait', phone: '9567890125' },
    { name: 'Lakshmi Priya', age: 31, skills: ['Turmeric Farming', 'Spice Processing'], location: 'Gangavalli, Salem', image: 'https://placehold.co/300x300.png?text=LP', hint: 'woman smiling', phone: '9567890126' },
    { name: 'Rajesh Kannan', age: 38, skills: ['Silver Oak Farming', 'Wood Cutting'], location: 'Vazhapadi, Salem', image: 'https://placehold.co/300x300.png?text=RK', hint: 'man portrait', phone: '9567890127' },

    // Tirunelveli
    { name: 'Arumugam Pillai', age: 52, skills: ['Palm Tree Climbing', 'Paddy Harvesting'], location: 'Palayamkottai, Tirunelveli', image: 'https://placehold.co/300x300.png?text=AP', hint: 'older man', phone: '9678901234' },
    { name: 'Esakki Ammal', age: 46, skills: ['Chilli Farming', 'Cotton Picking'], location: 'Ambasamudram, Tirunelveli', image: 'https://placehold.co/300x300.png?text=EA', hint: 'older indian woman', phone: '9678901235' },
    { name: 'Subramanian V', age: 49, skills: ['Banana Cultivation', 'Cashew Farming'], location: 'Nanguneri, Tirunelveli', image: 'https://placehold.co/300x300.png?text=SV', hint: 'man portrait', phone: '9678901236' },
    { name: 'Mariyamma P', age: 39, skills: ['Livestock Management', 'Fodder Cultivation'], location: 'Tenkasi, Tirunelveli', image: 'https://placehold.co/300x300.png?text=MP', hint: 'woman in field', phone: '9678901237' },
    { name: 'Velmurugan R', age: 34, skills: ['Vegetable Farming', 'Organic Pesticides'], location: 'Sankarankovil, Tirunelveli', image: 'https://placehold.co/300x300.png?text=VR', hint: 'young man', phone: '9678901238' },
    
    // Erode
    { name: 'Senthil Nathan', age: 39, skills: ['Turmeric Cultivation', 'Textile Crop Mgmt.'], location: 'Bhavani, Erode', image: 'https://placehold.co/300x300.png?text=SN', hint: 'man portrait', phone: '9789012345' },
    { name: 'Kavitha Loganathan', age: 31, skills: ['Sugarcane Harvesting', 'Poultry Farming'], location: 'Gobichettipalayam, Erode', image: 'https://placehold.co/300x300.png?text=KL', hint: 'woman smiling', phone: '9789012346' },
    { name: 'Nallasivam T', age: 51, skills: ['Cattle Rearing', 'Dairy Farming'], location: 'Perundurai, Erode', image: 'https://placehold.co/300x300.png?text=NT', hint: 'older farmer', phone: '9789012347' },
    { name: 'Poongodi S', age: 29, skills: ['Mushroom Cultivation', 'Vermicomposting'], location: 'Sathyamangalam, Erode', image: 'https://placehold.co/300x300.png?text=PS', hint: 'young woman', phone: '9789012348' },
    { name: 'Dhamodaran P', age: 44, skills: ['Tapioca Farming', 'Groundnut Cultivation'], location: 'Anthiyur, Erode', image: 'https://placehold.co/300x300.png?text=DP', hint: 'man in field', phone: '9789012349' },

    // Vellore
    { name: 'Gopalakrishnan V', age: 41, skills: ['Leather Tanning (Agri-use)', 'Paddy Cultivation'], location: 'Ambur, Vellore', image: 'https://placehold.co/300x300.png?text=GV', hint: 'man with a beard', phone: '9890123456' },
    { name: 'Brindha Sarathy', age: 27, skills: ['Jasmine Plucking', 'Brinjal Farming'], location: 'Vaniyambadi, Vellore', image: 'https://placehold.co/300x300.png?text=BS', hint: 'young indian woman', phone: '9890123457' },
    { name: 'Vasu Devan', age: 47, skills: ['Mango Orchard Management', 'Fruit Packing'], location: 'Gudiyatham, Vellore', image: 'https://placehold.co/300x300.png?text=VD', hint: 'man portrait', phone: '9890123458' },
    { name: 'Chitra K', age: 36, skills: ['Groundnut Harvesting', 'Sugarcane Farming'], location: 'Tirupattur, Vellore', image: 'https://placehold.co/300x300.png?text=CK', hint: 'woman in saree', phone: '9890123459' },
    { name: 'Elango R', age: 30, skills: ['Farm Maintenance', 'Driving'], location: 'Arakkonam, Vellore', image: 'https://placehold.co/300x300.png?text=ER', hint: 'young man', phone: '9890123460' },

    // Thanjavur
    { name: 'Cholan Murthy', age: 48, skills: ['Paddy Cultivation (Delta)', 'Coconut Farming'], location: 'Kumbakonam, Thanjavur', image: 'https://placehold.co/300x300.png?text=CM', hint: 'farmer portrait', phone: '9012345678' },
    { name: 'Kamala Devi', age: 40, skills: ['Traditional Rice Varieties', 'Seed Saving'], location: 'Pattukkottai, Thanjavur', image: 'https://placehold.co/300x300.png?text=KH', hint: 'woman in a field', phone: '9012345679' },
    { name: 'Sivakumar M', age: 42, skills: ['Sugarcane Plantation', 'Jaggery Making'], location: 'Thiruvaiyaru, Thanjavur', image: 'https://placehold.co/300x300.png?text=SM', hint: 'man portrait', phone: '9012345680' },
    { name: 'Revathi S', age: 34, skills: ['Black Gram Cultivation', 'Gingelly Farming'], location: 'Orathanadu, Thanjavur', image: 'https://placehold.co/300x300.png?text=RS', hint: 'woman smiling', phone: '9012345681' },
    { name: 'Boominathan A', age: 53, skills: ['Ploughing', 'Fisheries (Pond)'], location: 'Peravurani, Thanjavur', image: 'https://placehold.co/300x300.png?text=BA', hint: 'older farmer', phone: '9012345682' },

    // Dindigul
    { name: 'Velu Kumar', age: 35, skills: ['Floriculture', 'Grape Pruning'], location: 'Kodaikanal, Dindigul', image: 'https://placehold.co/300x300.png?text=VK', hint: 'man smiling', phone: '9123456789' },
    { name: 'Fathima Beevi', age: 29, skills: ['Guava Picking', 'Onion Farming'], location: 'Palani, Dindigul', image: 'https://placehold.co/300x300.png?text=FB', hint: 'woman portrait', phone: '9123456790' },
    { name: 'Karuppasamy P', age: 46, skills: ['Moringa Cultivation', 'Vegetable Sorting'], location: 'Oddanchatram, Dindigul', image: 'https://placehold.co/300x300.png?text=KP', hint: 'farmer portrait', phone: '9123456791' },
    { name: 'Anjali Devi', age: 33, skills: ['Coffee Bean Picking', 'Cardamom Curing'], location: 'Sirumalai, Dindigul', image: 'https://placehold.co/300x300.png?text=AD', hint: 'woman in plantation', phone: '9123456792' },
    { name: 'Murugesan V', age: 50, skills: ['Lock Making (Agri-tools)', 'General Farmhand'], location: 'Natham, Dindigul', image: 'https://placehold.co/300x300.png?text=MV', hint: 'older man', phone: '9123456793' },
    
    // Tiruppur
    { name: 'Kandasamy Gounder', age: 55, skills: ['Cotton Farming', 'Ginning'], location: 'Avinashi, Tiruppur', image: 'https://placehold.co/300x300.png?text=KG', hint: 'older man', phone: '9234567891' },
    { name: 'Prema Sundar', age: 42, skills: ['Maize Cultivation', 'Cattle Rearing'], location: 'Dharapuram, Tiruppur', image: 'https://placehold.co/300x300.png?text=PS', hint: 'indian woman', phone: '9234567892' },
    { name: 'Thirumoorthy S', age: 38, skills: ['Coconut De-husking', 'Copra Drying'], location: 'Udumalpet, Tiruppur', image: 'https://placehold.co/300x300.png?text=TS', hint: 'man with coconuts', phone: '9234567893' },
    { name: 'Malarkodi R', age: 30, skills: ['Knitting (Agri-textiles)', 'Tomato Farming'], location: 'Palladam, Tiruppur', image: 'https://placehold.co/300x300.png?text=MR', hint: 'young woman', phone: '9234567894' },
    { name: 'Palanisamy K', age: 47, skills: ['Windmill Maintenance', 'Solar Pump Operation'], location: 'Kangeyam, Tiruppur', image: 'https://placehold.co/300x300.png?text=PK', hint: 'man near windmill', phone: '9234567895' },

    // Kanyakumari
    { name: 'David Nadar', age: 43, skills: ['Rubber Tapping', 'Spice Cultivation'], location: 'Nagercoil, Kanyakumari', image: 'https://placehold.co/300x300.png?text=DN', hint: 'man with a beard', phone: '9345678903' },
    { name: 'Stella Mary', age: 37, skills: ['Clove Harvesting', 'Fisheries'], location: 'Colachel, Kanyakumari', image: 'https://placehold.co/300x300.png?text=SM', hint: 'woman smiling', phone: '9345678904' },
    { name: 'Justin Raj', age: 40, skills: ['Coconut Plucking', 'Palm Jaggery Making'], location: 'Thuckalay, Kanyakumari', image: 'https://placehold.co/300x300.png?text=JR', hint: 'man portrait', phone: '9345678905' },
    { name: 'Gracy Bai', age: 45, skills: ['Tapioca Cultivation', 'Banana Chips Making'], location: 'Vilavancode, Kanyakumari', image: 'https://placehold.co/300x300.png?text=GB', hint: 'woman in kitchen', phone: '9345678906' },
    { name: 'Yacob D', age: 35, skills: ['Nutmeg Processing', 'Bee Keeping'], location: 'Kalkulam, Kanyakumari', image: 'https://placehold.co/300x300.png?text=YD', hint: 'man with beehive', phone: '9345678907' },

    // Karur
    { name: 'Ramesh Pandian', age: 33, skills: ['Drumstick Farming', 'Textile Crop Handling'], location: 'Kulithalai, Karur', image: 'https://placehold.co/300x300.png?text=RP', hint: 'young man', phone: '9456789014' },
    { name: 'Saranya Devi', age: 28, skills: ['Betel Vine Cultivation', 'Coir Making'], location: 'Aravakurichi, Karur', image: 'https://placehold.co/300x300.png?text=SD', hint: 'young woman', phone: '9456789015' },
    { name: 'Pasupathy M', age: 49, skills: ['Mosquito Net Weaving (Agri)', 'Paddy Sowing'], location: 'Kadavur, Karur', image: 'https://placehold.co/300x300.png?text=PM', hint: 'man weaving', phone: '9456789016' },
    { name: 'Manimekalai C', age: 39, skills: ['Paper Mill Agri-Inputs', 'Sugarcane Farming'], location: 'Krishnarayapuram, Karur', image: 'https://placehold.co/300x300.png?text=MC', hint: 'woman in field', phone: '9456789017' },
    { name: 'Thangavelu G', age: 54, skills: ['Bus Body Building (Agri-trailers)', 'General Maintenance'], location: 'Manmangalam, Karur', image: 'https://placehold.co/300x300.png?text=TG', hint: 'older man working', phone: '9456789018' },
    
    // Chennai
    { name: 'Suresh Raman', age: 34, skills: ['Urban Farming', 'Rooftop Gardening'], location: 'Mylapore, Chennai', image: 'https://placehold.co/300x300.png?text=SR', hint: 'man portrait', phone: '9123456780' },
    { name: 'Priya Krishnan', age: 29, skills: ['Hydroponics', 'Organic Inputs'], location: 'Adyar, Chennai', image: 'https://placehold.co/300x300.png?text=PK', hint: 'woman portrait', phone: '9123456781' },
    { name: 'Ashok Mehta', age: 42, skills: ['Nursery Management', 'Landscaping'], location: 'T. Nagar, Chennai', image: 'https://placehold.co/300x300.png?text=AM', hint: 'man smiling', phone: '9123456782' },
    { name: 'Lalitha Shankar', age: 38, skills: ['Kitchen Gardening', 'Composting'], location: 'Velachery, Chennai', image: 'https://placehold.co/300x300.png?text=LS', hint: 'woman with plants', phone: '9123456783' },
    { name: 'Rajan Iyengar', age: 50, skills: ['Bonsai', 'Terrace Garden Setup'], location: 'Anna Nagar, Chennai', image: 'https://placehold.co/300x300.png?text=RI', hint: 'older man with plant', phone: '9123456784' }
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

  const workersByDistrict = workers.reduce((acc, worker) => {
    const district = worker.location.split(', ')[1];
    if (!acc[district]) {
      acc[district] = [];
    }
    acc[district].push(worker);
    return acc;
  }, {} as Record<string, Worker[]>);

  const renderWorkerCard = (worker: Worker, index: number) => (
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
  );

  return (
    <div className="min-h-screen w-full bg-secondary/50">
      <DashboardHeader title="Farmer Dashboard" userType="farmer" onCreatePost={() => setCreatePostOpen(true)} />
      
      <main className="container mx-auto py-8">
        {Object.entries(workersByDistrict).map(([district, districtWorkers]) => (
          <section key={district} className="mb-12">
            <h1 className="text-3xl font-bold mb-6 font-headline">{district}</h1>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {districtWorkers.map(renderWorkerCard)}
            </div>
          </section>
        ))}
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
