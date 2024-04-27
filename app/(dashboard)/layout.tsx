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
        <div className='w-full bg-slate-300/10 '>
        <h1 className='underline  p-2 text-sm'>
          <span className='text-red-900 text-lg'>Note</span>

       : If my Genius AI fails to respond to your prompts, it is likely that I have surpassed my allotted usage quota. In such cases, kindly notify me through   
       <span className='text-lg'>{ " "}Clerk {" "}</span>
        for further assistance. 
        </h1>
      </div>
      {children}
      </main>
     
    </div>
  );
}

export default Dashboardlayout;
