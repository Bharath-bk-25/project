'use client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useCart } from '@/context/CartContext';
import { DashboardHeader } from '@/components/dashboard-header';
import Image from 'next/image';
import { Trash2 } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';

export default function CartPage() {
  const { cartItems, removeFromCart, clearCart } = useCart();
  const { toast } = useToast();
  const router = useRouter();

  const total = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  
  const handleCheckout = () => {
    toast({
      title: 'Order Placed!',
      description: 'Your order has been successfully placed. Thank you for shopping with us!',
    });
    clearCart();
    router.push('/agristore');
  };

  return (
    <div className="min-h-screen w-full bg-secondary/50">
      <DashboardHeader title="Shopping Cart" userType="farmer" />
      <main className="container mx-auto py-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-3xl font-headline">Your Cart</CardTitle>
            <CardDescription>Review the items in your cart before checkout.</CardDescription>
          </CardHeader>
          <CardContent>
            {cartItems.length === 0 ? (
              <p className="text-center text-muted-foreground py-12">Your cart is empty.</p>
            ) : (
              <>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[100px] hidden sm:table-cell">Image</TableHead>
                      <TableHead>Product</TableHead>
                      <TableHead className="text-center">Quantity</TableHead>
                      <TableHead className="text-right">Price</TableHead>
                      <TableHead className="text-right">Total</TableHead>
                      <TableHead className="w-[50px]"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {cartItems.map((item) => (
                      <TableRow key={item.product.id}>
                        <TableCell className="hidden sm:table-cell">
                          <Image
                            src={item.product.image}
                            alt={item.product.name}
                            width={64}
                            height={64}
                            className="rounded-md object-cover"
                            data-ai-hint={item.product.hint}
                          />
                        </TableCell>
                        <TableCell className="font-medium">{item.product.name}</TableCell>
                        <TableCell className="text-center">{item.quantity}</TableCell>
                        <TableCell className="text-right">₹{item.product.price.toFixed(2)}</TableCell>
                        <TableCell className="text-right">₹{(item.product.price * item.quantity).toFixed(2)}</TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="icon" onClick={() => removeFromCart(item.product.id)}>
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                <Separator className="my-4" />
                <div className="flex justify-end items-center gap-4">
                    <div className="text-right">
                        <p className="text-muted-foreground">Subtotal</p>
                        <p className="text-2xl font-bold">₹{total.toFixed(2)}</p>
                    </div>
                     <Button size="lg" onClick={handleCheckout}>Proceed to Checkout</Button>
                </div>
                <div className="flex justify-end mt-4">
                     <Button variant="outline" size="sm" onClick={clearCart}>Clear Cart</Button>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
