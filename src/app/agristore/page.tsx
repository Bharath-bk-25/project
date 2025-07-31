'use client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { DashboardHeader } from '@/components/dashboard-header';
import Image from 'next/image';
import { ShoppingCart, PackageX, Store } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useToast } from '@/hooks/use-toast';
import type { Product } from '@/context/CartContext';
import { Badge } from '@/components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const products: Product[] = [
  // Coimbatore
  { id: 'fert-1', name: 'Urea (யூரியா)', description: 'N-P-K: 46-0-0', price: 266.50, image: 'https://placehold.co/400x400.png', hint: 'fertilizer bag', shopName: 'Kumar Fertilizers', shopLocation: 'Coimbatore', isAvailable: true },
  { id: 'prod-2', name: 'Sugarcane Setts (கரும்பு கரணை)', description: 'Disease-resistant', price: 3, image: 'https://placehold.co/400x400.png', hint: 'sugarcane cutting', shopName: 'Kumar Fertilizers', shopLocation: 'Coimbatore', isAvailable: false },
  { id: 'tool-11', name: 'Crowbar (கடப்பாரை)', description: 'Heavy duty steel', price: 750, image: 'https://placehold.co/400x400.png', hint: 'crowbar tool', shopName: 'Kumar Fertilizers', shopLocation: 'Coimbatore', isAvailable: true },
  { id: 'seed-c1', name: 'Sorghum Seeds (சோளம்)', description: 'High-yield hybrid', price: 320, image: 'https://placehold.co/400x400.png', hint: 'sorghum seeds', shopName: 'Kumar Fertilizers', shopLocation: 'Coimbatore', isAvailable: true },
  { id: 'tool-c1', name: 'Wheelbarrow (கை வண்டி)', description: 'Single wheel', price: 2500, image: 'https://placehold.co/400x400.png', hint: 'wheelbarrow', shopName: 'Kumar Fertilizers', shopLocation: 'Coimbatore', isAvailable: true },
  { id: 'kf-6', name: 'Ammonium Phosphate', description: '20-20-0-13', price: 1200, image: 'https://placehold.co/400x400.png', hint: 'fertilizer bag', shopName: 'Kumar Fertilizers', shopLocation: 'Coimbatore', isAvailable: true },
  { id: 'kf-7', name: 'Tractor Tiller', description: '5-tine cultivator', price: 15000, image: 'https://placehold.co/400x400.png', hint: 'tractor tiller', shopName: 'Kumar Fertilizers', shopLocation: 'Coimbatore', isAvailable: true },
  { id: 'kf-8', name: 'Paddy Seeds (IR-20)', description: 'Medium grain', price: 55, image: 'https://placehold.co/400x400.png', hint: 'paddy seed', shopName: 'Kumar Fertilizers', shopLocation: 'Coimbatore', isAvailable: false },
  { id: 'kf-9', name: 'Knapsack Sprayer', description: '16L capacity, manual', price: 1800, image: 'https://placehold.co/400x400.png', hint: 'sprayer backpack', shopName: 'Kumar Fertilizers', shopLocation: 'Coimbatore', isAvailable: true },
  { id: 'kf-10', name: 'Tarpaulin Sheet', description: '12x18 ft, waterproof', price: 800, image: 'https://placehold.co/400x400.png', hint: 'blue tarp', shopName: 'Kumar Fertilizers', shopLocation: 'Coimbatore', isAvailable: true },
  { id: 'kf-11', name: 'Safety Boots', description: 'Steel-toe, size 9', price: 1100, image: 'https://placehold.co/400x400.png', hint: 'work boots', shopName: 'Kumar Fertilizers', shopLocation: 'Coimbatore', isAvailable: true },

  { id: 'fert-5', name: 'Bio-Fertilizer (உயிர் உரம்)', description: 'Improves soil health', price: 450, image: 'https://placehold.co/400x400.png', hint: 'compost bag', shopName: 'Covai Agro Center', shopLocation: 'Coimbatore', isAvailable: true },
  { id: 'seed-8', name: 'Vegetable Seeds (காய்கறி விதைகள்)', description: 'Assorted pack', price: 150, image: 'https://placehold.co/400x400.png', hint: 'seed packets', shopName: 'Covai Agro Center', shopLocation: 'Coimbatore', isAvailable: true },
  { id: 'prod-c1', name: 'Turmeric Powder (மஞ்சள் தூள்)', description: '1kg pack, organic', price: 400, image: 'https://placehold.co/400x400.png', hint: 'turmeric powder', shopName: 'Covai Agro Center', shopLocation: 'Coimbatore', isAvailable: true },
  { id: 'fert-c2', name: 'Rock Phosphate', description: 'Natural phosphorus', price: 500, image: 'https://placehold.co/400x400.png', hint: 'rock powder', shopName: 'Covai Agro Center', shopLocation: 'Coimbatore', isAvailable: true },
  { id: 'tool-c2', name: 'Watering Can', description: '5 litre capacity', price: 300, image: 'https://placehold.co/400x400.png', hint: 'watering can', shopName: 'Covai Agro Center', shopLocation: 'Coimbatore', isAvailable: false },
  { id: 'cac-6', name: 'Pesticide (Neem Oil)', description: '1L, organic', price: 700, image: 'https://placehold.co/400x400.png', hint: 'oil bottle', shopName: 'Covai Agro Center', shopLocation: 'Coimbatore', isAvailable: true },
  { id: 'cac-7', name: 'Fungicide (Trichoderma Viride)', description: '1kg powder', price: 350, image: 'https://placehold.co/400x400.png', hint: 'powder bag', shopName: 'Covai Agro Center', shopLocation: 'Coimbatore', isAvailable: true },
  { id: 'cac-8', name: 'Sticky Traps', description: 'Yellow, for insects (10 pack)', price: 250, image: 'https://placehold.co/400x400.png', hint: 'yellow trap', shopName: 'Covai Agro Center', shopLocation: 'Coimbatore', isAvailable: true },
  { id: 'cac-9', name: 'Shade Net', description: '50% green, 3m width', price: 120, image: 'https://placehold.co/400x400.png', hint: 'green net', shopName: 'Covai Agro Center', shopLocation: 'Coimbatore', isAvailable: false },
  { id: 'cac-10', name: 'Coco Peat Brick', description: '5kg block', price: 280, image: 'https://placehold.co/400x400.png', hint: 'coco coir', shopName: 'Covai Agro Center', shopLocation: 'Coimbatore', isAvailable: true },
  { id: 'cac-11', name: 'Grafting Tape', description: '1 inch width', price: 100, image: 'https://placehold.co/400x400.png', hint: 'tape roll', shopName: 'Covai Agro Center', shopLocation: 'Coimbatore', isAvailable: true },

  { id: 'prod-5', name: 'Coconut Sapling (தென்னங்கன்று)', description: 'West Coast Tall', price: 150, image: 'https://placehold.co/400x400.png', hint: 'coconut tree', shopName: 'Green Thumb Nursery', shopLocation: 'Coimbatore', isAvailable: true },
  { id: 'prod-c2', name: 'Guava Sapling (கொய்யா கன்று)', description: 'Pink flesh variety', price: 80, image: 'https://placehold.co/400x400.png', hint: 'guava tree', shopName: 'Green Thumb Nursery', shopLocation: 'Coimbatore', isAvailable: true },
  { id: 'prod-c3', name: 'Papaya Sapling (பப்பாளி கன்று)', description: 'Red Lady variety', price: 60, image: 'https://placehold.co/400x400.png', hint: 'papaya tree', shopName: 'Green Thumb Nursery', shopLocation: 'Coimbatore', isAvailable: true },
  { id: 'prod-c4', name: 'Rose Plant (ரோஜா செடி)', description: 'Button rose', price: 120, image: 'https://placehold.co/400x400.png', hint: 'rose flower', shopName: 'Green Thumb Nursery', shopLocation: 'Coimbatore', isAvailable: false },
  { id: 'prod-c5', name: 'Areca Nut Sapling', description: 'High-yield variety', price: 50, image: 'https://placehold.co/400x400.png', hint: 'areca plant', shopName: 'Green Thumb Nursery', shopLocation: 'Coimbatore', isAvailable: true },
  { id: 'gtn-6', name: 'Mango Sapling (Imam Pasand)', description: 'Grafted, 2 years old', price: 300, image: 'https://placehold.co/400x400.png', hint: 'mango tree', shopName: 'Green Thumb Nursery', shopLocation: 'Coimbatore', isAvailable: true },
  { id: 'gtn-7', name: 'Jasmine Plant (Sambac)', description: 'Highly fragrant', price: 70, image: 'https://placehold.co/400x400.png', hint: 'jasmine plant', shopName: 'Green Thumb Nursery', shopLocation: 'Coimbatore', isAvailable: true },
  { id: 'gtn-8', name: 'Bougainvillea Plant', description: 'Pink variety', price: 150, image: 'https://placehold.co/400x400.png', hint: 'bougainvillea flower', shopName: 'Green Thumb Nursery', shopLocation: 'Coimbatore', isAvailable: true },
  { id: 'gtn-9', name: 'Moringa Sapling', description: 'Drumstick tree', price: 40, image: 'https://placehold.co/400x400.png', hint: 'moringa tree', shopName: 'Green Thumb Nursery', shopLocation: 'Coimbatore', isAvailable: false },
  { id: 'gtn-10', name: 'Grow Bags (12x12 inch)', description: 'HDPE, pack of 10', price: 450, image: 'https://placehold.co/400x400.png', hint: 'grow bags', shopName: 'Green Thumb Nursery', shopLocation: 'Coimbatore', isAvailable: true },
  { id: 'gtn-11', name: 'Vermicompost (10kg)', description: 'Earthworm castings', price: 350, image: 'https://placehold.co/400x400.png', hint: 'compost bag', shopName: 'Green Thumb Nursery', shopLocation: 'Coimbatore', isAvailable: true },

  { id: 'tool-1', name: 'Hand Weeder (களையெடுப்பான்)', description: 'Durable and sharp', price: 350, image: 'https://placehold.co/400x400.png', hint: 'gardening tool', shopName: 'Saravana Tools', shopLocation: 'Coimbatore', isAvailable: true },
  { id: 'tool-c3', name: 'Hedge Shear', description: 'Manual, 10-inch blade', price: 850, image: 'https://placehold.co/400x400.png', hint: 'hedge shears', shopName: 'Saravana Tools', shopLocation: 'Coimbatore', isAvailable: true },
  { id: 'tool-c4', name: 'Axe (கோடாரி)', description: 'Wooden handle', price: 600, image: 'https://placehold.co/400x400.png', hint: 'axe tool', shopName: 'Saravana Tools', shopLocation: 'Coimbatore', isAvailable: true },
  { id: 'tool-c5', name: 'Billhook (அரிவாள்மனை)', description: 'For chopping', price: 450, image: 'https://placehold.co/400x400.png', hint: 'billhook knife', shopName: 'Saravana Tools', shopLocation: 'Coimbatore', isAvailable: true },
  { id: 'tool-c6', name: 'Hand Fork', description: '3-prong, for tilling', price: 250, image: 'https://placehold.co/400x400.png', hint: 'garden fork', shopName: 'Saravana Tools', shopLocation: 'Coimbatore', isAvailable: false },
  { id: 'st-6', name: 'Garden Trowel', description: 'Stainless steel', price: 200, image: 'https://placehold.co/400x400.png', hint: 'garden trowel', shopName: 'Saravana Tools', shopLocation: 'Coimbatore', isAvailable: true },
  { id: 'st-7', name: 'Pruning Saw', description: 'Folding type', price: 550, image: 'https://placehold.co/400x400.png', hint: 'folding saw', shopName: 'Saravana Tools', shopLocation: 'Coimbatore', isAvailable: true },
  { id: 'st-8', name: 'Pickaxe', description: 'With wooden handle', price: 800, image: 'https://placehold.co/400x400.png', hint: 'pickaxe tool', shopName: 'Saravana Tools', shopLocation: 'Coimbatore', isAvailable: true },
  { id: 'st-9', name: 'Rake', description: 'Metal, 12-teeth', price: 400, image: 'https://placehold.co/400x400.png', hint: 'garden rake', shopName: 'Saravana Tools', shopLocation: 'Coimbatore', isAvailable: true },
  { id: 'st-10', name: 'Sickle', description: 'Curved blade', price: 300, image: 'https://placehold.co/400x400.png', hint: 'sickle tool', shopName: 'Saravana Tools', shopLocation: 'Coimbatore', isAvailable: false },
  { id: 'st-11', name: 'Hoe', description: 'Heavy duty', price: 450, image: 'https://placehold.co/400x400.png', hint: 'hoe tool', shopName: 'Saravana Tools', shopLocation: 'Coimbatore', isAvailable: true },

  { id: 'seed-1', name: 'Maize Seeds (மக்காச்சோள விதைகள்)', description: 'Hybrid variety', price: 250, image: 'https://placehold.co/400x400.png', hint: 'maize seeds', shopName: 'Annapoorna Seeds', shopLocation: 'Coimbatore', isAvailable: true },
  { id: 'seed-c2', name: 'Ragi Seeds (கேழ்வரகு)', description: 'Finger Millet', price: 150, image: 'https://placehold.co/400x400.png', hint: 'ragi millet', shopName: 'Annapoorna Seeds', shopLocation: 'Coimbatore', isAvailable: true },
  { id: 'seed-c3', name: 'Black Gram Seeds (உளுந்து)', description: 'Whole, for cultivation', price: 180, image: 'https://placehold.co/400x400.png', hint: 'black gram', shopName: 'Annapoorna Seeds', shopLocation: 'Coimbatore', isAvailable: true },
  { id: 'seed-c4', name: 'Green Gram Seeds (பாசிப்பயறு)', description: 'Mung bean', price: 170, image: 'https://placehold.co/400x400.png', hint: 'green gram', shopName: 'Annapoorna Seeds', shopLocation: 'Coimbatore', isAvailable: false },
  { id: 'seed-c5', name: 'Horse Gram Seeds (கொள்ளு)', description: 'For fodder & cultivation', price: 120, image: 'https://placehold.co/400x400.png', hint: 'horse gram', shopName: 'Annapoorna Seeds', shopLocation: 'Coimbatore', isAvailable: true },
  { id: 'as-6', name: 'Groundnut Seeds', description: 'TMV-7 variety', price: 200, image: 'https://placehold.co/400x400.png', hint: 'groundnuts', shopName: 'Annapoorna Seeds', shopLocation: 'Coimbatore', isAvailable: true },
  { id: 'as-7', name: 'Cowpea Seeds', description: 'Bush type', price: 160, image: 'https://placehold.co/400x400.png', hint: 'cowpea beans', shopName: 'Annapoorna Seeds', shopLocation: 'Coimbatore', isAvailable: true },
  { id: 'as-8', name: 'Bhendi (Okra) Seeds', description: 'Hybrid F1', price: 90, image: 'https://placehold.co/400x400.png', hint: 'okra seeds', shopName: 'Annapoorna Seeds', shopLocation: 'Coimbatore', isAvailable: true },
  { id: 'as-9', name: 'Chilli Seeds', description: 'Hybrid, high pungency', price: 110, image: 'https://placehold.co/400x400.png', hint: 'chilli plant', shopName: 'Annapoorna Seeds', shopLocation: 'Coimbatore', isAvailable: false },
  { id: 'as-10', name: 'Tomato Seeds (Nattu Thakkali)', description: 'Country variety', price: 80, image: 'https://placehold.co/400x400.png', hint: 'tomato plant', shopName: 'Annapoorna Seeds', shopLocation: 'Coimbatore', isAvailable: true },
  { id: 'as-11', name: 'Brinjal Seeds (Green)', description: 'Long variety', price: 75, image: 'https://placehold.co/400x400.png', hint: 'green brinjal', shopName: 'Annapoorna Seeds', shopLocation: 'Coimbatore', isAvailable: true },

  // Madurai
  { id: 'fert-2', name: 'DAP (டி.ஏ.பி)', description: 'N-P-K: 18-46-0', price: 1350, image: 'https://placehold.co/400x400.png', hint: 'fertilizer sack', shopName: 'Priya Agri Supplies', shopLocation: 'Madurai', isAvailable: true },
  { id: 'prod-1', name: 'Paddy Seeds (நெல் விதைகள்)', description: 'High-yield variety', price: 40, image: 'https://placehold.co/400x400.png', hint: 'paddy seeds', shopName: 'Priya Agri Supplies', shopLocation: 'Madurai', isAvailable: true },
  { id: 'tool-12', name: 'Shovel ( ಸಲಿಕೆ)', description: 'Round point', price: 550, image: 'https://placehold.co/400x400.png', hint: 'shovel tool', shopName: 'Priya Agri Supplies', shopLocation: 'Madurai', isAvailable: true },
  { id: 'prod-m1', name: 'Banana Bunch', description: 'Fresh from farm', price: 350, image: 'https://placehold.co/400x400.png', hint: 'banana bunch', shopName: 'Priya Agri Supplies', shopLocation: 'Madurai', isAvailable: true },
  { id: 'seed-m1', name: 'Moringa Seeds', description: 'Drumstick seeds', price: 200, image: 'https://placehold.co/400x400.png', hint: 'moringa seeds', shopName: 'Priya Agri Supplies', shopLocation: 'Madurai', isAvailable: false },
  { id: 'pas-6', name: 'Potash', description: 'Muriate of Potash', price: 1750, image: 'https://placehold.co/400x400.png', hint: 'fertilizer bag', shopName: 'Priya Agri Supplies', shopLocation: 'Madurai', isAvailable: true },
  { id: 'pas-7', name: 'Cotton Seeds', description: 'BT Cotton, long staple', price: 900, image: 'https://placehold.co/400x400.png', hint: 'cotton plant', shopName: 'Priya Agri Supplies', shopLocation: 'Madurai', isAvailable: true },
  { id: 'pas-8', name: 'Hoe (மண்வெட்டி)', description: 'For tilling', price: 380, image: 'https://placehold.co/400x400.png', hint: 'hoe tool', shopName: 'Priya Agri Supplies', shopLocation: 'Madurai', isAvailable: true },
  { id: 'pas-9', name: 'Jasmine Sapling (Madurai Malli)', description: 'Fragrant variety', price: 60, image: 'https://placehold.co/400x400.png', hint: 'jasmine plant', shopName: 'Priya Agri Supplies', shopLocation: 'Madurai', isAvailable: true },
  { id: 'pas-10', name: 'Vermicompost (5kg)', description: 'Organic manure', price: 200, image: 'https://placehold.co/400x400.png', hint: 'compost bag', shopName: 'Priya Agri Supplies', shopLocation: 'Madurai', isAvailable: true },
  { id: 'pas-11', name: 'Sprayer (Battery)', description: '18L electric sprayer', price: 3500, image: 'https://placehold.co/400x400.png', hint: 'electric sprayer', shopName: 'Priya Agri Supplies', shopLocation: 'Madurai', isAvailable: false },

  { id: 'fert-6', name: 'Complex (காம்ப்ளக்ஸ்)', description: 'N-P-K: 20-20-13', price: 1470, image: 'https://placehold.co/400x400.png', hint: 'fertilizer granules', shopName: 'Meenakshi Traders', shopLocation: 'Madurai', isAvailable: true },
  { id: 'prod-m2', name: 'Jaggery (வெல்லம்)', description: 'Organic, 1kg block', price: 150, image: 'https://placehold.co/400x400.png', hint: 'jaggery block', shopName: 'Meenakshi Traders', shopLocation: 'Madurai', isAvailable: true },
  { id: 'prod-m3', name: 'Groundnut Oil', description: 'Cold pressed, 1L', price: 350, image: 'https://placehold.co/400x400.png', hint: 'oil bottle', shopName: 'Meenakshi Traders', shopLocation: 'Madurai', isAvailable: true },
  { id: 'tool-m1', name: 'Sprayer Pump', description: '2L manual sprayer', price: 600, image: 'https://placehold.co/400x400.png', hint: 'sprayer pump', shopName: 'Meenakshi Traders', shopLocation: 'Madurai', isAvailable: true },
  { id: 'fert-m1', name: 'Panchagavya', description: 'Organic growth promoter', price: 300, image: 'https://placehold.co/400x400.png', hint: 'liquid fertilizer', shopName: 'Meenakshi Traders', shopLocation: 'Madurai', isAvailable: true },
  { id: 'mt-6', name: 'Gingelly Oil', description: '1L bottle', price: 400, image: 'https://placehold.co/400x400.png', hint: 'oil bottle', shopName: 'Meenakshi Traders', shopLocation: 'Madurai', isAvailable: true },
  { id: 'mt-7', name: 'Neem Cake Powder', description: '5kg bag', price: 450, image: 'https://placehold.co/400x400.png', hint: 'powder bag', shopName: 'Meenakshi Traders', shopLocation: 'Madurai', isAvailable: true },
  { id: 'mt-8', name: 'Cow Dung Powder', description: 'Dried, 5kg', price: 150, image: 'https://placehold.co/400x400.png', hint: 'manure powder', shopName: 'Meenakshi Traders', shopLocation: 'Madurai', isAvailable: false },
  { id: 'mt-9', name: 'Pest Repellent (Herbal)', description: '1L, for all crops', price: 550, image: 'https://placehold.co/400x400.png', hint: 'liquid bottle', shopName: 'Meenakshi Traders', shopLocation: 'Madurai', isAvailable: true },
  { id: 'mt-10', name: 'Banana Fiber Products', description: 'Handmade crafts', price: 250, image: 'https://placehold.co/400x400.png', hint: 'fiber craft', shopName: 'Meenakshi Traders', shopLocation: 'Madurai', isAvailable: true },
  { id: 'mt-11', name: 'Palm Leaf Baskets', description: 'Set of 3', price: 400, image: 'https://placehold.co/400x400.png', hint: 'leaf basket', shopName: 'Meenakshi Traders', shopLocation: 'Madurai', isAvailable: true },

  { id: 'prod-6', name: 'Jasmine Sapling (மல்லிகை செடி)', description: 'Madurai Malli', price: 50, image: 'https://placehold.co/400x400.png', hint: 'jasmine flower', shopName: 'Pandiyan Nursery', shopLocation: 'Madurai', isAvailable: true },
  { id: 'prod-m4', name: 'Marigold Sapling', description: 'Yellow variety', price: 30, image: 'https://placehold.co/400x400.png', hint: 'marigold flower', shopName: 'Pandiyan Nursery', shopLocation: 'Madurai', isAvailable: true },
  { id: 'prod-m5', name: 'Hibiscus Plant', description: 'Red, single petal', price: 70, image: 'https://placehold.co/400x400.png', hint: 'hibiscus flower', shopName: 'Pandiyan Nursery', shopLocation: 'Madurai', isAvailable: false },
  { id: 'prod-m6', name: 'Lemon Sapling', description: 'Seedless variety', price: 120, image: 'https://placehold.co/400x400.png', hint: 'lemon tree', shopName: 'Pandiyan Nursery', shopLocation: 'Madurai', isAvailable: true },
  { id: 'prod-m7', name: 'Curry Leaf Plant', description: 'Aromatic leaves', price: 40, image: 'https://placehold.co/400x400.png', hint: 'curry leaf plant', shopName: 'Pandiyan Nursery', shopLocation: 'Madurai', isAvailable: true },
  { id: 'pn-6', name: 'Amla (Nelli) Sapling', description: 'Grafted variety', price: 150, image: 'https://placehold.co/400x400.png', hint: 'amla tree', shopName: 'Pandiyan Nursery', shopLocation: 'Madurai', isAvailable: true },
  { id: 'pn-7', name: 'Sapota (Chikoo) Sapling', description: 'Sweet variety', price: 130, image: 'https://placehold.co/400x400.png', hint: 'sapota tree', shopName: 'Pandiyan Nursery', shopLocation: 'Madurai', isAvailable: true },
  { id: 'pn-8', name: 'Pomegranate Sapling', description: 'Bhagwa variety', price: 180, image: 'https://placehold.co/400x400.png', hint: 'pomegranate tree', shopName: 'Pandiyan Nursery', shopLocation: 'Madurai', isAvailable: true },
  { id: 'pn-9', name: 'Crossandra (Kanakambaram) Plant', description: 'Orange flowers', price: 45, image: 'https://placehold.co/400x400.png', hint: 'orange flower', shopName: 'Pandiyan Nursery', shopLocation: 'Madurai', isAvailable: true },
  { id: 'pn-10', name: 'Tulsi (Holy Basil) Plant', description: 'For medicinal use', price: 25, image: 'https://placehold.co/400x400.png', hint: 'basil plant', shopName: 'Pandiyan Nursery', shopLocation: 'Madurai', isAvailable: false },
  { id: 'pn-11', name: 'Betel Vine Plant', description: 'Climbing vine', price: 55, image: 'https://placehold.co/400x400.png', hint: 'betel leaf plant', shopName: 'Pandiyan Nursery', shopLocation: 'Madurai', isAvailable: true },

  { id: 'tool-2', name: 'Sickle (அரிவாள்)', description: 'Traditional design', price: 280, image: 'https://placehold.co/400x400.png', hint: 'sickle tool', shopName: 'Madurai Farm Tools', shopLocation: 'Madurai', isAvailable: false },
  { id: 'tool-m2', name: 'Hoe (மண்வெட்டி)', description: 'For tilling soil', price: 350, image: 'https://placehold.co/400x400.png', hint: 'hoe tool', shopName: 'Madurai Farm Tools', shopLocation: 'Madurai', isAvailable: true },
  { id: 'tool-m3', name: 'Garden Gloves', description: 'Leather, durable', price: 200, image: 'https://placehold.co/400x400.png', hint: 'gardening gloves', shopName: 'Madurai Farm Tools', shopLocation: 'Madurai', isAvailable: true },
  { id: 'tool-m4', name: 'Budding Knife', description: 'For grafting', price: 300, image: 'https://placehold.co/400x400.png', hint: 'grafting knife', shopName: 'Madurai Farm Tools', shopLocation: 'Madurai', isAvailable: true },
  { id: 'tool-m5', name: 'Khurpi (குருப்பி)', description: 'Handheld trowel', price: 150, image: 'https://placehold.co/400x400.png', hint: 'trowel tool', shopName: 'Madurai Farm Tools', shopLocation: 'Madurai', isAvailable: true },
  { id: 'mft-6', name: 'Spade', description: 'With metal handle', price: 420, image: 'https://placehold.co/400x400.png', hint: 'spade tool', shopName: 'Madurai Farm Tools', shopLocation: 'Madurai', isAvailable: true },
  { id: 'mft-7', name: 'Crowbar', description: '3 ft length', price: 600, image: 'https://placehold.co/400x400.png', hint: 'crowbar tool', shopName: 'Madurai Farm Tools', shopLocation: 'Madurai', isAvailable: true },
  { id: 'mft-8', name: 'Plough (Country)', description: 'Wooden plough', price: 1800, image: 'https://placehold.co/400x400.png', hint: 'wooden plough', shopName: 'Madurai Farm Tools', shopLocation: 'Madurai', isAvailable: false },
  { id: 'mft-9', name: 'Axe with Fiber Handle', description: 'Lightweight', price: 700, image: 'https://placehold.co/400x400.png', hint: 'axe tool', shopName: 'Madurai Farm Tools', shopLocation: 'Madurai', isAvailable: true },
  { id: 'mft-10', name: 'Weed Remover Tool', description: 'Long handle', price: 500, image: 'https://placehold.co/400x400.png', hint: 'weeder tool', shopName: 'Madurai Farm Tools', shopLocation: 'Madurai', isAvailable: true },
  { id: 'mft-11', name: 'Sugarcane Knife', description: 'Heavy duty', price: 350, image: 'https://placehold.co/400x400.png', hint: 'large knife', shopName: 'Madurai Farm Tools', shopLocation: 'Madurai', isAvailable: true },

  { id: 'seed-2', name: 'Cotton Seeds (பருத்தி விதைகள்)', description: 'BT Cotton', price: 850, image: 'https://placehold.co/400x400.png', hint: 'cotton plant', shopName: 'Vaigai Seeds Corp', shopLocation: 'Madurai', isAvailable: true },
  { id: 'seed-m2', name: 'Sesame Seeds (எள்)', description: 'White variety', price: 200, image: 'https://placehold.co/400x400.png', hint: 'sesame seeds', shopName: 'Vaigai Seeds Corp', shopLocation: 'Madurai', isAvailable: true },
  { id: 'seed-m3', name: 'Pearl Millet Seeds (கம்பு)', description: 'High nutrition', price: 130, image: 'https://placehold.co/400x400.png', hint: 'pearl millet', shopName: 'Vaigai Seeds Corp', shopLocation: 'Madurai', isAvailable: true },
  { id: 'seed-m4', name: 'Castor Seeds (ஆமணக்கு)', description: 'For oil extraction', price: 150, image: 'https://placehold.co/400x400.png', hint: 'castor seeds', shopName: 'Vaigai Seeds Corp', shopLocation: 'Madurai', isAvailable: false },
  { id: 'seed-m5', name: 'Sunflower Seeds (சூரியகாந்தி)', description: 'Oilseed variety', price: 250, image: 'https://placehold.co/400x400.png', hint: 'sunflower seeds', shopName: 'Vaigai Seeds Corp', shopLocation: 'Madurai', isAvailable: true },
  { id: 'vsc-6', name: 'Paddy Seeds (ADT 43)', description: 'Fine grain rice', price: 60, image: 'https://placehold.co/400x400.png', hint: 'rice grain', shopName: 'Vaigai Seeds Corp', shopLocation: 'Madurai', isAvailable: true },
  { id: 'vsc-7', name: 'Red Gram Seeds', description: 'Tur dal', price: 180, image: 'https://placehold.co/400x400.png', hint: 'red gram', shopName: 'Vaigai Seeds Corp', shopLocation: 'Madurai', isAvailable: true },
  { id: 'vsc-8', name: 'Onion Seeds (Small)', description: 'Shallot seeds', price: 500, image: 'https://placehold.co/400x400.png', hint: 'onion seeds', shopName: 'Vaigai Seeds Corp', shopLocation: 'Madurai', isAvailable: true },
  { id: 'vsc-9', name: 'Maize Seeds (Sweet Corn)', description: 'Hybrid sweet corn', price: 300, image: 'https://placehold.co/400x400.png', hint: 'corn cob', shopName: 'Vaigai Seeds Corp', shopLocation: 'Madurai', isAvailable: true },
  { id: 'vsc-10', name: 'Green Manure Seeds (Dhaincha)', description: 'For soil improvement', price: 90, image: 'https://placehold.co/400x400.png', hint: 'green seeds', shopName: 'Vaigai Seeds Corp', shopLocation: 'Madurai', isAvailable: false },
  { id: 'vsc-11', name: 'Fodder Sorghum Seeds', description: 'For livestock', price: 120, image: 'https://placehold.co/400x400.png', hint: 'sorghum plant', shopName: 'Vaigai Seeds Corp', shopLocation: 'Madurai', isAvailable: true },

  // Salem
  { id: 'fert-4', name: 'Neem Cake (வேப்பம் புண்ணாக்கு)', description: 'Organic Pest Repellent', price: 1200, image: 'https://placehold.co/400x400.png', hint: 'organic fertilizer', shopName: 'Selvam Organics', shopLocation: 'Salem', isAvailable: true },
  { id: 'prod-s1', name: 'Sago (జவ்வரிசி)', description: 'Tapioca pearls, 1kg', price: 100, image: 'https://placehold.co/400x400.png', hint: 'sago pearls', shopName: 'Selvam Organics', shopLocation: 'Salem', isAvailable: true },
  { id: 'prod-s2', name: 'Turmeric Fingers', description: 'Dried, whole', price: 300, image: 'https://placehold.co/400x400.png', hint: 'turmeric fingers', shopName: 'Selvam Organics', shopLocation: 'Salem', isAvailable: true },
  { id: 'fert-s1', name: 'Pressmud', description: 'Sugarcane byproduct', price: 200, image: 'https://placehold.co/400x400.png', hint: 'organic compost', shopName: 'Selvam Organics', shopLocation: 'Salem', isAvailable: true },
  { id: 'tool-s1', name: 'Bamboo Stick', description: 'Support for plants, 6ft', price: 30, image: 'https://placehold.co/400x400.png', hint: 'bamboo sticks', shopName: 'Selvam Organics', shopLocation: 'Salem', isAvailable: false },
  { id: 'so-6', name: 'Tapioca Starch', description: '1kg powder', price: 80, image: 'https://placehold.co/400x400.png', hint: 'white powder', shopName: 'Selvam Organics', shopLocation: 'Salem', isAvailable: true },
  { id: 'so-7', name: 'Mango Pulp', description: 'Alphonso, 1kg can', price: 250, image: 'https://placehold.co/400x400.png', hint: 'mango pulp', shopName: 'Selvam Organics', shopLocation: 'Salem', isAvailable: true },
  { id: 'so-8', name: 'Groundnut Cake', description: 'Cattle feed, 50kg', price: 2200, image: 'https://placehold.co/400x400.png', hint: 'animal feed', shopName: 'Selvam Organics', shopLocation: 'Salem', isAvailable: true },
  { id: 'so-9', name: 'Organic Jaggery Powder', description: '1kg packet', price: 180, image: 'https://placehold.co/400x400.png', hint: 'jaggery powder', shopName: 'Selvam Organics', shopLocation: 'Salem', isAvailable: true },
  { id: 'so-10', name: 'Areca Plates', description: 'Pack of 25', price: 150, image: 'https://placehold.co/400x400.png', hint: 'leaf plates', shopName: 'Selvam Organics', shopLocation: 'Salem', isAvailable: false },
  { id: 'so-11', name: 'Wood Pressed Coconut Oil', description: '1 Litre', price: 450, image: 'https://placehold.co/400x400.png', hint: 'oil bottle', shopName: 'Selvam Organics', shopLocation: 'Salem', isAvailable: true },

  { id: 'prod-7', name: 'Mango Sapling (மாங்கன்று)', description: 'Salem Bangalora', price: 250, image: 'https://placehold.co/400x400.png', hint: 'mango tree', shopName: 'Salem Mango Farm', shopLocation: 'Salem', isAvailable: true },
  { id: 'prod-s3', name: 'Alphonso Mango Sapling', description: 'Grafted', price: 350, image: 'https://placehold.co/400x400.png', hint: 'mango sapling', shopName: 'Salem Mango Farm', shopLocation: 'Salem', isAvailable: true },
  { id: 'prod-s4', name: 'Neelam Mango Sapling', description: 'Late season variety', price: 200, image: 'https://placehold.co/400x400.png', hint: 'small tree', shopName: 'Salem Mango Farm', shopLocation: 'Salem', isAvailable: true },
  { id: 'prod-s5', name: 'Raw Mangoes', description: 'For pickles, 1kg', price: 80, image: 'https://placehold.co/400x400.png', hint: 'green mangoes', shopName: 'Salem Mango Farm', shopLocation: 'Salem', isAvailable: true },
  { id: 'prod-s6', name: 'Mango Wood', description: 'For fuel, per kg', price: 10, image: 'https://placehold.co/400x400.png', hint: 'wood logs', shopName: 'Salem Mango Farm', shopLocation: 'Salem', isAvailable: false },
  { id: 'smf-6', name: 'Mango Pickle', description: 'Spicy, 1kg jar', price: 220, image: 'https://placehold.co/400x400.png', hint: 'pickle jar', shopName: 'Salem Mango Farm', shopLocation: 'Salem', isAvailable: true },
  { id: 'smf-7', name: 'Dried Mango Slices', description: 'Sweet, 250g pack', price: 180, image: 'https://placehold.co/400x400.png', hint: 'dried fruit', shopName: 'Salem Mango Farm', shopLocation: 'Salem', isAvailable: true },
  { id: 'smf-8', name: 'Mango Fruit Box (5kg)', description: 'Fresh Salem Bangalora', price: 500, image: 'https://placehold.co/400x400.png', hint: 'mango box', shopName: 'Salem Mango Farm', shopLocation: 'Salem', isAvailable: true },
  { id: 'smf-9', name: 'Mango Jam', description: 'Mixed fruit flavor', price: 150, image: 'https://placehold.co/400x400.png', hint: 'jam jar', shopName: 'Salem Mango Farm', shopLocation: 'Salem', isAvailable: true },
  { id: 'smf-10', name: 'Mango Leaf Thoran', description: 'For festive decorations', price: 100, image: 'https://placehold.co/400x400.png', hint: 'leaf garland', shopName: 'Salem Mango Farm', shopLocation: 'Salem', isAvailable: false },
  { id: 'smf-11', name: 'Grafted Jackfruit Sapling', description: 'Early fruiting', price: 300, image: 'https://placehold.co/400x400.png', hint: 'jackfruit tree', shopName: 'Salem Mango Farm', shopLocation: 'Salem', isAvailable: true },

  { id: 'fert-7', name: 'Vermicompost (மண்புழு உரம்)', description: '10kg bag', price: 300, image: 'https://placehold.co/400x400.png', hint: 'vermicompost', shopName: 'Salem Organics', shopLocation: 'Salem', isAvailable: true },
  { id: 'tool-13', name: 'Pickaxe (বেলচা)', description: 'Forged steel head', price: 900, image: 'https://placehold.co/400x400.png', hint: 'pickaxe tool', shopName: 'Salem Organics', shopLocation: 'Salem', isAvailable: true },
  { id: 'prod-s7', name: 'Chilli Powder', description: 'Spicy, 500g', price: 250, image: 'https://placehold.co/400x400.png', hint: 'chilli powder', shopName: 'Salem Organics', shopLocation: 'Salem', isAvailable: true },
  { id: 'fert-s2', name: 'Fish Amino Acid', description: 'Growth promoter, 1L', price: 350, image: 'https://placehold.co/400x400.png', hint: 'liquid bottle', shopName: 'Salem Organics', shopLocation: 'Salem', isAvailable: true },
  { id: 'seed-s1', name: 'Tapioca Cuttings (மரவள்ளி)', description: 'H-226 variety', price: 8, image: 'https://placehold.co/400x400.png', hint: 'tapioca cuttings', shopName: 'Salem Organics', shopLocation: 'Salem', isAvailable: true },
  { id: 'so2-6', name: 'Coriander Powder', description: '500g packet', price: 150, image: 'https://placehold.co/400x400.png', hint: 'spice powder', shopName: 'Salem Organics', shopLocation: 'Salem', isAvailable: true },
  { id: 'so2-7', name: 'Sambar Powder', description: 'Authentic blend, 200g', price: 120, image: 'https://placehold.co/400x400.png', hint: 'sambar powder', shopName: 'Salem Organics', shopLocation: 'Salem', isAvailable: true },
  { id: 'so2-8', name: 'Millet Flour (Mixed)', description: '1kg, healthy mix', price: 180, image: 'https://placehold.co/400x400.png', hint: 'flour bag', shopName: 'Salem Organics', shopLocation: 'Salem', isAvailable: false },
  { id: 'so2-9', name: 'Herbal Bath Powder', description: 'Traditional skin care', price: 200, image: 'https://placehold.co/400x400.png', hint: 'herbal powder', shopName: 'Salem Organics', shopLocation: 'Salem', isAvailable: true },
  { id: 'so2-10', name: 'Moringa Leaf Powder', description: 'Superfood, 100g', price: 150, image: 'https://placehold.co/400x400.png', hint: 'green powder', shopName: 'Salem Organics', shopLocation: 'Salem', isAvailable: true },
  { id: 'so2-11', name: 'Castor Oil', description: 'Cold pressed, 500ml', price: 280, image: 'https://placehold.co/400x400.png', hint: 'oil bottle', shopName: 'Salem Organics', shopLocation: 'Salem', isAvailable: true },

  { id: 'tool-3', name: 'Spade (மண்வெட்டி)', description: 'Heavy duty', price: 450, image: 'https://placehold.co/400x400.png', hint: 'spade tool', shopName: 'Yercaud Agri Tools', shopLocation: 'Salem', isAvailable: true },
  { id: 'tool-s2', name: 'Coffee Pulper Machine', description: 'Manual hand-crank', price: 5000, image: 'https://placehold.co/400x400.png', hint: 'coffee machine', shopName: 'Yercaud Agri Tools', shopLocation: 'Salem', isAvailable: false },
  { id: 'tool-s3', name: 'Secateurs', description: 'For pruning coffee plants', price: 700, image: 'https://placehold.co/400x400.png', hint: 'pruning shears', shopName: 'Yercaud Agri Tools', shopLocation: 'Salem', isAvailable: true },
  { id: 'prod-s8', name: 'Black Pepper', description: 'Dried peppercorns, 100g', price: 150, image: 'https://placehold.co/400x400.png', hint: 'black pepper', shopName: 'Yercaud Agri Tools', shopLocation: 'Salem', isAvailable: true },
  { id: 'prod-s9', name: 'Avocado Sapling', description: 'Hass variety', price: 400, image: 'https://placehold.co/400x400.png', hint: 'avocado tree', shopName: 'Yercaud Agri Tools', shopLocation: 'Salem', isAvailable: true },
  { id: 'yat-6', name: 'Coffee Beans (Roasted)', description: 'Yercaud Arabica, 250g', price: 350, image: 'https://placehold.co/400x400.png', hint: 'roasted coffee', shopName: 'Yercaud Agri Tools', shopLocation: 'Salem', isAvailable: true },
  { id: 'yat-7', name: 'Clove Saplings', description: 'For spice gardens', price: 180, image: 'https://placehold.co/400x400.png', hint: 'clove plant', shopName: 'Yercaud Agri Tools', shopLocation: 'Salem', isAvailable: true },
  { id: 'yat-8', name: 'Oranges (Hill)', description: '1kg, fresh', price: 120, image: 'https://placehold.co/400x400.png', hint: 'orange fruit', shopName: 'Yercaud Agri Tools', shopLocation: 'Salem', isAvailable: true },
  { id: 'yat-9', name: 'Rosemary Plant', description: 'Herb plant in pot', price: 150, image: 'https://placehold.co/400x400.png', hint: 'rosemary plant', shopName: 'Yercaud Agri Tools', shopLocation: 'Salem', isAvailable: true },
  { id: 'yat-10', name: 'Eucalyptus Oil', description: '100ml, pure', price: 300, image: 'https://placehold.co/400x400.png', hint: 'oil bottle', shopName: 'Yercaud Agri Tools', shopLocation: 'Salem', isAvailable: false },
  { id: 'yat-11', name: 'Mulberry Cuttings', description: 'For sericulture', price: 10, image: 'https://placehold.co/400x400.png', hint: 'plant cuttings', shopName: 'Yercaud Agri Tools', shopLocation: 'Salem', isAvailable: true },

  { id: 'seed-3', name: 'Turmeric Rhizome (மஞ்சள் கிழங்கு)', description: 'Erode variety', price: 120, image: 'https://placehold.co/400x400.png', hint: 'turmeric root', shopName: 'Salem Spices', shopLocation: 'Salem', isAvailable: true },
  { id: 'seed-s2', name: 'Coriander Seeds', description: 'For planting', price: 80, image: 'https://placehold.co/400x400.png', hint: 'coriander seeds', shopName: 'Salem Spices', shopLocation: 'Salem', isAvailable: true },
  { id: 'seed-s3', name: 'Fenugreek Seeds', description: 'Methi seeds', price: 90, image: 'https://placehold.co/400x400.png', hint: 'fenugreek seeds', shopName: 'Salem Spices', shopLocation: 'Salem', isAvailable: true },
  { id: 'seed-s4', name: 'Mustard Seeds', description: 'Small, black', price: 70, image: 'https://placehold.co/400x400.png', hint: 'mustard seeds', shopName: 'Salem Spices', shopLocation: 'Salem', isAvailable: false },
  { id: 'seed-s5', name: 'Cumin Seeds', description: 'Jeera for planting', price: 150, image: 'https://placehold.co/400x400.png', hint: 'cumin seeds', shopName: 'Salem Spices', shopLocation: 'Salem', isAvailable: true },
  { id: 'ss-6', name: 'Fennel Seeds (Sombu)', description: 'For planting', price: 100, image: 'https://placehold.co/400x400.png', hint: 'fennel seeds', shopName: 'Salem Spices', shopLocation: 'Salem', isAvailable: true },
  { id: 'ss-7', name: 'Cardamom Pods (Green)', description: '100g pack', price: 250, image: 'https://placehold.co/400x400.png', hint: 'cardamom pods', shopName: 'Salem Spices', shopLocation: 'Salem', isAvailable: true },
  { id: 'ss-8', name: 'Cinnamon Sticks', description: '100g pack', price: 120, image: 'https://placehold.co/400x400.png', hint: 'cinnamon sticks', shopName: 'Salem Spices', shopLocation: 'Salem', isAvailable: true },
  { id: 'ss-9', name: 'Cloves', description: '100g pack', price: 180, image: 'https://placehold.co/400x400.png', hint: 'cloves spice', shopName: 'Salem Spices', shopLocation: 'Salem', isAvailable: false },
  { id: 'ss-10', name: 'Star Anise', description: '100g pack', price: 200, image: 'https://placehold.co/400x400.png', hint: 'star anise', shopName: 'Salem Spices', shopLocation: 'Salem', isAvailable: true },
  { id: 'ss-11', name: 'Bay Leaf', description: 'Dried, 50g pack', price: 80, image: 'https://placehold.co/400x400.png', hint: 'bay leaves', shopName: 'Salem Spices', shopLocation: 'Salem', isAvailable: true },
  
  // Tiruchirappalli
  { id: 'prod-3', name: 'Tractor Rental (டிராக்டர் வாடகை)', description: 'Per hour basis', price: 600, image: 'https://placehold.co/400x400.png', hint: 'tractor field', shopName: 'Agri Machinaries Inc.', shopLocation: 'Tiruchirappalli', isAvailable: true },
  { id: 'prod-4', name: 'Sprayer (விசைத்தெளிப்பான்)', description: '5-litre capacity', price: 2500, image: 'https://placehold.co/400x400.png', hint: 'farm sprayer', shopName: 'Agri Machinaries Inc.', shopLocation: 'Tiruchirappalli', isAvailable: true },
  { id: 'tool-t1', name: 'Rotavator', description: 'Tractor attachment', price: 80000, image: 'https://placehold.co/400x400.png', hint: 'rotavator machine', shopName: 'Agri Machinaries Inc.', shopLocation: 'Tiruchirappalli', isAvailable: true },
  { id: 'tool-t2', name: 'Paddy Transplanter', description: 'Manual, 4-row', price: 25000, image: 'https://placehold.co/400x400.png', hint: 'transplanter machine', shopName: 'Agri Machinaries Inc.', shopLocation: 'Tiruchirappalli', isAvailable: false },
  { id: 'tool-t3', name: 'Cage Wheel', description: 'For tractor puddling', price: 15000, image: 'https://placehold.co/400x400.png', hint: 'tractor wheel', shopName: 'Agri Machinaries Inc.', shopLocation: 'Tiruchirappalli', isAvailable: true },
  { id: 'ami-6', name: 'Harvester Rental', description: 'Per acre basis', price: 2500, image: 'https://placehold.co/400x400.png', hint: 'combine harvester', shopName: 'Agri Machinaries Inc.', shopLocation: 'Tiruchirappalli', isAvailable: true },
  { id: 'ami-7', name: 'Power Weeder', description: '7HP Petrol Engine', price: 35000, image: 'https://placehold.co/400x400.png', hint: 'power weeder', shopName: 'Agri Machinaries Inc.', shopLocation: 'Tiruchirappalli', isAvailable: true },
  { id: 'ami-8', name: 'Seed Drill', description: 'Tractor drawn', price: 60000, image: 'https://placehold.co/400x400.png', hint: 'seed drill', shopName: 'Agri Machinaries Inc.', shopLocation: 'Tiruchirappalli', isAvailable: true },
  { id: 'ami-9', name: 'Disc Plough', description: '3-disc plough', price: 45000, image: 'https://placehold.co/400x400.png', hint: 'disc plough', shopName: 'Agri Machinaries Inc.', shopLocation: 'Tiruchirappalli', isAvailable: false },
  { id: 'ami-10', name: 'Trailer (Tipping)', description: '5-ton capacity', price: 120000, image: 'https://placehold.co/400x400.png', hint: 'tractor trailer', shopName: 'Agri Machinaries Inc.', shopLocation: 'Tiruchirappalli', isAvailable: true },
  { id: 'ami-11', name: 'Laser Land Leveler', description: 'For precision farming', price: 300000, image: 'https://placehold.co/400x400.png', hint: 'laser leveler', shopName: 'Agri Machinaries Inc.', shopLocation: 'Tiruchirappalli', isAvailable: true },

  { id: 'fert-3', name: 'Potash (பொட்டாஷ்)', description: 'N-P-K: 0-0-60', price: 1700, image: 'https://placehold.co/400x400.png', hint: 'fertilizer pellets', shopName: 'Cauvery Fertilizers', shopLocation: 'Tiruchirappalli', isAvailable: false },
  { id: 'seed-9', name: 'Banana Corms (வாழைக்கிழங்கு)', description: 'Nendran variety', price: 30, image: 'https://placehold.co/400x400.png', hint: 'banana plant', shopName: 'Cauvery Fertilizers', shopLocation: 'Tiruchirappalli', isAvailable: true },
  { id: 'fert-t1', name: 'Super Phosphate', description: 'Single Super Phosphate', price: 450, image: 'https://placehold.co/400x400.png', hint: 'phosphate powder', shopName: 'Cauvery Fertilizers', shopLocation: 'Tiruchirappalli', isAvailable: true },
  { id: 'prod-t1', name: 'Betel Leaves (வெற்றிலை)', description: '100 leaves bundle', price: 80, image: 'https://placehold.co/400x400.png', hint: 'betel leaves', shopName: 'Cauvery Fertilizers', shopLocation: 'Tiruchirappalli', isAvailable: true },
  { id: 'seed-t1', name: 'Sugarcane Seedlings', description: 'Tissue cultured', price: 5, image: 'https://placehold.co/400x400.png', hint: 'sugarcane seedlings', shopName: 'Cauvery Fertilizers', shopLocation: 'Tiruchirappalli', isAvailable: true },
  { id: 'cf-6', name: 'Urea', description: '46% Nitrogen', price: 270, image: 'https://placehold.co/400x400.png', hint: 'fertilizer bag', shopName: 'Cauvery Fertilizers', shopLocation: 'Tiruchirappalli', isAvailable: true },
  { id: 'cf-7', name: 'DAP', description: 'Di-Ammonium Phosphate', price: 1350, image: 'https://placehold.co/400x400.png', hint: 'fertilizer sack', shopName: 'Cauvery Fertilizers', shopLocation: 'Tiruchirappalli', isAvailable: true },
  { id: 'cf-8', name: 'Zinc Sulphate', description: 'Micronutrient', price: 700, image: 'https://placehold.co/400x400.png', hint: 'chemical bag', shopName: 'Cauvery Fertilizers', shopLocation: 'Tiruchirappalli', isAvailable: true },
  { id: 'cf-9', name: 'Bio-Pesticide', description: 'Beauveria Bassiana', price: 400, image: 'https://placehold.co/400x400.png', hint: 'pesticide bottle', shopName: 'Cauvery Fertilizers', shopLocation: 'Tiruchirappalli', isAvailable: false },
  { id: 'cf-10', name: 'Paddy Seeds (Ponni)', description: 'Premium rice variety', price: 65, image: 'https://placehold.co/400x400.png', hint: 'rice seeds', shopName: 'Cauvery Fertilizers', shopLocation: 'Tiruchirappalli', isAvailable: true },
  { id: 'cf-11', name: 'Black Gram Seeds', description: 'VBN 8', price: 200, image: 'https://placehold.co/400x400.png', hint: 'black gram', shopName: 'Cauvery Fertilizers', shopLocation: 'Tiruchirappalli', isAvailable: true },

  { id: 'prod-8', name: 'Banana Sapling (வாழைக்கன்று)', description: 'Poovan variety', price: 20, image: 'https://placehold.co/400x400.png', hint: 'banana tree', shopName: 'Trichy Agro', shopLocation: 'Tiruchirappalli', isAvailable: true },
  { id: 'prod-t2', name: 'Flower Garland', description: 'Jasmine and rose mix', price: 100, image: 'https://placehold.co/400x400.png', hint: 'flower garland', shopName: 'Trichy Agro', shopLocation: 'Tiruchirappalli', isAvailable: true },
  { id: 'prod-t3', name: 'Tender Coconut', description: 'Fresh, per piece', price: 40, image: 'https://placehold.co/400x400.png', hint: 'tender coconut', shopName: 'Trichy Agro', shopLocation: 'Tiruchirappalli', isAvailable: true },
  { id: 'seed-t2', name: 'Brinjal Seeds (கத்தரிக்காய்)', description: 'Green long variety', price: 50, image: 'https://placehold.co/400x400.png', hint: 'brinjal seeds', shopName: 'Trichy Agro', shopLocation: 'Tiruchirappalli', isAvailable: false },
  { id: 'tool-t4', name: 'Banana Comb Cutter', description: 'For harvesting', price: 400, image: 'https://placehold.co/400x400.png', hint: 'banana cutter', shopName: 'Trichy Agro', shopLocation: 'Tiruchirappalli', isAvailable: true },
  { id: 'ta-6', name: 'Guava (Country)', description: '1kg, fresh', price: 90, image: 'https://placehold.co/400x400.png', hint: 'guava fruit', shopName: 'Trichy Agro', shopLocation: 'Tiruchirappalli', isAvailable: true },
  { id: 'ta-7', name: 'Coconut (Bulk)', description: 'Per 100 nuts', price: 2200, image: 'https://placehold.co/400x400.png', hint: 'coconut pile', shopName: 'Trichy Agro', shopLocation: 'Tiruchirappalli', isAvailable: true },
  { id: 'ta-8', name: 'Okra (Ladies Finger)', description: '1kg, fresh', price: 50, image: 'https://placehold.co/400x400.png', hint: 'okra vegetable', shopName: 'Trichy Agro', shopLocation: 'Tiruchirappalli', isAvailable: true },
  { id: 'ta-9', name: 'Papaya', description: '1 piece, organic', price: 60, image: 'https://placehold.co/400x400.png', hint: 'papaya fruit', shopName: 'Trichy Agro', shopLocation: 'Tiruchirappalli', isAvailable: true },
  { id: 'ta-10', name: 'Country Chicken Eggs', description: 'Dozen', price: 150, image: 'https://placehold.co/400x400.png', hint: 'brown eggs', shopName: 'Trichy Agro', shopLocation: 'Tiruchirappalli', isAvailable: false },
  { id: 'ta-11', name: 'Banana Leaf (Roll)', description: 'For meals', price: 300, image: 'https://placehold.co/400x400.png', hint: 'banana leaf', shopName: 'Trichy Agro', shopLocation: 'Tiruchirappalli', isAvailable: true },

  { id: 'tool-4', name: 'Power Tiller (பவர் டில்லர்)', description: 'Diesel engine', price: 75000, image: 'https://placehold.co/400x400.png', hint: 'power tiller', shopName: 'Rockfort Machinery', shopLocation: 'Tiruchirappalli', isAvailable: true },
  { id: 'tool-t5', name: 'Brush Cutter', description: '2-stroke engine', price: 8000, image: 'https://placehold.co/400x400.png', hint: 'brush cutter', shopName: 'Rockfort Machinery', shopLocation: 'Tiruchirappalli', isAvailable: true },
  { id: 'tool-t6', name: 'Earth Auger', description: 'For digging holes', price: 12000, image: 'https://placehold.co/400x400.png', hint: 'earth auger', shopName: 'Rockfort Machinery', shopLocation: 'Tiruchirappalli', isAvailable: true },
  { id: 'tool-t7', name: 'Chaff Cutter', description: 'For animal feed', price: 30000, image: 'https://placehold.co/400x400.png', hint: 'chaff cutter', shopName: 'Rockfort Machinery', shopLocation: 'Tiruchirappalli', isAvailable: false },
  { id: 'tool-t8', name: 'Sugarcane Crusher', description: 'Small scale', price: 45000, image: 'https://placehold.co/400x400.png', hint: 'sugarcane crusher', shopName: 'Rockfort Machinery', shopLocation: 'Tiruchirappalli', isAvailable: true },
  { id: 'rm-6', name: 'Water Pump (5HP)', description: 'Diesel engine', price: 15000, image: 'https://placehold.co/400x400.png', hint: 'water pump', shopName: 'Rockfort Machinery', shopLocation: 'Tiruchirappalli', isAvailable: true },
  { id: 'rm-7', name: 'Generator (Diesel)', description: '5 KVA', price: 50000, image: 'https://placehold.co/400x400.png', hint: 'diesel generator', shopName: 'Rockfort Machinery', shopLocation: 'Tiruchirappalli', isAvailable: true },
  { id: 'rm-8', name: 'Rice Mill Machine (Mini)', description: 'For domestic use', price: 22000, image: 'https://placehold.co/400x400.png', hint: 'rice mill', shopName: 'Rockfort Machinery', shopLocation: 'Tiruchirappalli', isAvailable: true },
  { id: 'rm-9', name: 'Oil Expeller Machine', description: 'For groundnut, sesame', price: 65000, image: 'https://placehold.co/400x400.png', hint: 'oil press', shopName: 'Rockfort Machinery', shopLocation: 'Tiruchirappalli', isAvailable: false },
  { id: 'rm-10', name: 'Welding Machine', description: 'Portable ARC welder', price: 7000, image: 'https://placehold.co/400x400.png', hint: 'welding machine', shopName: 'Rockfort Machinery', shopLocation: 'Tiruchirappalli', isAvailable: true },
  { id: 'rm-11', name: 'Air Compressor', description: '50 Litre tank', price: 10000, image: 'https://placehold.co/400x400.png', hint: 'air compressor', shopName: 'Rockfort Machinery', shopLocation: 'Tiruchirappalli', isAvailable: true },
  
  { id: 'seed-tr1', name: 'Paddy Seeds (ADT 51)', description: 'Popular variety', price: 70, image: 'https://placehold.co/400x400.png', hint: 'paddy seeds', shopName: 'Srirangam Seeds', shopLocation: 'Tiruchirappalli', isAvailable: true },
  { id: 'seed-tr2', name: 'Maize (Hybrid)', description: 'High-yield variety', price: 300, image: 'https://placehold.co/400x400.png', hint: 'maize seeds', shopName: 'Srirangam Seeds', shopLocation: 'Tiruchirappalli', isAvailable: true },
  { id: 'seed-tr3', name: 'Groundnut (TMV 14)', description: 'Drought resistant', price: 220, image: 'https://placehold.co/400x400.png', hint: 'groundnuts', shopName: 'Srirangam Seeds', shopLocation: 'Tiruchirappalli', isAvailable: false },
  { id: 'seed-tr4', name: 'Vegetable Seed Kit', description: '5 varieties', price: 250, image: 'https://placehold.co/400x400.png', hint: 'seed packets', shopName: 'Srirangam Seeds', shopLocation: 'Tiruchirappalli', isAvailable: true },
  { id: 'seed-tr5', name: 'Fodder Seeds Mix', description: 'For cattle', price: 150, image: 'https://placehold.co/400x400.png', hint: 'mixed seeds', shopName: 'Srirangam Seeds', shopLocation: 'Tiruchirappalli', isAvailable: true },

  // Erode
  { id: 'seed-4', name: 'Groundnut Seeds (நிலக்கடலை விதைகள்)', description: 'TMV 7 variety', price: 180, image: 'https://placehold.co/400x400.png', hint: 'groundnuts', shopName: 'Erode Agri Center', shopLocation: 'Erode', isAvailable: true },
  { id: 'prod-e1', name: 'Erode Manjal (Turmeric)', description: 'GI Tagged, 1kg', price: 350, image: 'https://placehold.co/400x400.png', hint: 'turmeric roots', shopName: 'Erode Agri Center', shopLocation: 'Erode', isAvailable: true },
  { id: 'prod-e2', name: 'Textile Fabric', description: 'Cotton, per meter', price: 120, image: 'https://placehold.co/400x400.png', hint: 'fabric rolls', shopName: 'Erode Agri Center', shopLocation: 'Erode', isAvailable: true },
  { id: 'fert-e1', name: 'Poultry Manure', description: 'Rich in nitrogen', price: 150, image: 'https://placehold.co/400x400.png', hint: 'compost pile', shopName: 'Erode Agri Center', shopLocation: 'Erode', isAvailable: true },
  { id: 'tool-e1', name: 'Weighing Scale', description: '50kg capacity, digital', price: 2000, image: 'https://placehold.co/400x400.png', hint: 'weighing scale', shopName: 'Erode Agri Center', shopLocation: 'Erode', isAvailable: false },
  { id: 'eac-6', name: 'Sugarcane', description: '1 Tonne', price: 2500, image: 'https://placehold.co/400x400.png', hint: 'sugarcane stalks', shopName: 'Erode Agri Center', shopLocation: 'Erode', isAvailable: true },
  { id: 'eac-7', name: 'Coconut Copra', description: '1kg, dried', price: 150, image: 'https://placehold.co/400x400.png', hint: 'dried coconut', shopName: 'Erode Agri Center', shopLocation: 'Erode', isAvailable: true },
  { id: 'eac-8', name: 'Maize (Grain)', description: '100kg bag', price: 2200, image: 'https://placehold.co/400x400.png', hint: 'maize grain', shopName: 'Erode Agri Center', shopLocation: 'Erode', isAvailable: true },
  { id: 'eac-9', name: 'Jute Bags', description: 'For packaging, pack of 50', price: 1000, image: 'https://placehold.co/400x400.png', hint: 'jute bags', shopName: 'Erode Agri Center', shopLocation: 'Erode', isAvailable: true },
  { id: 'eac-10', name: 'Tamarind', description: '1kg, with seeds', price: 100, image: 'https://placehold.co/400x400.png', hint: 'tamarind fruit', shopName: 'Erode Agri Center', shopLocation: 'Erode', isAvailable: false },
  { id: 'eac-11', name: 'Tapioca (Raw)', description: '1kg', price: 30, image: 'https://placehold.co/400x400.png', hint: 'tapioca root', shopName: 'Erode Agri Center', shopLocation: 'Erode', isAvailable: true },

  { id: 'tool-5', name: 'Water Pump (நீர் பம்ப்)', description: '2 HP motor', price: 8000, image: 'https://placehold.co/400x400.png', hint: 'water pump', shopName: 'Bhavani Pumps', shopLocation: 'Erode', isAvailable: false },
  { id: 'tool-e2', name: 'Submersible Pump', description: '4-inch, 1.5 HP', price: 12000, image: 'https://placehold.co/400x400.png', hint: 'submersible pump', shopName: 'Bhavani Pumps', shopLocation: 'Erode', isAvailable: true },
  { id: 'tool-e3', name: 'Drip Irrigation Kit', description: 'For 1/2 acre', price: 15000, image: 'https://placehold.co/400x400.png', hint: 'drip irrigation', shopName: 'Bhavani Pumps', shopLocation: 'Erode', isAvailable: true },
  { id: 'tool-e4', name: 'Sprinkler System', description: 'Set of 5', price: 5000, image: 'https://placehold.co/400x400.png', hint: 'sprinkler system', shopName: 'Bhavani Pumps', shopLocation: 'Erode', isAvailable: true },
  { id: 'tool-e5', name: 'Lay Flat Hose', description: '50 meters', price: 2500, image: 'https://placehold.co/400x400.png', hint: 'water hose', shopName: 'Bhavani Pumps', shopLocation: 'Erode', isAvailable: true },
  { id: 'bp-6', name: 'Monoblock Pump (1HP)', description: 'For domestic use', price: 6000, image: 'https://placehold.co/400x400.png', hint: 'monoblock pump', shopName: 'Bhavani Pumps', shopLocation: 'Erode', isAvailable: true },
  { id: 'bp-7', name: 'Borewell Compressor Pump', description: '1.5HP', price: 18000, image: 'https://placehold.co/400x400.png', hint: 'compressor pump', shopName: 'Bhavani Pumps', shopLocation: 'Erode', isAvailable: true },
  { id: 'bp-8', name: 'PVC Pipes (4 inch)', description: 'Per 10 feet length', price: 500, image: 'https://placehold.co/400x400.png', hint: 'pvc pipes', shopName: 'Bhavani Pumps', shopLocation: 'Erode', isAvailable: true },
  { id: 'bp-9', name: 'Foot Valve', description: '4 inch, brass', price: 800, image: 'https://placehold.co/400x400.png', hint: 'foot valve', shopName: 'Bhavani Pumps', shopLocation: 'Erode', isAvailable: true },
  { id: 'bp-10', name: 'Control Panel (Starter)', description: 'For 1.5HP motor', price: 2500, image: 'https://placehold.co/400x400.png', hint: 'control panel', shopName: 'Bhavani Pumps', shopLocation: 'Erode', isAvailable: false },
  { id: 'bp-11', name: 'HDPE Pipe (1 inch)', description: 'Per meter', price: 40, image: 'https://placehold.co/400x400.png', hint: 'black pipe', shopName: 'Bhavani Pumps', shopLocation: 'Erode', isAvailable: true },

  { id: 'prod-9', name: 'Tapioca Cuttings (மரவள்ளிக்கிழங்கு குச்சி)', description: 'High starch content', price: 5, image: 'https://placehold.co/400x400.png', hint: 'tapioca plant', shopName: 'Erode Farmers Coop', shopLocation: 'Erode', isAvailable: true },
  { id: 'prod-e3', name: 'Coconut (தேங்காய்)', description: 'Per piece', price: 25, image: 'https://placehold.co/400x400.png', hint: 'coconuts', shopName: 'Erode Farmers Coop', shopLocation: 'Erode', isAvailable: true },
  { id: 'prod-e4', name: 'Cattle Feed', description: '50kg bag', price: 1200, image: 'https://placehold.co/400x400.png', hint: 'cattle feed', shopName: 'Erode Farmers Coop', shopLocation: 'Erode', isAvailable: true },
  { id: 'prod-e5', name: 'Honey (தேன்)', description: 'Natural, 500g', price: 300, image: 'https://placehold.co/400x400.png', hint: 'honey jar', shopName: 'Erode Farmers Coop', shopLocation: 'Erode', isAvailable: true },
  { id: 'seed-e1', name: 'Tomato Seeds', description: 'PKM 1 variety', price: 80, image: 'https://placehold.co/400x400.png', hint: 'tomato seeds', shopName: 'Erode Farmers Coop', shopLocation: 'Erode', isAvailable: false },
  { id: 'efc-6', name: 'Goat Feed', description: '25kg bag', price: 800, image: 'https://placehold.co/400x400.png', hint: 'animal feed bag', shopName: 'Erode Farmers Coop', shopLocation: 'Erode', isAvailable: true },
  { id: 'efc-7', name: 'Poultry Feed', description: 'Starter mash, 50kg', price: 2500, image: 'https://placehold.co/400x400.png', hint: 'poultry feed', shopName: 'Erode Farmers Coop', shopLocation: 'Erode', isAvailable: true },
  { id: 'efc-8', name: 'Milk (A2)', description: '1 Litre', price: 70, image: 'https://placehold.co/400x400.png', hint: 'milk bottle', shopName: 'Erode Farmers Coop', shopLocation: 'Erode', isAvailable: true },
  { id: 'efc-9', name: 'Ghee (Pure)', description: '500ml jar', price: 350, image: 'https://placehold.co/400x400.png', hint: 'ghee jar', shopName: 'Erode Farmers Coop', shopLocation: 'Erode', isAvailable: true },
  { id: 'efc-10', name: 'Vegetable Box (Mixed)', description: '5kg assorted vegetables', price: 300, image: 'https://placehold.co/400x400.png', hint: 'vegetable box', shopName: 'Erode Farmers Coop', shopLocation: 'Erode', isAvailable: false },
  { id: 'efc-11', name: 'Banana (Nendran)', description: '1kg', price: 60, image: 'https://placehold.co/400x400.png', hint: 'banana fruit', shopName: 'Erode Farmers Coop', shopLocation: 'Erode', isAvailable: true },
  
  { id: 'fert-8', name: 'Sulphate (சல்ஃபேட்)', description: 'Ammonium Sulphate', price: 600, image: 'https://placehold.co/400x400.png', hint: 'white powder', shopName: 'Kongu Fertilizers', shopLocation: 'Erode', isAvailable: true },
  { id: 'fert-e2', name: 'Magnesium Sulphate', description: 'For correcting deficiency', price: 550, image: 'https://placehold.co/400x400.png', hint: 'fertilizer sack', shopName: 'Kongu Fertilizers', shopLocation: 'Erode', isAvailable: true },
  { id: 'fert-e3', name: 'Boron', description: 'Micronutrient fertilizer', price: 700, image: 'https://placehold.co/400x400.png', hint: 'chemical bag', shopName: 'Kongu Fertilizers', shopLocation: 'Erode', isAvailable: true },
  { id: 'fert-e4', name: 'Calcium Nitrate', description: 'Water soluble', price: 800, image: 'https://placehold.co/400x400.png', hint: 'fertilizer pellets', shopName: 'Kongu Fertilizers', shopLocation: 'Erode', isAvailable: true },
  { id: 'fert-e5', name: 'Seaweed Extract', description: 'Liquid organic fertilizer', price: 900, image: 'https://placehold.co/400x400.png', hint: 'seaweed bottle', shopName: 'Kongu Fertilizers', shopLocation: 'Erode', isAvailable: false },
  { id: 'kf2-6', name: 'Potassium Nitrate', description: 'N-P-K: 13-0-45', price: 1200, image: 'https://placehold.co/400x400.png', hint: 'fertilizer bag', shopName: 'Kongu Fertilizers', shopLocation: 'Erode', isAvailable: true },
  { id: 'kf2-7', name: 'Chelated Zinc', description: 'High absorption', price: 950, image: 'https://placehold.co/400x400.png', hint: 'chemical bottle', shopName: 'Kongu Fertilizers', shopLocation: 'Erode', isAvailable: true },
  { id: 'kf2-8', name: 'Ferrous Sulphate', description: 'For iron deficiency', price: 400, image: 'https://placehold.co/400x400.png', hint: 'fertilizer sack', shopName: 'Kongu Fertilizers', shopLocation: 'Erode', isAvailable: true },
  { id: 'kf2-9', name: 'Wetting Agent', description: 'Spreader/Sticker', price: 300, image: 'https://placehold.co/400x400.png', hint: 'liquid bottle', shopName: 'Kongu Fertilizers', shopLocation: 'Erode', isAvailable: true },
  { id: 'kf2-10', name: 'Humic Acid Granules', description: 'Soil conditioner', price: 850, image: 'https://placehold.co/400x400.png', hint: 'black granules', shopName: 'Kongu Fertilizers', shopLocation: 'Erode', isAvailable: false },
  { id: 'kf2-11', name: 'NPK 19-19-19', description: 'Water soluble fertilizer', price: 1000, image: 'https://placehold.co/400x400.png', hint: 'fertilizer bag', shopName: 'Kongu Fertilizers', shopLocation: 'Erode', isAvailable: true },

  { id: 'prod-10', name: 'Mushroom Spawn (காளான் வித்து)', description: 'Oyster mushroom', price: 150, image: 'https://placehold.co/400x400.png', hint: 'mushrooms', shopName: 'Erode Mushrooms', shopLocation: 'Erode', isAvailable: true },
  { id: 'tool-14', name: 'Garden Rake (தோட்ட ரேக்)', description: '12-teeth', price: 400, image: 'https://placehold.co/400x400.png', hint: 'garden rake', shopName: 'Erode Mushrooms', shopLocation: 'Erode', isAvailable: true },
  { id: 'prod-e6', name: 'Milky Mushroom Spawn', description: 'High temperature variety', price: 180, image: 'https://placehold.co/400x400.png', hint: 'mushroom spawn', shopName: 'Erode Mushrooms', shopLocation: 'Erode', isAvailable: true },
  { id: 'prod-e7', name: 'Mushroom Grow Bags', description: 'Ready to fruit', price: 250, image: 'https://placehold.co/400x400.png', hint: 'grow bag', shopName: 'Erode Mushrooms', shopLocation: 'Erode', isAvailable: true },
  { id: 'prod-e8', name: 'Dried Mushrooms', description: 'Oyster, 100g pack', price: 300, image: 'https://placehold.co/400x400.png', hint: 'dried mushrooms', shopName: 'Erode Mushrooms', shopLocation: 'Erode', isAvailable: true },
  { id: 'em-6', name: 'Fresh Oyster Mushrooms', description: '1kg, farm fresh', price: 250, image: 'https://placehold.co/400x400.png', hint: 'oyster mushrooms', shopName: 'Erode Mushrooms', shopLocation: 'Erode', isAvailable: true },
  { id: 'em-7', name: 'Fresh Milky Mushrooms', description: '1kg, farm fresh', price: 280, image: 'https://placehold.co/400x400.png', hint: 'white mushrooms', shopName: 'Erode Mushrooms', shopLocation: 'Erode', isAvailable: true },
  { id: 'em-8', name: 'Polypropylene Bags', description: 'For spawn, 100 pack', price: 500, image: 'https://placehold.co/400x400.png', hint: 'plastic bags', shopName: 'Erode Mushrooms', shopLocation: 'Erode', isAvailable: true },
  { id: 'em-9', name: 'Mushroom Bed Steamer', description: 'Small scale', price: 15000, image: 'https://placehold.co/400x400.png', hint: 'steamer machine', shopName: 'Erode Mushrooms', shopLocation: 'Erode', isAvailable: false },
  { id: 'em-10', name: 'Mushroom Value Added Products', description: 'Pickles, Soup powder', price: 200, image: 'https://placehold.co/400x400.png', hint: 'food products', shopName: 'Erode Mushrooms', shopLocation: 'Erode', isAvailable: true },
  { id: 'em-11', name: 'Training on Mushroom Cultivation', description: '1-day program', price: 1000, image: 'https://placehold.co/400x400.png', hint: 'training class', shopName: 'Erode Mushrooms', shopLocation: 'Erode', isAvailable: true },

  // Tirunelveli
  { id: 'seed-5', name: 'Chilli Seeds (மிளகாய் விதைகள்)', description: 'Samba variety', price: 90, image: 'https://placehold.co/400x400.png', hint: 'chilli plant', shopName: 'Nanguneri Seed Bank', shopLocation: 'Tirunelveli', isAvailable: true },
  { id: 'seed-n1', name: 'Okra Seeds (வெண்டைக்காய்)', description: 'Lady finger seeds', price: 60, image: 'https://placehold.co/400x400.png', hint: 'okra seeds', shopName: 'Nanguneri Seed Bank', shopLocation: 'Tirunelveli', isAvailable: true },
  { id: 'seed-n2', name: 'Cluster Bean Seeds', description: 'Guar seeds', price: 70, image: 'https://placehold.co/400x400.png', hint: 'cluster beans', shopName: 'Nanguneri Seed Bank', shopLocation: 'Tirunelveli', isAvailable: true },
  { id: 'seed-n3', name: 'Snake Gourd Seeds', description: 'Long variety', price: 80, image: 'https://placehold.co/400x400.png', hint: 'snake gourd', shopName: 'Nanguneri Seed Bank', shopLocation: 'Tirunelveli', isAvailable: false },
  { id: 'seed-n4', name: 'Radish Seeds', description: 'White, long variety', price: 50, image: 'https://placehold.co/400x400.png', hint: 'radish seeds', shopName: 'Nanguneri Seed Bank', shopLocation: 'Tirunelveli', isAvailable: true },
  { id: 'nsb-6', name: 'Ridge Gourd Seeds', description: 'Hybrid', price: 75, image: 'https://placehold.co/400x400.png', hint: 'ridge gourd', shopName: 'Nanguneri Seed Bank', shopLocation: 'Tirunelveli', isAvailable: true },
  { id: 'nsb-7', name: 'Bitter Gourd Seeds', description: 'Small, green', price: 85, image: 'https://placehold.co/400x400.png', hint: 'bitter gourd', shopName: 'Nanguneri Seed Bank', shopLocation: 'Tirunelveli', isAvailable: true },
  { id: 'nsb-8', name: 'Watermelon Seeds', description: 'Sugar Baby variety', price: 120, image: 'https://placehold.co/400x400.png', hint: 'watermelon seeds', shopName: 'Nanguneri Seed Bank', shopLocation: 'Tirunelveli', isAvailable: true },
  { id: 'nsb-9', name: 'Muskmelon Seeds', description: 'Cantaloupe', price: 110, image: 'https://placehold.co/400x400.png', hint: 'muskmelon seeds', shopName: 'Nanguneri Seed Bank', shopLocation: 'Tirunelveli', isAvailable: false },
  { id: 'nsb-10', name: 'Cucumber Seeds', description: 'Long, green', price: 65, image: 'https://placehold.co/400x400.png', hint: 'cucumber seeds', shopName: 'Nanguneri Seed Bank', shopLocation: 'Tirunelveli', isAvailable: true },
  { id: 'nsb-11', name: 'Greens Seeds (Arai Keerai)', description: 'Leafy vegetable', price: 40, image: 'https://placehold.co/400x400.png', hint: 'green leaves', shopName: 'Nanguneri Seed Bank', shopLocation: 'Tirunelveli', isAvailable: true },
  
  { id: 'tool-6', name: 'Plough (கலப்பை)', description: 'Country plough', price: 1500, image: 'https://placehold.co/400x400.png', hint: 'wooden plough', shopName: 'Tamirabarani Tools', shopLocation: 'Tirunelveli', isAvailable: true },
  { id: 'tool-n1', name: 'Coconut Dehusker', description: 'Manual tool', price: 800, image: 'https://placehold.co/400x400.png', hint: 'coconut tool', shopName: 'Tamirabarani Tools', shopLocation: 'Tirunelveli', isAvailable: true },
  { id: 'tool-n2', name: 'Palm Climber', description: 'Safety equipment', price: 3000, image: 'https://placehold.co/400x400.png', hint: 'climbing gear', shopName: 'Tamirabarani Tools', shopLocation: 'Tirunelveli', isAvailable: true },
  { id: 'tool-n3', name: 'Arecanut Dehusker', description: 'Hand operated', price: 1200, image: 'https://placehold.co/400x400.png', hint: 'arecanut tool', shopName: 'Tamirabarani Tools', shopLocation: 'Tirunelveli', isAvailable: false },
  { id: 'tool-n4', name: 'Jute Rope', description: '10mm, 50 meters', price: 500, image: 'https://placehold.co/400x400.png', hint: 'jute rope', shopName: 'Tamirabarani Tools', shopLocation: 'Tirunelveli', isAvailable: true },
  { id: 'tt-6', name: 'Banana Tree Cutter', description: 'Long pole cutter', price: 1800, image: 'https://placehold.co/400x400.png', hint: 'pole saw', shopName: 'Tamirabarani Tools', shopLocation: 'Tirunelveli', isAvailable: true },
  { id: 'tt-7', name: 'Billhook with Wooden Handle', description: 'For clearing shrubs', price: 400, image: 'https://placehold.co/400x400.png', hint: 'billhook knife', shopName: 'Tamirabarani Tools', shopLocation: 'Tirunelveli', isAvailable: true },
  { id: 'tt-8', name: 'Tender Coconut Puncher', description: 'Stainless steel', price: 250, image: 'https://placehold.co/400x400.png', hint: 'coconut opener', shopName: 'Tamirabarani Tools', shopLocation: 'Tirunelveli', isAvailable: true },
  { id: 'tt-9', name: 'Rubber Tapping Knife', description: 'Sharp and durable', price: 350, image: 'https://placehold.co/400x400.png', hint: 'tapping knife', shopName: 'Tamirabarani Tools', shopLocation: 'Tirunelveli', isAvailable: false },
  { id: 'tt-10', name: 'Fish Net', description: 'Nylon, for aquaculture', price: 600, image: 'https://placehold.co/400x400.png', hint: 'fishing net', shopName: 'Tamirabarani Tools', shopLocation: 'Tirunelveli', isAvailable: true },
  { id: 'tt-11', name: 'Paddy Field Leveler', description: 'Wooden board', price: 1300, image: 'https://placehold.co/400x400.png', hint: 'wooden plank', shopName: 'Tamirabarani Tools', shopLocation: 'Tirunelveli', isAvailable: true },
  
  { id: 'prod-13', name: 'Palm Sapling (பனை மரம்)', description: 'Native species', price: 40, image: 'https://placehold.co/400x400.png', hint: 'palm tree', shopName: 'Nellai Nursery', shopLocation: 'Tirunelveli', isAvailable: true },
  { id: 'fert-12', name: 'Bone Meal (எலும்புத் தூள்)', description: 'Organic Phosphorus Source', price: 250, image: 'https://placehold.co/400x400.png', hint: 'bone meal powder', shopName: 'Nellai Nursery', shopLocation: 'Tirunelveli', isAvailable: true },
  { id: 'prod-n1', name: 'Neem Sapling (வேம்பு)', description: 'Medicinal tree', price: 60, image: 'https://placehold.co/400x400.png', hint: 'neem tree', shopName: 'Nellai Nursery', shopLocation: 'Tirunelveli', isAvailable: true },
  { id: 'prod-n2', name: 'Teak Sapling (தேக்கு)', description: 'For timber', price: 150, image: 'https://placehold.co/400x400.png', hint: 'teak tree', shopName: 'Nellai Nursery', shopLocation: 'Tirunelveli', isAvailable: true },
  { id: 'prod-n3', name: 'Jackfruit Sapling (பலா)', description: 'Grafted variety', price: 200, image: 'https://placehold.co/400x400.png', hint: 'jackfruit tree', shopName: 'Nellai Nursery', shopLocation: 'Tirunelveli', isAvailable: false },
  { id: 'nn-6', name: 'Red Sandalwood Sapling', description: 'Pterocarpus santalinus', price: 500, image: 'https://placehold.co/400x400.png', hint: 'sandalwood tree', shopName: 'Nellai Nursery', shopLocation: 'Tirunelveli', isAvailable: true },
  { id: 'nn-7', name: 'Tamarind Sapling', description: 'Sweet variety', price: 120, image: 'https://placehold.co/400x400.png', hint: 'tamarind tree', shopName: 'Nellai Nursery', shopLocation: 'Tirunelveli', isAvailable: true },
  { id: 'nn-8', name: 'Gooseberry (Amla) Sapling', description: 'High yield', price: 140, image: 'https://placehold.co/400x400.png', hint: 'gooseberry plant', shopName: 'Nellai Nursery', shopLocation: 'Tirunelveli', isAvailable: true },
  { id: 'nn-9', name: 'Agathi Keerai Plant', description: 'Sesbania grandiflora', price: 30, image: 'https://placehold.co/400x400.png', hint: 'green plant', shopName: 'Nellai Nursery', shopLocation: 'Tirunelveli', isAvailable: true },
  { id: 'nn-10', name: 'Pungai Tree Sapling', description: 'Indian Beech Tree', price: 80, image: 'https://placehold.co/400x400.png', hint: 'beech tree', shopName: 'Nellai Nursery', shopLocation: 'Tirunelveli', isAvailable: false },
  { id: 'nn-11', name: 'Mahogany Sapling', description: 'Timber wood', price: 180, image: 'https://placehold.co/400x400.png', hint: 'mahogany tree', shopName: 'Nellai Nursery', shopLocation: 'Tirunelveli', isAvailable: true },
  
  { id: 'prod-tn1', name: 'Palm Jaggery', description: 'Karupatti, 1kg', price: 400, image: 'https://placehold.co/400x400.png', hint: 'jaggery', shopName: 'Pothigai Organics', shopLocation: 'Tirunelveli', isAvailable: true },
  { id: 'prod-tn2', name: 'Pathaneer (Palm Nectar)', description: 'Fresh, 1 Litre', price: 100, image: 'https://placehold.co/400x400.png', hint: 'nectar drink', shopName: 'Pothigai Organics', shopLocation: 'Tirunelveli', isAvailable: true },
  { id: 'prod-tn3', name: 'Dried Chillies', description: '1kg, spicy', price: 300, image: 'https://placehold.co/400x400.png', hint: 'dried chillies', shopName: 'Pothigai Organics', shopLocation: 'Tirunelveli', isAvailable: true },
  { id: 'prod-tn4', name: 'Cashew Nuts', description: 'Raw, 1kg', price: 800, image: 'https://placehold.co/400x400.png', hint: 'cashew nuts', shopName: 'Pothigai Organics', shopLocation: 'Tirunelveli', isAvailable: true },
  { id: 'prod-tn5', name: 'Banana Chips', description: 'Nendran, 250g', price: 100, image: 'https://placehold.co/400x400.png', hint: 'banana chips', shopName: 'Pothigai Organics', shopLocation: 'Tirunelveli', isAvailable: false },

  { id: 'prod-tn6', name: 'Halwa', description: 'Tirunelveli special, 500g', price: 250, image: 'https://placehold.co/400x400.png', hint: 'sweet halwa', shopName: 'Ambai Products', shopLocation: 'Tirunelveli', isAvailable: true },
  { id: 'prod-tn7', name: 'Idli Rice', description: '10kg bag', price: 550, image: 'https://placehold.co/400x400.png', hint: 'rice bag', shopName: 'Ambai Products', shopLocation: 'Tirunelveli', isAvailable: true },
  { id: 'prod-tn8', name: 'Urad Dal', description: 'Whole, 1kg', price: 200, image: 'https://placehold.co/400x400.png', hint: 'urad dal', shopName: 'Ambai Products', shopLocation: 'Tirunelveli', isAvailable: true },
  { id: 'prod-tn9', name: 'Cloves', description: '100g, organic', price: 150, image: 'https://placehold.co/400x400.png', hint: 'cloves spice', shopName: 'Ambai Products', shopLocation: 'Tirunelveli', isAvailable: true },
  { id: 'prod-tn10', name: 'Pepper', description: '100g, whole', price: 120, image: 'https://placehold.co/400x400.png', hint: 'black pepper', shopName: 'Ambai Products', shopLocation: 'Tirunelveli', isAvailable: false },


  // Thanjavur
  { id: 'prod-11', name: 'Sesame Seeds (எள் விதைகள்)', description: 'Black sesame', price: 220, image: 'https://placehold.co/400x400.png', hint: 'sesame seeds', shopName: 'Delta Agro', shopLocation: 'Thanjavur', isAvailable: true },
  { id: 'prod-j1', name: 'Paddy Straw Bales', description: 'For cattle feed', price: 150, image: 'https://placehold.co/400x400.png', hint: 'hay bales', shopName: 'Delta Agro', shopLocation: 'Thanjavur', isAvailable: true },
  { id: 'prod-j2', name: 'Rice Bran', description: '50kg bag', price: 800, image: 'https://placehold.co/400x400.png', hint: 'rice bran', shopName: 'Delta Agro', shopLocation: 'Thanjavur', isAvailable: true },
  { id: 'prod-j3', name: 'Broken Rice', description: 'For poultry feed', price: 25, image: 'https://placehold.co/400x400.png', hint: 'broken rice', shopName: 'Delta Agro', shopLocation: 'Thanjavur', isAvailable: true },
  { id: 'seed-j1', name: 'Black Gram Seeds (VBN 6)', description: 'High yield', price: 190, image: 'https://placehold.co/400x400.png', hint: 'black gram', shopName: 'Delta Agro', shopLocation: 'Thanjavur', isAvailable: false },
  { id: 'da-6', name: 'Groundnut (Raw)', description: '1kg', price: 160, image: 'https://placehold.co/400x400.png', hint: 'raw groundnuts', shopName: 'Delta Agro', shopLocation: 'Thanjavur', isAvailable: true },
  { id: 'da-7', name: 'Coconut Oil (Chekku)', description: 'Wood pressed, 1L', price: 400, image: 'https://placehold.co/400x400.png', hint: 'oil bottle', shopName: 'Delta Agro', shopLocation: 'Thanjavur', isAvailable: true },
  { id: 'da-8', name: 'Idli Rice', description: '5kg pack', price: 300, image: 'https://placehold.co/400x400.png', hint: 'rice bag', shopName: 'Delta Agro', shopLocation: 'Thanjavur', isAvailable: true },
  { id: 'da-9', name: 'Parboiled Rice', description: '5kg pack', price: 280, image: 'https://placehold.co/400x400.png', hint: 'rice bag', shopName: 'Delta Agro', shopLocation: 'Thanjavur', isAvailable: true },
  { id: 'da-10', name: 'Green Gram', description: '1kg, whole', price: 180, image: 'https://placehold.co/400x400.png', hint: 'green gram', shopName: 'Delta Agro', shopLocation: 'Thanjavur', isAvailable: false },
  { id: 'da-11', name: 'Fish Feed', description: 'Floating pellets, 25kg', price: 1500, image: 'https://placehold.co/400x400.png', hint: 'fish feed', shopName: 'Delta Agro', shopLocation: 'Thanjavur', isAvailable: true },

  { id: 'fert-9', name: 'Gypsum (ஜிப்சம்)', description: 'Soil conditioner', price: 400, image: 'https://placehold.co/400x400.png', hint: 'gypsum powder', shopName: 'Kumbakonam Fertilizers', shopLocation: 'Thanjavur', isAvailable: false },
  { id: 'fert-j1', name: 'Zinc Sulphate', description: 'For paddy', price: 650, image: 'https://placehold.co/400x400.png', hint: 'fertilizer chemical', shopName: 'Kumbakonam Fertilizers', shopLocation: 'Thanjavur', isAvailable: true },
  { id: 'fert-j2', name: 'Copper Sulphate', description: 'Fungicide', price: 800, image: 'https://placehold.co/400x400.png', hint: 'blue powder', shopName: 'Kumbakonam Fertilizers', shopLocation: 'Thanjavur', isAvailable: true },
  { id: 'prod-j4', name: 'Filter Coffee Powder', description: 'Kumbakonam degree coffee', price: 250, image: 'https://placehold.co/400x400.png', hint: 'coffee powder', shopName: 'Kumbakonam Fertilizers', shopLocation: 'Thanjavur', isAvailable: true },
  { id: 'tool-j1', name: 'Brass Vessels', description: 'For puja', price: 1500, image: 'https://placehold.co/400x400.png', hint: 'brass pots', shopName: 'Kumbakonam Fertilizers', shopLocation: 'Thanjavur', isAvailable: true },
  { id: 'kf3-6', name: 'DAP', description: 'N-P-K: 18-46-0', price: 1350, image: 'https://placehold.co/400x400.png', hint: 'fertilizer sack', shopName: 'Kumbakonam Fertilizers', shopLocation: 'Thanjavur', isAvailable: true },
  { id: 'kf3-7', name: 'Pesticide (Monocrotophos)', description: '1 Litre', price: 750, image: 'https://placehold.co/400x400.png', hint: 'pesticide bottle', shopName: 'Kumbakonam Fertilizers', shopLocation: 'Thanjavur', isAvailable: true },
  { id: 'kf3-8', name: 'Weedicide (Glyphosate)', description: '1 Litre', price: 850, image: 'https://placehold.co/400x400.png', hint: 'weedicide bottle', shopName: 'Kumbakonam Fertilizers', shopLocation: 'Thanjavur', isAvailable: true },
  { id: 'kf3-9', name: 'Brass Coffee Filter', description: 'Traditional design', price: 600, image: 'https://placehold.co/400x400.png', hint: 'coffee filter', shopName: 'Kumbakonam Fertilizers', shopLocation: 'Thanjavur', isAvailable: false },
  { id: 'kf3-10', name: 'Betel Nut (Areca)', description: 'Dried, 1kg', price: 400, image: 'https://placehold.co/400x400.png', hint: 'areca nuts', shopName: 'Kumbakonam Fertilizers', shopLocation: 'Thanjavur', isAvailable: true },
  { id: 'kf3-11', name: 'Sevanthi (Chrysanthemum) Plant', description: 'Yellow flower', price: 50, image: 'https://placehold.co/400x400.png', hint: 'yellow flower', shopName: 'Kumbakonam Fertilizers', shopLocation: 'Thanjavur', isAvailable: true },

  { id: 'tool-8', name: 'Paddy Weeder (நெல் களையெடுப்பான்)', description: 'Cono weeder', price: 2200, image: 'https://placehold.co/400x400.png', hint: 'paddy weeder', shopName: 'Thanjavur Farm Implements', shopLocation: 'Thanjavur', isAvailable: true },
  { id: 'prod-18', name: 'Paddy Harvester Rental (நெல் அறுவடை இயந்திரம்)', description: 'Per hour', price: 1800, image: 'https://placehold.co/400x400.png', hint: 'combine harvester', shopName: 'Thanjavur Farm Implements', shopLocation: 'Thanjavur', isAvailable: true },
  { id: 'tool-j2', name: 'Winnowing Fan (முரம்)', description: 'Traditional bamboo made', price: 300, image: 'https://placehold.co/400x400.png', hint: 'bamboo fan', shopName: 'Thanjavur Farm Implements', shopLocation: 'Thanjavur', isAvailable: true },
  { id: 'tool-j3', name: 'Leveling Board', description: 'Wooden, for fields', price: 1200, image: 'https://placehold.co/400x400.png', hint: 'wooden plank', shopName: 'Thanjavur Farm Implements', shopLocation: 'Thanjavur', isAvailable: false },
  { id: 'prod-j5', name: 'Thanjavur Doll (தலையாட்டி பொம்மை)', description: 'Clay doll', price: 500, image: 'https://placehold.co/400x400.png', hint: 'traditional doll', shopName: 'Thanjavur Farm Implements', shopLocation: 'Thanjavur', isAvailable: true },
  { id: 'tfi-6', name: 'Thanjavur Art Plate', description: 'Handcrafted', price: 2500, image: 'https://placehold.co/400x400.png', hint: 'art plate', shopName: 'Thanjavur Farm Implements', shopLocation: 'Thanjavur', isAvailable: true },
  { id: 'tfi-7', name: 'Paddy Thresher Machine', description: 'Motor operated', price: 40000, image: 'https://placehold.co/400x400.png', hint: 'thresher machine', shopName: 'Thanjavur Farm Implements', shopLocation: 'Thanjavur', isAvailable: true },
  { id: 'tfi-8', name: 'Manual Seed Drill', description: 'Single row', price: 3000, image: 'https://placehold.co/400x400.png', hint: 'manual seeder', shopName: 'Thanjavur Farm Implements', shopLocation: 'Thanjavur', isAvailable: true },
  { id: 'tfi-9', name: 'Rope (Coconut Coir)', description: '50 meter roll', price: 600, image: 'https://placehold.co/400x400.png', hint: 'coir rope', shopName: 'Thanjavur Farm Implements', shopLocation: 'Thanjavur', isAvailable: true },
  { id: 'tfi-10', name: 'Sieve (for grains)', description: 'Iron mesh', price: 450, image: 'https://placehold.co/400x400.png', hint: 'metal sieve', shopName: 'Thanjavur Farm Implements', shopLocation: 'Thanjavur', isAvailable: false },
  { id: 'tfi-11', name: 'Bamboo Basket', description: 'Large size', price: 350, image: 'https://placehold.co/400x400.png', hint: 'bamboo basket', shopName: 'Thanjavur Farm Implements', shopLocation: 'Thanjavur', isAvailable: true },

  { id: 'seed-tj1', name: 'Paddy Seeds (BPT 5204)', description: 'Samba Mahsuri', price: 60, image: 'https://placehold.co/400x400.png', hint: 'rice seeds', shopName: 'Big Temple Seeds', shopLocation: 'Thanjavur', isAvailable: true },
  { id: 'seed-tj2', name: 'Black Gram (ADT 5)', description: 'Resistant variety', price: 210, image: 'https://placehold.co/400x400.png', hint: 'black gram', shopName: 'Big Temple Seeds', shopLocation: 'Thanjavur', isAvailable: true },
  { id: 'seed-tj3', name: 'Green Gram (CO 8)', description: 'High protein', price: 190, image: 'https://placehold.co/400x400.png', hint: 'green gram', shopName: 'Big Temple Seeds', shopLocation: 'Thanjavur', isAvailable: false },
  { id: 'seed-tj4', name: 'Sugarcane Setts (CO 86032)', description: 'High sucrose content', price: 4, image: 'https://placehold.co/400x400.png', hint: 'sugarcane cutting', shopName: 'Big Temple Seeds', shopLocation: 'Thanjavur', isAvailable: true },
  { id: 'seed-tj5', name: 'Banana Corms (Robusta)', description: 'For delta region', price: 25, image: 'https://placehold.co/400x400.png', hint: 'banana corm', shopName: 'Big Temple Seeds', shopLocation: 'Thanjavur', isAvailable: true },

  { id: 'prod-tj1', name: 'Poppy Seeds (Kasakasa)', description: '100g pack', price: 200, image: 'https://placehold.co/400x400.png', hint: 'poppy seeds', shopName: 'Raja Raja Cholan Traders', shopLocation: 'Thanjavur', isAvailable: true },
  { id: 'prod-tj2', name: 'Gingelly Oil', description: 'Cold pressed, 1L', price: 450, image: 'https://placehold.co/400x400.png', hint: 'oil bottle', shopName: 'Raja Raja Cholan Traders', shopLocation: 'Thanjavur', isAvailable: true },
  { id: 'prod-tj3', name: 'Coconut (Bulk)', description: '100 nuts', price: 2500, image: 'https://placehold.co/400x400.png', hint: 'coconut pile', shopName: 'Raja Raja Cholan Traders', shopLocation: 'Thanjavur', isAvailable: true },
  { id: 'prod-tj4', name: 'Cashew (Roasted)', description: '500g, salted', price: 600, image: 'https://placehold.co/400x400.png', hint: 'roasted cashews', shopName: 'Raja Raja Cholan Traders', shopLocation: 'Thanjavur', isAvailable: true },
  { id: 'prod-tj5', name: 'Tamarind (Seedless)', description: '1kg pack', price: 150, image: 'https://placehold.co/400x400.png', hint: 'tamarind pulp', shopName: 'Raja Raja Cholan Traders', shopLocation: 'Thanjavur', isAvailable: false },


  // Dindigul
  { id: 'prod-12', name: 'Moringa Seeds (முருங்கை விதைகள்)', description: 'PKM-1 variety', price: 350, image: 'https://placehold.co/400x400.png', hint: 'moringa tree', shopName: 'Sirumalai Seedlings', shopLocation: 'Dindigul', isAvailable: true },
  { id: 'prod-d1', name: 'Sirumalai Banana', description: 'Hill banana, 1 dozen', price: 100, image: 'https://placehold.co/400x400.png', hint: 'banana fruit', shopName: 'Sirumalai Seedlings', shopLocation: 'Dindigul', isAvailable: true },
  { id: 'prod-d2', name: 'Coffee Beans (Green)', description: 'Arabica, 1kg', price: 400, image: 'https://placehold.co/400x400.png', hint: 'coffee beans', shopName: 'Sirumalai Seedlings', shopLocation: 'Dindigul', isAvailable: true },
  { id: 'prod-d3', name: 'Guava (கொய்யா)', description: 'Dindigul variety, 1kg', price: 80, image: 'https://placehold.co/400x400.png', hint: 'guava fruit', shopName: 'Sirumalai Seedlings', shopLocation: 'Dindigul', isAvailable: false },
  { id: 'prod-d4', name: 'Custard Apple Sapling', description: 'Sitaphal plant', price: 150, image: 'https://placehold.co/400x400.png', hint: 'custard apple', shopName: 'Sirumalai Seedlings', shopLocation: 'Dindigul', isAvailable: true },
  { id: 'ss-6-d', name: 'Pepper Vines (Cuttings)', description: 'For planting', price: 80, image: 'https://placehold.co/400x400.png', hint: 'pepper plant', shopName: 'Sirumalai Seedlings', shopLocation: 'Dindigul', isAvailable: true },
  { id: 'ss-7-d', name: 'Jackfruit (Honey)', description: '1kg, sweet', price: 120, image: 'https://placehold.co/400x400.png', hint: 'jackfruit', shopName: 'Sirumalai Seedlings', shopLocation: 'Dindigul', isAvailable: true },
  { id: 'ss-8-d', name: 'Butter Fruit (Avocado)', description: '1kg', price: 250, image: 'https://placehold.co/400x400.png', hint: 'avocado fruit', shopName: 'Sirumalai Seedlings', shopLocation: 'Dindigul', isAvailable: true },
  { id: 'ss-9-d', name: 'Cardamom (Dried)', description: '50g', price: 150, image: 'https://placehold.co/400x400.png', hint: 'cardamom spice', shopName: 'Sirumalai Seedlings', shopLocation: 'Dindigul', isAvailable: true },
  { id: 'ss-10-d', name: 'Hill Garlic', description: '1kg', price: 300, image: 'https://placehold.co/400x400.png', hint: 'garlic bulbs', shopName: 'Sirumalai Seedlings', shopLocation: 'Dindigul', isAvailable: false },
  { id: 'ss-11-d', name: 'Chow Chow (Chayote)', description: '1kg, fresh', price: 40, image: 'https://placehold.co/400x400.png', hint: 'chayote squash', shopName: 'Sirumalai Seedlings', shopLocation: 'Dindigul', isAvailable: true },
  
  { id: 'tool-7', name: 'Harvesting Net (அறுவடை வலை)', description: 'For floriculture', price: 500, image: 'https://placehold.co/400x400.png', hint: 'green net', shopName: 'Dindigul Farm Needs', shopLocation: 'Dindigul', isAvailable: true },
  { id: 'tool-d1', name: 'Dindigul Lock (திண்டுக்கல் பூட்டு)', description: 'Brass lock', price: 600, image: 'https://placehold.co/400x400.png', hint: 'brass lock', shopName: 'Dindigul Farm Needs', shopLocation: 'Dindigul', isAvailable: true },
  { id: 'prod-d5', name: 'Coir Rope', description: '10m length', price: 100, image: 'https://placehold.co/400x400.png', hint: 'coir rope', shopName: 'Dindigul Farm Needs', shopLocation: 'Dindigul', isAvailable: true },
  { id: 'tool-d2', name: 'Poly Sheet', description: 'For solar drying', price: 200, image: 'https://placehold.co/400x400.png', hint: 'plastic sheet', shopName: 'Dindigul Farm Needs', shopLocation: 'Dindigul', isAvailable: true },
  { id: 'seed-d1', name: 'Grape Cuttings', description: 'For planting', price: 50, image: 'https://placehold.co/400x400.png', hint: 'grape vine', shopName: 'Dindigul Farm Needs', shopLocation: 'Dindigul', isAvailable: false },
  { id: 'dfn-6', name: 'Shade Net (75%)', description: 'Green, per sq. meter', price: 50, image: 'https://placehold.co/400x400.png', hint: 'shade net', shopName: 'Dindigul Farm Needs', shopLocation: 'Dindigul', isAvailable: true },
  { id: 'dfn-7', name: 'Mulching Sheet', description: '25 micron, 100m roll', price: 1200, image: 'https://placehold.co/400x400.png', hint: 'mulch film', shopName: 'Dindigul Farm Needs', shopLocation: 'Dindigul', isAvailable: true },
  { id: 'dfn-8', name: 'Bird Net', description: 'Protect crops', price: 40, image: 'https://placehold.co/400x400.png', hint: 'bird netting', shopName: 'Dindigul Farm Needs', shopLocation: 'Dindigul', isAvailable: true },
  { id: 'dfn-9', name: 'Trellis Net', description: 'For creepers', price: 300, image: 'https://placehold.co/400x400.png', hint: 'trellis netting', shopName: 'Dindigul Farm Needs', shopLocation: 'Dindigul', isAvailable: true },
  { id: 'dfn-10', name: 'Fruit Cover Bags', description: 'For pomegranate, 100 pack', price: 250, image: 'https://placehold.co/400x400.png', hint: 'fruit covers', shopName: 'Dindigul Farm Needs', shopLocation: 'Dindigul', isAvailable: false },
  { id: 'dfn-11', name: 'Plastic Crates', description: 'For harvesting', price: 350, image: 'https://placehold.co/400x400.png', hint: 'plastic crate', shopName: 'Dindigul Farm Needs', shopLocation: 'Dindigul', isAvailable: true },

  { id: 'fert-10', name: 'Micronutrients (நுண்ணூட்டச் சத்து)', description: 'Vegetable mix', price: 750, image: 'https://placehold.co/400x400.png', hint: 'fertilizer mix', shopName: 'Dindigul Agro', shopLocation: 'Dindigul', isAvailable: true },
  { id: 'seed-10', name: 'Onion Seeds (வெங்காய விதைகள்)', description: 'Small onion variety', price: 450, image: 'https://placehold.co/400x400.png', hint: 'onion seeds', shopName: 'Dindigul Agro', shopLocation: 'Dindigul', isAvailable: true },
  { id: 'prod-d6', name: 'Garlic (பூண்டு)', description: '1kg', price: 200, image: 'https://placehold.co/400x400.png', hint: 'garlic bulbs', shopName: 'Dindigul Agro', shopLocation: 'Dindigul', isAvailable: true },
  { id: 'prod-d7', name: 'Tamarind', description: 'With seeds, 1kg', price: 120, image: 'https://placehold.co/400x400.png', hint: 'tamarind', shopName: 'Dindigul Agro', shopLocation: 'Dindigul', isAvailable: true },
  { id: 'fert-d1', name: 'Humic Acid', description: 'Soil conditioner, 1L', price: 800, image: 'https://placehold.co/400x400.png', hint: 'dark liquid', shopName: 'Dindigul Agro', shopLocation: 'Dindigul', isAvailable: true },
  { id: 'da2-6', name: 'Flower-booster spray', description: 'For floriculture, 500ml', price: 600, image: 'https://placehold.co/400x400.png', hint: 'spray bottle', shopName: 'Dindigul Agro', shopLocation: 'Dindigul', isAvailable: true },
  { id: 'da2-7', name: 'Grapes (Panneer)', description: '1kg', price: 90, image: 'https://placehold.co/400x400.png', hint: 'grape bunch', shopName: 'Dindigul Agro', shopLocation: 'Dindigul', isAvailable: true },
  { id: 'da2-8', name: 'Onion (Bellary)', description: '1kg, large', price: 40, image: 'https://placehold.co/400x400.png', hint: 'onions', shopName: 'Dindigul Agro', shopLocation: 'Dindigul', isAvailable: true },
  { id: 'da2-9', name: 'Moringa Leaf Powder', description: '100g pack', price: 120, image: 'https://placehold.co/400x400.png', hint: 'green powder', shopName: 'Dindigul Agro', shopLocation: 'Dindigul', isAvailable: true },
  { id: 'da2-10', name: 'Amla Candy', description: 'Sweet gooseberry, 250g', price: 150, image: 'https://placehold.co/400x400.png', hint: 'amla candy', shopName: 'Dindigul Agro', shopLocation: 'Dindigul', isAvailable: false },
  { id: 'da2-11', name: 'Honey Amla', description: 'Gooseberry in honey, 500g', price: 300, image: 'https://placehold.co/400x400.png', hint: 'honey jar', shopName: 'Dindigul Agro', shopLocation: 'Dindigul', isAvailable: true },

  { id: 'prod-d8', name: 'Dindigul Biryani Rice', description: 'Seeraga Samba, 1kg', price: 180, image: 'https://placehold.co/400x400.png', hint: 'rice grains', shopName: 'Bhai Biryani Supplies', shopLocation: 'Dindigul', isAvailable: true },
  { id: 'prod-d9', name: 'Biryani Masala Pack', description: 'Whole spices', price: 200, image: 'https://placehold.co/400x400.png', hint: 'spice mix', shopName: 'Bhai Biryani Supplies', shopLocation: 'Dindigul', isAvailable: true },
  { id: 'prod-d10', name: 'Mutton (Fresh)', description: '1kg, for biryani', price: 800, image: 'https://placehold.co/400x400.png', hint: 'raw meat', shopName: 'Bhai Biryani Supplies', shopLocation: 'Dindigul', isAvailable: true },
  { id: 'prod-d11', name: 'Ginger Garlic Paste', description: '500g pack', price: 150, image: 'https://placehold.co/400x400.png', hint: 'ginger garlic paste', shopName: 'Bhai Biryani Supplies', shopLocation: 'Dindigul', isAvailable: false },
  { id: 'prod-d12', name: 'Mint & Coriander Bundle', description: 'Fresh leaves', price: 30, image: 'https://placehold.co/400x400.png', hint: 'fresh herbs', shopName: 'Bhai Biryani Supplies', shopLocation: 'Dindigul', isAvailable: true },

  { id: 'tool-d3', name: 'Grape Pruning Shears', description: 'High carbon steel', price: 800, image: 'https://placehold.co/400x400.png', hint: 'pruning shears', shopName: 'Kodaikanal Garden Tools', shopLocation: 'Dindigul', isAvailable: true },
  { id: 'tool-d4', name: 'Flower Plucking Net', description: 'For jasmine, etc.', price: 450, image: 'https://placehold.co/400x400.png', hint: 'harvesting net', shopName: 'Kodaikanal Garden Tools', shopLocation: 'Dindigul', isAvailable: true },
  { id: 'tool-d5', name: 'Vegetable Crate', description: '50kg capacity', price: 400, image: 'https://placehold.co/400x400.png', hint: 'plastic crate', shopName: 'Kodaikanal Garden Tools', shopLocation: 'Dindigul', isAvailable: true },
  { id: 'tool-d6', name: 'Rose Thorn Stripper', description: 'Metal hand tool', price: 250, image: 'https://placehold.co/400x400.png', hint: 'gardening tool', shopName: 'Kodaikanal Garden Tools', shopLocation: 'Dindigul', isAvailable: false },
  { id: 'tool-d7', name: 'Hand Gloves', description: 'Rubber, for florists', price: 150, image: 'https://placehold.co/400x400.png', hint: 'rubber gloves', shopName: 'Kodaikanal Garden Tools', shopLocation: 'Dindigul', isAvailable: true },

  // Vellore
  { id: 'seed-6', name: 'Brinjal Seeds (கத்தரி விதைகள்)', description: 'Vellore thorned variety', price: 60, image: 'https://placehold.co/400x400.png', hint: 'brinjal plant', shopName: 'Palar Seeds', shopLocation: 'Vellore', isAvailable: true },
  { id: 'seed-v1', name: 'Radish Seeds', description: 'Mullangi, white', price: 50, image: 'https://placehold.co/400x400.png', hint: 'radish vegetable', shopName: 'Palar Seeds', shopLocation: 'Vellore', isAvailable: true },
  { id: 'seed-v2', name: 'Amaranth Seeds', description: 'Thandu keerai', price: 40, image: 'https://placehold.co/400x400.png', hint: 'amaranth plant', shopName: 'Palar Seeds', shopLocation: 'Vellore', isAvailable: false },
  { id: 'seed-v3', name: 'Bottle Gourd Seeds', description: 'Hybrid variety', price: 70, image: 'https://placehold.co/400x400.png', hint: 'bottle gourd', shopName: 'Palar Seeds', shopLocation: 'Vellore', isAvailable: true },
  { id: 'seed-v4', name: 'Pumpkin Seeds', description: 'Yellow pumpkin', price: 60, image: 'https://placehold.co/400x400.png', hint: 'pumpkin vegetable', shopName: 'Palar Seeds', shopLocation: 'Vellore', isAvailable: true },
  { id: 'ps-6', name: 'Groundnut Seeds (Spreading)', description: 'For cultivation', price: 190, image: 'https://placehold.co/400x400.png', hint: 'groundnut seeds', shopName: 'Palar Seeds', shopLocation: 'Vellore', isAvailable: true },
  { id: 'ps-7', name: 'Sorghum Seeds (Fodder)', description: 'For cattle', price: 130, image: 'https://placehold.co/400x400.png', hint: 'sorghum seeds', shopName: 'Palar Seeds', shopLocation: 'Vellore', isAvailable: true },
  { id: 'ps-8', name: 'Paddy Seeds (Short duration)', description: 'ADT-36', price: 50, image: 'https://placehold.co/400x400.png', hint: 'paddy seeds', shopName: 'Palar Seeds', shopLocation: 'Vellore', isAvailable: true },
  { id: 'ps-9', name: 'Sunn Hemp Seeds', description: 'Green manure', price: 100, image: 'https://placehold.co/400x400.png', hint: 'hemp seeds', shopName: 'Palar Seeds', shopLocation: 'Vellore', isAvailable: true },
  { id: 'ps-10', name: 'Jasmine Cuttings', description: 'Gundumalli', price: 20, image: 'https://placehold.co/400x400.png', hint: 'jasmine plant', shopName: 'Palar Seeds', shopLocation: 'Vellore', isAvailable: false },
  { id: 'ps-11', name: 'Banana Corms (Robusta)', description: 'High yield', price: 25, image: 'https://placehold.co/400x400.png', hint: 'banana corm', shopName: 'Palar Seeds', shopLocation: 'Vellore', isAvailable: true },

  { id: 'prod-14', name: 'Goat Manure (ஆட்டு எரு)', description: 'Well composted', price: 200, image: 'https://placehold.co/400x400.png', hint: 'manure compost', shopName: 'Vellore Farms', shopLocation: 'Vellore', isAvailable: true },
  { id: 'prod-v1', name: 'Cow Dung Cakes', description: 'Dried, for fuel', price: 10, image: 'https://placehold.co/400x400.png', hint: 'cow dung', shopName: 'Vellore Farms', shopLocation: 'Vellore', isAvailable: true },
  { id: 'prod-v2', name: 'Milk (Unpasteurized)', description: 'Per litre', price: 50, image: 'https://placehold.co/400x400.png', hint: 'milk can', shopName: 'Vellore Farms', shopLocation: 'Vellore', isAvailable: true },
  { id: 'prod-v3', name: 'Country Chicken Eggs', description: 'Per dozen', price: 180, image: 'https://placehold.co/400x400.png', hint: 'brown eggs', shopName: 'Vellore Farms', shopLocation: 'Vellore', isAvailable: true },
  { id: 'prod-v4', name: 'Ghee (நெய்)', description: 'Pure, 500ml', price: 400, image: 'https://placehold.co/400x400.png', hint: 'ghee jar', shopName: 'Vellore Farms', shopLocation: 'Vellore', isAvailable: false },
  { id: 'vf-6', name: 'Vermicompost (Farm made)', description: '10kg bag', price: 300, image: 'https://placehold.co/400x400.png', hint: 'compost bag', shopName: 'Vellore Farms', shopLocation: 'Vellore', isAvailable: true },
  { id: 'vf-7', name: 'Panchagavya (Organic)', description: '1 Litre', price: 250, image: 'https://placehold.co/400x400.png', hint: 'liquid bottle', shopName: 'Vellore Farms', shopLocation: 'Vellore', isAvailable: true },
  { id: 'vf-8', name: 'Goat (Live)', description: 'For meat/breeding', price: 8000, image: 'https://placehold.co/400x400.png', hint: 'live goat', shopName: 'Vellore Farms', shopLocation: 'Vellore', isAvailable: true },
  { id: 'vf-9', name: 'Country Chicken (Live)', description: 'Per bird', price: 500, image: 'https://placehold.co/400x400.png', hint: 'live chicken', shopName: 'Vellore Farms', shopLocation: 'Vellore', isAvailable: true },
  { id: 'vf-10', name: 'Duck Eggs', description: 'Per dozen', price: 200, image: 'https://placehold.co/400x400.png', hint: 'duck eggs', shopName: 'Vellore Farms', shopLocation: 'Vellore', isAvailable: false },
  { id: 'vf-11', name: 'Hay Bales', description: 'For fodder', price: 200, image: 'https://placehold.co/400x400.png', hint: 'hay bales', shopName: 'Vellore Farms', shopLocation: 'Vellore', isAvailable: true },

  { id: 'tool-9', name: 'Pruning Shears (கவாத்து கத்தரிக்கோல்)', description: 'Bypass pruner', price: 650, image: 'https://placehold.co/400x400.png', hint: 'pruning shears', shopName: 'Ambur Tools', shopLocation: 'Vellore', isAvailable: false },
  { id: 'prod-19', name: 'Leather Scraps (தோல் கழிவுகள்)', description: 'For compost enrichment', price: 100, image: 'https://placehold.co/400x400.png', hint: 'leather scraps', shopName: 'Ambur Tools', shopLocation: 'Vellore', isAvailable: true },
  { id: 'tool-v1', name: 'Leather Punching Tool', description: 'Various sizes', price: 400, image: 'https://placehold.co/400x400.png', hint: 'leather tool', shopName: 'Ambur Tools', shopLocation: 'Vellore', isAvailable: true },
  { id: 'prod-v5', name: 'Ambur Biryani Masala', description: 'Authentic spice mix', price: 150, image: 'https://placehold.co/400x400.png', hint: 'spice mix', shopName: 'Ambur Tools', shopLocation: 'Vellore', isAvailable: true },
  { id: 'prod-v6', name: 'Finished Leather', description: 'Per sq. ft.', price: 250, image: 'https://placehold.co/400x400.png', hint: 'leather sheet', shopName: 'Ambur Tools', shopLocation: 'Vellore', isAvailable: true },
  { id: 'at-6', name: 'Bone Meal Fertilizer', description: 'Steamed, 1kg', price: 150, image: 'https://placehold.co/400x400.png', hint: 'bone meal powder', shopName: 'Ambur Tools', shopLocation: 'Vellore', isAvailable: true },
  { id: 'at-7', name: 'Leather Tanning Chemicals', description: 'Basic chromium sulphate', price: 500, image: 'https://placehold.co/400x400.png', hint: 'chemical powder', shopName: 'Ambur Tools', shopLocation: 'Vellore', isAvailable: true },
  { id: 'at-8', name: 'Makki Rice', description: 'For biryani, 1kg', price: 120, image: 'https://placehold.co/400x400.png', hint: 'rice grains', shopName: 'Ambur Tools', shopLocation: 'Vellore', isAvailable: true },
  { id: 'at-9', name: 'Leather Boots', description: 'Handmade', price: 2500, image: 'https://placehold.co/400x400.png', hint: 'leather boots', shopName: 'Ambur Tools', shopLocation: 'Vellore', isAvailable: true },
  { id: 'at-10', name: 'Leather Wallets', description: 'Genuine leather', price: 800, image: 'https://placehold.co/400x400.png', hint: 'leather wallet', shopName: 'Ambur Tools', shopLocation: 'Vellore', isAvailable: false },
  { id: 'at-11', name: 'Tannery Effluent Treatment', description: 'Consultation service', price: 10000, image: 'https://placehold.co/400x400.png', hint: 'water treatment', shopName: 'Ambur Tools', shopLocation: 'Vellore', isAvailable: true },
  
  { id: 'fert-v1', name: 'DAP', description: 'Di-Ammonium Phosphate', price: 1400, image: 'https://placehold.co/400x400.png', hint: 'fertilizer sack', shopName: 'Yelagiri Agri Solutions', shopLocation: 'Vellore', isAvailable: true },
  { id: 'fert-v2', name: 'MOP', description: 'Muriate of Potash', price: 1750, image: 'https://placehold.co/400x400.png', hint: 'fertilizer bag', shopName: 'Yelagiri Agri Solutions', shopLocation: 'Vellore', isAvailable: true },
  { id: 'fert-v3', name: 'Complex 17-17-17', description: 'Balanced NPK', price: 1500, image: 'https://placehold.co/400x400.png', hint: 'fertilizer granules', shopName: 'Yelagiri Agri Solutions', shopLocation: 'Vellore', isAvailable: false },
  { id: 'fert-v4', name: 'Organic Manure Pellets', description: 'Slow release', price: 500, image: 'https://placehold.co/400x400.png', hint: 'manure pellets', shopName: 'Yelagiri Agri Solutions', shopLocation: 'Vellore', isAvailable: true },
  { id: 'fert-v5', name: 'Growth Promoters', description: 'Seaweed based', price: 900, image: 'https://placehold.co/400x400.png', hint: 'liquid bottle', shopName: 'Yelagiri Agri Solutions', shopLocation: 'Vellore', isAvailable: true },

  { id: 'prod-v7', name: 'Jackfruit (Honey)', description: 'Sweet variety, 1kg', price: 150, image: 'https://placehold.co/400x400.png', hint: 'jackfruit', shopName: 'Vellore Fort Nursery', shopLocation: 'Vellore', isAvailable: true },
  { id: 'prod-v8', name: 'Mangoes (Banganapalli)', description: '1kg, seasonal', price: 120, image: 'https://placehold.co/400x400.png', hint: 'mangoes', shopName: 'Vellore Fort Nursery', shopLocation: 'Vellore', isAvailable: true },
  { id: 'prod-v9', name: 'Jasmine Flowers', description: '1 meter string', price: 80, image: 'https://placehold.co/400x400.png', hint: 'jasmine garland', shopName: 'Vellore Fort Nursery', shopLocation: 'Vellore', isAvailable: true },
  { id: 'prod-v10', name: 'Rose Milk Syrup', description: '500ml bottle', price: 200, image: 'https://placehold.co/400x400.png', hint: 'syrup bottle', shopName: 'Vellore Fort Nursery', shopLocation: 'Vellore', isAvailable: true },
  { id: 'prod-v11', name: 'Sapota (Chikoo)', description: '1kg, fresh', price: 90, image: 'https://placehold.co/400x400.png', hint: 'sapota fruit', shopName: 'Vellore Fort Nursery', shopLocation: 'Vellore', isAvailable: false },

  // Karur
  { id: 'prod-15', name: 'Coir Pith Block (கயிறு பித் தொகுதி)', description: '5kg block, expands to 75L', price: 300, image: 'https://placehold.co/400x400.png', hint: 'coir block', shopName: 'Karur Coir Exports', shopLocation: 'Karur', isAvailable: true },
  { id: 'prod-k1', name: 'Coir Pots', description: 'Biodegradable, pack of 10', price: 200, image: 'https://placehold.co/400x400.png', hint: 'coir pots', shopName: 'Karur Coir Exports', shopLocation: 'Karur', isAvailable: true },
  { id: 'prod-k2', name: 'Coir Geotextiles', description: 'For erosion control', price: 50, image: 'https://placehold.co/400x400.png', hint: 'coir mat', shopName: 'Karur Coir Exports', shopLocation: 'Karur', isAvailable: true },
  { id: 'prod-k3', name: 'Coco Peat Disc', description: 'For seedlings', price: 10, image: 'https://placehold.co/400x400.png', hint: 'coco peat', shopName: 'Karur Coir Exports', shopLocation: 'Karur', isAvailable: false },
  { id: 'prod-k4', name: 'Coconut Shell Charcoal', description: '1kg bag', price: 80, image: 'https://placehold.co/400x400.png', hint: 'charcoal', shopName: 'Karur Coir Exports', shopLocation: 'Karur', isAvailable: true },
  { id: 'kce-6', name: 'Coir Rope (10mm)', description: '50 meter roll', price: 450, image: 'https://placehold.co/400x400.png', hint: 'coir rope', shopName: 'Karur Coir Exports', shopLocation: 'Karur', isAvailable: true },
  { id: 'kce-7', name: 'Coir Doormat', description: 'Handwoven', price: 250, image: 'https://placehold.co/400x400.png', hint: 'doormat', shopName: 'Karur Coir Exports', shopLocation: 'Karur', isAvailable: true },
  { id: 'kce-8', name: 'Coir Fiber Bale', description: '10kg', price: 300, image: 'https://placehold.co/400x400.png', hint: 'coir fiber', shopName: 'Karur Coir Exports', shopLocation: 'Karur', isAvailable: true },
  { id: 'kce-9', name: 'Coconut Shell Cups', description: 'Set of 6', price: 180, image: 'https://placehold.co/400x400.png', hint: 'coconut cups', shopName: 'Karur Coir Exports', shopLocation: 'Karur', isAvailable: true },
  { id: 'kce-10', name: 'Coir Logs', description: 'For river bank protection', price: 500, image: 'https://placehold.co/400x400.png', hint: 'coir log', shopName: 'Karur Coir Exports', shopLocation: 'Karur', isAvailable: false },
  { id: 'kce-11', name: 'Coconut Shell Powder', description: '1kg, for industrial use', price: 120, image: 'https://placehold.co/400x400.png', hint: 'brown powder', shopName: 'Karur Coir Exports', shopLocation: 'Karur', isAvailable: true },

  { id: 'tool-10', name: 'Textile Shredder (ஜவுளி து драப்பர்)', description: 'For mulching', price: 12000, image: 'https://placehold.co/400x400.png', hint: 'shredder machine', shopName: 'Amaravathi Farm Tech', shopLocation: 'Karur', isAvailable: true },
  { id: 'seed-11', name: 'Sunhemp Seeds (சணல் விதைகள்)', description: 'Green manure crop', price: 80, image: 'https://placehold.co/400x400.png', hint: 'hemp seeds', shopName: 'Amaravathi Farm Tech', shopLocation: 'Karur', isAvailable: true },
  { id: 'prod-k5', name: 'Mosquito Net', description: 'For agricultural use', price: 300, image: 'https://placehold.co/400x400.png', hint: 'white net', shopName: 'Amaravathi Farm Tech', shopLocation: 'Karur', isAvailable: true },
  { id: 'tool-k1', name: 'Powerloom Machine', description: 'Used, good condition', price: 50000, image: 'https://placehold.co/400x400.png', hint: 'loom machine', shopName: 'Amaravathi Farm Tech', shopLocation: 'Karur', isAvailable: false },
  { id: 'prod-k6', name: 'Bus Body Parts', description: 'Scrap metal', price: 500, image: 'https://placehold.co/400x400.png', hint: 'metal scrap', shopName: 'Amaravathi Farm Tech', shopLocation: 'Karur', isAvailable: true },
  { id: 'aft-6', name: 'Home Textile (Bedsheet)', description: 'Cotton, double', price: 800, image: 'https://placehold.co/400x400.png', hint: 'bedsheet', shopName: 'Amaravathi Farm Tech', shopLocation: 'Karur', isAvailable: true },
  { id: 'aft-7', name: 'Towel Set', description: 'Bath towel, hand towel', price: 500, image: 'https://placehold.co/400x400.png', hint: 'towel set', shopName: 'Amaravathi Farm Tech', shopLocation: 'Karur', isAvailable: true },
  { id: 'aft-8', name: 'Drumstick Seeds', description: 'Annual variety', price: 250, image: 'https://placehold.co/400x400.png', hint: 'drumstick seeds', shopName: 'Amaravathi Farm Tech', shopLocation: 'Karur', isAvailable: true },
  { id: 'aft-9', name: 'Paper Mill Sludge', description: 'For soil amendment', price: 100, image: 'https://placehold.co/400x400.png', hint: 'sludge pile', shopName: 'Amaravathi Farm Tech', shopLocation: 'Karur', isAvailable: true },
  { id: 'aft-10', name: 'HDPE Woven Sacks', description: 'For packaging', price: 20, image: 'https://placehold.co/400x400.png', hint: 'woven sack', shopName: 'Amaravathi Farm Tech', shopLocation: 'Karur', isAvailable: false },
  { id: 'aft-11', name: 'Papaya Seeds (Red Lady)', description: 'For cultivation', price: 100, image: 'https://placehold.co/400x400.png', hint: 'papaya seeds', shopName: 'Amaravathi Farm Tech', shopLocation: 'Karur', isAvailable: true },

  { id: 'seed-k1', name: 'Betelvine Cuttings', description: 'Karur variety', price: 15, image: 'https://placehold.co/400x400.png', hint: 'betel leaf plant', shopName: 'Pasupatheeswarar Seeds', shopLocation: 'Karur', isAvailable: true },
  { id: 'seed-k2', name: 'Moringa Seeds (PKM1)', description: 'Annual moringa', price: 400, image: 'https://placehold.co/400x400.png', hint: 'moringa seeds', shopName: 'Pasupatheeswarar Seeds', shopLocation: 'Karur', isAvailable: true },
  { id: 'seed-k3', name: 'Sorghum Seeds (CO 30)', description: 'Fodder crop', price: 140, image: 'https://placehold.co/400x400.png', hint: 'sorghum plant', shopName: 'Pasupatheeswarar Seeds', shopLocation: 'Karur', isAvailable: true },
  { id: 'seed-k4', name: 'Sesame Seeds (TMV 7)', description: 'Oilseed crop', price: 230, image: 'https://placehold.co/400x400.png', hint: 'sesame seeds', shopName: 'Pasupatheeswarar Seeds', shopLocation: 'Karur', isAvailable: false },
  { id: 'seed-k5', name: 'Cucumber Seeds', description: 'Local variety', price: 70, image: 'https://placehold.co/400x400.png', hint: 'cucumber plant', shopName: 'Pasupatheeswarar Seeds', shopLocation: 'Karur', isAvailable: true },

  { id: 'tool-k2', name: 'Gem Clips', description: 'For paper industry', price: 50, image: 'https://placehold.co/400x400.png', hint: 'paper clips', shopName: 'TNPL Green Supplies', shopLocation: 'Karur', isAvailable: true },
  { id: 'tool-k3', name: 'Paper Ream', description: 'A4 size, 500 sheets', price: 350, image: 'https://placehold.co/400x400.png', hint: 'paper stack', shopName: 'TNPL Green Supplies', shopLocation: 'Karur', isAvailable: true },
  { id: 'prod-k7', name: 'Cement', description: '50kg bag', price: 450, image: 'https://placehold.co/400x400.png', hint: 'cement bag', shopName: 'TNPL Green Supplies', shopLocation: 'Karur', isAvailable: true },
  { id: 'prod-k8', name: 'Fly Ash Brick', description: 'Per brick', price: 8, image: 'https://placehold.co/400x400.png', hint: 'ash brick', shopName: 'TNPL Green Supplies', shopLocation: 'Karur', isAvailable: false },
  { id: 'prod-k9', name: 'Bagasse', description: 'Sugarcane waste, per ton', price: 1500, image: 'https://placehold.co/400x400.png', hint: 'sugarcane waste', shopName: 'TNPL Green Supplies', shopLocation: 'Karur', isAvailable: true },
  
  { id: 'prod-k10', name: 'Bed Linens', description: 'Cotton, Export Quality', price: 1200, image: 'https://placehold.co/400x400.png', hint: 'bed linens', shopName: 'Karur Textiles', shopLocation: 'Karur', isAvailable: true },
  { id: 'prod-k11', name: 'Kitchen Linens', description: 'Apron, Gloves, Towels', price: 600, image: 'https://placehold.co/400x400.png', hint: 'kitchen textiles', shopName: 'Karur Textiles', shopLocation: 'Karur', isAvailable: true },
  { id: 'prod-k12', name: 'Table Linens', description: 'Table cloth, mats', price: 800, image: 'https://placehold.co/400x400.png', hint: 'table cloth', shopName: 'Karur Textiles', shopLocation: 'Karur', isAvailable: true },
  { id: 'prod-k13', name: 'Curtains', description: 'Cotton, pair', price: 1500, image: 'https://placehold.co/400x400.png', hint: 'curtains', shopName: 'Karur Textiles', shopLocation: 'Karur', isAvailable: false },
  { id: 'prod-k14', name: 'Floor Mats', description: 'Woven cotton mats', price: 400, image: 'https://placehold.co/400x400.png', hint: 'floor mat', shopName: 'Karur Textiles', shopLocation: 'Karur', isAvailable: true },

  // Tiruppur
  { id: 'prod-16', name: 'Cotton Waste (பருத்தி கழிவுகள்)', description: 'Organic matter for compost', price: 50, image: 'https://placehold.co/400x400.png', hint: 'cotton waste', shopName: 'Tiruppur Cotton Mills', shopLocation: 'Tiruppur', isAvailable: true },
  { id: 'prod-p1', name: 'Cotton Yarn Cone', description: 'For weaving', price: 250, image: 'https://placehold.co/400x400.png', hint: 'yarn cone', shopName: 'Tiruppur Cotton Mills', shopLocation: 'Tiruppur', isAvailable: true },
  { id: 'prod-p2', name: 'Raw Cotton Bale', description: '10kg bale', price: 600, image: 'https://placehold.co/400x400.png', hint: 'cotton bale', shopName: 'Tiruppur Cotton Mills', shopLocation: 'Tiruppur', isAvailable: true },
  { id: 'prod-p3', name: 'Hosiery Cuttings', description: 'For recycling, per kg', price: 30, image: 'https://placehold.co/400x400.png', hint: 'fabric scraps', shopName: 'Tiruppur Cotton Mills', shopLocation: 'Tiruppur', isAvailable: true },
  { id: 'tool-p1', name: 'Sewing Machine Oil', description: '1 litre can', price: 200, image: 'https://placehold.co/400x400.png', hint: 'oil can', shopName: 'Tiruppur Cotton Mills', shopLocation: 'Tiruppur', isAvailable: false },
  { id: 'tcm-6', name: 'Knitted Fabric (T-shirt)', description: 'Per kg', price: 400, image: 'https://placehold.co/400x400.png', hint: 'fabric roll', shopName: 'Tiruppur Cotton Mills', shopLocation: 'Tiruppur', isAvailable: true },
  { id: 'tcm-7', name: 'Cotton Seed Oil Cake', description: 'Cattle feed, 50kg', price: 2000, image: 'https://placehold.co/400x400.png', hint: 'oil cake', shopName: 'Tiruppur Cotton Mills', shopLocation: 'Tiruppur', isAvailable: true },
  { id: 'tcm-8', name: 'Industrial Sewing Machine', description: 'Juki, used', price: 15000, image: 'https://placehold.co/400x400.png', hint: 'sewing machine', shopName: 'Tiruppur Cotton Mills', shopLocation: 'Tiruppur', isAvailable: true },
  { id: 'tcm-9', name: 'Fabric Dye (Chemical)', description: 'Blue color, 1kg', price: 500, image: 'https://placehold.co/400x400.png', hint: 'dye powder', shopName: 'Tiruppur Cotton Mills', shopLocation: 'Tiruppur', isAvailable: true },
  { id: 'tcm-10', name: 'Buttons (Bulk)', description: 'Assorted, per kg', price: 300, image: 'https://placehold.co/400x400.png', hint: 'assorted buttons', shopName: 'Tiruppur Cotton Mills', shopLocation: 'Tiruppur', isAvailable: false },
  { id: 'tcm-11', name: 'Cardboard Boxes', description: 'For packing, 100 boxes', price: 1500, image: 'https://placehold.co/400x400.png', hint: 'cardboard boxes', shopName: 'Tiruppur Cotton Mills', shopLocation: 'Tiruppur', isAvailable: true },

  { id: 'fert-11', name: 'Zinc Sulphate (цинк சல்பேட்)', description: 'For cotton crops', price: 700, image: 'https://placehold.co/400x400.png', hint: 'fertilizer bag', shopName: 'Noyyal Agro Center', shopLocation: 'Tiruppur', isAvailable: false },
  { id: 'prod-20', name: 'Knitted Fabric Waste', description: 'For mulching & compost', price: 40, image: 'https://placehold.co/400x400.png', hint: 'fabric scraps', shopName: 'Noyyal Agro Center', shopLocation: 'Tiruppur', isAvailable: true },
  { id: 'prod-p4', name: 'Guppy Fish', description: 'For mosquito control', price: 10, image: 'https://placehold.co/400x400.png', hint: 'small fish', shopName: 'Noyyal Agro Center', shopLocation: 'Tiruppur', isAvailable: true },
  { id: 'tool-p2', name: 'Windmill Blade Scrap', description: 'Fiberglass for projects', price: 1000, image: 'https://placehold.co/400x400.png', hint: 'windmill blade', shopName: 'Noyyal Agro Center', shopLocation: 'Tiruppur', isAvailable: true },
  { id: 'prod-p5', name: 'River Sand', description: 'For construction, per load', price: 3000, image: 'https://placehold.co/400x400.png', hint: 'sand pile', shopName: 'Noyyal Agro Center', shopLocation: 'Tiruppur', isAvailable: true },
  { id: 'nac-6', name: 'Dyeing Sludge', description: 'Composted, for manure', price: 50, image: 'https://placehold.co/400x400.png', hint: 'sludge pile', shopName: 'Noyyal Agro Center', shopLocation: 'Tiruppur', isAvailable: true },
  { id: 'nac-7', name: 'Boiler Ash', description: 'Soil amendment', price: 30, image: 'https://placehold.co/400x400.png', hint: 'ash pile', shopName: 'Noyyal Agro Center', shopLocation: 'Tiruppur', isAvailable: true },
  { id: 'nac-8', name: 'Small Onion (Shallots)', description: '1kg, Tiruppur special', price: 80, image: 'https://placehold.co/400x400.png', hint: 'shallots', shopName: 'Noyyal Agro Center', shopLocation: 'Tiruppur', isAvailable: true },
  { id: 'nac-9', name: 'Banana (Robusta)', description: '1kg', price: 40, image: 'https://placehold.co/400x400.png', hint: 'banana fruit', shopName: 'Noyyal Agro Center', shopLocation: 'Tiruppur', isAvailable: true },
  { id: 'nac-10', name: 'Effluent Treatment Plant (Mini)', description: 'Consultation & setup', price: 50000, image: 'https://placehold.co/400x400.png', hint: 'water plant', shopName: 'Noyyal Agro Center', shopLocation: 'Tiruppur', isAvailable: false },
  { id: 'nac-11', name: 'Solar Power Fence', description: 'Per meter installation', price: 200, image: 'https://placehold.co/400x400.png', hint: 'solar fence', shopName: 'Noyyal Agro Center', shopLocation: 'Tiruppur', isAvailable: true },

  { id: 'prod-tp1', name: 'T-Shirts (Blank)', description: 'Pack of 10, for printing', price: 1500, image: 'https://placehold.co/400x400.png', hint: 't-shirts', shopName: 'Knitwear Capital', shopLocation: 'Tiruppur', isAvailable: true },
  { id: 'prod-tp2', name: 'Polo Shirts', description: 'Assorted colors', price: 400, image: 'https://placehold.co/400x400.png', hint: 'polo shirts', shopName: 'Knitwear Capital', shopLocation: 'Tiruppur', isAvailable: true },
  { id: 'prod-tp3', name: 'Kids Wear', description: 'Set of 3', price: 700, image: 'https://placehold.co/400x400.png', hint: 'kids clothes', shopName: 'Knitwear Capital', shopLocation: 'Tiruppur', isAvailable: true },
  { id: 'prod-tp4', name: 'Leggings', description: 'Cotton Lycra', price: 250, image: 'https://placehold.co/400x400.png', hint: 'leggings', shopName: 'Knitwear Capital', shopLocation: 'Tiruppur', isAvailable: false },
  { id: 'prod-tp5', name: 'Innerwear', description: 'Vests, pack of 5', price: 500, image: 'https://placehold.co/400x400.png', hint: 'vests', shopName: 'Knitwear Capital', shopLocation: 'Tiruppur', isAvailable: true },

  { id: 'tool-tp1', name: 'Tagging Gun', description: 'For apparel', price: 600, image: 'https://placehold.co/400x400.png', hint: 'tagging gun', shopName: 'Garment Zone', shopLocation: 'Tiruppur', isAvailable: true },
  { id: 'tool-tp2', name: 'Fabric Cutting Scissors', description: '10-inch, sharp', price: 800, image: 'https://placehold.co/400x400.png', hint: 'scissors', shopName: 'Garment Zone', shopLocation: 'Tiruppur', isAvailable: true },
  { id: 'tool-tp3', name: 'Screen Printing Kit', description: 'Basic setup', price: 5000, image: 'https://placehold.co/400x400.png', hint: 'printing kit', shopName: 'Garment Zone', shopLocation: 'Tiruppur', isAvailable: true },
  { id: 'tool-tp4', name: 'Steam Iron', description: 'Industrial grade', price: 3000, image: 'https://placehold.co/400x400.png', hint: 'steam iron', shopName: 'Garment Zone', shopLocation: 'Tiruppur', isAvailable: false },
  { id: 'tool-tp5', name: 'Measuring Tapes', description: 'Pack of 10', price: 200, image: 'https://placehold.co/400x400.png', hint: 'measuring tape', shopName: 'Garment Zone', shopLocation: 'Tiruppur', isAvailable: true },

  { id: 'seed-tp1', name: 'Guava Seeds (L-49)', description: 'Lucknow 49 variety', price: 150, image: 'https://placehold.co/400x400.png', hint: 'guava seeds', shopName: 'Avinashi Agri', shopLocation: 'Tiruppur', isAvailable: true },
  { id: 'seed-tp2', name: 'Sapota Seeds (PKM-1)', description: 'Cricket ball variety', price: 120, image: 'https://placehold.co/400x400.png', hint: 'sapota seeds', shopName: 'Avinashi Agri', shopLocation: 'Tiruppur', isAvailable: true },
  { id: 'seed-tp3', name: 'Pomegranate Seeds (Bhagwa)', description: 'For cultivation', price: 200, image: 'https://placehold.co/400x400.png', hint: 'pomegranate seeds', shopName: 'Avinashi Agri', shopLocation: 'Tiruppur', isAvailable: true },
  { id: 'seed-tp4', name: 'Amla Seeds (NA-7)', description: 'For planting', price: 100, image: 'https://placehold.co/400x400.png', hint: 'amla seeds', shopName: 'Avinashi Agri', shopLocation: 'Tiruppur', isAvailable: false },
  { id: 'seed-tp5', name: 'Jamun Seeds (Local)', description: 'For rootstock', price: 80, image: 'https://placehold.co/400x400.png', hint: 'jamun seeds', shopName: 'Avinashi Agri', shopLocation: 'Tiruppur', isAvailable: true },

  // Kanyakumari
  { id: 'prod-17', name: 'Rubber Sheet (ரப்பர் தாள்)', description: 'RSS-4 Grade', price: 180, image: 'https://placehold.co/400x400.png', hint: 'rubber sheets', shopName: 'Kumari Rubber Traders', shopLocation: 'Kanyakumari', isAvailable: true },
  { id: 'prod-y1', name: 'Rubber Latex', description: 'Per litre', price: 150, image: 'https://placehold.co/400x400.png', hint: 'liquid latex', shopName: 'Kumari Rubber Traders', shopLocation: 'Kanyakumari', isAvailable: true },
  { id: 'prod-y2', name: 'Coconut Husks', description: 'For fuel/fiber', price: 5, image: 'https://placehold.co/400x400.png', hint: 'coconut husks', shopName: 'Kumari Rubber Traders', shopLocation: 'Kanyakumari', isAvailable: true },
  { id: 'tool-y1', name: 'Formic Acid', description: 'For rubber coagulation', price: 200, image: 'https://placehold.co/400x400.png', hint: 'chemical bottle', shopName: 'Kumari Rubber Traders', shopLocation: 'Kanyakumari', isAvailable: true },
  { id: 'tool-y2', name: 'Rubber Roller Machine', description: 'Manual sheet maker', price: 8000, image: 'https://placehold.co/400x400.png', hint: 'roller machine', shopName: 'Kumari Rubber Traders', shopLocation: 'Kanyakumari', isAvailable: false },
  { id: 'krt-6', name: 'Rubber Sapling', description: 'High-yield clone', price: 120, image: 'https://placehold.co/400x400.png', hint: 'rubber plant', shopName: 'Kumari Rubber Traders', shopLocation: 'Kanyakumari', isAvailable: true },
  { id: 'krt-7', name: 'Rubber Wood Planks', description: 'For furniture, per cft', price: 800, image: 'https://placehold.co/400x400.png', hint: 'wood planks', shopName: 'Kumari Rubber Traders', shopLocation: 'Kanyakumari', isAvailable: true },
  { id: 'krt-8', name: 'Coconut Shells', description: 'Bulk, per ton', price: 3000, image: 'https://placehold.co/400x400.png', hint: 'coconut shells', shopName: 'Kumari Rubber Traders', shopLocation: 'Kanyakumari', isAvailable: true },
  { id: 'krt-9', name: 'Latex Collection Cups', description: 'Pack of 100', price: 500, image: 'https://placehold.co/400x400.png', hint: 'collection cups', shopName: 'Kumari Rubber Traders', shopLocation: 'Kanyakumari', isAvailable: true },
  { id: 'krt-10', name: 'Rubber Tapping Lamp', description: 'Headlamp for early morning work', price: 400, image: 'https://placehold.co/400x400.png', hint: 'head lamp', shopName: 'Kumari Rubber Traders', shopLocation: 'Kanyakumari', isAvailable: false },
  { id: 'krt-11', name: 'Sulphur Powder', description: 'For rubber processing', price: 150, image: 'https://placehold.co/400x400.png', hint: 'yellow powder', shopName: 'Kumari Rubber Traders', shopLocation: 'Kanyakumari', isAvailable: true },
  
  { id: 'seed-7', name: 'Clove Sapling (கிராம்பு கன்று)', description: 'Healthy sapling', price: 150, image: 'https://placehold.co/400x400.png', hint: 'clove plant', shopName: 'Marthandam Spices', shopLocation: 'Kanyakumari', isAvailable: true },
  { id: 'tool-15', name: 'Tapping Knife (சீவல் கத்தி)', description: 'For rubber tapping', price: 350, image: 'https://placehold.co/400x400.png', hint: 'tapping knife', shopName: 'Marthandam Spices', shopLocation: 'Kanyakumari', isAvailable: true },
  { id: 'prod-y3', name: 'Nutmeg Sapling', description: 'With mace', price: 200, image: 'https://placehold.co/400x400.png', hint: 'nutmeg plant', shopName: 'Marthandam Spices', shopLocation: 'Kanyakumari', isAvailable: true },
  { id: 'prod-y4', name: 'Cashew Sapling', description: 'VRI-3 variety', price: 180, image: 'https://placehold.co/400x400.png', hint: 'cashew tree', shopName: 'Marthandam Spices', shopLocation: 'Kanyakumari', isAvailable: true },
  { id: 'prod-y5', name: 'Nendran Chips', description: 'Banana chips, 250g', price: 120, image: 'https://placehold.co/400x400.png', hint: 'banana chips', shopName: 'Marthandam Spices', shopLocation: 'Kanyakumari', isAvailable: true },
  { id: 'ms-6', name: 'Black Pepper (Dried)', description: 'Tellicherry variety, 100g', price: 180, image: 'https://placehold.co/400x400.png', hint: 'black pepper', shopName: 'Marthandam Spices', shopLocation: 'Kanyakumari', isAvailable: true },
  { id: 'ms-7', name: 'Cinnamon Sapling', description: 'True cinnamon', price: 160, image: 'https://placehold.co/400x400.png', hint: 'cinnamon tree', shopName: 'Marthandam Spices', shopLocation: 'Kanyakumari', isAvailable: true },
  { id: 'ms-8', name: 'Tapioca Chips', description: 'Spicy, 250g', price: 100, image: 'https://placehold.co/400x400.png', hint: 'tapioca chips', shopName: 'Marthandam Spices', shopLocation: 'Kanyakumari', isAvailable: true },
  { id: 'ms-9', name: 'Jackfruit Chips', description: 'Salted, 250g', price: 150, image: 'https://placehold.co/400x400.png', hint: 'jackfruit chips', shopName: 'Marthandam Spices', shopLocation: 'Kanyakumari', isAvailable: false },
  { id: 'ms-10', name: 'Marthandam Honey', description: 'Forest honey, 500g', price: 450, image: 'https://placehold.co/400x400.png', hint: 'honey jar', shopName: 'Marthandam Spices', shopLocation: 'Kanyakumari', isAvailable: true },
  { id: 'ms-11', name: 'Spices Box', description: 'Assorted whole spices', price: 800, image: 'https://placehold.co/400x400.png', hint: 'spice box', shopName: 'Marthandam Spices', shopLocation: 'Kanyakumari', isAvailable: true },

  { id: 'prod-y6', name: 'Sea Fish (Fresh)', description: 'Assorted, 1kg', price: 300, image: 'https://placehold.co/400x400.png', hint: 'fresh fish', shopName: 'Ocean Fresh', shopLocation: 'Kanyakumari', isAvailable: true },
  { id: 'prod-y7', name: 'Dried Fish', description: 'Nethili, 200g', price: 150, image: 'https://placehold.co/400x400.png', hint: 'dried fish', shopName: 'Ocean Fresh', shopLocation: 'Kanyakumari', isAvailable: true },
  { id: 'prod-y8', name: 'Fish Pickle', description: 'Spicy tuna pickle, 250g', price: 200, image: 'https://placehold.co/400x400.png', hint: 'pickle jar', shopName: 'Ocean Fresh', shopLocation: 'Kanyakumari', isAvailable: true },
  { id: 'prod-y9', name: 'Prawns (Frozen)', description: 'Peeled, 500g', price: 450, image: 'https://placehold.co/400x400.png', hint: 'frozen prawns', shopName: 'Ocean Fresh', shopLocation: 'Kanyakumari', isAvailable: false },
  { id: 'prod-y10', name: 'Sea Shell Crafts', description: 'Decorative items', price: 300, image: 'https://placehold.co/400x400.png', hint: 'shell crafts', shopName: 'Ocean Fresh', shopLocation: 'Kanyakumari', isAvailable: true },
  
  { id: 'tool-y3', name: 'Fishing Net', description: 'Nylon, 50m', price: 1200, image: 'https://placehold.co/400x400.png', hint: 'fishing net', shopName: 'Nagercoil Fishing Gear', shopLocation: 'Kanyakumari', isAvailable: true },
  { id: 'tool-y4', name: 'Fishing Rod', description: 'Beginner kit', price: 1500, image: 'https://placehold.co/400x400.png', hint: 'fishing rod', shopName: 'Nagercoil Fishing Gear', shopLocation: 'Kanyakumari', isAvailable: true },
  { id: 'tool-y5', name: 'Anchor', description: 'Small boat anchor, 5kg', price: 2000, image: 'https://placehold.co/400x400.png', hint: 'boat anchor', shopName: 'Nagercoil Fishing Gear', shopLocation: 'Kanyakumari', isAvailable: true },
  { id: 'tool-y6', name: 'Life Jacket', description: 'Adult size', price: 1000, image: 'https://placehold.co/400x400.png', hint: 'life jacket', shopName: 'Nagercoil Fishing Gear', shopLocation: 'Kanyakumari', isAvailable: true },
  { id: 'tool-y7', 'name': 'Ice Box (50L)', 'description': 'For storing fish', 'price': 3500, 'image': 'https://placehold.co/400x400.png', 'hint': 'ice box', 'shopName': 'Nagercoil Fishing Gear', 'shopLocation': 'Kanyakumari', isAvailable: false },

  { id: 'prod-y11', name: 'Palmyra Sprout (Panam Kizhangu)', description: '1kg, boiled', price: 100, image: 'https://placehold.co/400x400.png', hint: 'palm sprout', shopName: 'Cape Comorin Naturals', shopLocation: 'Kanyakumari', isAvailable: true },
  { id: 'prod-y12', name: 'Nungu (Ice Apple)', description: 'Dozen', price: 120, image: 'https://placehold.co/400x400.png', hint: 'ice apple', shopName: 'Cape Comorin Naturals', shopLocation: 'Kanyakumari', isAvailable: true },
  { id: 'prod-y13', name: 'Vivekananda Rock Photo', description: 'Framed', price: 400, image: 'https://placehold.co/400x400.png', hint: 'rock memorial', shopName: 'Cape Comorin Naturals', shopLocation: 'Kanyakumari', isAvailable: true },
  { id: 'prod-y14', name: 'Thiruvalluvar Statue (Mini)', description: '5-inch replica', price: 500, image: 'https://placehold.co/400x400.png', hint: 'statue', shopName: 'Cape Comorin Naturals', shopLocation: 'Kanyakumari', isAvailable: true },
  { id: 'prod-y15', name: 'Sea Salt (Unrefined)', description: '1kg pack', price: 50, image: 'https://placehold.co/400x400.png', hint: 'sea salt', shopName: 'Cape Comorin Naturals', shopLocation: 'Kanyakumari', isAvailable: false },

];

export default function AgriStorePage() {
  const { addToCart } = useCart();
  const { toast } = useToast();

  const handleAddToCart = (product: Product) => {
    addToCart(product);
    toast({
      title: 'Added to Cart',
      description: `${product.name} has been added to your cart.`,
    });
  };
  
  const renderProductCard = (product: Product) => (
    <Card key={product.id} className="overflow-hidden flex flex-col">
      <CardHeader className="p-0">
        <div className="relative h-48 w-full">
          <Image src={product.image} alt={product.name} layout="fill" objectFit="cover" data-ai-hint={product.hint} />
           {!product.isAvailable && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <Badge variant="destructive" className="text-lg">Out of Stock</Badge>
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent className="p-4 flex-grow">
        <CardTitle className="text-xl">{product.name}</CardTitle>
        <CardDescription className="flex items-center text-sm text-muted-foreground mt-1">
             {product.description}
        </CardDescription>
        <p className="mt-2 text-lg font-semibold text-primary">₹{product.price.toFixed(2)}</p>
      </CardContent>
      <CardFooter>
        <Button 
          className="w-full" 
          onClick={() => handleAddToCart(product)} 
          disabled={!product.isAvailable}
        >
          {product.isAvailable ? <ShoppingCart className="mr-2 h-4 w-4" /> : <PackageX className="mr-2 h-4 w-4" />}
          {product.isAvailable ? 'Add to Cart' : 'Out of Stock'}
        </Button>
      </CardFooter>
    </Card>
  );

  const productsByDistrict = products.reduce((acc, product) => {
    const { shopLocation } = product;
    if (!acc[shopLocation]) {
      acc[shopLocation] = [];
    }
    acc[shopLocation].push(product);
    return acc;
  }, {} as Record<string, Product[]>);

  return (
    <div className="min-h-screen w-full bg-secondary/50">
      <DashboardHeader title="Agri Store" userType="farmer" />
      
      <main className="container mx-auto py-8">
        {Object.entries(productsByDistrict).map(([district, districtProducts]) => {
            if (districtProducts.length === 0) return null;

            const productsByShop = districtProducts.reduce((acc, product) => {
                if (!acc[product.shopName]) {
                  acc[product.shopName] = [];
                }
                acc[product.shopName].push(product);
                return acc;
            }, {} as Record<string, Product[]>);
            
            return (
                 <section key={district} className="mb-12">
                  <h1 className="text-3xl font-bold mb-6 font-headline">{district}</h1>
                    <Accordion type="multiple" className="w-full space-y-4">
                        {Object.entries(productsByShop).map(([shopName, shopProducts]) => (
                             <AccordionItem value={shopName} key={shopName} className="border bg-card rounded-lg">
                                <AccordionTrigger className="p-6 text-lg font-semibold hover:no-underline">
                                    <div className="flex items-center gap-3">
                                        <Store className="h-6 w-6 text-primary" />
                                        {shopName}
                                    </div>
                                </AccordionTrigger>
                                <AccordionContent className="p-6 pt-0">
                                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                                        {shopProducts.map(renderProductCard)}
                                    </div>
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </section>
            );
        })}
      </main>
    </div>
  );
}
