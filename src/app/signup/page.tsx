import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { Logo } from '@/components/logo';
import Link from 'next/link';
import { Tractor, Briefcase } from 'lucide-react';

export default function SignupPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4">
      <Card className="w-full max-w-lg">
        <CardHeader className="text-center">
          <Link href="/" className="mx-auto mb-4">
            <Logo />
          </Link>
          <CardTitle className="text-3xl font-headline">Create an Account</CardTitle>
          <CardDescription>Join our community. Are you a farmer or a worker?</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="farmer" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="farmer"><Tractor className="mr-2 h-4 w-4" />Farmer</TabsTrigger>
              <TabsTrigger value="worker"><Briefcase className="mr-2 h-4 w-4" />Worker</TabsTrigger>
            </TabsList>
            <TabsContent value="farmer" className="space-y-4 pt-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="farmer-name">Name</Label>
                  <Input id="farmer-name" placeholder="John Appleseed" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="farmer-age">Age</Label>
                  <Input id="farmer-age" type="number" placeholder="45" />
                </div>
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="farmer-gender">Gender</Label>
                  <Select>
                    <SelectTrigger id="farmer-gender">
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                      <SelectItem value="other">Prefer not to say</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="farmer-location">Location</Label>
                  <Input id="farmer-location" placeholder="Sunnyvale, CA" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="farmer-crops">Types of Crops</Label>
                <Textarea id="farmer-crops" placeholder="e.g., Corn, Wheat, Soybeans" />
              </div>
            </TabsContent>
            <TabsContent value="worker" className="space-y-4 pt-4">
               <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="worker-name">Name</Label>
                  <Input id="worker-name" placeholder="Jane Doe" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="worker-age">Age</Label>
                  <Input id="worker-age" type="number" placeholder="32" />
                </div>
              </div>
               <div className="space-y-2">
                  <Label htmlFor="worker-gender">Gender</Label>
                  <Select>
                    <SelectTrigger id="worker-gender">
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                      <SelectItem value="other">Prefer not to say</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              <div className="space-y-2">
                <Label htmlFor="worker-skills">Known Works</Label>
                <Textarea id="worker-skills" placeholder="e.g., Harvesting, Planting, Irrigation" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="worker-salary">Expected Salary (per work)</Label>
                <Textarea id="worker-salary" placeholder="Harvesting: $20/hr, Planting: $18/hr" />
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
          <Button className="w-full" type="submit">Create Account</Button>
           <p className="text-sm text-muted-foreground">
            Already have an account?{' '}
            <Button variant="link" asChild className="p-0">
              <Link href="/login/farmer">Login</Link>
            </Button>
          </p>
        </CardFooter>
      </Card>
    </main>
  );
}
