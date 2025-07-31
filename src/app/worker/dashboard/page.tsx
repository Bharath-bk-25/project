
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
  farmerEmail:string;
  farmerPhone: string;
  farmerRating: number;
  farmerImage: string;
  farmerImageHint: string;
};

const jobPosts: JobPost[] = [
  // Coimbatore
  { farmerName: 'Kumar (குமார்)', location: 'Pollachi, Coimbatore (பொள்ளாச்சி, கோயம்புத்தூர்)', acres: 10, landDetails: 'Coconut Cultivation (தென்னை சாகுபடி)', workerExpectations: 'Climb coconut trees and pluck coconuts (தென்னை மரம் ஏறி தேங்காய் பறிக்க வேண்டும்)', workHours: '8 Hours (8 மணி நேரம்)', salary: 800, farmerEmail: 'kumar.pollachi@example.com', farmerPhone: '9876543210', farmerRating: 4.7, farmerImage: 'https://placehold.co/100x100.png?text=கு', farmerImageHint: 'farmer portrait' },
  { farmerName: 'Raja (ராஜா)', location: 'Pollachi, Coimbatore (பொள்ளாச்சி, கோயம்புத்தூர்)', acres: 5, landDetails: 'Vegetable Garden (காய்கறி தோட்டம்)', workerExpectations: 'Weeding and vegetable picking (களை எடுக்க ও காய்கறி பறிக்க வேண்டும்)', workHours: '7 Hours (7 மணி நேரம்)', salary: 600, farmerEmail: 'raja.pollachi@example.com', farmerPhone: '9876543211', farmerRating: 4.5, farmerImage: 'https://placehold.co/100x100.png?text=ரா', farmerImageHint: 'smiling farmer' },
  { farmerName: 'Anbu (அன்பு)', location: 'Pollachi, Coimbatore (பொள்ளாச்சி, கோயம்புத்தூர்)', acres: 15, landDetails: 'Banana Plantation (வாழைத் தோட்டம்)', workerExpectations: 'Cut and maintain banana bunches (வாழைத்தார்களை வெட்டி, பராமரிக்க வேண்டும்)', workHours: '8 Hours (8 மணி நேரம்)', salary: 750, farmerEmail: 'anbu.pollachi@example.com', farmerPhone: '9876543212', farmerRating: 4.8, farmerImage: 'https://placehold.co/100x100.png?text=அ', farmerImageHint: 'man in farm' },
  { farmerName: 'Sankar (சங்கர்)', location: 'Pollachi, Coimbatore (பொள்ளாச்சி, கோயம்புத்தூர்)', acres: 8, landDetails: 'Coconut and Banana (தென்னை மற்றும் வாழை)', workerExpectations: 'Irrigation management and fertilization (பாசன மேலாண்மை மற்றும் உரம் வைத்தல்)', workHours: '9 Hours (9 மணி நேரம்)', salary: 850, farmerEmail: 'sankar.pollachi@example.com', farmerPhone: '9876543213', farmerRating: 4.6, farmerImage: 'https://placehold.co/100x100.png?text=ச', farmerImageHint: 'farmer working' },
  { farmerName: 'Velu (வேலு)', location: 'Pollachi, Coimbatore (பொள்ளாச்சி, கோயம்புத்தூர்)', acres: 12, landDetails: 'Sugarcane Cultivation (கரும்பு சாகுபடி)', workerExpectations: 'Cut sugarcane and load it onto the tractor (கரும்பு வெட்டி, டிராக்டரில் ஏற்ற வேண்டும்)', workHours: '8 Hours (8 மணி நேரம்)', salary: 900, farmerEmail: 'velu.pollachi@example.com', farmerPhone: '9876543214', farmerRating: 4.9, farmerImage: 'https://placehold.co/100x100.png?text=வே', farmerImageHint: 'farmer with sugarcane' },
  { farmerName: 'Mani (மணி)', location: 'Pollachi, Coimbatore (பொள்ளாச்சி, கோயம்புத்தூர்)', acres: 7, landDetails: 'Vegetables and Flowers (காய்கறி மற்றும் பூக்கள்)', workerExpectations: 'Flower picking and transportation to market (பூ பறித்தல் மற்றும் சந்தைக்கு கொண்டு செல்லுதல்)', workHours: '7 Hours (7 மணி நேரம்)', salary: 650, farmerEmail: 'mani.pollachi@example.com', farmerPhone: '9876543215', farmerRating: 4.7, farmerImage: 'https://placehold.co/100x100.png?text=ம', farmerImageHint: 'man with flowers' },
  { farmerName: 'Ravi (ரவி)', location: 'Pollachi, Coimbatore (பொள்ளாச்சி, கோயம்புத்தூர்)', acres: 20, landDetails: 'Integrated Farm (ஒருங்கிணைந்த பண்ணை)', workerExpectations: 'Livestock care and farm work (கால்நடை பராமரிப்பு மற்றும் பண்ணை வேலைகள்)', workHours: '9 Hours (9 மணி நேரம்)', salary: 950, farmerEmail: 'ravi.pollachi@example.com', farmerPhone: '9876543216', farmerRating: 4.8, farmerImage: 'https://placehold.co/100x100.png?text=ர', farmerImageHint: 'farmer with cattle' },

  { farmerName: 'Selvam (செல்வம்)', location: 'Mettupalayam, Coimbatore (மேட்டுப்பாளையம், கோயம்புத்தூர்)', acres: 8, landDetails: 'Areca Nut Grove (பாக்கு தோப்பு)', workerExpectations: 'Climb areca nut trees and pluck nuts (பாக்கு மரம் ஏறி, பாக்கு பறிக்க வேண்டும்)', workHours: '8 Hours (8 மணி நேரம்)', salary: 850, farmerEmail: 'selvam.m@example.com', farmerPhone: '9876543217', farmerRating: 4.6, farmerImage: 'https://placehold.co/100x100.png?text=செ', farmerImageHint: 'man climbing tree' },
  { farmerName: 'Murugan (முருகன்)', location: 'Mettupalayam, Coimbatore (மேட்டுப்பாளையம், கோயம்புத்தூர்)', acres: 10, landDetails: 'Banana Cultivation (வாழை சாகுபடி)', workerExpectations: 'Banana planting and maintenance (வாழை நடவு மற்றும் பராமரிப்பு)', workHours: '7 Hours (7 மணி நேரம்)', salary: 700, farmerEmail: 'murugan.m@example.com', farmerPhone: '9876543218', farmerRating: 4.8, farmerImage: 'https://placehold.co/100x100.png?text=மு', farmerImageHint: 'man in banana farm' },
  { farmerName: 'Karthi (கார்த்தி)', location: 'Mettupalayam, Coimbatore (மேட்டுப்பாளையம், கோயம்புத்தூர்)', acres: 6, landDetails: 'Turmeric Cultivation (மஞ்சள் சாகுபடி)', workerExpectations: 'Turmeric harvesting and processing (மஞ்சள் அறுவடை மற்றும் பதப்படுத்துதல்)', workHours: '8 Hours (8 மணி நேரம்)', salary: 750, farmerEmail: 'karthi.m@example.com', farmerPhone: '9876543219', farmerRating: 4.7, farmerImage: 'https://placehold.co/100x100.png?text=கா', farmerImageHint: 'farmer with turmeric' },
  { farmerName: 'Pandi (பாண்டி)', location: 'Mettupalayam, Coimbatore (மேட்டுப்பாளையம், கோயம்புத்தூர்)', acres: 12, landDetails: 'Vegetable Farm (காய்கறி பண்ணை)', workerExpectations: 'Pesticide spraying and maintenance (பூச்சி மருந்து தெளித்தல் மற்றும் பராமரிப்பு)', workHours: '7 Hours (7 மணி நேரம்)', salary: 680, farmerEmail: 'pandi.m@example.com', farmerPhone: '9876543220', farmerRating: 4.5, farmerImage: 'https://placehold.co/100x100.png?text=பா', farmerImageHint: 'farmer spraying' },
  { farmerName: 'Ganesan (கணேசன்)', location: 'Mettupalayam, Coimbatore (மேட்டுப்பாளையம், கோயம்புத்தூர்)', acres: 4, landDetails: 'Flower Cultivation (பூக்கள் சாகுபடி)', workerExpectations: 'Nursery setup, flower picking (நாற்றங்கால் அமைத்தல், பூ பறித்தல்)', workHours: '6 Hours (6 மணி நேரம்)', salary: 550, farmerEmail: 'ganesan.m@example.com', farmerPhone: '9876543221', farmerRating: 4.9, farmerImage: 'https://placehold.co/100x100.png?text=க', farmerImageHint: 'man with flowers' },
  { farmerName: 'Siva (சிவா)', location: 'Mettupalayam, Coimbatore (மேட்டுப்பாளையம், கோயம்புத்தூர்)', acres: 9, landDetails: 'Coconut and Areca Nut (தென்னை மற்றும் பாக்கு)', workerExpectations: 'Tree maintenance and fertilization (மரங்களை பராமரித்தல் மற்றும் உரமிடுதல்)', workHours: '8 Hours (8 மணி நேரம்)', salary: 820, farmerEmail: 'siva.m@example.com', farmerPhone: '9876543222', farmerRating: 4.7, farmerImage: 'https://placehold.co/100x100.png?text=சி', farmerImageHint: 'farmer in grove' },
  { farmerName: 'Saravanan (சரவணன்)', location: 'Mettupalayam, Coimbatore (மேட்டுப்பாளையம், கோயம்புத்தூர்)', acres: 15, landDetails: 'Sugarcane Plantation (கரும்பு தோட்டம்)', workerExpectations: 'Sugarcane cutting and de-trashing (கரும்பு வெட்டுதல் மற்றும் சோகை உரித்தல்)', workHours: '9 Hours (9 மணி நேரம்)', salary: 920, farmerEmail: 'saravanan.m@example.com', farmerPhone: '9876543223', farmerRating: 4.6, farmerImage: 'https://placehold.co/100x100.png?text=ச', farmerImageHint: 'farmer cutting sugarcane' },

  // Madurai
  { farmerName: 'Pandiyan (பாண்டியன்)', location: 'Thirumangalam, Madurai (திருமங்கலம், மதுரை)', acres: 12, landDetails: 'Paddy Cultivation (நெல் சாகுபடி)', workerExpectations: 'Planting, weeding, and harvesting (நடவு, களையெடுப்பு மற்றும் அறுவடை)', workHours: '8 Hours (8 மணி நேரம்)', salary: 700, farmerEmail: 'pandiyan.t@example.com', farmerPhone: '9765432109', farmerRating: 4.8, farmerImage: 'https://placehold.co/100x100.png?text=பா', farmerImageHint: 'farmer in paddy field' },
  { farmerName: 'Meenatchi (மீனாட்சி)', location: 'Thirumangalam, Madurai (திருமங்கலம், மதுரை)', acres: 3, landDetails: 'Jasmine Flower Garden (மல்லிகை பூ தோட்டம்)', workerExpectations: 'Pick flowers daily and make garlands (தினமும் பூ பறித்து மாலையாக கட்ட வேண்டும்)', workHours: '6 Hours (6 மணி நேரம்)', salary: 500, farmerEmail: 'meenatchi.t@example.com', farmerPhone: '9765432110', farmerRating: 4.9, farmerImage: 'https://placehold.co/100x100.png?text=மீ', farmerImageHint: 'woman with jasmine' },
  { farmerName: 'Karuppasamy (கருப்பசாமி)', location: 'Thirumangalam, Madurai (திருமங்கலம், மதுரை)', acres: 10, landDetails: 'Sugarcane Mill (கரும்பு ஆலை)', workerExpectations: 'Cut sugarcane and send it to the mill (கரும்பு வெட்டி ஆலைக்கு அனுப்ப வேண்டும்)', workHours: '9 Hours (9 மணி நேரம்)', salary: 850, farmerEmail: 'karuppasamy.t@example.com', farmerPhone: '9765432111', farmerRating: 4.6, farmerImage: 'https://placehold.co/100x100.png?text=க', farmerImageHint: 'man with sugarcane' },
  { farmerName: 'Muthu (முத்து)', location: 'Thirumangalam, Madurai (திருமங்கலம், மதுரை)', acres: 7, landDetails: 'Banana and Vegetables (வாழை மற்றும் காய்கறிகள்)', workerExpectations: 'Farm maintenance and marketing (பண்ணையை பராமரித்தல் மற்றும் சந்தைப்படுத்துதல்)', workHours: '8 Hours (8 மணி நேரம்)', salary: 650, farmerEmail: 'muthu.t@example.com', farmerPhone: '9765432112', farmerRating: 4.7, farmerImage: 'https://placehold.co/100x100.png?text=மு', farmerImageHint: 'farmer with vegetables' },
  { farmerName: 'Veeran (வீரன்)', location: 'Thirumangalam, Madurai (திருமங்கலம், மதுரை)', acres: 15, landDetails: 'Cotton Cultivation (பருத்தி சாகுபடி)', workerExpectations: 'Cotton picking and ginning (பருத்தி எடுத்தல் மற்றும் பஞ்சு பிரித்தல்)', workHours: '8 Hours (8 மணி நேரம்)', salary: 720, farmerEmail: 'veeran.t@example.com', farmerPhone: '9765432113', farmerRating: 4.5, farmerImage: 'https://placehold.co/100x100.png?text=வீ', farmerImageHint: 'farmer in cotton field' },
  { farmerName: 'Azhagar (அழகர்)', location: 'Thirumangalam, Madurai (திருமங்கலம், மதுரை)', acres: 5, landDetails: 'Cattle Farm (மாட்டுப் பண்ணை)', workerExpectations: 'Livestock care and milking (கால்நடை பராமரிப்பு மற்றும் பால் கறத்தல்)', workHours: '7 Hours (7 மணி நேரம்)', salary: 680, farmerEmail: 'azhagar.t@example.com', farmerPhone: '9765432114', farmerRating: 4.8, farmerImage: 'https://placehold.co/100x100.png?text=அ', farmerImageHint: 'man with cow' },
  { farmerName: 'Murugan (முருகன்)', location: 'Thirumangalam, Madurai (திருமங்கலம், மதுரை)', acres: 9, landDetails: 'Millet Cultivation (சிறுதானியங்கள் சாகுபடி)', workerExpectations: 'Ploughing, sowing, and harvesting (நிலத்தை உழுது, விதைத்து, அறுவடை செய்தல்)', workHours: '8 Hours (8 மணி நேரம்)', salary: 750, farmerEmail: 'murugan.t@example.com', farmerPhone: '9765432115', farmerRating: 4.7, farmerImage: 'https://placehold.co/100x100.png?text=மு', farmerImageHint: 'farmer with millet' },

  { farmerName: 'Ramu (ராமு)', location: 'Usilampatti, Madurai (உசிலம்பட்டி, மதுரை)', acres: 20, landDetails: 'Mango Grove (மாந்தோப்பு)', workerExpectations: 'Mango picking and sorting (மாங்காய் பறித்தல், தரம் பிரித்தல்)', workHours: '8 Hours (8 மணி நேரம்)', salary: 780, farmerEmail: 'ramu.u@example.com', farmerPhone: '9765432116', farmerRating: 4.6, farmerImage: 'https://placehold.co/100x100.png?text=ரா', farmerImageHint: 'farmer with mangoes' },
  { farmerName: 'Somu (சோமு)', location: 'Usilampatti, Madurai (உசிலம்பட்டி, மதுரை)', acres: 10, landDetails: 'Chilli Garden (மிளகாய் தோட்டம்)', workerExpectations: 'Chilli picking and drying (மிளகாய் பறித்து, காய வைத்தல்)', workHours: '7 Hours (7 மணி நேரம்)', salary: 670, farmerEmail: 'somu.u@example.com', farmerPhone: '9765432117', farmerRating: 4.5, farmerImage: 'https://placehold.co/100x100.png?text=சோ', farmerImageHint: 'farmer with chillies' },
  { farmerName: 'Lakshmi (லட்சுமி)', location: 'Usilampatti, Madurai (உசிலம்பட்டி, மதுரை)', acres: 6, landDetails: 'Growing Greens (கீரை வகைகள் பயிரிடுதல்)', workerExpectations: 'Harvesting and bundling greens (கீரை அறுவடை மற்றும் கட்டுதல்)', workHours: '6 Hours (6 மணி நேரம்)', salary: 520, farmerEmail: 'lakshmi.u@example.com', farmerPhone: '9765432118', farmerRating: 4.8, farmerImage: 'https://placehold.co/100x100.png?text=ல', farmerImageHint: 'woman with greens' },
  { farmerName: 'Perumal (பெருமாள்)', location: 'Usilampatti, Madurai (உசிலம்பட்டி, மதுரை)', acres: 14, landDetails: 'Groundnut Cultivation (நிலக்கடலை சாகுபடி)', workerExpectations: 'Harvest and dry groundnuts (நிலக்கடலை அறுவடை செய்து காய வைத்தல்)', workHours: '8 Hours (8 மணி நேரம்)', salary: 730, farmerEmail: 'perumal.u@example.com', farmerPhone: '9765432119', farmerRating: 4.7, farmerImage: 'https://placehold.co/100x100.png?text=பெ', farmerImageHint: 'farmer with groundnuts' },
  { farmerName: 'Devan (தேவன்)', location: 'Usilampatti, Madurai (உசிலம்பட்டி, மதுரை)', acres: 11, landDetails: 'Goat Farm (ஆட்டுப் பண்ணை)', workerExpectations: 'Herding and caring for goats (ஆடுகளை மேய்த்தல் மற்றும் பராமரித்தல்)', workHours: '9 Hours (9 மணி நேரம்)', salary: 700, farmerEmail: 'devan.u@example.com', farmerPhone: '9765432120', farmerRating: 4.6, farmerImage: 'https://placehold.co/100x100.png?text=தே', farmerImageHint: 'man with goats' },
  { farmerName: 'Kannan (கண்ணன்)', location: 'Usilampatti, Madurai (உசிலம்பட்டி, மதுரை)', acres: 8, landDetails: 'Tapioca Cultivation (மரவள்ளி கிழங்கு சாகுபடி)', workerExpectations: 'Harvesting and cleaning tapioca (கிழங்கு அறுவடை மற்றும் சுத்தம் செய்தல்)', workHours: '8 Hours (8 மணி நேரம்)', salary: 690, farmerEmail: 'kannan.u@example.com', farmerPhone: '9765432121', farmerRating: 4.5, farmerImage: 'https://placehold.co/100x100.png?text=க', farmerImageHint: 'farmer with tapioca' },
  { farmerName: 'Mari (மாரி)', location: 'Usilampatti, Madurai (உசிலம்பட்டி, மதுரை)', acres: 18, landDetails: 'Sorghum and Pearl Millet (சோளம் மற்றும் கம்பு)', workerExpectations: 'Operating harvesting machinery (அறுவடை இயந்திரம் இயக்குதல்)', workHours: '9 Hours (9 மணி நேரம்)', salary: 900, farmerEmail: 'mari.u@example.com', farmerPhone: '9765432122', farmerRating: 4.8, farmerImage: 'https://placehold.co/100x100.png?text=மா', farmerImageHint: 'man on harvester' },

  // Tiruchirappalli
  { farmerName: 'Kaveri Nathan (காவேரி நாதன்)', location: 'Lalgudi, Tiruchirappalli (லால்குடி, திருச்சிராப்பள்ளி)', acres: 25, landDetails: 'Paddy & Sugarcane (நெல் மற்றும் கரும்பு)', workerExpectations: 'Machine operation for harvesting (அறுவடைக்கு இயந்திரம் இயக்குதல்)', workHours: '9 Hours (9 மணி நேரம்)', salary: 950, farmerEmail: 'kaveri.lalgudi@email.com', farmerPhone: '9988776655', farmerRating: 4.9, farmerImage: 'https://placehold.co/100x100.png?text=கா', farmerImageHint: 'farmer portrait' },
  { farmerName: 'Sriranganathan (ஸ்ரீரங்கநாதன்)', location: 'Srirangam, Tiruchirappalli (ஸ்ரீரங்கம், திருச்சிராப்பள்ளி)', acres: 4, landDetails: 'Flower & Banana Leaf (பூ மற்றும் வாழை இலை)', workerExpectations: 'Daily flower plucking and leaf cutting (தினசரி பூ பறித்தல் மற்றும் இலை வெட்டுதல்)', workHours: '6 Hours (6 மணி நேரம்)', salary: 550, farmerEmail: 'sri.ranga@email.com', farmerPhone: '9988776654', farmerRating: 4.8, farmerImage: 'https://placehold.co/100x100.png?text=ஸ்ரீ', farmerImageHint: 'man with flowers' },

  // Salem
  { farmerName: 'Mangai Kumar (மாங்காய் குமார்)', location: 'Salem, Salem (சேலம், சேலம்)', acres: 30, landDetails: 'Mango Orchard (மாந்தோப்பு)', workerExpectations: 'Mango harvesting, grading, and packing (மாங்காய் அறுவடை, தரம் பிரித்தல், கட்டுதல்)', workHours: '8 Hours (8 மணி நேரம்)', salary: 800, farmerEmail: 'mango.kumar@email.com', farmerPhone: '9776655443', farmerRating: 4.7, farmerImage: 'https://placehold.co/100x100.png?text=மா', farmerImageHint: 'farmer with mangoes' },
  { farmerName: 'Sago Selvi (ஜவ்வரிசி செல்வி)', location: 'Attur, Salem (ஆத்தூர், சேலம்)', acres: 15, landDetails: 'Tapioca farm (மரவள்ளிக்கிழங்கு பண்ணை)', workerExpectations: 'Harvesting tapioca and processing for sago (மரவள்ளி அறுவடை மற்றும் ஜவ்வரிசி தயாரிப்பு)', workHours: '8 Hours (8 மணி நேரம்)', salary: 700, farmerEmail: 'sago.selvi@email.com', farmerPhone: '9776655442', farmerRating: 4.6, farmerImage: 'https://placehold.co/100x100.png?text=ஜ', farmerImageHint: 'woman with tapioca' },
  
  // Erode
  { farmerName: 'Manjal Raja (மஞ்சள் ராஜா)', location: 'Erode, Erode (ஈரோடு, ஈரோடு)', acres: 18, landDetails: 'Turmeric Fields (மஞ்சள் வயல்கள்)', workerExpectations: 'Turmeric harvesting and boiling (மஞ்சள் அறுவடை மற்றும் வேகவைத்தல்)', workHours: '8 Hours (8 மணி நேரம்)', salary: 750, farmerEmail: 'manjal.raja@email.com', farmerPhone: '9665544332', farmerRating: 4.8, farmerImage: 'https://placehold.co/100x100.png?text=ம', farmerImageHint: 'man with turmeric' },
  { farmerName: 'Jamakkalam Janaki (ஜமக்காளம் ஜானகி)', location: 'Bhavani, Erode (பவானி, ஈரோடு)', acres: 2, landDetails: 'Textile crops and weaving unit (நெசவுப் பயிர்கள் மற்றும் நெசவு கூடம்)', workerExpectations: 'Managing textile crops and handloom weaving (நெசவுப் பயிர்களை பராமரித்தல் மற்றும் கைத்தறி நெசவு)', workHours: '7 Hours (7 மணி நேரம்)', salary: 650, farmerEmail: 'jamakkalam.janaki@email.com', farmerPhone: '9665544331', farmerRating: 4.7, farmerImage: 'https://placehold.co/100x100.png?text=ஜா', farmerImageHint: 'woman weaving' },

  // Vellore
  { farmerName: 'Rathinam (ரத்தினம்)', location: 'Vellore, Vellore (வேலூர், வேலூர்)', acres: 20, landDetails: 'Paddy and Groundnut fields (நெல் மற்றும் நிலக்கடலை வயல்கள்)', workerExpectations: 'General farm work for paddy and groundnut (நெல், நிலக்கடலை சாகுபடிக்கு பொது பண்ணை வேலை)', workHours: '8 Hours (8 மணி நேரம்)', salary: 680, farmerEmail: 'rathinam.vellore@email.com', farmerPhone: '9554433221', farmerRating: 4.5, farmerImage: 'https://placehold.co/100x100.png?text=ர', farmerImageHint: 'farmer in field' },
  { farmerName: 'Basha Bhai (பாஷா பாய்)', location: 'Ambur, Vellore (ஆம்பூர், வேலூர்)', acres: 5, landDetails: 'Land for Seeraga Samba rice (சீரக சம்பா அரிசிக்கு நிலம்)', workerExpectations: 'Cultivate Seeraga Samba rice for Biryani (பிரியாணிக்கு சீரக சம்பா அரிசி சாகுபடி)', workHours: '8 Hours (8 மணி நேரம்)', salary: 720, farmerEmail: 'basha.ambur@email.com', farmerPhone: '9554433220', farmerRating: 4.8, farmerImage: 'https://placehold.co/100x100.png?text=பா', farmerImageHint: 'man in rice paddy' },

  // Tirunelveli
  { farmerName: 'Nellai Appan (நெல்லையப்பன்)', location: 'Tirunelveli, Tirunelveli (திருநெல்வேலி, திருநெல்வேலி)', acres: 30, landDetails: 'Paddy, Banana, and Palm trees (நெல், வாழை, பனை மரங்கள்)', workerExpectations: 'Harvesting paddy, managing bananas, and climbing palm trees (நெல் அறுவடை, வாழை பராமரிப்பு, பனை மரம் ஏறுதல்)', workHours: '9 Hours (9 மணி நேரம்)', salary: 880, farmerEmail: 'nellai.appan@email.com', farmerPhone: '9443322110', farmerRating: 4.9, farmerImage: 'https://placehold.co/100x100.png?text=நெ', farmerImageHint: 'older farmer' },
  { farmerName: 'Halwa Hameed (அல்வா ஹமீது)', location: 'Tirunelveli, Tirunelveli (திருநெல்வேலி, திருநெல்வேலி)', acres: 1, landDetails: 'Land for wheat cultivation (கோதுமை சாகுபடிக்கு நிலம்)', workerExpectations: 'Cultivate wheat for making Halwa (அல்வா தயாரிக்க கோதுமை சாகுபடி)', workHours: '7 Hours (7 மணி நேரம்)', salary: 600, farmerEmail: 'halwa.hameed@email.com', farmerPhone: '9443322119', farmerRating: 4.7, farmerImage: 'https://placehold.co/100x100.png?text=அ', farmerImageHint: 'man smiling' },

  // Thanjavur
  { farmerName: 'Ponni Selvan (பொன்னி செல்வன்)', location: 'Thanjavur, Thanjavur (தஞ்சாவூர், தஞ்சாவூர்)', acres: 50, landDetails: 'Paddy fields (Delta region) (நெல் வயல்கள் (டெல்டா பகுதி))', workerExpectations: 'Complete paddy cultivation cycle work (முழு நெல் சாகுபடி சுழற்சி வேலை)', workHours: '8 Hours (8 மணி நேரம்)', salary: 750, farmerEmail: 'ponni.selvan@email.com', farmerPhone: '9332211009', farmerRating: 5.0, farmerImage: 'https://placehold.co/100x100.png?text=பொ', farmerImageHint: 'farmer in paddy' },
  { farmerName: 'Rajarajan (ராஜராஜன்)', location: 'Kumbakonam, Thanjavur (கும்பகோணம், தஞ்சாவூர்)', acres: 10, landDetails: 'Betel leaves and Sugarcane (வெற்றிலை மற்றும் கரும்பு)', workerExpectations: 'Betel leaf plucking and sugarcane harvesting (வெற்றிலை பறித்தல் மற்றும் கரும்பு வெட்டுதல்)', workHours: '7 Hours (7 மணி நேரம்)', salary: 680, farmerEmail: 'rajarajan.kumbakonam@email.com', farmerPhone: '9332211008', farmerRating: 4.7, farmerImage: 'https://placehold.co/100x100.png?text=ரா', farmerImageHint: 'farmer smiling' },

  // Dindigul
  { farmerName: 'Poottu Muthu (பூட்டு முத்து)', location: 'Dindigul, Dindigul (திண்டுக்கல், திண்டுக்கல்)', acres: 3, landDetails: 'Land for metal work raw materials (உலோக வேலை மூலப்பொருட்களுக்கான நிலம்)', workerExpectations: 'Cultivate plants for lock making dye/materials (பூட்டுக்கு சாயம்/மூலப்பொருட்களுக்கு செடிகள் வளர்த்தல்)', workHours: '8 Hours (8 மணி நேரம்)', salary: 650, farmerEmail: 'poottu.muthu@email.com', farmerPhone: '9221100998', farmerRating: 4.6, farmerImage: 'https://placehold.co/100x100.png?text=பூ', farmerImageHint: 'man in workshop' },
  { farmerName: 'Biryani Begum (பிரியாணி பேகம்)', location: 'Dindigul, Dindigul (திண்டுக்கல், திண்டுக்கல்)', acres: 6, landDetails: 'Seeraga Samba Rice fields (சீரக சம்பா நெல் வயல்கள்)', workerExpectations: 'Cultivate and harvest Seeraga Samba rice (சீரக சம்பா நெல் சாகுபடி மற்றும் அறுவடை)', workHours: '8 Hours (8 மணி நேரம்)', salary: 730, farmerEmail: 'biryani.begum@email.com', farmerPhone: '9221100997', farmerRating: 4.8, farmerImage: 'https://placehold.co/100x100.png?text=பி', farmerImageHint: 'woman in rice field' },

  // Kanyakumari
  { farmerName: 'Rubber Rajan (ரப்பர் ராஜன்)', location: 'Nagercoil, Kanyakumari (நாகர்கோவில், கன்னியாகுமரி)', acres: 20, landDetails: 'Rubber Plantation (ரப்பர் தோட்டம்)', workerExpectations: 'Rubber tapping and sheet processing (ரப்பர் பால் வெட்டுதல் மற்றும் ஷீட் தயாரித்தல்)', workHours: '7 Hours (7 மணி நேரம்)', salary: 820, farmerEmail: 'rubber.rajan@email.com', farmerPhone: '9110099887', farmerRating: 4.7, farmerImage: 'https://placehold.co/100x100.png?text=ர', farmerImageHint: 'man tapping rubber' },
  { farmerName: 'Nanjil Nambi (நாஞ்சில் நம்பி)', location: 'Thuckalay, Kanyakumari (தக்கலை, கன்னியாகுமரி)', acres: 12, landDetails: 'Cloves and Nutmeg plantation (கிராம்பு, ஜாதிக்காய் தோட்டம்)', workerExpectations: 'Spice harvesting and drying (நறுமணப் பொருட்கள் அறுவடை மற்றும் உலர்த்துதல்)', workHours: '7 Hours (7 மணி நேரம்)', salary: 750, farmerEmail: 'nanjil.nambi@email.com', farmerPhone: '9110099886', farmerRating: 4.9, farmerImage: 'https://placehold.co/100x100.png?text=நா', farmerImageHint: 'farmer with spices' },
  
  // Tiruppur
  { farmerName: 'Baniyan Baskar (பனியன் பாஸ்கர்)', location: 'Tiruppur, Tiruppur (திருப்பூர், திருப்பூர்)', acres: 10, landDetails: 'Cotton Fields (பருத்தி காடு)', workerExpectations: 'Cotton picking for garment industry (ஆயத்த ஆடை தொழிலுக்கு பருத்தி எடுத்தல்)', workHours: '8 Hours (8 மணி நேரம்)', salary: 700, farmerEmail: 'banian.baskar@email.com', farmerPhone: '9009988776', farmerRating: 4.6, farmerImage: 'https://placehold.co/100x100.png?text=ப', farmerImageHint: 'man in cotton field' },
  { farmerName: 'Knit Kavitha (நிட் கவிதா)', location: 'Avinashi, Tiruppur (அவினாசி, திருப்பூர்)', acres: 5, landDetails: 'Land for organic cotton dye plants (ஆர்கானிக் காட்டன் சாயச் செடிகள்)', workerExpectations: 'Cultivate plants for making natural dyes (இயற்கை சாயம் தயாரிக்க செடிகள் வளர்த்தல்)', workHours: '7 Hours (7 மணி நேரம்)', salary: 650, farmerEmail: 'knit.kavitha@email.com', farmerPhone: '9009988775', farmerRating: 4.8, farmerImage: 'https://placehold.co/100x100.png?text=நி', farmerImageHint: 'woman with plants' },

  // Karur
  { farmerName: 'Mosquito Net Murugan (கொசுவலை முருகன்)', location: 'Karur, Karur (கரூர், கரூர்)', acres: 7, landDetails: 'Agave and other fiber crops (கற்றாழை மற்றும் மற்ற நார் பயிர்கள்)', workerExpectations: 'Harvest fibers for net making (வலை பின்ன நார் அறுவடை செய்தல்)', workHours: '8 Hours (8 மணி நேரம்)', salary: 680, farmerEmail: 'net.murugan@email.com', farmerPhone: '8998877665', farmerRating: 4.5, farmerImage: 'https://placehold.co/100x100.png?text=கொ', farmerImageHint: 'farmer with fibers' },
  { farmerName: 'Vasanthi (வாசந்தி)', location: 'Kulithalai, Karur (குளித்தலை, கரூர்)', acres: 15, landDetails: 'Betel leaf and Banana plantation (வெற்றிலை மற்றும் வாழை தோட்டம்)', workerExpectations: 'Harvesting betel leaves and bananas (வெற்றிலை மற்றும் வாழை அறுவடை)', workHours: '7 Hours (7 மணி நேரம்)', salary: 650, farmerEmail: 'vasanthi.k@email.com', farmerPhone: '8998877664', farmerRating: 4.7, farmerImage: 'https://placehold.co/100x100.png?text=வா', farmerImageHint: 'woman in plantation' },
];

export default function WorkerDashboard() {
  const [isApplyDialogOpen, setApplyDialogOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState<JobPost | null>(null);

  const handleApplyClick = (job: JobPost) => {
    setSelectedJob(job);
    setApplyDialogOpen(true);
  };
  
  const jobsByDistrict = jobPosts.reduce((acc, job) => {
    const district = job.location.split(', ')[1].split(' (')[0];
    if (!acc[district]) {
      acc[district] = [];
    }
    acc[district].push(job);
    return acc;
  }, {} as Record<string, JobPost[]>);


  return (
    <div className="min-h-screen w-full bg-secondary/50">
      <DashboardHeader title="Worker Dashboard" userType="worker" />
      
      <main className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-6 font-headline">Available Jobs (கிடைக்கும் வேலைகள்)</h1>
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
                                            <CardTitle className="text-lg">{post.workerExpectations.split(' (')[0]}</CardTitle>
                                            <CardDescription className="flex items-center pt-1 text-sm">
                                              <Tractor className="mr-2 h-4 w-4" />
                                              {post.farmerName}
                                            </CardDescription>
                                             <div className="flex items-center text-xs text-muted-foreground pt-2">
                                              <Mountain className="mr-2 h-4 w-4" />
                                              <span>{post.acres} acres - {post.landDetails}</span>
                                            </div>
                                          </CardHeader>
                                          <CardContent className="flex flex-1 flex-col justify-center gap-2 border-t p-4 sm:border-l sm:border-t-0">
                                            <div className="flex items-center text-sm">
                                              <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                                              <span>Work Hours: {post.workHours}</span>
                                            </div>
                                            <div className="flex items-center text-sm font-semibold text-primary">
                                              <DollarSign className="mr-2 h-4 w-4" />
                                              <span>Salary: ₹{post.salary} / day</span>
                                            </div>
                                          </CardContent>
                                          <CardFooter className="flex items-center justify-center p-4 sm:border-l">
                                            <Button className="w-full sm:w-auto" onClick={() => handleApplyClick(post)}>Apply</Button>
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
                     Contact details for this job. (இந்த வேலைக்கான தொடர்பு விவரங்கள்.)
                   </DialogDescription>
                </div>
              </div>
            </DialogHeader>
            <div className="py-4 space-y-4">
                <div className="flex items-start">
                  <Tractor className="mr-3 mt-1 h-5 w-5 text-muted-foreground" />
                  <span>Farmer's Expectation: {selectedJob.workerExpectations}</span>
                </div>
               <div className="flex items-center">
                  <DollarSign className="mr-3 h-5 w-5 text-muted-foreground" />
                  <span>Salary: ₹{selectedJob.salary} / day (சம்பளம்: ₹{selectedJob.salary} / நாள்)</span>
                </div>
                <div className="flex items-center">
                    <Star className="mr-3 h-5 w-5 text-amber-400 fill-amber-400" />
                    <span>Farmer Rating: {selectedJob.farmerRating}/5.0 (விவசாயி மதிப்பீடு)</span>
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
               <Button variant="outline" onClick={() => setApplyDialogOpen(false)}>Close (மூடு)</Button>
               <Button asChild>
                <a href={`tel:${selectedJob.farmerPhone}`}>
                  <Phone className="mr-2 h-4 w-4" />
                  Call (அழைக்க)
                </a>
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
