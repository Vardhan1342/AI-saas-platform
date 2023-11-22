import { NextResponse } from "next/server";
import OpenAI from "openai";
import { auth } from "@clerk/nextjs";
import { IncreaseApiLimit, checkApiLimit } from "@/lib/api-limit";
import { checkSubscription } from "@/lib/subscription";


const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});




  
  export async function POST(req:Request) {
    try{
      const { userId } = auth();
      const body = await req.json();
      const { prompt,amount=1,resolution="512x512"  } = body;
       console.log("fetching started");
       
         if (!userId) {
           return new NextResponse("Unauthorized", { status: 401 });
         }
     
         if (!openai.apiKey) {
          return new NextResponse("OpenAI API Key not configured.", { status: 500 });
        }
     
         if (!prompt) {
          
           return new NextResponse("Messages are required", { status: 400 });
         }
         const freetrail=await checkApiLimit();
         const isSubscribed=await checkSubscription();
         if(!freetrail && !isSubscribed){
          return new NextResponse("Free trail expired,",{status:403})
         }
        console.log("before response");
        
         const response = await openai.images.generate({
          prompt,
          size:resolution,
          n:parseInt(amount,10)

        });
        console.log(response);
        if(!isSubscribed)
        {        
          await IncreaseApiLimit();
        }
        return NextResponse.json(response.data);
    }
    catch(error){
      console.log('[IMAGE GENERATION ERROR]', error);
      return new NextResponse("Internal Error", { status: 500 });
    }
  }

  