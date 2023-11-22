"use client";
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import {LayoutDashboard,MessageSquare,Code,Settings,ImageIcon,VideoIcon,MusicIcon} from "lucide-react"
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';
import Counter from './Counter';
const routes=[
  {
  label:"Dashboard",
  icon:LayoutDashboard,
  href:"/dashboard",
  color:"text-sky-500"
 },
 {
  label:"Conversation",
  icon:MessageSquare,
  href:"/conversation",
  color:"text-voilet-500"
 },{
  label:"Image Generation",
  icon:ImageIcon,
  href:"/image",
  color:"text-pink-700"
 },
 {
  label:"Video Generation",
  icon:VideoIcon,
  href:"/video",
  color:"text-orange-700"
 },{
  label:"Music Generation",
  icon:MusicIcon,
  href:"/music",
  color:"text-emerald-500"
 },
 {
  label:"Code Generation",
  icon:Code,
  href:"/code",
  color:"text-green-700"
 },
 {
  label:"Settings",
  icon:Settings,
  href:"/settings",
 
 }

]
interface sideBarprops{
  apiLimitCount:number,
  isSubscribed:boolean
}
const Sidebar = (
  {apiLimitCount=0, isSubscribed=false}:sideBarprops
 
) => {
   const pathname=usePathname();

  return (
    <div className='space-y-4 py-4 flex flex-col h-full bg-[#111827] text-white'>
      <div className='flex-1'>
      <Link href="/dashboard" className='flex items-center pl-3 mb-14'>
        <div className='relative w-8 h-8 mr-3 '>
          <Image 
          fill
          alt='logo'
          src="/logo.png" />
        </div>
        
        <h1 className='text-2xl font-serif text-slate-200'>Genius</h1>

      </Link>
      <div>
      {routes.map((route)=>(
        <Link 
        href={route.href}
        key={route.href}
        className=  {`text-sm group flex p-3 justify-start font-medium w-full hover:bg-white/10 hover:text-white rounded-lg transition ${pathname ===route.href ? `text-white bg-white/10`:`text-zinc-500`}`} >
        <div className='flex items-center flex-1'>
          <route.icon className={cn("h-5 w-5 mr-3",route.color)} />
           {route.label}
        </div>
        </Link>
      ))}
      </div>
      </div>
      <Counter apiLimitCount={apiLimitCount}  isSubscribed={ isSubscribed}/>
    </div>
  );
}

export default Sidebar;
