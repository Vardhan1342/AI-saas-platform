import React from 'react';
import Navabar from '@/components/Navabar';
import Sidebar from '@/components/Sidebar';
import { getApiLimitCOunt } from '@/lib/api-limit';
import { checkSubscription } from '@/lib/subscription';
const Dashboardlayout = async(
    {children}:{children:React.ReactNode}
) => {

  const apiLimit= await getApiLimitCOunt();
   const isSubscribed=await checkSubscription();
  return (
    <div className='h-full relative'>
      
      <div className='hidden h-full md:flex md:flex-col md:w-72 md:fixed md:inset-y-0  bg-gray-900 text-slate-400'>
          <Sidebar apiLimitCount={apiLimit} isSubscribed={isSubscribed}/>
      </div>
      <main className='md:pl-72'>
        <Navabar />
      {children}
      </main>
    </div>
  );
}

export default Dashboardlayout;
