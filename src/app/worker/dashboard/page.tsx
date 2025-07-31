
'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { DashboardHeader } from '@/components/dashboard-header';
import { Calendar, DollarSign, MapPin, Tractor, Phone, Mail, Star, Clock, Mountain } from 'lucide-react';
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
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

type JobPost = {
  farmerName: string;
  location: string; // "Taluk, District"
  acres: number;
  landDetails: string;
  workerExpectations: string;
  workHours: string;
  salary: number;
  farmerEmail: string;
  farmerPhone: string;
  farmerRating: number;
  farmerImage: string;
  farmerImageHint: string;
};

const jobPosts: JobPost[] = [
  // Coimbatore
  { farmerName: 'குமார்', location: 'பொள்ளாச்சி, கோயம்புத்தூர்', acres: 10, landDetails: 'தென்னை சாகுபடி', workerExpectations: 'தென்னை மரம் ஏறி தேங்காய் பறிக்க வேண்டும்', workHours: '8 மணி நேரம்', salary: 800, farmerEmail: 'kumar.pollachi@example.com', farmerPhone: '9876543210', farmerRating: 4.7, farmerImage: 'https://placehold.co/100x100.png?text=கு', farmerImageHint: 'farmer portrait' },
  { farmerName: 'ராஜா', location: 'பொள்ளாச்சி, கோயம்புத்தூர்', acres: 5, landDetails: 'காய்கறி தோட்டம்', workerExpectations: 'களை எடுக்க ও காய்கறி பறிக்க வேண்டும்', workHours: '7 மணி நேரம்', salary: 600, farmerEmail: 'raja.pollachi@example.com', farmerPhone: '9876543211', farmerRating: 4.5, farmerImage: 'https://placehold.co/100x100.png?text=ரா', farmerImageHint: 'smiling farmer' },
  { farmerName: 'அன்பு', location: 'பொள்ளாச்சி, கோயம்புத்தூர்', acres: 15, landDetails: 'வாழைத் தோட்டம்', workerExpectations: 'வாழைத்தார்களை வெட்டி, பராமரிக்க வேண்டும்', workHours: '8 மணி நேரம்', salary: 750, farmerEmail: 'anbu.pollachi@example.com', farmerPhone: '9876543212', farmerRating: 4.8, farmerImage: 'https://placehold.co/100x100.png?text=அ', farmerImageHint: 'man in farm' },
  { farmerName: 'சங்கர்', location: 'பொள்ளாச்சி, கோயம்புத்தூர்', acres: 8, landDetails: 'தென்னை மற்றும் வாழை', workerExpectations: 'பாசன மேலாண்மை மற்றும் உரம் வைத்தல்', workHours: '9 மணி நேரம்', salary: 850, farmerEmail: 'sankar.pollachi@example.com', farmerPhone: '9876543213', farmerRating: 4.6, farmerImage: 'https://placehold.co/100x100.png?text=ச', farmerImageHint: 'farmer working' },
  { farmerName: 'வேலு', location: 'பொள்ளாச்சி, கோயம்புத்தூர்', acres: 12, landDetails: 'கரும்பு சாகுபடி', workerExpectations: 'கரும்பு வெட்டி, டிராக்டரில் ஏற்ற வேண்டும்', workHours: '8 மணி நேரம்', salary: 900, farmerEmail: 'velu.pollachi@example.com', farmerPhone: '9876543214', farmerRating: 4.9, farmerImage: 'https://placehold.co/100x100.png?text=வே', farmerImageHint: 'farmer with sugarcane' },
  { farmerName: 'மணி', location: 'பொள்ளாச்சி, கோயம்புத்தூர்', acres: 7, landDetails: 'காய்கறி மற்றும் பூக்கள்', workerExpectations: 'பூ பறித்தல் மற்றும் சந்தைக்கு கொண்டு செல்லுதல்', workHours: '7 மணி நேரம்', salary: 650, farmerEmail: 'mani.pollachi@example.com', farmerPhone: '9876543215', farmerRating: 4.7, farmerImage: 'https://placehold.co/100x100.png?text=ம', farmerImageHint: 'man with flowers' },
  { farmerName: 'ரவி', location: 'பொள்ளாச்சி, கோயம்புத்தூர்', acres: 20, landDetails: 'ஒருங்கிணைந்த பண்ணை', workerExpectations: 'கால்நடை பராமரிப்பு மற்றும் பண்ணை வேலைகள்', workHours: '9 மணி நேரம்', salary: 950, farmerEmail: 'ravi.pollachi@example.com', farmerPhone: '9876543216', farmerRating: 4.8, farmerImage: 'https://placehold.co/100x100.png?text=ர', farmerImageHint: 'farmer with cattle' },

  { farmerName: 'செல்வம்', location: 'மேட்டுப்பாளையம், கோயம்புத்தூர்', acres: 8, landDetails: 'பாக்கு தோப்பு', workerExpectations: 'பாக்கு மரம் ஏறி, பாக்கு பறிக்க வேண்டும்', workHours: '8 மணி நேரம்', salary: 850, farmerEmail: 'selvam.m@example.com', farmerPhone: '9876543217', farmerRating: 4.6, farmerImage: 'https://placehold.co/100x100.png?text=செ', farmerImageHint: 'man climbing tree' },
  { farmerName: 'முருகன்', location: 'மேட்டுப்பாளையம், கோயம்புத்தூர்', acres: 10, landDetails: 'வாழை சாகுபடி', workerExpectations: 'வாழை நடவு மற்றும் பராமரிப்பு', workHours: '7 மணி நேரம்', salary: 700, farmerEmail: 'murugan.m@example.com', farmerPhone: '9876543218', farmerRating: 4.8, farmerImage: 'https://placehold.co/100x100.png?text=மு', farmerImageHint: 'man in banana farm' },
  { farmerName: 'கார்த்தி', location: 'மேட்டுப்பாளையம், கோயம்புத்தூர்', acres: 6, landDetails: 'மஞ்சள் சாகுபடி', workerExpectations: 'மஞ்சள் அறுவடை மற்றும் பதப்படுத்துதல்', workHours: '8 மணி நேரம்', salary: 750, farmerEmail: 'karthi.m@example.com', farmerPhone: '9876543219', farmerRating: 4.7, farmerImage: 'https://placehold.co/100x100.png?text=கா', farmerImageHint: 'farmer with turmeric' },
  { farmerName: 'பாண்டி', location: 'மேட்டுப்பாளையம், கோயம்புத்தூர்', acres: 12, landDetails: 'காய்கறி பண்ணை', workerExpectations: 'பூச்சி மருந்து தெளித்தல் மற்றும் பராமரிப்பு', workHours: '7 மணி நேரம்', salary: 680, farmerEmail: 'pandi.m@example.com', farmerPhone: '9876543220', farmerRating: 4.5, farmerImage: 'https://placehold.co/100x100.png?text=பா', farmerImageHint: 'farmer spraying' },
  { farmerName: 'கணேசன்', location: 'மேட்டுப்பாளையம், கோயம்புத்தூர்', acres: 4, landDetails: 'பூக்கள் சாகுபடி', workerExpectations: 'நாற்றங்கால் அமைத்தல், பூ பறித்தல்', workHours: '6 மணி நேரம்', salary: 550, farmerEmail: 'ganesan.m@example.com', farmerPhone: '9876543221', farmerRating: 4.9, farmerImage: 'https://placehold.co/100x100.png?text=க', farmerImageHint: 'man with flowers' },
  { farmerName: 'சிவா', location: 'மேட்டுப்பாளையம், கோயம்புத்தூர்', acres: 9, landDetails: 'தென்னை மற்றும் பாக்கு', workerExpectations: 'மரங்களை பராமரித்தல் மற்றும் உரமிடுதல்', workHours: '8 மணி நேரம்', salary: 820, farmerEmail: 'siva.m@example.com', farmerPhone: '9876543222', farmerRating: 4.7, farmerImage: 'https://placehold.co/100x100.png?text=சி', farmerImageHint: 'farmer in grove' },
  { farmerName: 'சரவணன்', location: 'மேட்டுப்பாளையம், கோயம்புத்தூர்', acres: 15, landDetails: 'கரும்பு தோட்டம்', workerExpectations: 'கரும்பு வெட்டுதல் மற்றும் சோகை உரித்தல்', workHours: '9 மணி நேரம்', salary: 920, farmerEmail: 'saravanan.m@example.com', farmerPhone: '9876543223', farmerRating: 4.6, farmerImage: 'https://placehold.co/100x100.png?text=ச', farmerImageHint: 'farmer cutting sugarcane' },
  
  // Madurai
  { farmerName: 'பாண்டியன்', location: 'திருமங்கலம், மதுரை', acres: 12, landDetails: 'நெல் சாகுபடி', workerExpectations: 'நடவு, களையெடுப்பு மற்றும் அறுவடை', workHours: '8 மணி நேரம்', salary: 700, farmerEmail: 'pandiyan.t@example.com', farmerPhone: '9765432109', farmerRating: 4.8, farmerImage: 'https://placehold.co/100x100.png?text=பா', farmerImageHint: 'farmer in paddy field' },
  { farmerName: 'மீனாட்சி', location: 'திருமங்கலம், மதுரை', acres: 3, landDetails: 'மல்லிகை பூ தோட்டம்', workerExpectations: 'தினமும் பூ பறித்து மாலையாக கட்ட வேண்டும்', workHours: '6 மணி நேரம்', salary: 500, farmerEmail: 'meenatchi.t@example.com', farmerPhone: '9765432110', farmerRating: 4.9, farmerImage: 'https://placehold.co/100x100.png?text=மீ', farmerImageHint: 'woman with jasmine' },
  { farmerName: 'கருப்பசாமி', location: 'திருமங்கலம், மதுரை', acres: 10, landDetails: 'கரும்பு ஆலை', workerExpectations: 'கரும்பு வெட்டி ஆலைக்கு அனுப்ப வேண்டும்', workHours: '9 மணி நேரம்', salary: 850, farmerEmail: 'karuppasamy.t@example.com', farmerPhone: '9765432111', farmerRating: 4.6, farmerImage: 'https://placehold.co/100x100.png?text=க', farmerImageHint: 'man with sugarcane' },
  { farmerName: 'முத்து', location: 'திருமங்கலம், மதுரை', acres: 7, landDetails: 'வாழை மற்றும் காய்கறிகள்', workerExpectations: 'பண்ணையை பராமரித்தல் மற்றும் சந்தைப்படுத்துதல்', workHours: '8 மணி நேரம்', salary: 650, farmerEmail: 'muthu.t@example.com', farmerPhone: '9765432112', farmerRating: 4.7, farmerImage: 'https://placehold.co/100x100.png?text=மு', farmerImageHint: 'farmer with vegetables' },
  { farmerName: 'வீரன்', location: 'திருமங்கலம், மதுரை', acres: 15, landDetails: ' பருத்தி சாகுபடி', workerExpectations: 'பருத்தி எடுத்தல் மற்றும் பஞ்சு பிரித்தல்', workHours: '8 மணி நேரம்', salary: 720, farmerEmail: 'veeran.t@example.com', farmerPhone: '9765432113', farmerRating: 4.5, farmerImage: 'https://placehold.co/100x100.png?text=வீ', farmerImageHint: 'farmer in cotton field' },
  { farmerName: 'அழகர்', location: 'திருமங்கலம், மதுரை', acres: 5, landDetails: 'மாட்டுப் பண்ணை', workerExpectations: 'கால்நடை பராமரிப்பு மற்றும் பால் கறத்தல்', workHours: '7 மணி நேரம்', salary: 680, farmerEmail: 'azhagar.t@example.com', farmerPhone: '9765432114', farmerRating: 4.8, farmerImage: 'https://placehold.co/100x100.png?text=அ', farmerImageHint: 'man with cow' },
  { farmerName: 'முருகன்', location: 'திருமங்கலம், மதுரை', acres: 9, landDetails: 'சிறுதானியங்கள் சாகுபடி', workerExpectations: 'நிலத்தை உழுது, விதைத்து, அறுவடை செய்தல்', workHours: '8 மணி நேரம்', salary: 750, farmerEmail: 'murugan.t@example.com', farmerPhone: '9765432115', farmerRating: 4.7, farmerImage: 'https://placehold.co/100x100.png?text=மு', farmerImageHint: 'farmer with millet' },

  { farmerName: 'ராமு', location: 'உசிலம்பட்டி, மதுரை', acres: 20, landDetails: 'மாந்தோப்பு', workerExpectations: 'மாங்காய் பறித்தல், தரம் பிரித்தல்', workHours: '8 மணி நேரம்', salary: 780, farmerEmail: 'ramu.u@example.com', farmerPhone: '9765432116', farmerRating: 4.6, farmerImage: 'https://placehold.co/100x100.png?text=ரா', farmerImageHint: 'farmer with mangoes' },
  { farmerName: 'சோமு', location: 'உசிலம்பட்டி, மதுரை', acres: 10, landDetails: 'மிளகாய் தோட்டம்', workerExpectations: 'மிளகாய் பறித்து, காய வைத்தல்', workHours: '7 மணி நேரம்', salary: 670, farmerEmail: 'somu.u@example.com', farmerPhone: '9765432117', farmerRating: 4.5, farmerImage: 'https://placehold.co/100x100.png?text=சோ', farmerImageHint: 'farmer with chillies' },
  { farmerName: 'லட்சுமி', location: 'உசிலம்பட்டி, மதுரை', acres: 6, landDetails: 'கீரை வகைகள் பயிரிடுதல்', workerExpectations: 'கீரை அறுவடை மற்றும் கட்டுதல்', workHours: '6 மணி நேரம்', salary: 520, farmerEmail: 'lakshmi.u@example.com', farmerPhone: '9765432118', farmerRating: 4.8, farmerImage: 'https://placehold.co/100x100.png?text=ல', farmerImageHint: 'woman with greens' },
  { farmerName: 'பெருமாள்', location: 'உசிலம்பட்டி, மதுரை', acres: 14, landDetails: 'நிலக்கடலை சாகுபடி', workerExpectations: 'நிலக்கடலை அறுவடை செய்து காய வைத்தல்', workHours: '8 மணி நேரம்', salary: 730, farmerEmail: 'perumal.u@example.com', farmerPhone: '9765432119', farmerRating: 4.7, farmerImage: 'https://placehold.co/100x100.png?text=பெ', farmerImageHint: 'farmer with groundnuts' },
  { farmerName: 'தேவன்', location: 'உசிலம்பட்டி, மதுரை', acres: 11, landDetails: 'ஆட்டுப் பண்ணை', workerExpectations: 'ஆடுகளை மேய்த்தல் மற்றும் பராமரித்தல்', workHours: '9 மணி நேரம்', salary: 700, farmerEmail: 'devan.u@example.com', farmerPhone: '9765432120', farmerRating: 4.6, farmerImage: 'https://placehold.co/100x100.png?text=தே', farmerImageHint: 'man with goats' },
  { farmerName: 'கண்ணன்', location: 'உசிலம்பட்டி, மதுரை', acres: 8, landDetails: 'மரவள்ளி கிழங்கு சாகுபடி', workerExpectations: 'கிழங்கு அறுவடை மற்றும் சுத்தம் செய்தல்', workHours: '8 மணி நேரம்', salary: 690, farmerEmail: 'kannan.u@example.com', farmerPhone: '9765432121', farmerRating: 4.5, farmerImage: 'https://placehold.co/100x100.png?text=க', farmerImageHint: 'farmer with tapioca' },
  { farmerName: 'மாரி', location: 'உசிலம்பட்டி, மதுரை', acres: 18, landDetails: 'சோளம் மற்றும் கம்பு', workerExpectations: 'அறுவடை இயந்திரம் இயக்குதல்', workHours: '9 மணி நேரம்', salary: 900, farmerEmail: 'mari.u@example.com', farmerPhone: '9765432122', farmerRating: 4.8, farmerImage: 'https://placehold.co/100x100.png?text=மா', farmerImageHint: 'man on harvester' },
  
];

export default function WorkerDashboard() {
  const [isApplyDialogOpen, setApplyDialogOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState<JobPost | null>(null);

  const handleApplyClick = (job: JobPost) => {
    setSelectedJob(job);
    setApplyDialogOpen(true);
  };
  
  const jobsByDistrict = jobPosts.reduce((acc, job) => {
    const district = job.location.split(', ')[1];
    if (!acc[district]) {
      acc[district] = [];
    }
    acc[district].push(job);
    return acc;
  }, {} as Record<string, JobPost[]>);


  return (
    <div className="min-h-screen w-full bg-secondary/50">
      <DashboardHeader title="பணியாளர் முகப்பு" userType="worker" />
      
      <main className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-6 font-headline">கிடைக்கும் வேலைகள்</h1>
         {Object.entries(jobsByDistrict).map(([district, districtJobs]) => {
            const jobsByTaluk = districtJobs.reduce((acc, job) => {
                const taluk = job.location.split(', ')[0];
                if (!acc[taluk]) {
                    acc[taluk] = [];
                }
                acc[taluk].push(job);
                return acc;
            }, {} as Record<string, JobPost[]>);

            return (
                 <section key={district} className="mb-12">
                  <h2 className="text-2xl font-bold mb-4 font-headline border-b pb-2">{district}</h2>
                    <Accordion type="multiple" className="w-full space-y-4">
                        {Object.entries(jobsByTaluk).map(([taluk, talukJobs]) => (
                             <AccordionItem value={taluk} key={taluk} className="border bg-card rounded-lg">
                                <AccordionTrigger className="p-6 text-lg font-semibold hover:no-underline">
                                    <div className="flex items-center gap-3">
                                        <MapPin className="h-6 w-6 text-primary" />
                                        {taluk}
                                    </div>
                                </AccordionTrigger>
                                <AccordionContent className="p-6 pt-0">
                                    <div className="flex flex-col gap-4">
                                      {talukJobs.map((post, index) => (
                                        <Card key={index} className="flex flex-col sm:flex-row transition-all hover:shadow-md">
                                          <CardHeader className="flex-1 p-4">
                                            <CardTitle className="text-lg">{post.workerExpectations}</CardTitle>
                                            <CardDescription className="flex items-center pt-1 text-sm">
                                              <Tractor className="mr-2 h-4 w-4" />
                                              {post.farmerName}
                                            </CardDescription>
                                             <div className="flex items-center text-xs text-muted-foreground pt-2">
                                              <Mountain className="mr-2 h-4 w-4" />
                                              <span>{post.acres} ஏக்கர் - {post.landDetails}</span>
                                            </div>
                                          </CardHeader>
                                          <CardContent className="flex flex-1 flex-col justify-center gap-2 border-t p-4 sm:border-l sm:border-t-0">
                                            <div className="flex items-center text-sm">
                                              <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                                              <span>வேலை நேரம்: {post.workHours}</span>
                                            </div>
                                            <div className="flex items-center text-sm font-semibold text-primary">
                                              <DollarSign className="mr-2 h-4 w-4" />
                                              <span>சம்பளம்: ₹{post.salary} / நாள்</span>
                                            </div>
                                          </CardContent>
                                          <CardFooter className="flex items-center justify-center p-4 sm:border-l">
                                            <Button className="w-full sm:w-auto" onClick={() => handleApplyClick(post)}>விண்ணப்பிக்க</Button>
                                          </CardFooter>
                                        </Card>
                                      ))}
                                    </div>
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </section>
            );
        })}
      </main>

       {/* Apply for Job Dialog */}
      {selectedJob && (
         <Dialog open={isApplyDialogOpen} onOpenChange={setApplyDialogOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <div className="flex items-center gap-4">
                 <Avatar className="h-24 w-24">
                    <AvatarImage src={selectedJob.farmerImage} alt={selectedJob.farmerName} data-ai-hint={selectedJob.farmerImageHint} />
                    <AvatarFallback>{selectedJob.farmerName.charAt(0)}</AvatarFallback>
                  </Avatar>
                <div>
                  <DialogTitle className="text-2xl">{selectedJob.farmerName}</DialogTitle>
                   <DialogDescription>
                     இந்த வேலைக்கான தொடர்பு விவரங்கள்.
                   </DialogDescription>
                </div>
              </div>
            </DialogHeader>
            <div className="py-4 space-y-4">
                <div className="flex items-start">
                  <Tractor className="mr-3 mt-1 h-5 w-5 text-muted-foreground" />
                  <span>விவசாயியின் எதிர்பார்ப்பு: {selectedJob.workerExpectations}</span>
                </div>
               <div className="flex items-center">
                  <DollarSign className="mr-3 h-5 w-5 text-muted-foreground" />
                  <span>சம்பளம்: ₹{selectedJob.salary} / நாள்</span>
                </div>
                <div className="flex items-center">
                    <Star className="mr-3 h-5 w-5 text-amber-400 fill-amber-400" />
                    <span>விவசாயி மதிப்பீடு: {selectedJob.farmerRating}/5.0</span>
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
               <Button variant="outline" onClick={() => setApplyDialogOpen(false)}>மூடு</Button>
               <Button asChild>
                <a href={`tel:${selectedJob.farmerPhone}`}>
                  <Phone className="mr-2 h-4 w-4" />
                  அழைக்க
                </a>
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
