import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tractor, Briefcase, UserPlus } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Logo } from '@/components/logo';

export default function Home() {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center p-4">
      <div className="absolute inset-0 -z-10 h-full w-full bg-background">
        <Image
          src="https://placehold.co/1920x1080.png"
          alt="A beautiful farm landscape"
          fill
          style={{ objectFit: 'cover' }}
          className="opacity-20"
          data-ai-hint="farm landscape"
          priority
        />
        <div className="absolute inset-0 bg-background/50" />
      </div>

      <Card className="w-full max-w-md bg-background/80 backdrop-blur-sm">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4">
            <Logo />
          </div>
          <CardTitle className="text-4xl font-headline font-bold">Welcome to FARMHANDS</CardTitle>
          <CardDescription className="text-lg">Your field of opportunities</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col space-y-4">
            <Button asChild size="lg" variant="default" className="text-base">
              <Link href="/login/farmer">
                <Tractor className="mr-2 h-5 w-5" />
                Farmer Login
              </Link>
            </Button>
            <Button asChild size="lg" variant="secondary" className="text-base">
              <Link href="/login/worker">
                <Briefcase className="mr-2 h-5 w-5" />
                Worker Login
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="text-base">
              <Link href="/signup">
                <UserPlus className="mr-2 h-5 w-5" />
                New User Signup
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
