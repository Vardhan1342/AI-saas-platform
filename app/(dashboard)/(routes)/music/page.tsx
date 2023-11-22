"use client";
import React, { useState } from 'react';
import * as z from "zod";
import axios from 'axios';
import Heading from '@/components/Heading';
import { MessageSquare, MusicIcon } from 'lucide-react';
import {  useForm } from 'react-hook-form';
import { formschema } from './constants';
import { zodResolver } from "@hookform/resolvers/zod"
import { Form,FormControl, FormField, FormItem } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import Loader from '@/components/Loader';
import UserAvatar from '@/components/UserAvatar';
import BotAvatar from '@/components/BotAvatar';
import { useProModal } from '@/hooks/use-pro-modal';
import toast from 'react-hot-toast';
// import { ChatCompletionRequestMessage } from "openai";




const MusicPage = () => {
  const proModal=useProModal() ;

const router=useRouter();
const [music, setMusic] = useState<string>();

const form = useForm<z.infer<typeof formschema>>({
    resolver:zodResolver(formschema),
 defaultValues:{
    prompt:""
 }
});


  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values:z.infer<typeof formschema>)=>{
    try {
      setMusic(undefined)
      
      const response = await axios.post('/api/music',values);
      // console.log(response)
      setMusic(response.data.audio);
      
      form.reset();
    } catch (error: any) {
      if(error?.response?.status=== 403){
        proModal.onOpen()
      }
      else{
        toast.error("something went wrong");
      }
      if (error.response && error.response.status === 429) {
        // Handle rate limiting, possibly retrying after a delay
        const retryAfter = error.response.headers['retry-after'];
        console.log(`Rate limited. Retry after ${retryAfter} seconds.`);
      } else {
        // Handle other types of errors
        console.error('Error:', error.message);
      }
    } finally {
      router.refresh();

    }
  }

  return (
    <div>
     <Heading 
     title ="Music Generation"
     description="Turn your prompt into music"
     Icon={MusicIcon}
     iconColor="text-emerald-500" bgColor="bg-emerald-500/10" />
     <div className='px-4 lg:px-8'>
        <div>
        <Form {...form}>
            <form 
              onSubmit={form.handleSubmit(onSubmit)} 
              className="
                rounded-lg 
                border 
                w-full 
                p-4 
                px-3 
                md:px-6 
                focus-within:shadow-sm
                grid
                grid-cols-12
                gap-2
              "
            >
              <FormField
                name="prompt"
                render={({ field }) => (
                  <FormItem className="col-span-12 lg:col-span-10">
                    <FormControl className="m-0 p-0">
                      <Input
                        className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent"
                        disabled={isLoading} 
                        placeholder="Guitar solo" 
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <Button className="col-span-12 lg:col-span-2 w-full" type="submit" disabled={isLoading} size="icon">
                Generate
              </Button>
            </form>
          </Form>
        </div>
        <div className='space-y-4 mt-4'>
          {isLoading && (
            <div className="p-8 rounded-lg w-full flex items-center justify-center bg-muted">
              <Loader />
            </div>
          )}
          {music && <audio controls className='w-full mt-8'>
            <source src={music}/></audio>}
        </div>
     </div>
    </div>
  );
}

export default MusicPage;
