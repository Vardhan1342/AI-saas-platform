import { NextResponse } from "next/server";
import Replicate from "replicate"
import { auth } from "@clerk/nextjs";
import { IncreaseApiLimit, checkApiLimit } from "@/lib/api-limit";
import { checkSubscription } from "@/lib/subscription";

const replicate = new Replicate({
    auth: process.env.REPLICATE_API_TOKEN,
  });
  
  export async function POST(req:Request) {
    try{
      const { userId } = auth();
      const body = await req.json();
      const { prompt  } = body;
       console.log("fetching started");
       
         if (!userId) {
           return new NextResponse("Unauthorized", { status: 401 });
         }
     
         if (!prompt) {
          return new NextResponse("OpenAI API Key not configured.", { status: 400 });
        }
        const freetrail=await checkApiLimit();
        const isSubscribed=await checkSubscription();
        if(!freetrail && !isSubscribed){
         return new NextResponse("Free trail expired,",{status:403})
        }
       
       
        console.log("before response");
        
         const response = await replicate.run(
          "anotherjesse/zeroscope-v2-xl:9f747673945c62801b13b84701c783929c0ee784e4748ec062204894dda1a351",
          {
            input: {
              prompt: prompt
            }
          }
        );
        console.log("after response and responesis");
       if(!isSubscribed){
        await IncreaseApiLimit();
       } 
        return NextResponse.json(response);
    }
    catch(error){
      console.log('[CONVERSATION_ERROR]', error);
      return new NextResponse("Internal Error", { status: 500 });
    }
  }

  