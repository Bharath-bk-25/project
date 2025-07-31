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
  { id: 'fert-5', name: 'Bio-Fertilizer (உயிர் உரம்)', description: 'Improves soil health', price: 450, image: 'https://placehold.co/400x400.png', hint: 'compost bag', shopName: 'Covai Agro Center', shopLocation: 'Coimbatore', isAvailable: true },
  { id: 'seed-8', name: 'Vegetable Seeds (காய்கறி விதைகள்)', description: 'Assorted pack', price: 150, image: 'https://placehold.co/400x400.png', hint: 'seed packets', shopName: 'Covai Agro Center', shopLocation: 'Coimbatore', isAvailable: true },
  { id: 'prod-5', name: 'Coconut Sapling (தென்னங்கன்று)', description: 'West Coast Tall', price: 150, image: 'https://placehold.co/400x400.png', hint: 'coconut tree', shopName: 'Green Thumb Nursery', shopLocation: 'Coimbatore', isAvailable: true },
  { id: 'tool-1', name: 'Hand Weeder (களையெடுப்பான்)', description: 'Durable and sharp', price: 350, image: 'https://placehold.co/400x400.png', hint: 'gardening tool', shopName: 'Saravana Tools', shopLocation: 'Coimbatore', isAvailable: true },
  { id: 'seed-1', name: 'Maize Seeds (மக்காச்சோள விதைகள்)', description: 'Hybrid variety', price: 250, image: 'https://placehold.co/400x400.png', hint: 'maize seeds', shopName: 'Annapoorna Seeds', shopLocation: 'Coimbatore', isAvailable: true },

  // Madurai
  { id: 'fert-2', name: 'DAP (டி.ஏ.பி)', description: 'N-P-K: 18-46-0', price: 1350, image: 'https://placehold.co/400x400.png', hint: 'fertilizer sack', shopName: 'Priya Agri Supplies', shopLocation: 'Madurai', isAvailable: true },
  { id: 'prod-1', name: 'Paddy Seeds (நெல் விதைகள்)', description: 'High-yield variety', price: 40, image: 'https://placehold.co/400x400.png', hint: 'paddy seeds', shopName: 'Priya Agri Supplies', shopLocation: 'Madurai', isAvailable: true },
  { id: 'tool-12', name: 'Shovel ( ಸಲಿಕೆ)', description: 'Round point', price: 550, image: 'https://placehold.co/400x400.png', hint: 'shovel tool', shopName: 'Priya Agri Supplies', shopLocation: 'Madurai', isAvailable: true },
  { id: 'fert-6', name: 'Complex (காம்ப்ளக்ஸ்)', description: 'N-P-K: 20-20-13', price: 1470, image: 'https://placehold.co/400x400.png', hint: 'fertilizer granules', shopName: 'Meenakshi Traders', shopLocation: 'Madurai', isAvailable: true },
  { id: 'prod-6', name: 'Jasmine Sapling (மல்லிகை செடி)', description: 'Madurai Malli', price: 50, image: 'https://placehold.co/400x400.png', hint: 'jasmine flower', shopName: 'Pandiyan Nursery', shopLocation: 'Madurai', isAvailable: true },
  { id: 'tool-2', name: 'Sickle (அரிவாள்)', description: 'Traditional design', price: 280, image: 'https://placehold.co/400x400.png', hint: 'sickle tool', shopName: 'Madurai Farm Tools', shopLocation: 'Madurai', isAvailable: false },
  { id: 'seed-2', name: 'Cotton Seeds (பருத்தி விதைகள்)', description: 'BT Cotton', price: 850, image: 'https://placehold.co/400x400.png', hint: 'cotton plant', shopName: 'Vaigai Seeds Corp', shopLocation: 'Madurai', isAvailable: true },

  // Salem
  { id: 'fert-4', name: 'Neem Cake (வேப்பம் புண்ணாக்கு)', description: 'Organic Pest Repellent', price: 1200, image: 'https://placehold.co/400x400.png', hint: 'organic fertilizer', shopName: 'Selvam Organics', shopLocation: 'Salem', isAvailable: true },
  { id: 'prod-7', name: 'Mango Sapling (மாங்கன்று)', description: 'Salem Bangalora', price: 250, image: 'https://placehold.co/400x400.png', hint: 'mango tree', shopName: 'Salem Mango Farm', shopLocation: 'Salem', isAvailable: true },
  { id: 'fert-7', name: 'Vermicompost (மண்புழு உரம்)', description: '10kg bag', price: 300, image: 'https://placehold.co/400x400.png', hint: 'vermicompost', shopName: 'Salem Organics', shopLocation: 'Salem', isAvailable: true },
  { id: 'tool-13', name: 'Pickaxe (বেলচা)', description: 'Forged steel head', price: 900, image: 'https://placehold.co/400x400.png', hint: 'pickaxe tool', shopName: 'Salem Organics', shopLocation: 'Salem', isAvailable: true },
  { id: 'tool-3', name: 'Spade (மண்வெட்டி)', description: 'Heavy duty', price: 450, image: 'https://placehold.co/400x400.png', hint: 'spade tool', shopName: 'Yercaud Agri Tools', shopLocation: 'Salem', isAvailable: true },
  { id: 'seed-3', name: 'Turmeric Rhizome (மஞ்சள் கிழங்கு)', description: 'Erode variety', price: 120, image: 'https://placehold.co/400x400.png', hint: 'turmeric root', shopName: 'Salem Spices', shopLocation: 'Salem', isAvailable: true },
  
  // Tiruchirappalli
  { id: 'prod-3', name: 'Tractor Rental (டிராக்டர் வாடகை)', description: 'Per hour basis', price: 600, image: 'https://placehold.co/400x400.png', hint: 'tractor field', shopName: 'Agri Machinaries Inc.', shopLocation: 'Tiruchirappalli', isAvailable: true },
  { id: 'prod-4', name: 'Sprayer (விசைத்தெளிப்பான்)', description: '5-litre capacity', price: 2500, image: 'https://placehold.co/400x400.png', hint: 'farm sprayer', shopName: 'Agri Machinaries Inc.', shopLocation: 'Tiruchirappalli', isAvailable: true },
  { id: 'fert-3', name: 'Potash (பொட்டாஷ்)', description: 'N-P-K: 0-0-60', price: 1700, image: 'https://placehold.co/400x400.png', hint: 'fertilizer pellets', shopName: 'Cauvery Fertilizers', shopLocation: 'Tiruchirappalli', isAvailable: false },
  { id: 'seed-9', name: 'Banana Corms (வாழைக்கிழங்கு)', description: 'Nendran variety', price: 30, image: 'https://placehold.co/400x400.png', hint: 'banana plant', shopName: 'Cauvery Fertilizers', shopLocation: 'Tiruchirappalli', isAvailable: true },
  { id: 'prod-8', name: 'Banana Sapling (வாழைக்கன்று)', description: 'Poovan variety', price: 20, image: 'https://placehold.co/400x400.png', hint: 'banana tree', shopName: 'Trichy Agro', shopLocation: 'Tiruchirappalli', isAvailable: true },
  { id: 'tool-4', name: 'Power Tiller (பவர் டில்லர்)', description: 'Diesel engine', price: 75000, image: 'https://placehold.co/400x400.png', hint: 'power tiller', shopName: 'Rockfort Machinery', shopLocation: 'Tiruchirappalli', isAvailable: true },

  // Erode
  { id: 'seed-4', name: 'Groundnut Seeds (நிலக்கடலை விதைகள்)', description: 'TMV 7 variety', price: 180, image: 'https://placehold.co/400x400.png', hint: 'groundnuts', shopName: 'Erode Agri Center', shopLocation: 'Erode', isAvailable: true },
  { id: 'tool-5', name: 'Water Pump (நீர் பம்ப்)', description: '2 HP motor', price: 8000, image: 'https://placehold.co/400x400.png', hint: 'water pump', shopName: 'Bhavani Pumps', shopLocation: 'Erode', isAvailable: false },
  { id: 'prod-9', name: 'Tapioca Cuttings (மரவள்ளிக்கிழங்கு குச்சி)', description: 'High starch content', price: 5, image: 'https://placehold.co/400x400.png', hint: 'tapioca plant', shopName: 'Erode Farmers Coop', shopLocation: 'Erode', isAvailable: true },
  { id: 'fert-8', name: 'Sulphate (சல்ஃபேட்)', description: 'Ammonium Sulphate', price: 600, image: 'https://placehold.co/400x400.png', hint: 'white powder', shopName: 'Kongu Fertilizers', shopLocation: 'Erode', isAvailable: true },
  { id: 'prod-10', name: 'Mushroom Spawn (காளான் வித்து)', description: 'Oyster mushroom', price: 150, image: 'https://placehold.co/400x400.png', hint: 'mushrooms', shopName: 'Erode Mushrooms', shopLocation: 'Erode', isAvailable: true },
  { id: 'tool-14', name: 'Garden Rake (தோட்ட ரேக்)', description: '12-teeth', price: 400, image: 'https://placehold.co/400x400.png', hint: 'garden rake', shopName: 'Erode Mushrooms', shopLocation: 'Erode', isAvailable: true },

  // Tirunelveli
  { id: 'seed-5', name: 'Chilli Seeds (மிளகாய் விதைகள்)', description: 'Samba variety', price: 90, image: 'https://placehold.co/400x400.png', hint: 'chilli plant', shopName: 'Nanguneri Seed Bank', shopLocation: 'Tirunelveli', isAvailable: true },
  { id: 'tool-6', name: 'Plough (கலப்பை)', description: 'Country plough', price: 1500, image: 'https://placehold.co/400x400.png', hint: 'wooden plough', shopName: 'Tamirabarani Tools', shopLocation: 'Tirunelveli', isAvailable: true },
  { id: 'prod-13', name: 'Palm Sapling (பனை மரம்)', description: 'Native species', price: 40, image: 'https://placehold.co/400x400.png', hint: 'palm tree', shopName: 'Nellai Nursery', shopLocation: 'Tirunelveli', isAvailable: true },
  { id: 'fert-12', name: 'Bone Meal (எலும்புத் தூள்)', description: 'Organic Phosphorus Source', price: 250, image: 'https://placehold.co/400x400.png', hint: 'bone meal powder', shopName: 'Nellai Nursery', shopLocation: 'Tirunelveli', isAvailable: true },

  // Thanjavur
  { id: 'prod-11', name: 'Sesame Seeds (எள் விதைகள்)', description: 'Black sesame', price: 220, image: 'https://placehold.co/400x400.png', hint: 'sesame seeds', shopName: 'Delta Agro', shopLocation: 'Thanjavur', isAvailable: true },
  { id: 'fert-9', name: 'Gypsum (ஜிப்சம்)', description: 'Soil conditioner', price: 400, image: 'https://placehold.co/400x400.png', hint: 'gypsum powder', shopName: 'Kumbakonam Fertilizers', shopLocation: 'Thanjavur', isAvailable: false },
  { id: 'tool-8', name: 'Paddy Weeder (நெல் களையெடுப்பான்)', description: 'Cono weeder', price: 2200, image: 'https://placehold.co/400x400.png', hint: 'paddy weeder', shopName: 'Thanjavur Farm Implements', shopLocation: 'Thanjavur', isAvailable: true },
  { id: 'prod-18', name: 'Paddy Harvester Rental (நெல் அறுவடை இயந்திரம்)', description: 'Per hour', price: 1800, image: 'https://placehold.co/400x400.png', hint: 'combine harvester', shopName: 'Thanjavur Farm Implements', shopLocation: 'Thanjavur', isAvailable: true },

  // Dindigul
  { id: 'prod-12', name: 'Moringa Seeds (முருங்கை விதைகள்)', description: 'PKM-1 variety', price: 350, image: 'https://placehold.co/400x400.png', hint: 'moringa tree', shopName: 'Sirumalai Seedlings', shopLocation: 'Dindigul', isAvailable: true },
  { id: 'tool-7', name: 'Harvesting Net (அறுவடை வலை)', description: 'For floriculture', price: 500, image: 'https://placehold.co/400x400.png', hint: 'green net', shopName: 'Dindigul Farm Needs', shopLocation: 'Dindigul', isAvailable: true },
  { id: 'fert-10', name: 'Micronutrients (நுண்ணூட்டச் சத்து)', description: 'Vegetable mix', price: 750, image: 'https://placehold.co/400x400.png', hint: 'fertilizer mix', shopName: 'Dindigul Agro', shopLocation: 'Dindigul', isAvailable: true },
  { id: 'seed-10', name: 'Onion Seeds (வெங்காய விதைகள்)', description: 'Small onion variety', price: 450, image: 'https://placehold.co/400x400.png', hint: 'onion seeds', shopName: 'Dindigul Agro', shopLocation: 'Dindigul', isAvailable: true },

  // Vellore
  { id: 'seed-6', name: 'Brinjal Seeds (கத்தரி விதைகள்)', description: 'Vellore thorned variety', price: 60, image: 'https://placehold.co/400x400.png', hint: 'brinjal plant', shopName: 'Palar Seeds', shopLocation: 'Vellore', isAvailable: true },
  { id: 'prod-14', name: 'Goat Manure (ஆட்டு எரு)', description: 'Well composted', price: 200, image: 'https://placehold.co/400x400.png', hint: 'manure compost', shopName: 'Vellore Farms', shopLocation: 'Vellore', isAvailable: true },
  { id: 'tool-9', name: 'Pruning Shears (கவாத்து கத்தரிக்கோல்)', description: 'Bypass pruner', price: 650, image: 'https://placehold.co/400x400.png', hint: 'pruning shears', shopName: 'Ambur Tools', shopLocation: 'Vellore', isAvailable: false },
  { id: 'prod-19', name: 'Leather Scraps (தோல் கழிவுகள்)', description: 'For compost enrichment', price: 100, image: 'https://placehold.co/400x400.png', hint: 'leather scraps', shopName: 'Ambur Tools', shopLocation: 'Vellore', isAvailable: true },

  // Karur
  { id: 'prod-15', name: 'Coir Pith Block (கயிறு பித் தொகுதி)', description: '5kg block, expands to 75L', price: 300, image: 'https://placehold.co/400x400.png', hint: 'coir block', shopName: 'Karur Coir Exports', shopLocation: 'Karur', isAvailable: true },
  { id: 'tool-10', name: 'Textile Shredder (ஜவுளி து драப்பர்)', description: 'For mulching', price: 12000, image: 'https://placehold.co/400x400.png', hint: 'shredder machine', shopName: 'Amaravathi Farm Tech', shopLocation: 'Karur', isAvailable: true },
  { id: 'seed-11', name: 'Sunhemp Seeds (சணல் விதைகள்)', description: 'Green manure crop', price: 80, image: 'https://placehold.co/400x400.png', hint: 'hemp seeds', shopName: 'Amaravathi Farm Tech', shopLocation: 'Karur', isAvailable: true },

  // Tiruppur
  { id: 'prod-16', name: 'Cotton Waste (பருத்தி கழிவுகள்)', description: 'Organic matter for compost', price: 50, image: 'https://placehold.co/400x400.png', hint: 'cotton waste', shopName: 'Tiruppur Cotton Mills', shopLocation: 'Tiruppur', isAvailable: true },
  { id: 'fert-11', name: 'Zinc Sulphate (цинк சல்பேட்)', description: 'For cotton crops', price: 700, image: 'https://placehold.co/400x400.png', hint: 'fertilizer bag', shopName: 'Noyyal Agro Center', shopLocation: 'Tiruppur', isAvailable: false },
  { id: 'prod-20', name: 'Knitted Fabric Waste', description: 'For mulching & compost', price: 40, image: 'https://placehold.co/400x400.png', hint: 'fabric scraps', shopName: 'Noyyal Agro Center', shopLocation: 'Tiruppur', isAvailable: true },

  // Kanyakumari
  { id: 'prod-17', name: 'Rubber Sheet (ரப்பர் தாள்)', description: 'RSS-4 Grade', price: 180, image: 'https://placehold.co/400x400.png', hint: 'rubber sheets', shopName: 'Kumari Rubber Traders', shopLocation: 'Kanyakumari', isAvailable: true },
  { id: 'seed-7', name: 'Clove Sapling (கிராம்பு கன்று)', description: 'Healthy sapling', price: 150, image: 'https://placehold.co/400x400.png', hint: 'clove plant', shopName: 'Marthandam Spices', shopLocation: 'Kanyakumari', isAvailable: true },
  { id: 'tool-15', name: 'Tapping Knife (சீவல் கத்தி)', description: 'For rubber tapping', price: 350, image: 'https://placehold.co/400x400.png', hint: 'tapping knife', shopName: 'Marthandam Spices', shopLocation: 'Kanyakumari', isAvailable: true },
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
