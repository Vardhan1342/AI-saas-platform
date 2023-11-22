
import React from 'react';
import { UserButton } from '@clerk/nextjs';
import MobileSidebar from './MobileSidebar';
import { getApiLimitCOunt } from '@/lib/api-limit';
import { checkSubscription } from '@/lib/subscription';

const Navabar = async() => {
const apiLimitCount=await getApiLimitCOunt();
const isSubscribed=await checkSubscription()

  return (
    <div className='flex items-center p-4'>
      <MobileSidebar apiLimitCount={apiLimitCount} isSubscribed={isSubscribed}/>
      <div className='flex justify-end items-center w-full'>
        <UserButton afterSignOutUrl='/' />
      </div>

    </div>
  );
}

export default Navabar;
