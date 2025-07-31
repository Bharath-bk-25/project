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

  { id: 'fert-5', name: 'Bio-Fertilizer (உயிர் உரம்)', description: 'Improves soil health', price: 450, image: 'https://placehold.co/400x400.png', hint: 'compost bag', shopName: 'Covai Agro Center', shopLocation: 'Coimbatore', isAvailable: true },
  { id: 'seed-8', name: 'Vegetable Seeds (காய்கறி விதைகள்)', description: 'Assorted pack', price: 150, image: 'https://placehold.co/400x400.png', hint: 'seed packets', shopName: 'Covai Agro Center', shopLocation: 'Coimbatore', isAvailable: true },
  { id: 'prod-c1', name: 'Turmeric Powder (மஞ்சள் தூள்)', description: '1kg pack, organic', price: 400, image: 'https://placehold.co/400x400.png', hint: 'turmeric powder', shopName: 'Covai Agro Center', shopLocation: 'Coimbatore', isAvailable: true },
  { id: 'fert-c2', name: 'Rock Phosphate', description: 'Natural phosphorus', price: 500, image: 'https://placehold.co/400x400.png', hint: 'rock powder', shopName: 'Covai Agro Center', shopLocation: 'Coimbatore', isAvailable: true },
  { id: 'tool-c2', name: 'Watering Can', description: '5 litre capacity', price: 300, image: 'https://placehold.co/400x400.png', hint: 'watering can', shopName: 'Covai Agro Center', shopLocation: 'Coimbatore', isAvailable: false },

  { id: 'prod-5', name: 'Coconut Sapling (தென்னங்கன்று)', description: 'West Coast Tall', price: 150, image: 'https://placehold.co/400x400.png', hint: 'coconut tree', shopName: 'Green Thumb Nursery', shopLocation: 'Coimbatore', isAvailable: true },
  { id: 'prod-c2', name: 'Guava Sapling (கொய்யா கன்று)', description: 'Pink flesh variety', price: 80, image: 'https://placehold.co/400x400.png', hint: 'guava tree', shopName: 'Green Thumb Nursery', shopLocation: 'Coimbatore', isAvailable: true },
  { id: 'prod-c3', name: 'Papaya Sapling (பப்பாளி கன்று)', description: 'Red Lady variety', price: 60, image: 'https://placehold.co/400x400.png', hint: 'papaya tree', shopName: 'Green Thumb Nursery', shopLocation: 'Coimbatore', isAvailable: true },
  { id: 'prod-c4', name: 'Rose Plant (ரோஜா செடி)', description: 'Button rose', price: 120, image: 'https://placehold.co/400x400.png', hint: 'rose flower', shopName: 'Green Thumb Nursery', shopLocation: 'Coimbatore', isAvailable: false },
  { id: 'prod-c5', name: 'Areca Nut Sapling', description: 'High-yield variety', price: 50, image: 'https://placehold.co/400x400.png', hint: 'areca plant', shopName: 'Green Thumb Nursery', shopLocation: 'Coimbatore', isAvailable: true },

  { id: 'tool-1', name: 'Hand Weeder (களையெடுப்பான்)', description: 'Durable and sharp', price: 350, image: 'https://placehold.co/400x400.png', hint: 'gardening tool', shopName: 'Saravana Tools', shopLocation: 'Coimbatore', isAvailable: true },
  { id: 'tool-c3', name: 'Hedge Shear', description: 'Manual, 10-inch blade', price: 850, image: 'https://placehold.co/400x400.png', hint: 'hedge shears', shopName: 'Saravana Tools', shopLocation: 'Coimbatore', isAvailable: true },
  { id: 'tool-c4', name: 'Axe (கோடாரி)', description: 'Wooden handle', price: 600, image: 'https://placehold.co/400x400.png', hint: 'axe tool', shopName: 'Saravana Tools', shopLocation: 'Coimbatore', isAvailable: true },
  { id: 'tool-c5', name: 'Billhook (அரிவாள்மனை)', description: 'For chopping', price: 450, image: 'https://placehold.co/400x400.png', hint: 'billhook knife', shopName: 'Saravana Tools', shopLocation: 'Coimbatore', isAvailable: true },
  { id: 'tool-c6', name: 'Hand Fork', description: '3-prong, for tilling', price: 250, image: 'https://placehold.co/400x400.png', hint: 'garden fork', shopName: 'Saravana Tools', shopLocation: 'Coimbatore', isAvailable: false },
  
  { id: 'seed-1', name: 'Maize Seeds (மக்காச்சோள விதைகள்)', description: 'Hybrid variety', price: 250, image: 'https://placehold.co/400x400.png', hint: 'maize seeds', shopName: 'Annapoorna Seeds', shopLocation: 'Coimbatore', isAvailable: true },
  { id: 'seed-c2', name: 'Ragi Seeds (கேழ்வரகு)', description: 'Finger Millet', price: 150, image: 'https://placehold.co/400x400.png', hint: 'ragi millet', shopName: 'Annapoorna Seeds', shopLocation: 'Coimbatore', isAvailable: true },
  { id: 'seed-c3', name: 'Black Gram Seeds (உளுந்து)', description: 'Whole, for cultivation', price: 180, image: 'https://placehold.co/400x400.png', hint: 'black gram', shopName: 'Annapoorna Seeds', shopLocation: 'Coimbatore', isAvailable: true },
  { id: 'seed-c4', name: 'Green Gram Seeds (பாசிப்பயறு)', description: 'Mung bean', price: 170, image: 'https://placehold.co/400x400.png', hint: 'green gram', shopName: 'Annapoorna Seeds', shopLocation: 'Coimbatore', isAvailable: false },
  { id: 'seed-c5', name: 'Horse Gram Seeds (கொள்ளு)', description: 'For fodder & cultivation', price: 120, image: 'https://placehold.co/400x400.png', hint: 'horse gram', shopName: 'Annapoorna Seeds', shopLocation: 'Coimbatore', isAvailable: true },

  // Madurai
  { id: 'fert-2', name: 'DAP (டி.ஏ.பி)', description: 'N-P-K: 18-46-0', price: 1350, image: 'https://placehold.co/400x400.png', hint: 'fertilizer sack', shopName: 'Priya Agri Supplies', shopLocation: 'Madurai', isAvailable: true },
  { id: 'prod-1', name: 'Paddy Seeds (நெல் விதைகள்)', description: 'High-yield variety', price: 40, image: 'https://placehold.co/400x400.png', hint: 'paddy seeds', shopName: 'Priya Agri Supplies', shopLocation: 'Madurai', isAvailable: true },
  { id: 'tool-12', name: 'Shovel ( ಸಲಿಕೆ)', description: 'Round point', price: 550, image: 'https://placehold.co/400x400.png', hint: 'shovel tool', shopName: 'Priya Agri Supplies', shopLocation: 'Madurai', isAvailable: true },
  { id: 'prod-m1', name: 'Banana Bunch', description: 'Fresh from farm', price: 350, image: 'https://placehold.co/400x400.png', hint: 'banana bunch', shopName: 'Priya Agri Supplies', shopLocation: 'Madurai', isAvailable: true },
  { id: 'seed-m1', name: 'Moringa Seeds', description: 'Drumstick seeds', price: 200, image: 'https://placehold.co/400x400.png', hint: 'moringa seeds', shopName: 'Priya Agri Supplies', shopLocation: 'Madurai', isAvailable: false },

  { id: 'fert-6', name: 'Complex (காம்ப்ளக்ஸ்)', description: 'N-P-K: 20-20-13', price: 1470, image: 'https://placehold.co/400x400.png', hint: 'fertilizer granules', shopName: 'Meenakshi Traders', shopLocation: 'Madurai', isAvailable: true },
  { id: 'prod-m2', name: 'Jaggery (வெல்லம்)', description: 'Organic, 1kg block', price: 150, image: 'https://placehold.co/400x400.png', hint: 'jaggery block', shopName: 'Meenakshi Traders', shopLocation: 'Madurai', isAvailable: true },
  { id: 'prod-m3', name: 'Groundnut Oil', description: 'Cold pressed, 1L', price: 350, image: 'https://placehold.co/400x400.png', hint: 'oil bottle', shopName: 'Meenakshi Traders', shopLocation: 'Madurai', isAvailable: true },
  { id: 'tool-m1', name: 'Sprayer Pump', description: '2L manual sprayer', price: 600, image: 'https://placehold.co/400x400.png', hint: 'sprayer pump', shopName: 'Meenakshi Traders', shopLocation: 'Madurai', isAvailable: true },
  { id: 'fert-m1', name: 'Panchagavya', description: 'Organic growth promoter', price: 300, image: 'https://placehold.co/400x400.png', hint: 'liquid fertilizer', shopName: 'Meenakshi Traders', shopLocation: 'Madurai', isAvailable: true },

  { id: 'prod-6', name: 'Jasmine Sapling (மல்லிகை செடி)', description: 'Madurai Malli', price: 50, image: 'https://placehold.co/400x400.png', hint: 'jasmine flower', shopName: 'Pandiyan Nursery', shopLocation: 'Madurai', isAvailable: true },
  { id: 'prod-m4', name: 'Marigold Sapling', description: 'Yellow variety', price: 30, image: 'https://placehold.co/400x400.png', hint: 'marigold flower', shopName: 'Pandiyan Nursery', shopLocation: 'Madurai', isAvailable: true },
  { id: 'prod-m5', name: 'Hibiscus Plant', description: 'Red, single petal', price: 70, image: 'https://placehold.co/400x400.png', hint: 'hibiscus flower', shopName: 'Pandiyan Nursery', shopLocation: 'Madurai', isAvailable: false },
  { id: 'prod-m6', name: 'Lemon Sapling', description: 'Seedless variety', price: 120, image: 'https://placehold.co/400x400.png', hint: 'lemon tree', shopName: 'Pandiyan Nursery', shopLocation: 'Madurai', isAvailable: true },
  { id: 'prod-m7', name: 'Curry Leaf Plant', description: 'Aromatic leaves', price: 40, image: 'https://placehold.co/400x400.png', hint: 'curry leaf plant', shopName: 'Pandiyan Nursery', shopLocation: 'Madurai', isAvailable: true },

  { id: 'tool-2', name: 'Sickle (அரிவாள்)', description: 'Traditional design', price: 280, image: 'https://placehold.co/400x400.png', hint: 'sickle tool', shopName: 'Madurai Farm Tools', shopLocation: 'Madurai', isAvailable: false },
  { id: 'tool-m2', name: 'Hoe (மண்வெட்டி)', description: 'For tilling soil', price: 350, image: 'https://placehold.co/400x400.png', hint: 'hoe tool', shopName: 'Madurai Farm Tools', shopLocation: 'Madurai', isAvailable: true },
  { id: 'tool-m3', name: 'Garden Gloves', description: 'Leather, durable', price: 200, image: 'https://placehold.co/400x400.png', hint: 'gardening gloves', shopName: 'Madurai Farm Tools', shopLocation: 'Madurai', isAvailable: true },
  { id: 'tool-m4', name: 'Budding Knife', description: 'For grafting', price: 300, image: 'https://placehold.co/400x400.png', hint: 'grafting knife', shopName: 'Madurai Farm Tools', shopLocation: 'Madurai', isAvailable: true },
  { id: 'tool-m5', name: 'Khurpi (குருப்பி)', description: 'Handheld trowel', price: 150, image: 'https://placehold.co/400x400.png', hint: 'trowel tool', shopName: 'Madurai Farm Tools', shopLocation: 'Madurai', isAvailable: true },

  { id: 'seed-2', name: 'Cotton Seeds (பருத்தி விதைகள்)', description: 'BT Cotton', price: 850, image: 'https://placehold.co/400x400.png', hint: 'cotton plant', shopName: 'Vaigai Seeds Corp', shopLocation: 'Madurai', isAvailable: true },
  { id: 'seed-m2', name: 'Sesame Seeds (எள்)', description: 'White variety', price: 200, image: 'https://placehold.co/400x400.png', hint: 'sesame seeds', shopName: 'Vaigai Seeds Corp', shopLocation: 'Madurai', isAvailable: true },
  { id: 'seed-m3', name: 'Pearl Millet Seeds (கம்பு)', description: 'High nutrition', price: 130, image: 'https://placehold.co/400x400.png', hint: 'pearl millet', shopName: 'Vaigai Seeds Corp', shopLocation: 'Madurai', isAvailable: true },
  { id: 'seed-m4', name: 'Castor Seeds (ஆமணக்கு)', description: 'For oil extraction', price: 150, image: 'https://placehold.co/400x400.png', hint: 'castor seeds', shopName: 'Vaigai Seeds Corp', shopLocation: 'Madurai', isAvailable: false },
  { id: 'seed-m5', name: 'Sunflower Seeds (சூரியகாந்தி)', description: 'Oilseed variety', price: 250, image: 'https://placehold.co/400x400.png', hint: 'sunflower seeds', shopName: 'Vaigai Seeds Corp', shopLocation: 'Madurai', isAvailable: true },

  // Salem
  { id: 'fert-4', name: 'Neem Cake (வேப்பம் புண்ணாக்கு)', description: 'Organic Pest Repellent', price: 1200, image: 'https://placehold.co/400x400.png', hint: 'organic fertilizer', shopName: 'Selvam Organics', shopLocation: 'Salem', isAvailable: true },
  { id: 'prod-s1', name: 'Sago (జவ்வரிசி)', description: 'Tapioca pearls, 1kg', price: 100, image: 'https://placehold.co/400x400.png', hint: 'sago pearls', shopName: 'Selvam Organics', shopLocation: 'Salem', isAvailable: true },
  { id: 'prod-s2', name: 'Turmeric Fingers', description: 'Dried, whole', price: 300, image: 'https://placehold.co/400x400.png', hint: 'turmeric fingers', shopName: 'Selvam Organics', shopLocation: 'Salem', isAvailable: true },
  { id: 'fert-s1', name: 'Pressmud', description: 'Sugarcane byproduct', price: 200, image: 'https://placehold.co/400x400.png', hint: 'organic compost', shopName: 'Selvam Organics', shopLocation: 'Salem', isAvailable: true },
  { id: 'tool-s1', name: 'Bamboo Stick', description: 'Support for plants, 6ft', price: 30, image: 'https://placehold.co/400x400.png', hint: 'bamboo sticks', shopName: 'Selvam Organics', shopLocation: 'Salem', isAvailable: false },
  
  { id: 'prod-7', name: 'Mango Sapling (மாங்கன்று)', description: 'Salem Bangalora', price: 250, image: 'https://placehold.co/400x400.png', hint: 'mango tree', shopName: 'Salem Mango Farm', shopLocation: 'Salem', isAvailable: true },
  { id: 'prod-s3', name: 'Alphonso Mango Sapling', description: 'Grafted', price: 350, image: 'https://placehold.co/400x400.png', hint: 'mango sapling', shopName: 'Salem Mango Farm', shopLocation: 'Salem', isAvailable: true },
  { id: 'prod-s4', name: 'Neelam Mango Sapling', description: 'Late season variety', price: 200, image: 'https://placehold.co/400x400.png', hint: 'small tree', shopName: 'Salem Mango Farm', shopLocation: 'Salem', isAvailable: true },
  { id: 'prod-s5', name: 'Raw Mangoes', description: 'For pickles, 1kg', price: 80, image: 'https://placehold.co/400x400.png', hint: 'green mangoes', shopName: 'Salem Mango Farm', shopLocation: 'Salem', isAvailable: true },
  { id: 'prod-s6', name: 'Mango Wood', description: 'For fuel, per kg', price: 10, image: 'https://placehold.co/400x400.png', hint: 'wood logs', shopName: 'Salem Mango Farm', shopLocation: 'Salem', isAvailable: false },

  { id: 'fert-7', name: 'Vermicompost (மண்புழு உரம்)', description: '10kg bag', price: 300, image: 'https://placehold.co/400x400.png', hint: 'vermicompost', shopName: 'Salem Organics', shopLocation: 'Salem', isAvailable: true },
  { id: 'tool-13', name: 'Pickaxe (বেলচা)', description: 'Forged steel head', price: 900, image: 'https://placehold.co/400x400.png', hint: 'pickaxe tool', shopName: 'Salem Organics', shopLocation: 'Salem', isAvailable: true },
  { id: 'prod-s7', name: 'Chilli Powder', description: 'Spicy, 500g', price: 250, image: 'https://placehold.co/400x400.png', hint: 'chilli powder', shopName: 'Salem Organics', shopLocation: 'Salem', isAvailable: true },
  { id: 'fert-s2', name: 'Fish Amino Acid', description: 'Growth promoter, 1L', price: 350, image: 'https://placehold.co/400x400.png', hint: 'liquid bottle', shopName: 'Salem Organics', shopLocation: 'Salem', isAvailable: true },
  { id: 'seed-s1', name: 'Tapioca Cuttings (மரவள்ளி)', description: 'H-226 variety', price: 8, image: 'https://placehold.co/400x400.png', hint: 'tapioca cuttings', shopName: 'Salem Organics', shopLocation: 'Salem', isAvailable: true },

  { id: 'tool-3', name: 'Spade (மண்வெட்டி)', description: 'Heavy duty', price: 450, image: 'https://placehold.co/400x400.png', hint: 'spade tool', shopName: 'Yercaud Agri Tools', shopLocation: 'Salem', isAvailable: true },
  { id: 'tool-s2', name: 'Coffee Pulper Machine', description: 'Manual hand-crank', price: 5000, image: 'https://placehold.co/400x400.png', hint: 'coffee machine', shopName: 'Yercaud Agri Tools', shopLocation: 'Salem', isAvailable: false },
  { id: 'tool-s3', name: 'Secateurs', description: 'For pruning coffee plants', price: 700, image: 'https://placehold.co/400x400.png', hint: 'pruning shears', shopName: 'Yercaud Agri Tools', shopLocation: 'Salem', isAvailable: true },
  { id: 'prod-s8', name: 'Black Pepper', description: 'Dried peppercorns, 100g', price: 150, image: 'https://placehold.co/400x400.png', hint: 'black pepper', shopName: 'Yercaud Agri Tools', shopLocation: 'Salem', isAvailable: true },
  { id: 'prod-s9', name: 'Avocado Sapling', description: 'Hass variety', price: 400, image: 'https://placehold.co/400x400.png', hint: 'avocado tree', shopName: 'Yercaud Agri Tools', shopLocation: 'Salem', isAvailable: true },

  { id: 'seed-3', name: 'Turmeric Rhizome (மஞ்சள் கிழங்கு)', description: 'Erode variety', price: 120, image: 'https://placehold.co/400x400.png', hint: 'turmeric root', shopName: 'Salem Spices', shopLocation: 'Salem', isAvailable: true },
  { id: 'seed-s2', name: 'Coriander Seeds', description: 'For planting', price: 80, image: 'https://placehold.co/400x400.png', hint: 'coriander seeds', shopName: 'Salem Spices', shopLocation: 'Salem', isAvailable: true },
  { id: 'seed-s3', name: 'Fenugreek Seeds', description: 'Methi seeds', price: 90, image: 'https://placehold.co/400x400.png', hint: 'fenugreek seeds', shopName: 'Salem Spices', shopLocation: 'Salem', isAvailable: true },
  { id: 'seed-s4', name: 'Mustard Seeds', description: 'Small, black', price: 70, image: 'https://placehold.co/400x400.png', hint: 'mustard seeds', shopName: 'Salem Spices', shopLocation: 'Salem', isAvailable: false },
  { id: 'seed-s5', name: 'Cumin Seeds', description: 'Jeera for planting', price: 150, image: 'https://placehold.co/400x400.png', hint: 'cumin seeds', shopName: 'Salem Spices', shopLocation: 'Salem', isAvailable: true },
  
  // Tiruchirappalli
  { id: 'prod-3', name: 'Tractor Rental (டிராக்டர் வாடகை)', description: 'Per hour basis', price: 600, image: 'https://placehold.co/400x400.png', hint: 'tractor field', shopName: 'Agri Machinaries Inc.', shopLocation: 'Tiruchirappalli', isAvailable: true },
  { id: 'prod-4', name: 'Sprayer (விசைத்தெளிப்பான்)', description: '5-litre capacity', price: 2500, image: 'https://placehold.co/400x400.png', hint: 'farm sprayer', shopName: 'Agri Machinaries Inc.', shopLocation: 'Tiruchirappalli', isAvailable: true },
  { id: 'tool-t1', name: 'Rotavator', description: 'Tractor attachment', price: 80000, image: 'https://placehold.co/400x400.png', hint: 'rotavator machine', shopName: 'Agri Machinaries Inc.', shopLocation: 'Tiruchirappalli', isAvailable: true },
  { id: 'tool-t2', name: 'Paddy Transplanter', description: 'Manual, 4-row', price: 25000, image: 'https://placehold.co/400x400.png', hint: 'transplanter machine', shopName: 'Agri Machinaries Inc.', shopLocation: 'Tiruchirappalli', isAvailable: false },
  { id: 'tool-t3', name: 'Cage Wheel', description: 'For tractor puddling', price: 15000, image: 'https://placehold.co/400x400.png', hint: 'tractor wheel', shopName: 'Agri Machinaries Inc.', shopLocation: 'Tiruchirappalli', isAvailable: true },

  { id: 'fert-3', name: 'Potash (பொட்டாஷ்)', description: 'N-P-K: 0-0-60', price: 1700, image: 'https://placehold.co/400x400.png', hint: 'fertilizer pellets', shopName: 'Cauvery Fertilizers', shopLocation: 'Tiruchirappalli', isAvailable: false },
  { id: 'seed-9', name: 'Banana Corms (வாழைக்கிழங்கு)', description: 'Nendran variety', price: 30, image: 'https://placehold.co/400x400.png', hint: 'banana plant', shopName: 'Cauvery Fertilizers', shopLocation: 'Tiruchirappalli', isAvailable: true },
  { id: 'fert-t1', name: 'Super Phosphate', description: 'Single Super Phosphate', price: 450, image: 'https://placehold.co/400x400.png', hint: 'phosphate powder', shopName: 'Cauvery Fertilizers', shopLocation: 'Tiruchirappalli', isAvailable: true },
  { id: 'prod-t1', name: 'Betel Leaves (வெற்றிலை)', description: '100 leaves bundle', price: 80, image: 'https://placehold.co/400x400.png', hint: 'betel leaves', shopName: 'Cauvery Fertilizers', shopLocation: 'Tiruchirappalli', isAvailable: true },
  { id: 'seed-t1', name: 'Sugarcane Seedlings', description: 'Tissue cultured', price: 5, image: 'https://placehold.co/400x400.png', hint: 'sugarcane seedlings', shopName: 'Cauvery Fertilizers', shopLocation: 'Tiruchirappalli', isAvailable: true },

  { id: 'prod-8', name: 'Banana Sapling (வாழைக்கன்று)', description: 'Poovan variety', price: 20, image: 'https://placehold.co/400x400.png', hint: 'banana tree', shopName: 'Trichy Agro', shopLocation: 'Tiruchirappalli', isAvailable: true },
  { id: 'prod-t2', name: 'Flower Garland', description: 'Jasmine and rose mix', price: 100, image: 'https://placehold.co/400x400.png', hint: 'flower garland', shopName: 'Trichy Agro', shopLocation: 'Tiruchirappalli', isAvailable: true },
  { id: 'prod-t3', name: 'Tender Coconut', description: 'Fresh, per piece', price: 40, image: 'https://placehold.co/400x400.png', hint: 'tender coconut', shopName: 'Trichy Agro', shopLocation: 'Tiruchirappalli', isAvailable: true },
  { id: 'seed-t2', name: 'Brinjal Seeds (கத்தரிக்காய்)', description: 'Green long variety', price: 50, image: 'https://placehold.co/400x400.png', hint: 'brinjal seeds', shopName: 'Trichy Agro', shopLocation: 'Tiruchirappalli', isAvailable: false },
  { id: 'tool-t4', name: 'Banana Comb Cutter', description: 'For harvesting', price: 400, image: 'https://placehold.co/400x400.png', hint: 'banana cutter', shopName: 'Trichy Agro', shopLocation: 'Tiruchirappalli', isAvailable: true },

  { id: 'tool-4', name: 'Power Tiller (பவர் டில்லர்)', description: 'Diesel engine', price: 75000, image: 'https://placehold.co/400x400.png', hint: 'power tiller', shopName: 'Rockfort Machinery', shopLocation: 'Tiruchirappalli', isAvailable: true },
  { id: 'tool-t5', name: 'Brush Cutter', description: '2-stroke engine', price: 8000, image: 'https://placehold.co/400x400.png', hint: 'brush cutter', shopName: 'Rockfort Machinery', shopLocation: 'Tiruchirappalli', isAvailable: true },
  { id: 'tool-t6', name: 'Earth Auger', description: 'For digging holes', price: 12000, image: 'https://placehold.co/400x400.png', hint: 'earth auger', shopName: 'Rockfort Machinery', shopLocation: 'Tiruchirappalli', isAvailable: true },
  { id: 'tool-t7', name: 'Chaff Cutter', description: 'For animal feed', price: 30000, image: 'https://placehold.co/400x400.png', hint: 'chaff cutter', shopName: 'Rockfort Machinery', shopLocation: 'Tiruchirappalli', isAvailable: false },
  { id: 'tool-t8', name: 'Sugarcane Crusher', description: 'Small scale', price: 45000, image: 'https://placehold.co/400x400.png', hint: 'sugarcane crusher', shopName: 'Rockfort Machinery', shopLocation: 'Tiruchirappalli', isAvailable: true },

  // Erode
  { id: 'seed-4', name: 'Groundnut Seeds (நிலக்கடலை விதைகள்)', description: 'TMV 7 variety', price: 180, image: 'https://placehold.co/400x400.png', hint: 'groundnuts', shopName: 'Erode Agri Center', shopLocation: 'Erode', isAvailable: true },
  { id: 'prod-e1', name: 'Erode Manjal (Turmeric)', description: 'GI Tagged, 1kg', price: 350, image: 'https://placehold.co/400x400.png', hint: 'turmeric roots', shopName: 'Erode Agri Center', shopLocation: 'Erode', isAvailable: true },
  { id: 'prod-e2', name: 'Textile Fabric', description: 'Cotton, per meter', price: 120, image: 'https://placehold.co/400x400.png', hint: 'fabric rolls', shopName: 'Erode Agri Center', shopLocation: 'Erode', isAvailable: true },
  { id: 'fert-e1', name: 'Poultry Manure', description: 'Rich in nitrogen', price: 150, image: 'https://placehold.co/400x400.png', hint: 'compost pile', shopName: 'Erode Agri Center', shopLocation: 'Erode', isAvailable: true },
  { id: 'tool-e1', name: 'Weighing Scale', description: '50kg capacity, digital', price: 2000, image: 'https://placehold.co/400x400.png', hint: 'weighing scale', shopName: 'Erode Agri Center', shopLocation: 'Erode', isAvailable: false },

  { id: 'tool-5', name: 'Water Pump (நீர் பம்ப்)', description: '2 HP motor', price: 8000, image: 'https://placehold.co/400x400.png', hint: 'water pump', shopName: 'Bhavani Pumps', shopLocation: 'Erode', isAvailable: false },
  { id: 'tool-e2', name: 'Submersible Pump', description: '4-inch, 1.5 HP', price: 12000, image: 'https://placehold.co/400x400.png', hint: 'submersible pump', shopName: 'Bhavani Pumps', shopLocation: 'Erode', isAvailable: true },
  { id: 'tool-e3', name: 'Drip Irrigation Kit', description: 'For 1/2 acre', price: 15000, image: 'https://placehold.co/400x400.png', hint: 'drip irrigation', shopName: 'Bhavani Pumps', shopLocation: 'Erode', isAvailable: true },
  { id: 'tool-e4', name: 'Sprinkler System', description: 'Set of 5', price: 5000, image: 'https://placehold.co/400x400.png', hint: 'sprinkler system', shopName: 'Bhavani Pumps', shopLocation: 'Erode', isAvailable: true },
  { id: 'tool-e5', name: 'Lay Flat Hose', description: '50 meters', price: 2500, image: 'https://placehold.co/400x400.png', hint: 'water hose', shopName: 'Bhavani Pumps', shopLocation: 'Erode', isAvailable: true },

  { id: 'prod-9', name: 'Tapioca Cuttings (மரவள்ளிக்கிழங்கு குச்சி)', description: 'High starch content', price: 5, image: 'https://placehold.co/400x400.png', hint: 'tapioca plant', shopName: 'Erode Farmers Coop', shopLocation: 'Erode', isAvailable: true },
  { id: 'prod-e3', name: 'Coconut (தேங்காய்)', description: 'Per piece', price: 25, image: 'https://placehold.co/400x400.png', hint: 'coconuts', shopName: 'Erode Farmers Coop', shopLocation: 'Erode', isAvailable: true },
  { id: 'prod-e4', name: 'Cattle Feed', description: '50kg bag', price: 1200, image: 'https://placehold.co/400x400.png', hint: 'cattle feed', shopName: 'Erode Farmers Coop', shopLocation: 'Erode', isAvailable: true },
  { id: 'prod-e5', name: 'Honey (தேன்)', description: 'Natural, 500g', price: 300, image: 'https://placehold.co/400x400.png', hint: 'honey jar', shopName: 'Erode Farmers Coop', shopLocation: 'Erode', isAvailable: true },
  { id: 'seed-e1', name: 'Tomato Seeds', description: 'PKM 1 variety', price: 80, image: 'https://placehold.co/400x400.png', hint: 'tomato seeds', shopName: 'Erode Farmers Coop', shopLocation: 'Erode', isAvailable: false },
  
  { id: 'fert-8', name: 'Sulphate (சல்ஃபேட்)', description: 'Ammonium Sulphate', price: 600, image: 'https://placehold.co/400x400.png', hint: 'white powder', shopName: 'Kongu Fertilizers', shopLocation: 'Erode', isAvailable: true },
  { id: 'fert-e2', name: 'Magnesium Sulphate', description: 'For correcting deficiency', price: 550, image: 'https://placehold.co/400x400.png', hint: 'fertilizer sack', shopName: 'Kongu Fertilizers', shopLocation: 'Erode', isAvailable: true },
  { id: 'fert-e3', name: 'Boron', description: 'Micronutrient fertilizer', price: 700, image: 'https://placehold.co/400x400.png', hint: 'chemical bag', shopName: 'Kongu Fertilizers', shopLocation: 'Erode', isAvailable: true },
  { id: 'fert-e4', name: 'Calcium Nitrate', description: 'Water soluble', price: 800, image: 'https://placehold.co/400x400.png', hint: 'fertilizer pellets', shopName: 'Kongu Fertilizers', shopLocation: 'Erode', isAvailable: true },
  { id: 'fert-e5', name: 'Seaweed Extract', description: 'Liquid organic fertilizer', price: 900, image: 'https://placehold.co/400x400.png', hint: 'seaweed bottle', shopName: 'Kongu Fertilizers', shopLocation: 'Erode', isAvailable: false },

  { id: 'prod-10', name: 'Mushroom Spawn (காளான் வித்து)', description: 'Oyster mushroom', price: 150, image: 'https://placehold.co/400x400.png', hint: 'mushrooms', shopName: 'Erode Mushrooms', shopLocation: 'Erode', isAvailable: true },
  { id: 'tool-14', name: 'Garden Rake (தோட்ட ரேக்)', description: '12-teeth', price: 400, image: 'https://placehold.co/400x400.png', hint: 'garden rake', shopName: 'Erode Mushrooms', shopLocation: 'Erode', isAvailable: true },
  { id: 'prod-e6', name: 'Milky Mushroom Spawn', description: 'High temperature variety', price: 180, image: 'https://placehold.co/400x400.png', hint: 'mushroom spawn', shopName: 'Erode Mushrooms', shopLocation: 'Erode', isAvailable: true },
  { id: 'prod-e7', name: 'Mushroom Grow Bags', description: 'Ready to fruit', price: 250, image: 'https://placehold.co/400x400.png', hint: 'grow bag', shopName: 'Erode Mushrooms', shopLocation: 'Erode', isAvailable: true },
  { id: 'prod-e8', name: 'Dried Mushrooms', description: 'Oyster, 100g pack', price: 300, image: 'https://placehold.co/400x400.png', hint: 'dried mushrooms', shopName: 'Erode Mushrooms', shopLocation: 'Erode', isAvailable: true },

  // Tirunelveli
  { id: 'seed-5', name: 'Chilli Seeds (மிளகாய் விதைகள்)', description: 'Samba variety', price: 90, image: 'https://placehold.co/400x400.png', hint: 'chilli plant', shopName: 'Nanguneri Seed Bank', shopLocation: 'Tirunelveli', isAvailable: true },
  { id: 'seed-n1', name: 'Okra Seeds (வெண்டைக்காய்)', description: 'Lady finger seeds', price: 60, image: 'https://placehold.co/400x400.png', hint: 'okra seeds', shopName: 'Nanguneri Seed Bank', shopLocation: 'Tirunelveli', isAvailable: true },
  { id: 'seed-n2', name: 'Cluster Bean Seeds', description: 'Guar seeds', price: 70, image: 'https://placehold.co/400x400.png', hint: 'cluster beans', shopName: 'Nanguneri Seed Bank', shopLocation: 'Tirunelveli', isAvailable: true },
  { id: 'seed-n3', name: 'Snake Gourd Seeds', description: 'Long variety', price: 80, image: 'https://placehold.co/400x400.png', hint: 'snake gourd', shopName: 'Nanguneri Seed Bank', shopLocation: 'Tirunelveli', isAvailable: false },
  { id: 'seed-n4', name: 'Radish Seeds', description: 'White, long variety', price: 50, image: 'https://placehold.co/400x400.png', hint: 'radish seeds', shopName: 'Nanguneri Seed Bank', shopLocation: 'Tirunelveli', isAvailable: true },
  
  { id: 'tool-6', name: 'Plough (கலப்பை)', description: 'Country plough', price: 1500, image: 'https://placehold.co/400x400.png', hint: 'wooden plough', shopName: 'Tamirabarani Tools', shopLocation: 'Tirunelveli', isAvailable: true },
  { id: 'tool-n1', name: 'Coconut Dehusker', description: 'Manual tool', price: 800, image: 'https://placehold.co/400x400.png', hint: 'coconut tool', shopName: 'Tamirabarani Tools', shopLocation: 'Tirunelveli', isAvailable: true },
  { id: 'tool-n2', name: 'Palm Climber', description: 'Safety equipment', price: 3000, image: 'https://placehold.co/400x400.png', hint: 'climbing gear', shopName: 'Tamirabarani Tools', shopLocation: 'Tirunelveli', isAvailable: true },
  { id: 'tool-n3', name: 'Arecanut Dehusker', description: 'Hand operated', price: 1200, image: 'https://placehold.co/400x400.png', hint: 'arecanut tool', shopName: 'Tamirabarani Tools', shopLocation: 'Tirunelveli', isAvailable: false },
  { id: 'tool-n4', name: 'Jute Rope', description: '10mm, 50 meters', price: 500, image: 'https://placehold.co/400x400.png', hint: 'jute rope', shopName: 'Tamirabarani Tools', shopLocation: 'Tirunelveli', isAvailable: true },
  
  { id: 'prod-13', name: 'Palm Sapling (பனை மரம்)', description: 'Native species', price: 40, image: 'https://placehold.co/400x400.png', hint: 'palm tree', shopName: 'Nellai Nursery', shopLocation: 'Tirunelveli', isAvailable: true },
  { id: 'fert-12', name: 'Bone Meal (எலும்புத் தூள்)', description: 'Organic Phosphorus Source', price: 250, image: 'https://placehold.co/400x400.png', hint: 'bone meal powder', shopName: 'Nellai Nursery', shopLocation: 'Tirunelveli', isAvailable: true },
  { id: 'prod-n1', name: 'Neem Sapling (வேம்பு)', description: 'Medicinal tree', price: 60, image: 'https://placehold.co/400x400.png', hint: 'neem tree', shopName: 'Nellai Nursery', shopLocation: 'Tirunelveli', isAvailable: true },
  { id: 'prod-n2', name: 'Teak Sapling (தேக்கு)', description: 'For timber', price: 150, image: 'https://placehold.co/400x400.png', hint: 'teak tree', shopName: 'Nellai Nursery', shopLocation: 'Tirunelveli', isAvailable: true },
  { id: 'prod-n3', name: 'Jackfruit Sapling (பலா)', description: 'Grafted variety', price: 200, image: 'https://placehold.co/400x400.png', hint: 'jackfruit tree', shopName: 'Nellai Nursery', shopLocation: 'Tirunelveli', isAvailable: false },

  // Thanjavur
  { id: 'prod-11', name: 'Sesame Seeds (எள் விதைகள்)', description: 'Black sesame', price: 220, image: 'https://placehold.co/400x400.png', hint: 'sesame seeds', shopName: 'Delta Agro', shopLocation: 'Thanjavur', isAvailable: true },
  { id: 'prod-j1', name: 'Paddy Straw Bales', description: 'For cattle feed', price: 150, image: 'https://placehold.co/400x400.png', hint: 'hay bales', shopName: 'Delta Agro', shopLocation: 'Thanjavur', isAvailable: true },
  { id: 'prod-j2', name: 'Rice Bran', description: '50kg bag', price: 800, image: 'https://placehold.co/400x400.png', hint: 'rice bran', shopName: 'Delta Agro', shopLocation: 'Thanjavur', isAvailable: true },
  { id: 'prod-j3', name: 'Broken Rice', description: 'For poultry feed', price: 25, image: 'https://placehold.co/400x400.png', hint: 'broken rice', shopName: 'Delta Agro', shopLocation: 'Thanjavur', isAvailable: true },
  { id: 'seed-j1', name: 'Black Gram Seeds (VBN 6)', description: 'High yield', price: 190, image: 'https://placehold.co/400x400.png', hint: 'black gram', shopName: 'Delta Agro', shopLocation: 'Thanjavur', isAvailable: false },

  { id: 'fert-9', name: 'Gypsum (ஜிப்சம்)', description: 'Soil conditioner', price: 400, image: 'https://placehold.co/400x400.png', hint: 'gypsum powder', shopName: 'Kumbakonam Fertilizers', shopLocation: 'Thanjavur', isAvailable: false },
  { id: 'fert-j1', name: 'Zinc Sulphate', description: 'For paddy', price: 650, image: 'https://placehold.co/400x400.png', hint: 'fertilizer chemical', shopName: 'Kumbakonam Fertilizers', shopLocation: 'Thanjavur', isAvailable: true },
  { id: 'fert-j2', name: 'Copper Sulphate', description: 'Fungicide', price: 800, image: 'https://placehold.co/400x400.png', hint: 'blue powder', shopName: 'Kumbakonam Fertilizers', shopLocation: 'Thanjavur', isAvailable: true },
  { id: 'prod-j4', name: 'Filter Coffee Powder', description: 'Kumbakonam degree coffee', price: 250, image: 'https://placehold.co/400x400.png', hint: 'coffee powder', shopName: 'Kumbakonam Fertilizers', shopLocation: 'Thanjavur', isAvailable: true },
  { id: 'tool-j1', name: 'Brass Vessels', description: 'For puja', price: 1500, image: 'https://placehold.co/400x400.png', hint: 'brass pots', shopName: 'Kumbakonam Fertilizers', shopLocation: 'Thanjavur', isAvailable: true },

  { id: 'tool-8', name: 'Paddy Weeder (நெல் களையெடுப்பான்)', description: 'Cono weeder', price: 2200, image: 'https://placehold.co/400x400.png', hint: 'paddy weeder', shopName: 'Thanjavur Farm Implements', shopLocation: 'Thanjavur', isAvailable: true },
  { id: 'prod-18', name: 'Paddy Harvester Rental (நெல் அறுவடை இயந்திரம்)', description: 'Per hour', price: 1800, image: 'https://placehold.co/400x400.png', hint: 'combine harvester', shopName: 'Thanjavur Farm Implements', shopLocation: 'Thanjavur', isAvailable: true },
  { id: 'tool-j2', name: 'Winnowing Fan (முரம்)', description: 'Traditional bamboo made', price: 300, image: 'https://placehold.co/400x400.png', hint: 'bamboo fan', shopName: 'Thanjavur Farm Implements', shopLocation: 'Thanjavur', isAvailable: true },
  { id: 'tool-j3', name: 'Leveling Board', description: 'Wooden, for fields', price: 1200, image: 'https://placehold.co/400x400.png', hint: 'wooden plank', shopName: 'Thanjavur Farm Implements', shopLocation: 'Thanjavur', isAvailable: false },
  { id: 'prod-j5', name: 'Thanjavur Doll (தலையாட்டி பொம்மை)', description: 'Clay doll', price: 500, image: 'https://placehold.co/400x400.png', hint: 'traditional doll', shopName: 'Thanjavur Farm Implements', shopLocation: 'Thanjavur', isAvailable: true },

  // Dindigul
  { id: 'prod-12', name: 'Moringa Seeds (முருங்கை விதைகள்)', description: 'PKM-1 variety', price: 350, image: 'https://placehold.co/400x400.png', hint: 'moringa tree', shopName: 'Sirumalai Seedlings', shopLocation: 'Dindigul', isAvailable: true },
  { id: 'prod-d1', name: 'Sirumalai Banana', description: 'Hill banana, 1 dozen', price: 100, image: 'https://placehold.co/400x400.png', hint: 'banana fruit', shopName: 'Sirumalai Seedlings', shopLocation: 'Dindigul', isAvailable: true },
  { id: 'prod-d2', name: 'Coffee Beans (Green)', description: 'Arabica, 1kg', price: 400, image: 'https://placehold.co/400x400.png', hint: 'coffee beans', shopName: 'Sirumalai Seedlings', shopLocation: 'Dindigul', isAvailable: true },
  { id: 'prod-d3', name: 'Guava (கொய்யா)', description: 'Dindigul variety, 1kg', price: 80, image: 'https://placehold.co/400x400.png', hint: 'guava fruit', shopName: 'Sirumalai Seedlings', shopLocation: 'Dindigul', isAvailable: false },
  { id: 'prod-d4', name: 'Custard Apple Sapling', description: 'Sitaphal plant', price: 150, image: 'https://placehold.co/400x400.png', hint: 'custard apple', shopName: 'Sirumalai Seedlings', shopLocation: 'Dindigul', isAvailable: true },
  
  { id: 'tool-7', name: 'Harvesting Net (அறுவடை வலை)', description: 'For floriculture', price: 500, image: 'https://placehold.co/400x400.png', hint: 'green net', shopName: 'Dindigul Farm Needs', shopLocation: 'Dindigul', isAvailable: true },
  { id: 'tool-d1', name: 'Dindigul Lock (திண்டுக்கல் பூட்டு)', description: 'Brass lock', price: 600, image: 'https://placehold.co/400x400.png', hint: 'brass lock', shopName: 'Dindigul Farm Needs', shopLocation: 'Dindigul', isAvailable: true },
  { id: 'prod-d5', name: 'Coir Rope', description: '10m length', price: 100, image: 'https://placehold.co/400x400.png', hint: 'coir rope', shopName: 'Dindigul Farm Needs', shopLocation: 'Dindigul', isAvailable: true },
  { id: 'tool-d2', name: 'Poly Sheet', description: 'For solar drying', price: 200, image: 'https://placehold.co/400x400.png', hint: 'plastic sheet', shopName: 'Dindigul Farm Needs', shopLocation: 'Dindigul', isAvailable: true },
  { id: 'seed-d1', name: 'Grape Cuttings', description: 'For planting', price: 50, image: 'https://placehold.co/400x400.png', hint: 'grape vine', shopName: 'Dindigul Farm Needs', shopLocation: 'Dindigul', isAvailable: false },

  { id: 'fert-10', name: 'Micronutrients (நுண்ணூட்டச் சத்து)', description: 'Vegetable mix', price: 750, image: 'https://placehold.co/400x400.png', hint: 'fertilizer mix', shopName: 'Dindigul Agro', shopLocation: 'Dindigul', isAvailable: true },
  { id: 'seed-10', name: 'Onion Seeds (வெங்காய விதைகள்)', description: 'Small onion variety', price: 450, image: 'https://placehold.co/400x400.png', hint: 'onion seeds', shopName: 'Dindigul Agro', shopLocation: 'Dindigul', isAvailable: true },
  { id: 'prod-d6', name: 'Garlic (பூண்டு)', description: '1kg', price: 200, image: 'https://placehold.co/400x400.png', hint: 'garlic bulbs', shopName: 'Dindigul Agro', shopLocation: 'Dindigul', isAvailable: true },
  { id: 'prod-d7', name: 'Tamarind', description: 'With seeds, 1kg', price: 120, image: 'https://placehold.co/400x400.png', hint: 'tamarind', shopName: 'Dindigul Agro', shopLocation: 'Dindigul', isAvailable: true },
  { id: 'fert-d1', name: 'Humic Acid', description: 'Soil conditioner, 1L', price: 800, image: 'https://placehold.co/400x400.png', hint: 'dark liquid', shopName: 'Dindigul Agro', shopLocation: 'Dindigul', isAvailable: true },

  // Vellore
  { id: 'seed-6', name: 'Brinjal Seeds (கத்தரி விதைகள்)', description: 'Vellore thorned variety', price: 60, image: 'https://placehold.co/400x400.png', hint: 'brinjal plant', shopName: 'Palar Seeds', shopLocation: 'Vellore', isAvailable: true },
  { id: 'seed-v1', name: 'Radish Seeds', description: 'Mullangi, white', price: 50, image: 'https://placehold.co/400x400.png', hint: 'radish vegetable', shopName: 'Palar Seeds', shopLocation: 'Vellore', isAvailable: true },
  { id: 'seed-v2', name: 'Amaranth Seeds', description: 'Thandu keerai', price: 40, image: 'https://placehold.co/400x400.png', hint: 'amaranth plant', shopName: 'Palar Seeds', shopLocation: 'Vellore', isAvailable: false },
  { id: 'seed-v3', name: 'Bottle Gourd Seeds', description: 'Hybrid variety', price: 70, image: 'https://placehold.co/400x400.png', hint: 'bottle gourd', shopName: 'Palar Seeds', shopLocation: 'Vellore', isAvailable: true },
  { id: 'seed-v4', name: 'Pumpkin Seeds', description: 'Yellow pumpkin', price: 60, image: 'https://placehold.co/400x400.png', hint: 'pumpkin vegetable', shopName: 'Palar Seeds', shopLocation: 'Vellore', isAvailable: true },

  { id: 'prod-14', name: 'Goat Manure (ஆட்டு எரு)', description: 'Well composted', price: 200, image: 'https://placehold.co/400x400.png', hint: 'manure compost', shopName: 'Vellore Farms', shopLocation: 'Vellore', isAvailable: true },
  { id: 'prod-v1', name: 'Cow Dung Cakes', description: 'Dried, for fuel', price: 10, image: 'https://placehold.co/400x400.png', hint: 'cow dung', shopName: 'Vellore Farms', shopLocation: 'Vellore', isAvailable: true },
  { id: 'prod-v2', name: 'Milk (Unpasteurized)', description: 'Per litre', price: 50, image: 'https://placehold.co/400x400.png', hint: 'milk can', shopName: 'Vellore Farms', shopLocation: 'Vellore', isAvailable: true },
  { id: 'prod-v3', name: 'Country Chicken Eggs', description: 'Per dozen', price: 180, image: 'https://placehold.co/400x400.png', hint: 'brown eggs', shopName: 'Vellore Farms', shopLocation: 'Vellore', isAvailable: true },
  { id: 'prod-v4', name: 'Ghee (நெய்)', description: 'Pure, 500ml', price: 400, image: 'https://placehold.co/400x400.png', hint: 'ghee jar', shopName: 'Vellore Farms', shopLocation: 'Vellore', isAvailable: false },

  { id: 'tool-9', name: 'Pruning Shears (கவாத்து கத்தரிக்கோல்)', description: 'Bypass pruner', price: 650, image: 'https://placehold.co/400x400.png', hint: 'pruning shears', shopName: 'Ambur Tools', shopLocation: 'Vellore', isAvailable: false },
  { id: 'prod-19', name: 'Leather Scraps (தோல் கழிவுகள்)', description: 'For compost enrichment', price: 100, image: 'https://placehold.co/400x400.png', hint: 'leather scraps', shopName: 'Ambur Tools', shopLocation: 'Vellore', isAvailable: true },
  { id: 'tool-v1', name: 'Leather Punching Tool', description: 'Various sizes', price: 400, image: 'https://placehold.co/400x400.png', hint: 'leather tool', shopName: 'Ambur Tools', shopLocation: 'Vellore', isAvailable: true },
  { id: 'prod-v5', name: 'Ambur Biryani Masala', description: 'Authentic spice mix', price: 150, image: 'https://placehold.co/400x400.png', hint: 'spice mix', shopName: 'Ambur Tools', shopLocation: 'Vellore', isAvailable: true },
  { id: 'prod-v6', name: 'Finished Leather', description: 'Per sq. ft.', price: 250, image: 'https://placehold.co/400x400.png', hint: 'leather sheet', shopName: 'Ambur Tools', shopLocation: 'Vellore', isAvailable: true },

  // Karur
  { id: 'prod-15', name: 'Coir Pith Block (கயிறு பித் தொகுதி)', description: '5kg block, expands to 75L', price: 300, image: 'https://placehold.co/400x400.png', hint: 'coir block', shopName: 'Karur Coir Exports', shopLocation: 'Karur', isAvailable: true },
  { id: 'prod-k1', name: 'Coir Pots', description: 'Biodegradable, pack of 10', price: 200, image: 'https://placehold.co/400x400.png', hint: 'coir pots', shopName: 'Karur Coir Exports', shopLocation: 'Karur', isAvailable: true },
  { id: 'prod-k2', name: 'Coir Geotextiles', description: 'For erosion control', price: 50, image: 'https://placehold.co/400x400.png', hint: 'coir mat', shopName: 'Karur Coir Exports', shopLocation: 'Karur', isAvailable: true },
  { id: 'prod-k3', name: 'Coco Peat Disc', description: 'For seedlings', price: 10, image: 'https://placehold.co/400x400.png', hint: 'coco peat', shopName: 'Karur Coir Exports', shopLocation: 'Karur', isAvailable: false },
  { id: 'prod-k4', name: 'Coconut Shell Charcoal', description: '1kg bag', price: 80, image: 'https://placehold.co/400x400.png', hint: 'charcoal', shopName: 'Karur Coir Exports', shopLocation: 'Karur', isAvailable: true },

  { id: 'tool-10', name: 'Textile Shredder (ஜவுளி து драப்பர்)', description: 'For mulching', price: 12000, image: 'https://placehold.co/400x400.png', hint: 'shredder machine', shopName: 'Amaravathi Farm Tech', shopLocation: 'Karur', isAvailable: true },
  { id: 'seed-11', name: 'Sunhemp Seeds (சணல் விதைகள்)', description: 'Green manure crop', price: 80, image: 'https://placehold.co/400x400.png', hint: 'hemp seeds', shopName: 'Amaravathi Farm Tech', shopLocation: 'Karur', isAvailable: true },
  { id: 'prod-k5', name: 'Mosquito Net', description: 'For agricultural use', price: 300, image: 'https://placehold.co/400x400.png', hint: 'white net', shopName: 'Amaravathi Farm Tech', shopLocation: 'Karur', isAvailable: true },
  { id: 'tool-k1', name: 'Powerloom Machine', description: 'Used, good condition', price: 50000, image: 'https://placehold.co/400x400.png', hint: 'loom machine', shopName: 'Amaravathi Farm Tech', shopLocation: 'Karur', isAvailable: false },
  { id: 'prod-k6', name: 'Bus Body Parts', description: 'Scrap metal', price: 500, image: 'https://placehold.co/400x400.png', hint: 'metal scrap', shopName: 'Amaravathi Farm Tech', shopLocation: 'Karur', isAvailable: true },

  // Tiruppur
  { id: 'prod-16', name: 'Cotton Waste (பருத்தி கழிவுகள்)', description: 'Organic matter for compost', price: 50, image: 'https://placehold.co/400x400.png', hint: 'cotton waste', shopName: 'Tiruppur Cotton Mills', shopLocation: 'Tiruppur', isAvailable: true },
  { id: 'prod-p1', name: 'Cotton Yarn Cone', description: 'For weaving', price: 250, image: 'https://placehold.co/400x400.png', hint: 'yarn cone', shopName: 'Tiruppur Cotton Mills', shopLocation: 'Tiruppur', isAvailable: true },
  { id: 'prod-p2', name: 'Raw Cotton Bale', description: '10kg bale', price: 600, image: 'https://placehold.co/400x400.png', hint: 'cotton bale', shopName: 'Tiruppur Cotton Mills', shopLocation: 'Tiruppur', isAvailable: true },
  { id: 'prod-p3', name: 'Hosiery Cuttings', description: 'For recycling, per kg', price: 30, image: 'https://placehold.co/400x400.png', hint: 'fabric scraps', shopName: 'Tiruppur Cotton Mills', shopLocation: 'Tiruppur', isAvailable: true },
  { id: 'tool-p1', name: 'Sewing Machine Oil', description: '1 litre can', price: 200, image: 'https://placehold.co/400x400.png', hint: 'oil can', shopName: 'Tiruppur Cotton Mills', shopLocation: 'Tiruppur', isAvailable: false },

  { id: 'fert-11', name: 'Zinc Sulphate (цинк சல்பேட்)', description: 'For cotton crops', price: 700, image: 'https://placehold.co/400x400.png', hint: 'fertilizer bag', shopName: 'Noyyal Agro Center', shopLocation: 'Tiruppur', isAvailable: false },
  { id: 'prod-20', name: 'Knitted Fabric Waste', description: 'For mulching & compost', price: 40, image: 'https://placehold.co/400x400.png', hint: 'fabric scraps', shopName: 'Noyyal Agro Center', shopLocation: 'Tiruppur', isAvailable: true },
  { id: 'prod-p4', name: 'Guppy Fish', description: 'For mosquito control', price: 10, image: 'https://placehold.co/400x400.png', hint: 'small fish', shopName: 'Noyyal Agro Center', shopLocation: 'Tiruppur', isAvailable: true },
  { id: 'tool-p2', name: 'Windmill Blade Scrap', description: 'Fiberglass for projects', price: 1000, image: 'https://placehold.co/400x400.png', hint: 'windmill blade', shopName: 'Noyyal Agro Center', shopLocation: 'Tiruppur', isAvailable: true },
  { id: 'prod-p5', name: 'River Sand', description: 'For construction, per load', price: 3000, image: 'https://placehold.co/400x400.png', hint: 'sand pile', shopName: 'Noyyal Agro Center', shopLocation: 'Tiruppur', isAvailable: true },

  // Kanyakumari
  { id: 'prod-17', name: 'Rubber Sheet (ரப்பர் தாள்)', description: 'RSS-4 Grade', price: 180, image: 'https://placehold.co/400x400.png', hint: 'rubber sheets', shopName: 'Kumari Rubber Traders', shopLocation: 'Kanyakumari', isAvailable: true },
  { id: 'prod-y1', name: 'Rubber Latex', description: 'Per litre', price: 150, image: 'https://placehold.co/400x400.png', hint: 'liquid latex', shopName: 'Kumari Rubber Traders', shopLocation: 'Kanyakumari', isAvailable: true },
  { id: 'prod-y2', name: 'Coconut Husks', description: 'For fuel/fiber', price: 5, image: 'https://placehold.co/400x400.png', hint: 'coconut husks', shopName: 'Kumari Rubber Traders', shopLocation: 'Kanyakumari', isAvailable: true },
  { id: 'tool-y1', name: 'Formic Acid', description: 'For rubber coagulation', price: 200, image: 'https://placehold.co/400x400.png', hint: 'chemical bottle', shopName: 'Kumari Rubber Traders', shopLocation: 'Kanyakumari', isAvailable: true },
  { id: 'tool-y2', name: 'Rubber Roller Machine', description: 'Manual sheet maker', price: 8000, image: 'https://placehold.co/400x400.png', hint: 'roller machine', shopName: 'Kumari Rubber Traders', shopLocation: 'Kanyakumari', isAvailable: false },
  
  { id: 'seed-7', name: 'Clove Sapling (கிராம்பு கன்று)', description: 'Healthy sapling', price: 150, image: 'https://placehold.co/400x400.png', hint: 'clove plant', shopName: 'Marthandam Spices', shopLocation: 'Kanyakumari', isAvailable: true },
  { id: 'tool-15', name: 'Tapping Knife (சீவல் கத்தி)', description: 'For rubber tapping', price: 350, image: 'https://placehold.co/400x400.png', hint: 'tapping knife', shopName: 'Marthandam Spices', shopLocation: 'Kanyakumari', isAvailable: true },
  { id: 'prod-y3', name: 'Nutmeg Sapling', description: 'With mace', price: 200, image: 'https://placehold.co/400x400.png', hint: 'nutmeg plant', shopName: 'Marthandam Spices', shopLocation: 'Kanyakumari', isAvailable: true },
  { id: 'prod-y4', name: 'Cashew Sapling', description: 'VRI-3 variety', price: 180, image: 'https://placehold.co/400x400.png', hint: 'cashew tree', shopName: 'Marthandam Spices', shopLocation: 'Kanyakumari', isAvailable: true },
  { id: 'prod-y5', name: 'Nendran Chips', description: 'Banana chips, 250g', price: 120, image: 'https://placehold.co/400x400.png', hint: 'banana chips', shopName: 'Marthandam Spices', shopLocation: 'Kanyakumari', isAvailable: true },
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
