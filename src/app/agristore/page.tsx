'use client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { DashboardHeader } from '@/components/dashboard-header';
import Image from 'next/image';
import { ShoppingCart, PackageX } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useToast } from '@/hooks/use-toast';
import type { Product } from '@/context/CartContext';
import { Badge } from '@/components/ui/badge';

const fertilizers: Product[] = [
  { id: 'fert-1', name: 'Urea (யூரியா)', description: 'N-P-K: 46-0-0', price: 266.50, image: 'https://placehold.co/400x400.png', hint: 'fertilizer bag', shopName: 'Ram Fertilizers', isAvailable: true },
  { id: 'fert-2', name: 'DAP (டி.ஏ.பி)', description: 'N-P-K: 18-46-0', price: 1350, image: 'https://placehold.co/400x400.png', hint: 'fertilizer sack', shopName: 'Sita Agri Store', isAvailable: true },
  { id: 'fert-3', name: 'Potash (பொட்டாஷ்)', description: 'N-P-K: 0-0-60', price: 1700, image: 'https://placehold.co/400x400.png', hint: 'fertilizer pellets', shopName: 'Ram Fertilizers', isAvailable: false },
  { id: 'fert-4', name: 'Neem Cake (வேப்பம் புண்ணாக்கு)', description: 'Organic Pest Repellent', price: 1200, image: 'https://placehold.co/400x400.png', hint: 'organic fertilizer', shopName: 'Organic Farmers Coop', isAvailable: true },
];

const agriProducts: Product[] = [
  { id: 'prod-1', name: 'Paddy Seeds (நெல் விதைகள்)', description: 'High-yield variety', price: 40, image: 'https://placehold.co/400x400.png', hint: 'paddy seeds', shopName: 'Sita Agri Store', isAvailable: true },
  { id: 'prod-2', name: 'Sugarcane Setts (கரும்பு கரணை)', description: 'Disease-resistant', price: 3, image: 'https://placehold.co/400x400.png', hint: 'sugarcane cutting', shopName: 'Ram Fertilizers', isAvailable: false },
  { id: 'prod-3', name: 'Tractor Rental (டிராக்டர் வாடகை)', description: 'Per hour basis', price: 600, image: 'https://placehold.co/400x400.png', hint: 'tractor field', shopName: 'Agri Machinaries Inc.', isAvailable: true },
  { id: 'prod-4', name: 'Sprayer (விசைத்தெளிப்பான்)', description: '5-litre capacity', price: 2500, image: 'https://placehold.co/400x400.png', hint: 'farm sprayer', shopName: 'Agri Machinaries Inc.', isAvailable: true },
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
        <CardDescription>{product.shopName}</CardDescription>
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

  return (
    <div className="min-h-screen w-full bg-secondary/50">
      <DashboardHeader title="Agri Store" userType="farmer" />
      
      <main className="container mx-auto py-8">
        <section>
          <h1 className="text-3xl font-bold mb-6 font-headline">Fertilizers ( உரங்கள் )</h1>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {fertilizers.map(renderProductCard)}
          </div>
        </section>

        <section className="mt-12">
          <h1 className="text-3xl font-bold mb-6 font-headline">Other Agri Products ( விவசாய பொருட்கள் )</h1>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {agriProducts.map(renderProductCard)}
          </div>
        </section>
      </main>
    </div>
  );
}
