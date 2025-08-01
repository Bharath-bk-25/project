
'use client';
import Link from 'next/link';
import { Bell, LogOut, Plus, Settings, User, ShoppingCart, Languages, MessageSquare } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Logo } from './logo';
import { useCart } from '@/context/CartContext';
import { Badge } from './ui/badge';
import { useEffect, useState } from 'react';

type DashboardHeaderProps = {
  title: string;
  userType: 'farmer' | 'worker';
  onCreatePost?: () => void;
  onNotificationClick?: (farmerName: string) => void;
  onFarmerNotificationClick?: (workerName: string) => void;
};

type Notification = {
    farmerName: string;
    message: string;
    workerName: string;
    read: boolean;
    id: number;
}


export function DashboardHeader({ title, userType, onCreatePost, onNotificationClick, onFarmerNotificationClick }: DashboardHeaderProps) {
  const { cartItems } = useCart();
  const cartItemCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const unreadCount = notifications.filter(n => !n.read).length;
  
  useEffect(() => {
    const interval = setInterval(() => {
      const storedNotifications = JSON.parse(localStorage.getItem('notifications') || '[]') as Notification[];
      let userNotifications: Notification[];

      if (userType === 'worker') {
        userNotifications = storedNotifications.filter(n => n.workerName === 'Sangeetha priya' && !n.message.startsWith('Worker:'));
      } else { 
        userNotifications = storedNotifications.filter(n => n.farmerName === 'Current Farmer' && n.message.startsWith('Worker:'));
      }
      setNotifications(userNotifications);
    }, 1000);

    return () => clearInterval(interval);
  }, [userType]);

  const handleWorkerNotificationClick = (notification: Notification) => {
    const storedNotifications = JSON.parse(localStorage.getItem('notifications') || '[]') as Notification[];
    const updatedNotifications = storedNotifications.map(n => 
        n.id === notification.id ? { ...n, read: true } : n
    );
    localStorage.setItem('notifications', JSON.stringify(updatedNotifications));
    setNotifications(updatedNotifications.filter(n => n.workerName === 'Sangeetha priya'));
    
    if(onNotificationClick) {
        onNotificationClick(notification.farmerName);
    }
  };

  const handleFarmerNotificationClick = (notification: Notification) => {
    const storedNotifications = JSON.parse(localStorage.getItem('notifications') || '[]') as Notification[];
    const updatedNotifications = storedNotifications.map(n => 
        n.id === notification.id ? { ...n, read: true } : n
    );
    localStorage.setItem('notifications', JSON.stringify(updatedNotifications));
    setNotifications(updatedNotifications.filter(n => n.farmerName === 'Current Farmer' && n.message.startsWith('Worker:')));
    
    if (onFarmerNotificationClick) {
        onFarmerNotificationClick(notification.workerName);
    }
  };


  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur-sm">
      <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
        <div className="flex gap-6 md:gap-10">
          <Link href="/" className="flex items-center space-x-2">
            <Logo className="h-10 w-10" />
            <span className="hidden font-bold sm:inline-block font-headline">{title}</span>
          </Link>
          {userType === 'farmer' && (
             <nav className="hidden gap-6 md:flex">
                <Link href="/farmer/dashboard" className="flex items-center text-lg font-medium transition-colors hover:text-foreground/80 sm:text-sm text-foreground/60">
                  Find Workers
                </Link>
                <Link href="/agristore" className="flex items-center text-lg font-medium transition-colors hover:text-foreground/80 sm:text-sm text-foreground">
                  Agri-Store
                </Link>
             </nav>
          )}
           {userType === 'worker' && (
             <nav className="hidden gap-6 md:flex">
                <Link href="/worker/dashboard" className="flex items-center text-lg font-medium transition-colors hover:text-foreground/80 sm:text-sm text-foreground">
                  Available Jobs (கிடைக்கும் வேலைகள்)
                </Link>
             </nav>
          )}
        </div>
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-2">
            {userType === 'farmer' && (
              <>
                 <Button variant="ghost" size="icon" className="relative" asChild>
                   <Link href="/cart">
                      <ShoppingCart className="h-5 w-5" />
                      {cartItemCount > 0 && (
                        <Badge variant="destructive" className="absolute -right-2 -top-2 h-5 w-5 justify-center rounded-full p-0">
                          {cartItemCount}
                        </Badge>
                      )}
                      <span className="sr-only">Shopping Cart</span>
                   </Link>
                </Button>
                 <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="relative">
                            <MessageSquare className="h-5 w-5" />
                            {unreadCount > 0 && (
                                <Badge variant="destructive" className="absolute -right-2 -top-2 h-5 w-5 justify-center rounded-full p-0">
                                {unreadCount}
                                </Badge>
                            )}
                            <span className="sr-only">Messages</span>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-80" align="end">
                        <DropdownMenuLabel>Messages</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        {notifications.length === 0 ? (
                            <DropdownMenuItem disabled>No new messages</DropdownMenuItem>
                        ) : (
                            notifications.map((notification) => (
                            <DropdownMenuItem 
                                key={notification.id} 
                                onSelect={() => handleFarmerNotificationClick(notification)}
                                className={!notification.read ? 'font-bold' : ''}
                            >
                                <div className='flex flex-col'>
                                <span>From: {notification.workerName}</span>
                                <span className='text-xs text-muted-foreground truncate'>{notification.message.substring(notification.message.indexOf(':') + 1).trim()}</span>
                                </div>
                            </DropdownMenuItem>
                            ))
                        )}
                    </DropdownMenuContent>
                </DropdownMenu>
                <Button size="sm" onClick={onCreatePost}>
                  <Plus className="-ml-1 mr-2 h-4 w-4" />
                  Create Post
                </Button>
              </>
            )}
            {userType === 'worker' && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="relative">
                    <MessageSquare className="h-5 w-5" />
                    {unreadCount > 0 && (
                        <Badge variant="destructive" className="absolute -right-2 -top-2 h-5 w-5 justify-center rounded-full p-0">
                          {unreadCount}
                        </Badge>
                    )}
                    <span className="sr-only">Messages</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-80" align="end">
                  <DropdownMenuLabel>Messages</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                   {notifications.length === 0 ? (
                      <DropdownMenuItem disabled>No new messages</DropdownMenuItem>
                    ) : (
                      notifications.map((notification) => (
                        <DropdownMenuItem 
                            key={notification.id} 
                            onSelect={() => handleWorkerNotificationClick(notification)}
                            className={!notification.read ? 'font-bold' : ''}
                        >
                          <div className='flex flex-col'>
                            <span>From: {notification.farmerName}</span>
                            <span className='text-xs text-muted-foreground truncate'>{notification.message}</span>
                          </div>
                        </DropdownMenuItem>
                      ))
                    )}
                </DropdownMenuContent>
              </DropdownMenu>
            )}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-9 w-9">
                    <AvatarImage src={`https://placehold.co/100x100.png`} alt="@username" data-ai-hint="person portrait" />
                    <AvatarFallback>{userType === 'farmer' ? 'F' : 'W'}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">Username</p>
                    <p className="text-xs leading-none text-muted-foreground">user@email.com</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem>
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile (சுயவிவரம்)</span>
                  </DropdownMenuItem>
                   <DropdownMenuItem>
                    <Languages className="mr-2 h-4 w-4" />
                    <span>Language (மொழி)</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings (அமைப்புகள்)</span>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out (வெளியேறு)</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </nav>
        </div>
      </div>
    </header>
  );
}
