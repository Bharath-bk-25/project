
'use client';
import { useState, useEffect } from 'react';
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
import { Contact, MapPin, Briefcase, User as UserIcon, Calendar as CalendarIconLucide, Star, DollarSign, MessageSquare, Phone } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { Textarea } from '@/components/ui/textarea';

type Worker = {
  name: string;
  age: number;
  skills: string[];
  location: string;
  image: string;
  hint: string;
  salary: number;
  rating: number;
  phone: string;
};

const staticWorkers: Worker[] = [
    // Coimbatore
    { name: 'Karthik Raja', age: 40, skills: ['Tractor Operation', 'Coconut Plucking'], location: 'Pollachi, Coimbatore', image: 'https://placehold.co/300x300.png?text=KR', hint: 'man portrait', salary: 750, rating: 4.8, phone: '9876543210' },
    { name: 'Mani Kandan', age: 38, skills: ['Pest Control', 'Irrigation'], location: 'Pollachi, Coimbatore', image: 'https://placehold.co/300x300.png?text=MK', hint: 'farmer smiling', salary: 650, rating: 4.5, phone: '9876543211' },
    { name: 'Anjali Devi', age: 33, skills: ['Weeding', 'Harvesting'], location: 'Pollachi, Coimbatore', image: 'https://placehold.co/300x300.png?text=AD', hint: 'woman in field', salary: 500, rating: 4.7, phone: '9876543212' },
    { name: 'Suresh Kumar', age: 45, skills: ['Coconut Tree Climbing', 'Spraying'], location: 'Pollachi, Coimbatore', image: 'https://placehold.co/300x300.png?text=SK', hint: 'man climbing tree', salary: 800, rating: 4.9, phone: '9876543213' },
    { name: 'Priya Varman', age: 29, skills: ['Vegetable Picking', 'Sorting'], location: 'Pollachi, Coimbatore', image: 'https://placehold.co/300x300.png?text=PV', hint: 'young woman portrait', salary: 550, rating: 4.6, phone: '9876543214' },

    { name: 'Deepa Selvi', age: 32, skills: ['Vegetable Farming', 'Poultry Care'], location: 'Mettupalayam, Coimbatore', image: 'https://placehold.co/300x300.png?text=DS', hint: 'woman portrait', salary: 600, rating: 4.7, phone: '9876543215' },
    { name: 'Ravi Verma', age: 41, skills: ['Arecanut Harvesting', 'Drip Irrigation'], location: 'Mettupalayam, Coimbatore', image: 'https://placehold.co/300x300.png?text=RV', hint: 'man in farm', salary: 700, rating: 4.5, phone: '9876543216' },
    { name: 'Kamala Hassan', age: 39, skills: ['Flower Picking', 'Nursery Work'], location: 'Mettupalayam, Coimbatore', image: 'https://placehold.co/300x300.png?text=KH', hint: 'woman with flowers', salary: 550, rating: 4.8, phone: '9876543217' },
    { name: 'Ganesh Pandi', age: 35, skills: ['Turmeric Cultivation', 'Machine Operation'], location: 'Mettupalayam, Coimbatore', image: 'https://placehold.co/300x300.png?text=GP', hint: 'man on tractor', salary: 750, rating: 4.6, phone: '9876543218' },
    { name: 'Meena Kumari', age: 28, skills: ['General Farm Hand', 'Weeding'], location: 'Mettupalayam, Coimbatore', image: 'https://placehold.co/300x300.png?text=MK', hint: 'young woman smiling', salary: 450, rating: 4.4, phone: '9876543219' },
    
    { name: 'Arun Kumar', age: 28, skills: ['Irrigation Setup', 'Pest Control'], location: 'Annur, Coimbatore', image: 'https://placehold.co/300x300.png?text=AK', hint: 'young man', salary: 650, rating: 4.5, phone: '9876543220' },
    { name: 'Sathish Kumar', age: 31, skills: ['Maize Farming', 'Harvesting'], location: 'Annur, Coimbatore', image: 'https://placehold.co/300x300.png?text=SK', hint: 'man in a cornfield', salary: 700, rating: 4.6, phone: '9876543221' },
    { name: 'Vanitha Selvam', age: 36, skills: ['Cotton Picking', 'Manual Weeding'], location: 'Annur, Coimbatore', image: 'https://placehold.co/300x300.png?text=VS', hint: 'woman picking cotton', salary: 500, rating: 4.7, phone: '9876543222' },
    { name: 'Murugan P', age: 43, skills: ['Ploughing', 'Sowing'], location: 'Annur, Coimbatore', image: 'https://placehold.co/300x300.png?text=MP', hint: 'farmer ploughing', salary: 750, rating: 4.8, phone: '9876543223' },
    { name: 'Lakshmi Priya', age: 30, skills: ['Vegetable Nursery', 'Seed Treatment'], location: 'Annur, Coimbatore', image: 'https://placehold.co/300x300.png?text=LP', hint: 'woman with seedlings', salary: 550, rating: 4.9, phone: '9876543224' },

    { name: 'Saravanan M', age: 42, skills: ['Maize Cultivation', 'Harvesting'], location: 'Sulur, Coimbatore', image: 'https://placehold.co/300x300.png?text=SM', hint: 'farmer portrait', salary: 720, rating: 4.7, phone: '9876543225' },
    { name: 'Karthikeyan R', age: 39, skills: ['Poultry Farm Management', 'Feed Mixing'], location: 'Sulur, Coimbatore', image: 'https://placehold.co/300x300.png?text=KR', hint: 'man with chickens', salary: 680, rating: 4.6, phone: '9876543226' },
    { name: 'Shanthi Murugan', age: 41, skills: ['Vegetable Farming', 'Packing'], location: 'Sulur, Coimbatore', image: 'https://placehold.co/300x300.png?text=SM', hint: 'woman with vegetables', salary: 520, rating: 4.8, phone: '9876543227' },
    { name: 'Rajesh V', age: 29, skills: ['Driving', 'Loading/Unloading'], location: 'Sulur, Coimbatore', image: 'https://placehold.co/300x300.png?text=RV', hint: 'man driving truck', salary: 600, rating: 4.5, phone: '9876543228' },
    { name: 'Divya Bharathi', age: 27, skills: ['General Farm Labor', 'Weeding'], location: 'Sulur, Coimbatore', image: 'https://placehold.co/300x300.png?text=DB', hint: 'young woman in farm', salary: 480, rating: 4.3, phone: '9876543229' },

    { name: 'Priya Mohan', age: 35, skills: ['Organic Farming', 'Grafting'], location: 'Kinathukadavu, Coimbatore', image: 'https://placehold.co/300x300.png?text=PM', hint: 'woman smiling', salary: 650, rating: 4.9, phone: '9876543230' },
    { name: 'Mohan Das', age: 48, skills: ['Tomato Farming', 'Staking'], location: 'Kinathukadavu, Coimbatore', image: 'https://placehold.co/300x300.png?text=MD', hint: 'man in tomato field', salary: 700, rating: 4.7, phone: '9876543231' },
    { name: 'Geetha Rani', age: 40, skills: ['Chilli Picking', 'Drying'], location: 'Kinathukadavu, Coimbatore', image: 'https://placehold.co/300x300.png?text=GR', hint: 'woman with chillies', salary: 550, rating: 4.6, phone: '9876543232' },
    { name: 'Loganathan S', age: 36, skills: ['Coconut Harvesting', 'Spraying'], location: 'Kinathukadavu, Coimbatore', image: 'https://placehold.co/300x300.png?text=LS', hint: 'man with coconuts', salary: 800, rating: 4.8, phone: '9876543233' },
    { name: 'Amutha Valli', age: 31, skills: ['Weeding', 'General Maintenance'], location: 'Kinathukadavu, Coimbatore', image: 'https://placehold.co/300x300.png?text=AV', hint: 'woman working in field', salary: 470, rating: 4.5, phone: '9876543234' },

    // Madurai
    { name: 'Muthu Pandi', age: 45, skills: ['Paddy Cultivation', 'Jasmine Harvesting'], location: 'Thirumangalam, Madurai', image: 'https://placehold.co/300x300.png?text=MP', hint: 'farmer portrait', salary: 700, rating: 4.7, phone: '9876543235' },
    { name: 'Pandiyamma M', age: 42, skills: ['Flower Stringing', 'Weeding'], location: 'Thirumangalam, Madurai', image: 'https://placehold.co/300x300.png?text=PM', hint: 'woman with flowers', salary: 450, rating: 4.8, phone: '9876543236' },
    { name: 'Alagarsamy K', age: 50, skills: ['Sugarcane Cutting', 'Loading'], location: 'Thirumangalam, Madurai', image: 'https://placehold.co/300x300.png?text=AK', hint: 'man cutting sugarcane', salary: 800, rating: 4.6, phone: '9876543237' },
    { name: 'Kasthuri R', age: 35, skills: ['Paddy Transplanting', 'Harvesting'], location: 'Thirumangalam, Madurai', image: 'https://placehold.co/300x300.png?text=KR', hint: 'woman in paddy field', salary: 550, rating: 4.9, phone: '9876543238' },
    { name: 'Veeramani S', age: 39, skills: ['Tractor Driving', 'Ploughing'], location: 'Thirumangalam, Madurai', image: 'https://placehold.co/300x300.png?text=VS', hint: 'man on tractor', salary: 850, rating: 4.8, phone: '9876543239' },

    { name: 'Meenakshi Sundaram', age: 38, skills: ['Banana Cultivation', 'Sugarcane Cutting'], location: 'Usilampatti, Madurai', image: 'https://placehold.co/300x300.png?text=MS', hint: 'woman in a field', salary: 750, rating: 4.6, phone: '9876543240' },
    { name: 'Karuppan C', age: 44, skills: ['Cotton Farming', 'Pest control'], location: 'Usilampatti, Madurai', image: 'https://placehold.co/300x300.png?text=KC', hint: 'man spraying pesticides', salary: 650, rating: 4.4, phone: '9876543241' },
    { name: 'Valliammai P', age: 40, skills: ['Maize de-husking', 'Drying'], location: 'Usilampatti, Madurai', image: 'https://placehold.co/300x300.png?text=VP', hint: 'woman with maize', salary: 500, rating: 4.7, phone: '9876543242' },
    { name: 'Thevaraj M', age: 52, skills: ['General Farm Hand', 'Livestock care'], location: 'Usilampatti, Madurai', image: 'https://placehold.co/300x300.png?text=TM', hint: 'older man with cattle', salary: 600, rating: 4.5, phone: '9876543243' },
    { name: 'Chellamma G', age: 36, skills: ['Weeding', 'Vegetable harvesting'], location: 'Usilampatti, Madurai', image: 'https://placehold.co/300x300.png?text=CG', hint: 'woman harvesting vegetables', salary: 480, rating: 4.6, phone: '9876543244' },
    
    // Tiruchirappalli
    { name: 'Ravi Chandran', age: 37, skills: ['Irrigation Management', 'Farm Machinery'], location: 'Lalgudi, Tiruchirappalli', image: 'https://placehold.co/300x300.png?text=RC', hint: 'man smiling', salary: 800, rating: 4.8, phone: '9876543245' },
    { name: 'Chandralekha R', age: 34, skills: ['Paddy Transplanting', 'Weeding'], location: 'Lalgudi, Tiruchirappalli', image: 'https://placehold.co/300x300.png?text=CR', hint: 'woman in paddy field', salary: 550, rating: 4.7, phone: '9876543246' },
    { name: 'Baskaran T', age: 45, skills: ['Sugarcane Harvesting', 'Loading'], location: 'Lalgudi, Tiruchirappalli', image: 'https://placehold.co/300x300.png?text=BT', hint: 'man cutting sugarcane', salary: 820, rating: 4.6, phone: '9876543247' },
    { name: 'Poornima S', age: 29, skills: ['Banana Cultivation', 'De-leafing'], location: 'Lalgudi, Tiruchirappalli', image: 'https://placehold.co/300x300.png?text=PS', hint: 'woman in banana plantation', salary: 600, rating: 4.9, phone: '9876543248' },
    { name: 'Mani K', age: 40, skills: ['Tractor driving', 'General farm work'], location: 'Lalgudi, Tiruchirappalli', image: 'https://placehold.co/300x300.png?text=MK', hint: 'man on tractor', salary: 850, rating: 4.7, phone: '9876543249' },

    { name: 'Sangeetha Bala', age: 30, skills: ['Flower Cultivation', 'Nursery Management'], location: 'Srirangam, Tiruchirappalli', image: 'https://placehold.co/300x300.png?text=SB', hint: 'young woman', salary: 600, rating: 4.8, phone: '9876543250' },
    { name: 'Bala Murugan', age: 35, skills: ['Garland Making', 'Flower harvesting'], location: 'Srirangam, Tiruchirappalli', image: 'https://placehold.co/300x300.png?text=BM', hint: 'man with flowers', salary: 550, rating: 4.9, phone: '9876543251' },
    { name: 'Kokila Vani', age: 28, skills: ['Betel Leaf Picking', 'Packing'], location: 'Srirangam, Tiruchirappalli', image: 'https://placehold.co/300x300.png?text=KV', hint: 'woman picking leaves', salary: 480, rating: 4.7, phone: '9876543252' },
    { name: 'Rangarajan V', age: 55, skills: ['Temple flower supply chain', 'Logistics'], location: 'Srirangam, Tiruchirappalli', image: 'https://placehold.co/300x300.png?text=RV', hint: 'older man portrait', salary: 700, rating: 4.5, phone: '9876543253' },
    { name: 'Jayanthi R', age: 42, skills: ['Retail stall management', 'Sales'], location: 'Srirangam, Tiruchirappalli', image: 'https://placehold.co/300x300.png?text=JR', hint: 'woman at market stall', salary: 500, rating: 4.6, phone: '9876543254' },
    
    // Salem
    { name: 'Vignesh Kumar', age: 28, skills: ['Mango Farming', 'Grafting'], location: 'Attur, Salem', image: 'https://placehold.co/300x300.png?text=VK', hint: 'young man', salary: 700, rating: 4.8, phone: '9876543255' },
    { name: 'Kumarasamy P', age: 48, skills: ['Mango Harvesting', 'Sorting'], location: 'Attur, Salem', image: 'https://placehold.co/300x300.png?text=KP', hint: 'man with mangoes', salary: 750, rating: 4.7, phone: '9876543256' },
    { name: 'Malliga S', age: 41, skills: ['Tapioca Harvesting', 'Processing'], location: 'Attur, Salem', image: 'https://placehold.co/300x300.png?text=MS', hint: 'woman with tapioca', salary: 600, rating: 4.6, phone: '9876543257' },
    { name: 'Sarath Babu', age: 31, skills: ['Pest management', 'Spraying'], location: 'Attur, Salem', image: 'https://placehold.co/300x300.png?text=SB', hint: 'man spraying crops', salary: 650, rating: 4.5, phone: '9876543258' },
    { name: 'Deepa K', age: 29, skills: ['General farm hand', 'Weeding'], location: 'Attur, Salem', image: 'https://placehold.co/300x300.png?text=DK', hint: 'young woman working', salary: 480, rating: 4.4, phone: '9876543259' },
    
    { name: 'Anitha Murugan', age: 33, skills: ['Tapioca Cultivation', 'Sago Production'], location: 'Mettur, Salem', image: 'https://placehold.co/300x300.png?text=AM', hint: 'indian woman', salary: 620, rating: 4.7, phone: '9876543260' },
    { name: 'Murugesan L', age: 46, skills: ['Sugarcane cutting', 'Farm machinery operation'], location: 'Mettur, Salem', image: 'https://placehold.co/300x300.png?text=ML', hint: 'man on farm', salary: 800, rating: 4.5, phone: '9876543261' },
    { name: 'Selvi R', age: 38, skills: ['Fishing (Reservoir)', 'Net mending'], location: 'Mettur, Salem', image: 'https://placehold.co/300x300.png?text=SR', hint: 'woman with fishing net', salary: 550, rating: 4.3, phone: '9876543262' },
    { name: 'Kannan V', age: 40, skills: ['General Maintenance', 'Driving'], location: 'Mettur, Salem', image: 'https://placehold.co/300x300.png?text=KV', hint: 'man driving truck', salary: 600, rating: 4.2, phone: '9876543263' },
    { name: 'Pappaothi A', age: 50, skills: ['Weeding', 'Cotton picking'], location: 'Mettur, Salem', image: 'https://placehold.co/300x300.png?text=PA', hint: 'older woman in field', salary: 450, rating: 4.6, phone: '9876543264' },
    
    // Erode
    { name: 'Senthil Nathan', age: 39, skills: ['Turmeric Cultivation', 'Textile Crop Mgmt.'], location: 'Bhavani, Erode', image: 'https://placehold.co/300x300.png?text=SN', hint: 'man portrait', salary: 780, rating: 4.9, phone: '9876543265' },
    { name: 'Natarajan S', age: 47, skills: ['Carpet Weaving', 'Dyeing'], location: 'Bhavani, Erode', image: 'https://placehold.co/300x300.png?text=NS', hint: 'man weaving', salary: 700, rating: 4.7, phone: '9876543266' },
    { name: 'Bhavani K', age: 41, skills: ['Turmeric polishing', 'Packing'], location: 'Bhavani, Erode', image: 'https://placehold.co/300x300.png?text=BK', hint: 'woman with turmeric', salary: 600, rating: 4.8, phone: '9876543267' },
    { name: 'Kumar T', age: 33, skills: ['Paddy harvesting', 'Threshing'], location: 'Bhavani, Erode', image: 'https://placehold.co/300x300.png?text=KT', hint: 'man in paddy field', salary: 650, rating: 4.6, phone: '9876543268' },
    { name: 'Mekala P', age: 30, skills: ['General farm hand', 'Irrigation'], location: 'Bhavani, Erode', image: 'https://placehold.co/300x300.png?text=MP', hint: 'woman working with water', salary: 500, rating: 4.5, phone: '9876543269' },

    { name: 'Kavitha Loganathan', age: 31, skills: ['Sugarcane Harvesting', 'Poultry Farming'], location: 'Gobichettipalayam, Erode', image: 'https://placehold.co/300x300.png?text=KL', hint: 'woman smiling', salary: 680, rating: 4.7, phone: '9876543270' },
    { name: 'Loganathan R', age: 36, skills: ['Paddy cultivation', 'Tractor driving'], location: 'Gobichettipalayam, Erode', image: 'https://placehold.co/300x300.png?text=LR', hint: 'man on tractor', salary: 850, rating: 4.8, phone: '9876543271' },
    { name: 'Saraswathi M', age: 45, skills: ['Coconut harvesting', 'Copra making'], location: 'Gobichettipalayam, Erode', image: 'https://placehold.co/300x300.png?text=SM', hint: 'woman with coconuts', salary: 700, rating: 4.9, phone: '9876543272' },
    { name: 'Periyasamy K', age: 52, skills: ['Cattle rearing', 'Dairy work'], location: 'Gobichettipalayam, Erode', image: 'https://placehold.co/300x300.png?text=PK', hint: 'man with cow', salary: 650, rating: 4.6, phone: '9876543273' },
    { name: 'Anitha S', age: 28, skills: ['Vegetable picking', 'Weeding'], location: 'Gobichettipalayam, Erode', image: 'https://placehold.co/300x300.png?text=AS', hint: 'young woman picking vegetables', salary: 520, rating: 4.5, phone: '9876543274' },

    // Vellore
    { name: 'Gopalakrishnan V', age: 41, skills: ['Leather Tanning (Agri-use)', 'Paddy Cultivation'], location: 'Ambur, Vellore', image: 'https://placehold.co/300x300.png?text=GV', hint: 'man with a beard', salary: 750, rating: 4.4, phone: '9876543275' },
    { name: 'Syed Basha', age: 45, skills: ['Biryani Rice Cultivation', 'Marketing'], location: 'Ambur, Vellore', image: 'https://placehold.co/300x300.png?text=SB', hint: 'man in rice field', salary: 700, rating: 4.6, phone: '9876543276' },
    { name: 'Fathima Rizwan', age: 39, skills: ['Leather Goods Stitching', 'Quality Check'], location: 'Ambur, Vellore', image: 'https://placehold.co/300x300.png?text=FR', hint: 'woman stitching leather', salary: 600, rating: 4.7, phone: '9876543277' },
    { name: 'Mani E', age: 35, skills: ['Sugarcane harvesting', 'General Labor'], location: 'Ambur, Vellore', image: 'https://placehold.co/300x300.png?text=ME', hint: 'man working in field', salary: 800, rating: 4.5, phone: '9876543278' },
    { name: 'Ayesha Begum', age: 31, skills: ['Jasmine picking', 'Weeding'], location: 'Ambur, Vellore', image: 'https://placehold.co/300x300.png?text=AB', hint: 'woman with jasmine', salary: 500, rating: 4.8, phone: '9876543279' },

    { name: 'Brindha Sarathy', age: 27, skills: ['Jasmine Plucking', 'Brinjal Farming'], location: 'Vaniyambadi, Vellore', image: 'https://placehold.co/300x300.png?text=BS', hint: 'young indian woman', salary: 550, rating: 4.9, phone: '9876543280' },
    { name: 'Sarathy P', age: 32, skills: ['Groundnut Cultivation', 'Harvesting'], location: 'Vaniyambadi, Vellore', image: 'https://placehold.co/300x300.png?text=SP', hint: 'man in groundnut field', salary: 720, rating: 4.7, phone: '9876543281' },
    { name: 'Parveen Taj', age: 40, skills: ['Leather processing', 'Chemical handling'], location: 'Vaniyambadi, Vellore', image: 'https://placehold.co/300x300.png?text=PT', hint: 'woman in workshop', salary: 650, rating: 4.3, phone: '9876543282' },
    { name: 'Irfan Khan', age: 29, skills: ['Driving', 'Loading'], location: 'Vaniyambadi, Vellore', image: 'https://placehold.co/300x300.png?text=IK', hint: 'man next to truck', salary: 700, rating: 4.5, phone: '9876543283' },
    { name: 'Sumathi G', age: 36, skills: ['General farm hand', 'Sowing'], location: 'Vaniyambadi, Vellore', image: 'https://placehold.co/300x300.png?text=SG', hint: 'woman sowing seeds', salary: 480, rating: 4.6, phone: '9876543284' },

    // Tirunelveli
    { name: 'Arumugam Pillai', age: 52, skills: ['Palm Tree Climbing', 'Paddy Harvesting'], location: 'Palayamkottai, Tirunelveli', image: 'https://placehold.co/300x300.png?text=AP', hint: 'older man', salary: 850, rating: 4.9, phone: '9876543285' },
    { name: 'Pillai Rajan', age: 49, skills: ['Banana Cultivation', 'Irrigation'], location: 'Palayamkottai, Tirunelveli', image: 'https://placehold.co/300x300.png?text=PR', hint: 'man in banana farm', salary: 750, rating: 4.7, phone: '9876543286' },
    { name: 'Thangam A', age: 45, skills: ['Cotton Picking', 'Weeding'], location: 'Palayamkottai, Tirunelveli', image: 'https://placehold.co/300x300.png?text=TA', hint: 'woman picking cotton', salary: 500, rating: 4.6, phone: '9876543287' },
    { name: 'Nellaiyappan S', age: 55, skills: ['Ploughing', 'General Maintenance'], location: 'Palayamkottai, Tirunelveli', image: 'https://placehold.co/300x300.png?text=NS', hint: 'older farmer portrait', salary: 700, rating: 4.5, phone: '9876543288' },
    { name: 'Kanthimathi T', age: 40, skills: ['Halwa Making (Agri-product)', 'Sales'], location: 'Palayamkottai, Tirunelveli', image: 'https://placehold.co/300x300.png?text=KT', hint: 'woman making sweets', salary: 600, rating: 4.8, phone: '9876543289' },
    
    { name: 'Esakki Ammal', age: 46, skills: ['Chilli Farming', 'Cotton Picking'], location: 'Ambasamudram, Tirunelveli', image: 'https://placehold.co/300x300.png?text=EA', hint: 'older indian woman', salary: 550, rating: 4.7, phone: '9876543290' },
    { name: 'Sankaralingam P', age: 51, skills: ['Paddy Cultivation', 'Forest Produce Collection'], location: 'Ambasamudram, Tirunelveli', image: 'https://placehold.co/300x300.png?text=SP', hint: 'man in forest area', salary: 720, rating: 4.6, phone: '9876543291' },
    { name: 'Muthulakshmi K', age: 42, skills: ['Herbal Plant Collection', 'Drying'], location: 'Ambasamudram, Tirunelveli', image: 'https://placehold.co/300x300.png?text=MK', hint: 'woman with herbs', salary: 620, rating: 4.9, phone: '9876543292' },
    { name: 'Ramakrishnan V', age: 38, skills: ['Groundnut harvesting', 'Driving'], location: 'Ambasamudram, Tirunelveli', image: 'https://placehold.co/300x300.png?text=RV', hint: 'man driving tractor', salary: 780, rating: 4.5, phone: '9876543293' },
    { name: 'Mariammal R', age: 48, skills: ['Weeding', 'General farm hand'], location: 'Ambasamudram, Tirunelveli', image: 'https://placehold.co/300x300.png?text=MR', hint: 'woman working in field', salary: 480, rating: 4.4, phone: '9876543294' },
];

export default function FarmerDashboard() {
  const [workers, setWorkers] = useState<Worker[]>(staticWorkers);
  const [isCreatePostOpen, setCreatePostOpen] = useState(false);
  const [isContactWorkerOpen, setContactWorkerOpen] = useState(false);
  const [isMessageWorkerOpen, setMessageWorkerOpen] = useState(false);
  const [selectedWorker, setSelectedWorker] = useState<Worker | null>(null);
  const [message, setMessage] = useState('');
  const [conversation, setConversation] = useState<string[]>([]);
  const [date, setDate] = useState<Date | undefined>(new Date());

  useEffect(() => {
    async function fetchUsers() {
      try {
        const response = await fetch('/data/users.json');
        if (!response.ok) {
          if (response.status === 404) {
            console.log('users.json not found, using static data.');
            return;
          }
          throw new Error('Failed to fetch user data');
        }
        const users = await response.json();
        const newWorkers = users.filter((user: any) => user.type === 'worker').map((user: any): Worker => ({
            name: user.name,
            age: parseInt(user.age, 10) || 0,
            skills: typeof user.skills === 'string' ? user.skills.split(',').map((s: string) => s.trim()) : [],
            location: user.location || 'Newly Registered',
            image: `https://placehold.co/300x300.png?text=${user.name.charAt(0)}`,
            hint: 'worker portrait',
            salary: parseInt(user.expectedSalary, 10) || 0,
            rating: 4.5,
            phone: '123-456-7890'
        }));
        setWorkers(prevWorkers => [...prevWorkers, ...newWorkers]);
      } catch (error) {
        console.error("Could not fetch workers:", error);
        setWorkers(staticWorkers);
      }
    }
    fetchUsers();
  }, []);

  const handleContactClick = (worker: Worker) => {
    setSelectedWorker(worker);
    setContactWorkerOpen(true);
  };
  
  const handleMessageClick = (worker: Worker) => {
    setSelectedWorker(worker);
    setContactWorkerOpen(false);
    setConversation([]);
    setMessageWorkerOpen(true);
  };

  const handleSendMessage = () => {
    if (!message.trim() || !selectedWorker) return;

    const newConversation = [...conversation, `You: ${message}`];
    
     // Simulate sending a notification
    const notifications = JSON.parse(localStorage.getItem('notifications') || '[]');
    const newNotification = {
      id: Date.now(),
      farmerName: 'Current Farmer', // In a real app, this would be the logged-in farmer's name
      workerName: selectedWorker.name,
      message,
      read: false,
    };
    notifications.push(newNotification);
    localStorage.setItem('notifications', JSON.stringify(notifications));


    setTimeout(() => {
        setConversation(conv => [...conv, `${selectedWorker.name}: Thank you for your message. I will get back to you soon.`]);
    }, 1000);

    setConversation(newConversation);
    setMessage('');
  };

  const workersByDistrict = workers.reduce((acc, worker) => {
    const locationParts = worker.location.split(', ');
    const district = locationParts.length > 1 ? locationParts[1] : 'Newly Registered';
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
            <span>{worker.location.split(', ')[0]}</span>
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
              <div className="flex items-center">
                <Phone className="mr-3 h-5 w-5 text-muted-foreground" />
                <a href={`tel:${selectedWorker.phone}`} className="text-primary hover:underline">{selectedWorker.phone}</a>
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
            <DialogFooter className="sm:justify-between">
               <Button variant="outline" onClick={() => setContactWorkerOpen(false)}>Close</Button>
                <div className="flex gap-2">
                    <Button onClick={() => handleMessageClick(selectedWorker)}>
                        <MessageSquare className="mr-2 h-4 w-4" />
                        Message
                    </Button>
                </div>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {/* Message Worker Dialog */}
      {selectedWorker && (
        <Dialog open={isMessageWorkerOpen} onOpenChange={setMessageWorkerOpen}>
          <DialogContent className="sm:max-w-lg">
            <DialogHeader>
              <DialogTitle>Message {selectedWorker.name}</DialogTitle>
              <DialogDescription>
                Your conversation with {selectedWorker.name}.
              </DialogDescription>
            </DialogHeader>
            <div className="py-4 space-y-4">
              <div className="h-[300px] overflow-y-auto p-4 border rounded-md bg-muted/50 space-y-2">
                {conversation.length === 0 && (
                    <div className="flex items-center justify-center h-full text-muted-foreground">
                        Start the conversation.
                    </div>
                )}
                {conversation.map((msg, index) => (
                  <div key={index} className={cn(
                      "flex",
                      msg.startsWith('You:') ? 'justify-end' : 'justify-start'
                  )}>
                    <p className={cn(
                        "text-sm p-2 rounded-lg max-w-[80%]",
                        msg.startsWith('You:') ? 'bg-primary text-primary-foreground' : 'bg-secondary'
                    )}>
                        {msg.substring(msg.indexOf(':') + 1).trim()}
                    </p>
                  </div>
                ))}
              </div>
              <div className="flex gap-2">
                <Textarea
                  placeholder={`Type your message for ${selectedWorker.name}...`}
                  rows={1}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleSendMessage();
                    }
                  }}
                  className="flex-1"
                />
                <Button onClick={handleSendMessage} disabled={!message.trim()}>
                  Send
                </Button>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => {
                  setMessageWorkerOpen(false);
                  setConversation([]); // Reset conversation when closing
              }}>Close</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
