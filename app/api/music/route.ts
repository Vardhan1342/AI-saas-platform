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
       console.log(prompt,"This iss ssss")
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
          const input = {
            prompt_a:prompt,
           
        };
        console.log(prompt)
         const response =  await replicate.run("riffusion/riffusion:8cf61ea6c56afd61d8f5b9ffd14d7c216c0a93844ce2d82ac1c9ecc9c7f24e05", { input });

        console.log("after response and responesis");
        console.log(response)
        // if(!isSubscribed)
        // {
        //   await IncreaseApiLimit();
        // }
        return NextResponse.json(response);
    }
    catch(error)
    {
      console.log('[CONVERSATION_ERROR]', error);
      return new NextResponse("Internal Error", { status: 500 });
    }
  }

  