
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
import { Contact, MapPin, Briefcase, Phone, User as UserIcon, Calendar as CalendarIconLucide, Mail, Star, DollarSign } from 'lucide-react';
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
  email: string;
  salary: number;
  rating: number;
};

const workers: Worker[] = [
    // Coimbatore
    { name: 'Karthik Raja', age: 40, skills: ['Tractor Operation', 'Coconut Plucking'], location: 'Pollachi, Coimbatore', image: 'https://placehold.co/300x300.png?text=KR', hint: 'man portrait', phone: '9234567890', email: 'karthik.r@example.com', salary: 750, rating: 4.8 },
    { name: 'Mani Kandan', age: 38, skills: ['Pest Control', 'Irrigation'], location: 'Pollachi, Coimbatore', image: 'https://placehold.co/300x300.png?text=MK', hint: 'farmer smiling', phone: '9234567891', email: 'mani.k@example.com', salary: 650, rating: 4.5 },
    { name: 'Anjali Devi', age: 33, skills: ['Weeding', 'Harvesting'], location: 'Pollachi, Coimbatore', image: 'https://placehold.co/300x300.png?text=AD', hint: 'woman in field', phone: '9234567892', email: 'anjali.d@example.com', salary: 500, rating: 4.7 },
    { name: 'Suresh Kumar', age: 45, skills: ['Coconut Tree Climbing', 'Spraying'], location: 'Pollachi, Coimbatore', image: 'https://placehold.co/300x300.png?text=SK', hint: 'man climbing tree', phone: '9234567893', email: 'suresh.k@example.com', salary: 800, rating: 4.9 },
    { name: 'Priya Varman', age: 29, skills: ['Vegetable Picking', 'Sorting'], location: 'Pollachi, Coimbatore', image: 'https://placehold.co/300x300.png?text=PV', hint: 'young woman portrait', phone: '9234567894', email: 'priya.v@example.com', salary: 550, rating: 4.6 },

    { name: 'Deepa Selvi', age: 32, skills: ['Vegetable Farming', 'Poultry Care'], location: 'Mettupalayam, Coimbatore', image: 'https://placehold.co/300x300.png?text=DS', hint: 'woman portrait', phone: '9234567895', email: 'deepa.s@example.com', salary: 600, rating: 4.7 },
    { name: 'Ravi Verma', age: 41, skills: ['Arecanut Harvesting', 'Drip Irrigation'], location: 'Mettupalayam, Coimbatore', image: 'https://placehold.co/300x300.png?text=RV', hint: 'man in farm', phone: '9234567896', email: 'ravi.v@example.com', salary: 700, rating: 4.5 },
    { name: 'Kamala Hassan', age: 39, skills: ['Flower Picking', 'Nursery Work'], location: 'Mettupalayam, Coimbatore', image: 'https://placehold.co/300x300.png?text=KH', hint: 'woman with flowers', phone: '9234567897', email: 'kamala.h@example.com', salary: 550, rating: 4.8 },
    { name: 'Ganesh Pandi', age: 35, skills: ['Turmeric Cultivation', 'Machine Operation'], location: 'Mettupalayam, Coimbatore', image: 'https://placehold.co/300x300.png?text=GP', hint: 'man on tractor', phone: '9234567898', email: 'ganesh.p@example.com', salary: 750, rating: 4.6 },
    { name: 'Meena Kumari', age: 28, skills: ['General Farm Hand', 'Weeding'], location: 'Mettupalayam, Coimbatore', image: 'https://placehold.co/300x300.png?text=MK', hint: 'young woman smiling', phone: '9234567899', email: 'meena.k@example.com', salary: 450, rating: 4.4 },
    
    { name: 'Arun Kumar', age: 28, skills: ['Irrigation Setup', 'Pest Control'], location: 'Annur, Coimbatore', image: 'https://placehold.co/300x300.png?text=AK', hint: 'young man', phone: '9234567900', email: 'arun.k@example.com', salary: 650, rating: 4.5 },
    { name: 'Sathish Kumar', age: 31, skills: ['Maize Farming', 'Harvesting'], location: 'Annur, Coimbatore', image: 'https://placehold.co/300x300.png?text=SK', hint: 'man in a cornfield', phone: '9234567901', email: 'sathish.k@example.com', salary: 700, rating: 4.6 },
    { name: 'Vanitha Selvam', age: 36, skills: ['Cotton Picking', 'Manual Weeding'], location: 'Annur, Coimbatore', image: 'https://placehold.co/300x300.png?text=VS', hint: 'woman picking cotton', phone: '9234567902', email: 'vanitha.s@example.com', salary: 500, rating: 4.7 },
    { name: 'Murugan P', age: 43, skills: ['Ploughing', 'Sowing'], location: 'Annur, Coimbatore', image: 'https://placehold.co/300x300.png?text=MP', hint: 'farmer ploughing', phone: '9234567903', email: 'murugan.p@example.com', salary: 750, rating: 4.8 },
    { name: 'Lakshmi Priya', age: 30, skills: ['Vegetable Nursery', 'Seed Treatment'], location: 'Annur, Coimbatore', image: 'https://placehold.co/300x300.png?text=LP', hint: 'woman with seedlings', phone: '9234567904', email: 'lakshmi.p@example.com', salary: 550, rating: 4.9 },

    { name: 'Saravanan M', age: 42, skills: ['Maize Cultivation', 'Harvesting'], location: 'Sulur, Coimbatore', image: 'https://placehold.co/300x300.png?text=SM', hint: 'farmer portrait', phone: '9234567905', email: 'saravanan.m@example.com', salary: 720, rating: 4.7 },
    { name: 'Karthikeyan R', age: 39, skills: ['Poultry Farm Management', 'Feed Mixing'], location: 'Sulur, Coimbatore', image: 'https://placehold.co/300x300.png?text=KR', hint: 'man with chickens', phone: '9234567906', email: 'karthikeyan.r@example.com', salary: 680, rating: 4.6 },
    { name: 'Shanthi Murugan', age: 41, skills: ['Vegetable Farming', 'Packing'], location: 'Sulur, Coimbatore', image: 'https://placehold.co/300x300.png?text=SM', hint: 'woman with vegetables', phone: '9234567907', email: 'shanthi.m@example.com', salary: 520, rating: 4.8 },
    { name: 'Rajesh V', age: 29, skills: ['Driving', 'Loading/Unloading'], location: 'Sulur, Coimbatore', image: 'https://placehold.co/300x300.png?text=RV', hint: 'man driving truck', phone: '9234567908', email: 'rajesh.v@example.com', salary: 600, rating: 4.5 },
    { name: 'Divya Bharathi', age: 27, skills: ['General Farm Labor', 'Weeding'], location: 'Sulur, Coimbatore', image: 'https://placehold.co/300x300.png?text=DB', hint: 'young woman in farm', phone: '9234567909', email: 'divya.b@example.com', salary: 480, rating: 4.3 },

    { name: 'Priya Mohan', age: 35, skills: ['Organic Farming', 'Grafting'], location: 'Kinathukadavu, Coimbatore', image: 'https://placehold.co/300x300.png?text=PM', hint: 'woman smiling', phone: '9234567910', email: 'priya.m@example.com', salary: 650, rating: 4.9 },
    { name: 'Mohan Das', age: 48, skills: ['Tomato Farming', 'Staking'], location: 'Kinathukadavu, Coimbatore', image: 'https://placehold.co/300x300.png?text=MD', hint: 'man in tomato field', phone: '9234567911', email: 'mohan.d@example.com', salary: 700, rating: 4.7 },
    { name: 'Geetha Rani', age: 40, skills: ['Chilli Picking', 'Drying'], location: 'Kinathukadavu, Coimbatore', image: 'https://placehold.co/300x300.png?text=GR', hint: 'woman with chillies', phone: '9234567912', email: 'geetha.r@example.com', salary: 550, rating: 4.6 },
    { name: 'Loganathan S', age: 36, skills: ['Coconut Harvesting', 'Spraying'], location: 'Kinathukadavu, Coimbatore', image: 'https://placehold.co/300x300.png?text=LS', hint: 'man with coconuts', phone: '9234567913', email: 'loganathan.s@example.com', salary: 800, rating: 4.8 },
    { name: 'Amutha Valli', age: 31, skills: ['Weeding', 'General Maintenance'], location: 'Kinathukadavu, Coimbatore', image: 'https://placehold.co/300x300.png?text=AV', hint: 'woman working in field', phone: '9234567914', email: 'amutha.v@example.com', salary: 470, rating: 4.5 },

    // Madurai
    { name: 'Muthu Pandi', age: 45, skills: ['Paddy Cultivation', 'Jasmine Harvesting'], location: 'Thirumangalam, Madurai', image: 'https://placehold.co/300x300.png?text=MP', hint: 'farmer portrait', phone: '9345678901', email: 'muthu.p@example.com', salary: 700, rating: 4.7 },
    { name: 'Pandiyamma M', age: 42, skills: ['Flower Stringing', 'Weeding'], location: 'Thirumangalam, Madurai', image: 'https://placehold.co/300x300.png?text=PM', hint: 'woman with flowers', phone: '9345678902', email: 'pandiyamma.m@example.com', salary: 450, rating: 4.8 },
    { name: 'Alagarsamy K', age: 50, skills: ['Sugarcane Cutting', 'Loading'], location: 'Thirumangalam, Madurai', image: 'https://placehold.co/300x300.png?text=AK', hint: 'man cutting sugarcane', phone: '9345678903', email: 'alagarsamy.k@example.com', salary: 800, rating: 4.6 },
    { name: 'Kasthuri R', age: 35, skills: ['Paddy Transplanting', 'Harvesting'], location: 'Thirumangalam, Madurai', image: 'https://placehold.co/300x300.png?text=KR', hint: 'woman in paddy field', phone: '9345678904', email: 'kasthuri.r@example.com', salary: 550, rating: 4.9 },
    { name: 'Veeramani S', age: 39, skills: ['Tractor Driving', 'Ploughing'], location: 'Thirumangalam, Madurai', image: 'https://placehold.co/300x300.png?text=VS', hint: 'man on tractor', phone: '9345678905', email: 'veeramani.s@example.com', salary: 850, rating: 4.8 },

    { name: 'Meenakshi Sundaram', age: 38, skills: ['Banana Cultivation', 'Sugarcane Cutting'], location: 'Usilampatti, Madurai', image: 'https://placehold.co/300x300.png?text=MS', hint: 'woman in a field', phone: '9345678906', email: 'meenakshi.s@example.com', salary: 750, rating: 4.6 },
    { name: 'Karuppan C', age: 44, skills: ['Cotton Farming', 'Pest control'], location: 'Usilampatti, Madurai', image: 'https://placehold.co/300x300.png?text=KC', hint: 'man spraying pesticides', phone: '9345678907', email: 'karuppan.c@example.com', salary: 650, rating: 4.4 },
    { name: 'Valliammai P', age: 40, skills: ['Maize de-husking', 'Drying'], location: 'Usilampatti, Madurai', image: 'https://placehold.co/300x300.png?text=VP', hint: 'woman with maize', phone: '9345678908', email: 'valliammai.p@example.com', salary: 500, rating: 4.7 },
    { name: 'Thevaraj M', age: 52, skills: ['General Farm Hand', 'Livestock care'], location: 'Usilampatti, Madurai', image: 'https://placehold.co/300x300.png?text=TM', hint: 'older man with cattle', phone: '9345678909', email: 'thevaraj.m@example.com', salary: 600, rating: 4.5 },
    { name: 'Chellamma G', age: 36, skills: ['Weeding', 'Vegetable harvesting'], location: 'Usilampatti, Madurai', image: 'https://placehold.co/300x300.png?text=CG', hint: 'woman harvesting vegetables', phone: '9345678910', email: 'chellamma.g@example.com', salary: 480, rating: 4.6 },
    
    // Tiruchirappalli
    { name: 'Ravi Chandran', age: 37, skills: ['Irrigation Management', 'Farm Machinery'], location: 'Lalgudi, Tiruchirappalli', image: 'https://placehold.co/300x300.png?text=RC', hint: 'man smiling', phone: '9456789012', email: 'ravi.c@example.com', salary: 800, rating: 4.8 },
    { name: 'Chandralekha R', age: 34, skills: ['Paddy Transplanting', 'Weeding'], location: 'Lalgudi, Tiruchirappalli', image: 'https://placehold.co/300x300.png?text=CR', hint: 'woman in paddy field', phone: '9456789013', email: 'chandralekha.r@example.com', salary: 550, rating: 4.7 },
    { name: 'Baskaran T', age: 45, skills: ['Sugarcane Harvesting', 'Loading'], location: 'Lalgudi, Tiruchirappalli', image: 'https://placehold.co/300x300.png?text=BT', hint: 'man cutting sugarcane', phone: '9456789014', email: 'baskaran.t@example.com', salary: 820, rating: 4.6 },
    { name: 'Poornima S', age: 29, skills: ['Banana Cultivation', 'De-leafing'], location: 'Lalgudi, Tiruchirappalli', image: 'https://placehold.co/300x300.png?text=PS', hint: 'woman in banana plantation', phone: '9456789015', email: 'poornima.s@example.com', salary: 600, rating: 4.9 },
    { name: 'Mani K', age: 40, skills: ['Tractor driving', 'General farm work'], location: 'Lalgudi, Tiruchirappalli', image: 'https://placehold.co/300x300.png?text=MK', hint: 'man on tractor', phone: '9456789016', email: 'mani.k.trichy@example.com', salary: 850, rating: 4.7 },

    { name: 'Sangeetha Bala', age: 30, skills: ['Flower Cultivation', 'Nursery Management'], location: 'Srirangam, Tiruchirappalli', image: 'https://placehold.co/300x300.png?text=SB', hint: 'young woman', phone: '9456789017', email: 'sangeetha.b@example.com', salary: 600, rating: 4.8 },
    { name: 'Bala Murugan', age: 35, skills: ['Garland Making', 'Flower harvesting'], location: 'Srirangam, Tiruchirappalli', image: 'https://placehold.co/300x300.png?text=BM', hint: 'man with flowers', phone: '9456789018', email: 'bala.m@example.com', salary: 550, rating: 4.9 },
    { name: 'Kokila Vani', age: 28, skills: ['Betel Leaf Picking', 'Packing'], location: 'Srirangam, Tiruchirappalli', image: 'https://placehold.co/300x300.png?text=KV', hint: 'woman picking leaves', phone: '9456789019', email: 'kokila.v@example.com', salary: 480, rating: 4.7 },
    { name: 'Rangarajan V', age: 55, skills: ['Temple flower supply chain', 'Logistics'], location: 'Srirangam, Tiruchirappalli', image: 'https://placehold.co/300x300.png?text=RV', hint: 'older man portrait', phone: '9456789020', email: 'rangarajan.v@example.com', salary: 700, rating: 4.5 },
    { name: 'Jayanthi R', age: 42, skills: ['Retail stall management', 'Sales'], location: 'Srirangam, Tiruchirappalli', image: 'https://placehold.co/300x300.png?text=JR', hint: 'woman at market stall', phone: '9456789021', email: 'jayanthi.r@example.com', salary: 500, rating: 4.6 },
    
    // Salem
    { name: 'Vignesh Kumar', age: 28, skills: ['Mango Farming', 'Grafting'], location: 'Attur, Salem', image: 'https://placehold.co/300x300.png?text=VK', hint: 'young man', phone: '9567890123', email: 'vignesh.k@example.com', salary: 700, rating: 4.8 },
    { name: 'Kumarasamy P', age: 48, skills: ['Mango Harvesting', 'Sorting'], location: 'Attur, Salem', image: 'https://placehold.co/300x300.png?text=KP', hint: 'man with mangoes', phone: '9567890124', email: 'kumarasamy.p@example.com', salary: 750, rating: 4.7 },
    { name: 'Malliga S', age: 41, skills: ['Tapioca Harvesting', 'Processing'], location: 'Attur, Salem', image: 'https://placehold.co/300x300.png?text=MS', hint: 'woman with tapioca', phone: '9567890125', email: 'malliga.s@example.com', salary: 600, rating: 4.6 },
    { name: 'Sarath Babu', age: 31, skills: ['Pest management', 'Spraying'], location: 'Attur, Salem', image: 'https://placehold.co/300x300.png?text=SB', hint: 'man spraying crops', phone: '9567890126', email: 'sarath.b@example.com', salary: 650, rating: 4.5 },
    { name: 'Deepa K', age: 29, skills: ['General farm hand', 'Weeding'], location: 'Attur, Salem', image: 'https://placehold.co/300x300.png?text=DK', hint: 'young woman working', phone: '9567890127', email: 'deepa.k.salem@example.com', salary: 480, rating: 4.4 },
    
    { name: 'Anitha Murugan', age: 33, skills: ['Tapioca Cultivation', 'Sago Production'], location: 'Mettur, Salem', image: 'https://placehold.co/300x300.png?text=AM', hint: 'indian woman', phone: '9567890128', email: 'anitha.m@example.com', salary: 620, rating: 4.7 },
    { name: 'Murugesan L', age: 46, skills: ['Sugarcane cutting', 'Farm machinery operation'], location: 'Mettur, Salem', image: 'https://placehold.co/300x300.png?text=ML', hint: 'man on farm', phone: '9567890129', email: 'murugesan.l@example.com', salary: 800, rating: 4.5 },
    { name: 'Selvi R', age: 38, skills: ['Fishing (Reservoir)', 'Net mending'], location: 'Mettur, Salem', image: 'https://placehold.co/300x300.png?text=SR', hint: 'woman with fishing net', phone: '9567890130', email: 'selvi.r@example.com', salary: 550, rating: 4.3 },
    { name: 'Kannan V', age: 40, skills: ['General Maintenance', 'Driving'], location: 'Mettur, Salem', image: 'https://placehold.co/300x300.png?text=KV', hint: 'man driving truck', phone: '9567890131', email: 'kannan.v@example.com', salary: 600, rating: 4.2 },
    { name: 'Pappaothi A', age: 50, skills: ['Weeding', 'Cotton picking'], location: 'Mettur, Salem', image: 'https://placehold.co/300x300.png?text=PA', hint: 'older woman in field', phone: '9567890132', email: 'pappaothi.a@example.com', salary: 450, rating: 4.6 },
    
    // Erode
    { name: 'Senthil Nathan', age: 39, skills: ['Turmeric Cultivation', 'Textile Crop Mgmt.'], location: 'Bhavani, Erode', image: 'https://placehold.co/300x300.png?text=SN', hint: 'man portrait', phone: '9789012345', email: 'senthil.n@example.com', salary: 780, rating: 4.9 },
    { name: 'Natarajan S', age: 47, skills: ['Carpet Weaving', 'Dyeing'], location: 'Bhavani, Erode', image: 'https://placehold.co/300x300.png?text=NS', hint: 'man weaving', phone: '9789012346', email: 'natarajan.s@example.com', salary: 700, rating: 4.7 },
    { name: 'Bhavani K', age: 41, skills: ['Turmeric polishing', 'Packing'], location: 'Bhavani, Erode', image: 'https://placehold.co/300x300.png?text=BK', hint: 'woman with turmeric', phone: '9789012347', email: 'bhavani.k@example.com', salary: 600, rating: 4.8 },
    { name: 'Kumar T', age: 33, skills: ['Paddy harvesting', 'Threshing'], location: 'Bhavani, Erode', image: 'https://placehold.co/300x300.png?text=KT', hint: 'man in paddy field', phone: '9789012348', email: 'kumar.t@example.com', salary: 650, rating: 4.6 },
    { name: 'Mekala P', age: 30, skills: ['General farm hand', 'Irrigation'], location: 'Bhavani, Erode', image: 'https://placehold.co/300x300.png?text=MP', hint: 'woman working with water', phone: '9789012349', email: 'mekala.p@example.com', salary: 500, rating: 4.5 },

    { name: 'Kavitha Loganathan', age: 31, skills: ['Sugarcane Harvesting', 'Poultry Farming'], location: 'Gobichettipalayam, Erode', image: 'https://placehold.co/300x300.png?text=KL', hint: 'woman smiling', phone: '9789012350', email: 'kavitha.l@example.com', salary: 680, rating: 4.7 },
    { name: 'Loganathan R', age: 36, skills: ['Paddy cultivation', 'Tractor driving'], location: 'Gobichettipalayam, Erode', image: 'https://placehold.co/300x300.png?text=LR', hint: 'man on tractor', phone: '9789012351', email: 'logu.r@example.com', salary: 850, rating: 4.8 },
    { name: 'Saraswathi M', age: 45, skills: ['Coconut harvesting', 'Copra making'], location: 'Gobichettipalayam, Erode', image: 'https://placehold.co/300x300.png?text=SM', hint: 'woman with coconuts', phone: '9789012352', email: 'saraswathi.m@example.com', salary: 700, rating: 4.9 },
    { name: 'Periyasamy K', age: 52, skills: ['Cattle rearing', 'Dairy work'], location: 'Gobichettipalayam, Erode', image: 'https://placehold.co/300x300.png?text=PK', hint: 'man with cow', phone: '9789012353', email: 'periyasamy.k@example.com', salary: 650, rating: 4.6 },
    { name: 'Anitha S', age: 28, skills: ['Vegetable picking', 'Weeding'], location: 'Gobichettipalayam, Erode', image: 'https://placehold.co/300x300.png?text=AS', hint: 'young woman picking vegetables', phone: '9789012354', email: 'anitha.s@example.com', salary: 520, rating: 4.5 },

    // Vellore
    { name: 'Gopalakrishnan V', age: 41, skills: ['Leather Tanning (Agri-use)', 'Paddy Cultivation'], location: 'Ambur, Vellore', image: 'https://placehold.co/300x300.png?text=GV', hint: 'man with a beard', phone: '9890123456', email: 'gopal.v@example.com', salary: 750, rating: 4.4 },
    { name: 'Syed Basha', age: 45, skills: ['Biryani Rice Cultivation', 'Marketing'], location: 'Ambur, Vellore', image: 'https://placehold.co/300x300.png?text=SB', hint: 'man in rice field', phone: '9890123457', email: 'syed.b@example.com', salary: 700, rating: 4.6 },
    { name: 'Fathima Rizwan', age: 39, skills: ['Leather Goods Stitching', 'Quality Check'], location: 'Ambur, Vellore', image: 'https://placehold.co/300x300.png?text=FR', hint: 'woman stitching leather', phone: '9890123458', email: 'fathima.r@example.com', salary: 600, rating: 4.7 },
    { name: 'Mani E', age: 35, skills: ['Sugarcane harvesting', 'General Labor'], location: 'Ambur, Vellore', image: 'https://placehold.co/300x300.png?text=ME', hint: 'man working in field', phone: '9890123459', email: 'mani.e@example.com', salary: 800, rating: 4.5 },
    { name: 'Ayesha Begum', age: 31, skills: ['Jasmine picking', 'Weeding'], location: 'Ambur, Vellore', image: 'https://placehold.co/300x300.png?text=AB', hint: 'woman with jasmine', phone: '9890123460', email: 'ayesha.b@example.com', salary: 500, rating: 4.8 },

    { name: 'Brindha Sarathy', age: 27, skills: ['Jasmine Plucking', 'Brinjal Farming'], location: 'Vaniyambadi, Vellore', image: 'https://placehold.co/300x300.png?text=BS', hint: 'young indian woman', phone: '9890123461', email: 'brindha.s@example.com', salary: 550, rating: 4.9 },
    { name: 'Sarathy P', age: 32, skills: ['Groundnut Cultivation', 'Harvesting'], location: 'Vaniyambadi, Vellore', image: 'https://placehold.co/300x300.png?text=SP', hint: 'man in groundnut field', phone: '9890123462', email: 'sarathy.p@example.com', salary: 720, rating: 4.7 },
    { name: 'Parveen Taj', age: 40, skills: ['Leather processing', 'Chemical handling'], location: 'Vaniyambadi, Vellore', image: 'https://placehold.co/300x300.png?text=PT', hint: 'woman in workshop', phone: '9890123463', email: 'parveen.t@example.com', salary: 650, rating: 4.3 },
    { name: 'Irfan Khan', age: 29, skills: ['Driving', 'Loading'], location: 'Vaniyambadi, Vellore', image: 'https://placehold.co/300x300.png?text=IK', hint: 'man next to truck', phone: '9890123464', email: 'irfan.k@example.com', salary: 700, rating: 4.5 },
    { name: 'Sumathi G', age: 36, skills: ['General farm hand', 'Sowing'], location: 'Vaniyambadi, Vellore', image: 'https://placehold.co/300x300.png?text=SG', hint: 'woman sowing seeds', phone: '9890123465', email: 'sumathi.g@example.com', salary: 480, rating: 4.6 },

    // Tirunelveli
    { name: 'Arumugam Pillai', age: 52, skills: ['Palm Tree Climbing', 'Paddy Harvesting'], location: 'Palayamkottai, Tirunelveli', image: 'https://placehold.co/300x300.png?text=AP', hint: 'older man', phone: '9678901234', email: 'arumugam.p@example.com', salary: 850, rating: 4.9 },
    { name: 'Pillai Rajan', age: 49, skills: ['Banana Cultivation', 'Irrigation'], location: 'Palayamkottai, Tirunelveli', image: 'https://placehold.co/300x300.png?text=PR', hint: 'man in banana farm', phone: '9678901235', email: 'pillai.r@example.com', salary: 750, rating: 4.7 },
    { name: 'Thangam A', age: 45, skills: ['Cotton Picking', 'Weeding'], location: 'Palayamkottai, Tirunelveli', image: 'https://placehold.co/300x300.png?text=TA', hint: 'woman picking cotton', phone: '9678901236', email: 'thangam.a@example.com', salary: 500, rating: 4.6 },
    { name: 'Nellaiyappan S', age: 55, skills: ['Ploughing', 'General Maintenance'], location: 'Palayamkottai, Tirunelveli', image: 'https://placehold.co/300x300.png?text=NS', hint: 'older farmer portrait', phone: '9678901237', email: 'nellaiyappan.s@example.com', salary: 700, rating: 4.5 },
    { name: 'Kanthimathi T', age: 40, skills: ['Halwa Making (Agri-product)', 'Sales'], location: 'Palayamkottai, Tirunelveli', image: 'https://placehold.co/300x300.png?text=KT', hint: 'woman making sweets', phone: '9678901238', email: 'kanthimathi.t@example.com', salary: 600, rating: 4.8 },
    
    { name: 'Esakki Ammal', age: 46, skills: ['Chilli Farming', 'Cotton Picking'], location: 'Ambasamudram, Tirunelveli', image: 'https://placehold.co/300x300.png?text=EA', hint: 'older indian woman', phone: '9678901239', email: 'esakki.a@example.com', salary: 550, rating: 4.7 },
    { name: 'Sankaralingam P', age: 51, skills: ['Paddy Cultivation', 'Forest Produce Collection'], location: 'Ambasamudram, Tirunelveli', image: 'https://placehold.co/300x300.png?text=SP', hint: 'man in forest area', phone: '9678901240', email: 'sankaralingam.p@example.com', salary: 720, rating: 4.6 },
    { name: 'Muthulakshmi K', age: 42, skills: ['Herbal Plant Collection', 'Drying'], location: 'Ambasamudram, Tirunelveli', image: 'https://placehold.co/300x300.png?text=MK', hint: 'woman with herbs', phone: '9678901241', email: 'muthulakshmi.k@example.com', salary: 620, rating: 4.9 },
    { name: 'Ramakrishnan V', age: 38, skills: ['Groundnut harvesting', 'Driving'], location: 'Ambasamudram, Tirunelveli', image: 'https://placehold.co/300x300.png?text=RV', hint: 'man driving tractor', phone: '9678901242', email: 'ramakrishnan.v@example.com', salary: 780, rating: 4.5 },
    { name: 'Mariammal R', age: 48, skills: ['Weeding', 'General farm hand'], location: 'Ambasamudram, Tirunelveli', image: 'https://placehold.co/300x300.png?text=MR', hint: 'woman working in field', phone: '9678901243', email: 'mariammal.r@example.com', salary: 480, rating: 4.4 },
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
           <div className="flex items-center pt-1">
            <Star className="mr-2 h-4 w-4 text-amber-400" />
            <span className="font-semibold">{worker.rating}/5.0</span>
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
                    <Mail className="mr-3 h-5 w-5 text-muted-foreground" />
                    <a href={`mailto:${selectedWorker.email}`} className="text-primary hover:underline">{selectedWorker.email}</a>
                </div>
                 <div className="flex items-center">
                    <DollarSign className="mr-3 h-5 w-5 text-muted-foreground" />
                    <span>Expected Salary: ₹{selectedWorker.salary} / day</span>
                </div>
                 <div className="flex items-center">
                    <Star className="mr-3 h-5 w-5 text-amber-400 fill-amber-400" />
                    <span>Rating: {selectedWorker.rating}/5.0</span>
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

    