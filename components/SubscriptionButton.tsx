"use client"

import React, { useState } from 'react';
import { Button } from './ui/button';
import { Zap } from 'lucide-react';
import axios from 'axios';

interface SubscriptionButtonprops{
    isSubscribed:boolean
}

const SubscriptionButton = ({isSubscribed=false}:SubscriptionButtonprops) => {
 const [loading,setLoading]=useState(false);
  const handleSubscription=async()=>{
    try {
        setLoading(true)
        const response=await axios.get("/api/stripe");
        window.location.href=response.data.url;
        console.log(response)
        
    } catch (error) {
        console.log("BILLING ERROR" , error)
    }
    finally{
        setLoading(false)
    }
  }


  return (
    <>
      <Button variant={isSubscribed ? "default" : "premium"} className='text-white' onClick={handleSubscription}>
        {isSubscribed ? "Manage Subscription" : "Upgrade"}
        {!isSubscribed && <Zap className='w-4 h-4'/>}
      </Button>
    </>
  );
}

export default SubscriptionButton;
