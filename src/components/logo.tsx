import { Wheat } from 'lucide-react';
import { cn } from '@/lib/utils';

export function Logo({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center justify-center h-16 w-16 bg-primary rounded-full text-primary-foreground", className)}>
      <Wheat className="h-8 w-8" />
    </div>
  );
}
