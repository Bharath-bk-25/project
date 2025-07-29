'use client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { DashboardHeader } from '@/components/dashboard-header';
import Image from 'next/image';
import { ShoppingCart } from 'lucide-react';

const fertilizers = [
  { name: 'Urea (யூரியா)', description: 'N-P-K: 46-0-0', price: '₹266.50 / 45kg bag', image: 'https://placehold.co/400x400.png', hint: 'fertilizer bag' },
  { name: 'DAP (டி.ஏ.பி)', description: 'N-P-K: 18-46-0', price: '₹1350 / 50kg bag', image: 'https://placehold.co/400x400.png', hint: 'fertilizer sack' },
  { name: 'Potash (பொட்டாஷ்)', description: 'N-P-K: 0-0-60', price: '₹1700 / 50kg bag', image: 'https://placehold.co/400x400.png', hint: 'fertilizer pellets' },
  { name: 'Neem Cake (வேப்பம் புண்ணாக்கு)', description: 'Organic Pest Repellent', price: '₹1200 / 40kg bag', image: 'https://placehold.co/400x400.png', hint: 'organic fertilizer' },
];

const agriProducts = [
  { name: 'Paddy Seeds (நெல் விதைகள்)', description: 'High-yield variety', price: '₹40 / kg', image: 'https://placehold.co/400x400.png', hint: 'paddy seeds' },
  { name: 'Sugarcane Setts (கரும்பு கரணை)', description: 'Disease-resistant', price: '₹3 / sett', image: 'https://placehold.co/400x400.png', hint: 'sugarcane cutting' },
  { name: 'Tractor Rental (டிராக்டர் வாடகை)', description: 'Per hour basis', price: '₹600 / hour', image: 'https://placehold.co/400x400.png', hint: 'tractor field' },
  { name: 'Sprayer (விசைத்தெளிப்பான்)', description: '5-litre capacity', price: '₹2500', image: 'https://placehold.co/400x400.png', hint: 'farm sprayer' },
];

export default function AgriStorePage() {
  return (
    <div className="min-h-screen w-full bg-secondary/50">
      <DashboardHeader title="Agri Store" userType="farmer" />
      
      <main className="container mx-auto py-8">
        <section>
          <h1 className="text-3xl font-bold mb-6 font-headline">Fertilizers ( உரங்கள் )</h1>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {fertilizers.map((product, index) => (
              <Card key={index} className="overflow-hidden">
                <CardHeader className="p-0">
                  <div className="relative h-48 w-full">
                    <Image src={product.image} alt={product.name} layout="fill" objectFit="cover" data-ai-hint={product.hint} />
                  </div>
                </CardHeader>
                <CardContent className="p-4">
                  <CardTitle className="text-xl">{product.name}</CardTitle>
                  <CardDescription>{product.description}</CardDescription>
                  <p className="mt-2 text-lg font-semibold text-primary">{product.price}</p>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">
                    <ShoppingCart className="mr-2 h-4 w-4" />
                    Add to Cart
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </section>

        <section className="mt-12">
          <h1 className="text-3xl font-bold mb-6 font-headline">Other Agri Products ( விவசாய பொருட்கள் )</h1>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {agriProducts.map((product, index) => (
              <Card key={index} className="overflow-hidden">
                <CardHeader className="p-0">
                  <div className="relative h-48 w-full">
                    <Image src={product.image} alt={product.name} layout="fill" objectFit="cover" data-ai-hint={product.hint} />
                  </div>
                </CardHeader>
                <CardContent className="p-4">
                  <CardTitle className="text-xl">{product.name}</CardTitle>
                  <CardDescription>{product.description}</CardDescription>
                   <p className="mt-2 text-lg font-semibold text-primary">{product.price}</p>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">
                    <ShoppingCart className="mr-2 h-4 w-4" />
                    Add to Cart
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
