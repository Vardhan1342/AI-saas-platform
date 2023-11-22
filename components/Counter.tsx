"use client"
import React, { useEffect, useState } from 'react';
import { Card, CardContent } from './ui/card';
import { MAX_FREE_COUNTS } from '@/constants';
import { Progress } from "@/components/ui/progress"
import { Button } from './ui/button';
import { Zap } from 'lucide-react';
import { useProModal } from '@/hooks/use-pro-modal';



interface countProps{
    apiLimitCount: number,
    isSubscribed:boolean
}
const Counter = ({apiLimitCount=0,isSubscribed=false}:countProps) => {
   const proModal=useProModal();
   const [mounted , setMounted]=useState(false);
   useEffect(()=>{
     setMounted(true);
   },[])

  if(isSubscribed){
    return null;
  }
  
  if(!mounted){
    return false
  }

    return (
        <Card className='bg-white/10 border-0'>
        <CardContent className='py-6'>
            <div className='text-center text-sm text-white mb-4 sapce-y-2'>
               <p> {apiLimitCount} /{MAX_FREE_COUNTS} Free Generation </p>
               <Progress className='h-3  bg-white/10 ' value={(apiLimitCount/ MAX_FREE_COUNTS) * 100 } />
            </div>
            <Button variant="premium" className='w-full text-white text-sm' onClick={proModal.onOpen}>
               Upgrade
               <Zap className='w-4 h-4 ml-2'/>
            </Button>
        </CardContent>
      </Card>
  );
}

export default Counter;
