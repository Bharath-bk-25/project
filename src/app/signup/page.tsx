'use client';
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
import { useState } from 'react';
import { createUser } from '@/ai/flows/createUserFlow';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';

export default function SignupPage() {
  const [userType, setUserType] = useState('farmer');

  const [farmerName, setFarmerName] = useState('');
  const [farmerAge, setFarmerAge] = useState('');
  const [farmerGender, setFarmerGender] = useState('');
  const [farmerLocation, setFarmerLocation] = useState('');
  const [farmerCrops, setFarmerCrops] = useState('');

  const [workerName, setWorkerName] = useState('');
  const [workerAge, setWorkerAge] = useState('');
  const [workerGender, setWorkerGender] = useState('');
  const [workerSkills, setWorkerSkills] = useState('');
  const [workerSalary, setWorkerSalary] = useState('');
  
  const { toast } = useToast();
  const router = useRouter();

  const handleSubmit = async () => {
    let userData;
    if (userType === 'farmer') {
      userData = {
        type: 'farmer',
        name: farmerName,
        age: farmerAge,
        gender: farmerGender,
        location: farmerLocation,
        crops: farmerCrops,
      };
    } else {
      userData = {
        type: 'worker',
        name: workerName,
        age: workerAge,
        gender: workerGender,
        skills: workerSkills,
        expectedSalary: workerSalary,
      };
    }

    try {
      await createUser(userData);
      toast({
        title: 'Account Created',
        description: 'Your account has been created successfully.',
      });
      if (userType === 'farmer') {
        router.push('/login/farmer');
      } else {
        router.push('/login/worker');
      }
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to create account.',
      });
    }
  };


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
          <Tabs defaultValue="farmer" className="w-full" onValueChange={setUserType}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="farmer"><Tractor className="mr-2 h-4 w-4" />Farmer</TabsTrigger>
              <TabsTrigger value="worker"><Briefcase className="mr-2 h-4 w-4" />Worker</TabsTrigger>
            </TabsList>
            <TabsContent value="farmer" className="space-y-4 pt-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="farmer-name">Name</Label>
                  <Input id="farmer-name" placeholder="John Appleseed" value={farmerName} onChange={(e) => setFarmerName(e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="farmer-age">Age</Label>
                  <Input id="farmer-age" type="number" placeholder="45" value={farmerAge} onChange={(e) => setFarmerAge(e.target.value)} />
                </div>
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="farmer-gender">Gender</Label>
                  <Select onValueChange={setFarmerGender}>
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
                  <Input id="farmer-location" placeholder="Sunnyvale, CA" value={farmerLocation} onChange={(e) => setFarmerLocation(e.target.value)} />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="farmer-crops">Types of Crops</Label>
                <Textarea id="farmer-crops" placeholder="e.g., Corn, Wheat, Soybeans" value={farmerCrops} onChange={(e) => setFarmerCrops(e.target.value)} />
              </div>
            </TabsContent>
            <TabsContent value="worker" className="space-y-4 pt-4">
               <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="worker-name">Name</Label>
                  <Input id="worker-name" placeholder="Jane Doe" value={workerName} onChange={(e) => setWorkerName(e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="worker-age">Age</Label>
                  <Input id="worker-age" type="number" placeholder="32" value={workerAge} onChange={(e) => setWorkerAge(e.target.value)} />
                </div>
              </div>
               <div className="space-y-2">
                  <Label htmlFor="worker-gender">Gender</Label>
                  <Select onValueChange={setWorkerGender}>
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
                <Textarea id="worker-skills" placeholder="e.g., Harvesting, Planting, Irrigation" value={workerSkills} onChange={(e) => setWorkerSkills(e.target.value)}/>
              </div>
              <div className="space-y-2">
                <Label htmlFor="worker-salary">Expected Salary (per work)</Label>
                <Textarea id="worker-salary" placeholder="Harvesting: $20/hr, Planting: $18/hr" value={workerSalary} onChange={(e) => setWorkerSalary(e.target.value)}/>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
          <Button className="w-full" onClick={handleSubmit}>Create Account</Button>
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
