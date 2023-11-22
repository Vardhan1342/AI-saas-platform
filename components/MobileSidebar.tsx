"use client";
import React, { useEffect, useState } from 'react';
import { Button } from './ui/button';
import {Menu} from 'lucide-react'
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet';
import Sidebar from './Sidebar';
import { getApiLimitCOunt } from '@/lib/api-limit';

interface MobileProps{
  apiLimitCount:number,
  isSubscribed:boolean
}

const MobileSidebar = ({apiLimitCount =0,isSubscribed=false}:MobileProps) => {
  
  // this belpw lines are  used to avoid hydration error caused by button tag
          const [isMounted ,setIsMounted]=useState(false);
          useEffect(()=>{
            setIsMounted(true);

          },[]);
          if(!isMounted)
          {
            return null;
          }


  return (
    <Sheet>
    <SheetTrigger>
      <Button variant="ghost" size="icon" className="md:hidden">
        <Menu />
      </Button>
    </SheetTrigger>
    <SheetContent side="left" className="p-0">
      <Sidebar  apiLimitCount={apiLimitCount} isSubscribed={isSubscribed}/>
    </SheetContent>
  </Sheet>

  );
};

export default MobileSidebar;
