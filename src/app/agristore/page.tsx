'use client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { DashboardHeader } from '@/components/dashboard-header';
import Image from 'next/image';
import { ShoppingCart, PackageX, MapPin } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useToast } from '@/hooks/use-toast';
import type { Product } from '@/context/CartContext';
import { Badge } from '@/components/ui/badge';

const products: Product[] = [
  // Coimbatore
  { id: 'fert-1', name: 'Urea (யூரியா)', description: 'N-P-K: 46-0-0', price: 266.50, image: 'https://placehold.co/400x400.png', hint: 'fertilizer bag', shopName: 'Kumar Fertilizers', shopLocation: 'Coimbatore', isAvailable: true },
  { id: 'prod-2', name: 'Sugarcane Setts (கரும்பு கரணை)', description: 'Disease-resistant', price: 3, image: 'https://placehold.co/400x400.png', hint: 'sugarcane cutting', shopName: 'Kumar Fertilizers', shopLocation: 'Coimbatore', isAvailable: false },
  { id: 'fert-5', name: 'Bio-Fertilizer (உயிர் உரம்)', description: 'Improves soil health', price: 450, image: 'https://placehold.co/400x400.png', hint: 'compost bag', shopName: 'Covai Agro Center', shopLocation: 'Coimbatore', isAvailable: true },
  { id: 'prod-5', name: 'Coconut Sapling (தென்னங்கன்று)', description: 'West Coast Tall', price: 150, image: 'https://placehold.co/400x400.png', hint: 'coconut tree', shopName: 'Green Thumb Nursery', shopLocation: 'Coimbatore', isAvailable: true },
  { id: 'tool-1', name: 'Hand Weeder (களையெடுப்பான்)', description: 'Durable and sharp', price: 350, image: 'https://placehold.co/400x400.png', hint: 'gardening tool', shopName: 'Saravana Tools', shopLocation: 'Coimbatore', isAvailable: true },
  { id: 'seed-1', name: 'Maize Seeds (மக்காச்சோள விதைகள்)', description: 'Hybrid variety', price: 250, image: 'https://placehold.co/400x400.png', hint: 'maize seeds', shopName: 'Annapoorna Seeds', shopLocation: 'Coimbatore', isAvailable: true },

  // Madurai
  { id: 'fert-2', name: 'DAP (டி.ஏ.பி)', description: 'N-P-K: 18-46-0', price: 1350, image: 'https://placehold.co/400x400.png', hint: 'fertilizer sack', shopName: 'Priya Agri Supplies', shopLocation: 'Madurai', isAvailable: true },
  { id: 'prod-1', name: 'Paddy Seeds (நெல் விதைகள்)', description: 'High-yield variety', price: 40, image: 'https://placehold.co/400x400.png', hint: 'paddy seeds', shopName: 'Priya Agri Supplies', shopLocation: 'Madurai', isAvailable: true },
  { id: 'fert-6', name: 'Complex (காம்ப்ளக்ஸ்)', description: 'N-P-K: 20-20-13', price: 1470, image: 'https://placehold.co/400x400.png', hint: 'fertilizer granules', shopName: 'Meenakshi Traders', shopLocation: 'Madurai', isAvailable: true },
  { id: 'prod-6', name: 'Jasmine Sapling (மல்லிகை செடி)', description: 'Madurai Malli', price: 50, image: 'https://placehold.co/400x400.png', hint: 'jasmine flower', shopName: 'Pandiyan Nursery', shopLocation: 'Madurai', isAvailable: true },
  { id: 'tool-2', name: 'Sickle (அரிவாள்)', description: 'Traditional design', price: 280, image: 'https://placehold.co/400x400.png', hint: 'sickle tool', shopName: 'Madurai Farm Tools', shopLocation: 'Madurai', isAvailable: false },
  { id: 'seed-2', name: 'Cotton Seeds (பருத்தி விதைகள்)', description: 'BT Cotton', price: 850, image: 'https://placehold.co/400x400.png', hint: 'cotton plant', shopName: 'Vaigai Seeds Corp', shopLocation: 'Madurai', isAvailable: true },

  // Salem
  { id: 'fert-4', name: 'Neem Cake (வேப்பம் புண்ணாக்கு)', description: 'Organic Pest Repellent', price: 1200, image: 'https://placehold.co/400x400.png', hint: 'organic fertilizer', shopName: 'Selvam Organics', shopLocation: 'Salem', isAvailable: true },
  { id: 'prod-7', name: 'Mango Sapling (மாங்கன்று)', description: 'Salem Bangalora', price: 250, image: 'https://placehold.co/400x400.png', hint: 'mango tree', shopName: 'Salem Mango Farm', shopLocation: 'Salem', isAvailable: true },
  { id: 'fert-7', name: 'Vermicompost (மண்புழு உரம்)', description: '10kg bag', price: 300, image: 'https://placehold.co/400x400.png', hint: 'vermicompost', shopName: 'Salem Organics', shopLocation: 'Salem', isAvailable: true },
  { id: 'tool-3', name: 'Spade (மண்வெட்டி)', description: 'Heavy duty', price: 450, image: 'https://placehold.co/400x400.png', hint: 'spade tool', shopName: 'Yercaud Agri Tools', shopLocation: 'Salem', isAvailable: true },
  { id: 'seed-3', name: 'Turmeric Rhizome (மஞ்சள் கிழங்கு)', description: 'Erode variety', price: 120, image: 'https://placehold.co/400x400.png', hint: 'turmeric root', shopName: 'Salem Spices', shopLocation: 'Salem', isAvailable: true },
  
  // Tiruchirappalli
  { id: 'prod-3', name: 'Tractor Rental (டிராக்டர் வாடகை)', description: 'Per hour basis', price: 600, image: 'https://placehold.co/400x400.png', hint: 'tractor field', shopName: 'Agri Machinaries Inc.', shopLocation: 'Tiruchirappalli', isAvailable: true },
  { id: 'prod-4', name: 'Sprayer (விசைத்தெளிப்பான்)', description: '5-litre capacity', price: 2500, image: 'https://placehold.co/400x400.png', hint: 'farm sprayer', shopName: 'Agri Machinaries Inc.', shopLocation: 'Tiruchirappalli', isAvailable: true },
  { id: 'fert-3', name: 'Potash (பொட்டாஷ்)', description: 'N-P-K: 0-0-60', price: 1700, image: 'https://placehold.co/400x400.png', hint: 'fertilizer pellets', shopName: 'Cauvery Fertilizers', shopLocation: 'Tiruchirappalli', isAvailable: false },
  { id: 'prod-8', name: 'Banana Sapling (வாழைக்கன்று)', description: 'Poovan variety', price: 20, image: 'https://placehold.co/400x400.png', hint: 'banana tree', shopName: 'Trichy Agro', shopLocation: 'Tiruchirappalli', isAvailable: true },
  { id: 'tool-4', name: 'Power Tiller (பவர் டில்லர்)', description: 'Diesel engine', price: 75000, image: 'https://placehold.co/400x400.png', hint: 'power tiller', shopName: 'Rockfort Machinery', shopLocation: 'Tiruchirappalli', isAvailable: true },

  // Erode
  { id: 'seed-4', name: 'Groundnut Seeds (நிலக்கடலை விதைகள்)', description: 'TMV 7 variety', price: 180, image: 'https://placehold.co/400x400.png', hint: 'groundnuts', shopName: 'Erode Agri Center', shopLocation: 'Erode', isAvailable: true },
  { id: 'tool-5', name: 'Water Pump (நீர் பம்ப்)', description: '2 HP motor', price: 8000, image: 'https://placehold.co/400x400.png', hint: 'water pump', shopName: 'Bhavani Pumps', shopLocation: 'Erode', isAvailable: false },
  { id: 'prod-9', name: 'Tapioca Cuttings (மரவள்ளிக்கிழங்கு குச்சி)', description: 'High starch content', price: 5, image: 'https://placehold.co/400x400.png', hint: 'tapioca plant', shopName: 'Erode Farmers Coop', shopLocation: 'Erode', isAvailable: true },
  { id: 'fert-8', name: 'Sulphate (சல்ஃபேட்)', description: 'Ammonium Sulphate', price: 600, image: 'https://placehold.co/400x400.png', hint: 'white powder', shopName: 'Kongu Fertilizers', shopLocation: 'Erode', isAvailable: true },
  { id: 'prod-10', name: 'Mushroom Spawn (காளான் வித்து)', description: 'Oyster mushroom', price: 150, image: 'https://placehold.co/400x400.png', hint: 'mushrooms', shopName: 'Erode Mushrooms', shopLocation: 'Erode', isAvailable: true },
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
            <MapPin className="mr-1.5 h-4 w-4" /> {product.shopName}, {product.shopLocation}
        </CardDescription>
        <p className="mt-2 text-sm text-muted-foreground">{product.description}</p>
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

  const getProductsByCategory = (category: string) => {
      const lowerCaseCategory = category.toLowerCase();
      if (lowerCaseCategory === 'fertilizers') {
          return products.filter(p => p.id.startsWith('fert-'));
      }
       if (lowerCaseCategory === 'seeds') {
          return products.filter(p => p.id.startsWith('seed-'));
      }
      if (lowerCaseCategory === 'tools & machinery') {
          return products.filter(p => p.id.startsWith('tool-') || p.id.startsWith('prod-3'));
      }
       if (lowerCaseCategory === 'saplings & others') {
          return products.filter(p => p.id.startsWith('prod-') && p.id !== 'prod-3');
      }
      return [];
  }

  const sections = ['Fertilizers (உரங்கள்)', 'Seeds (விதைகள்)', 'Tools & Machinery (கருவிகள் & இயந்திரங்கள்)', 'Saplings & Others (கன்றுகள் & மற்றவை)'];

  return (
    <div className="min-h-screen w-full bg-secondary/50">
      <DashboardHeader title="Agri Store" userType="farmer" />
      
      <main className="container mx-auto py-8">
        {sections.map(section => {
            const sectionProducts = getProductsByCategory(section.split(' ')[0]);
            if (sectionProducts.length === 0) return null;
            
            return (
                 <section key={section} className="mb-12">
                  <h1 className="text-3xl font-bold mb-6 font-headline">{section}</h1>
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {sectionProducts.map(renderProductCard)}
                  </div>
                </section>
            );
        })}
      </main>
    </div>
  );
}
