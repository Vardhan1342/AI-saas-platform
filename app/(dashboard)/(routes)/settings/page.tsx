import Heading from '@/components/Heading';
import SubscriptionButton from '@/components/SubscriptionButton';
import { checkSubscription } from '@/lib/subscription';
import { Settings } from 'lucide-react';
import React from 'react';

const page = async() => {
    const isSubscribed=await checkSubscription();
  return (
    <>
      <Heading 
      title='Settings'
      description='Manage account settings.'
      Icon={Settings}
      iconColor='text-gray-700'
      bgColor='text-gray-700/10'
      />
      <div className='text-muted-foreground text-sm ml-7 '>
          {isSubscribed ? "Your are using Genius Pro" :"To unlock unlimited requests Upgrade now"} 
        <div className='mt-3'>
            <SubscriptionButton 
             isSubscribed={isSubscribed}
          />
          </div>
       </div>
    </>
  );
}

export default page;
