"use client";
import React, { useState } from 'react';
import * as z from "zod";
import axios from 'axios';
import Heading from '@/components/Heading';
import { MessageSquare } from 'lucide-react';
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




const ConversationPage = () => {
  const proModal=useProModal() ;

const router=useRouter();
const [messages, setMessages] = useState<any>([]);

const form = useForm<z.infer<typeof formschema>>({
    resolver:zodResolver(formschema),
 defaultValues:{
    prompt:""
 }
});


  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values:z.infer<typeof formschema>)=>{
    try {
      const userMessage: any = { role: "user", content: values.prompt };
      const newMessages = [...messages, userMessage];
      
      const response = await axios.post('/api/conversation', { messages: newMessages });
      // console.log(response)
      setMessages((current:any) => [...current, userMessage, response.data]);
      
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
     title ="Conversation"
     description="Our most advanced conversation model"
     Icon={MessageSquare}
     iconColor="text-violet-500" bgColor="bg-violet-500/10" />
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
                        placeholder="How do I calculate the radius of a circle?" 
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
          <div className="flex flex-col gap-y-4">
            {messages.map((message:any)=>(

              <div key={message.content} className='w-full flex items-start p-8 gap-x-3 bg-muted rounded-md '>
                
                   {message.role=="user" ? <UserAvatar /> : <BotAvatar />}
                   <p className='text-sm'>  {message.content}</p>
                 
              </div>
            ))}
          </div>
        </div>
     </div>
    </div>
  );
}

export default ConversationPage;
