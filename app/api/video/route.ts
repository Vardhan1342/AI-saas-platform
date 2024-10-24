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
         const input={
          prompt :prompt,
          seed: 255224557,
          n_prompt: "badhandv4, easynegative, ng_deepnegative_v1_75t, verybadimagenegative_v1.3, bad-artist, bad_prompt_version2-neg, teeth"
      
         }
         const response =  await replicate.run("lucataco/animate-diff:beecf59c4aee8d81bf04f0381033dfa10dc16e845b4ae00d281e2fa377e48a9f", { input });

        console.log("after response and responesis");
       if(!isSubscribed){
        await IncreaseApiLimit();
       } 
        return NextResponse.json(response);
    }
    catch(error){
      console.log('[VIDEO _ ERROR]', error);
      return new NextResponse("Internal Error", { status: 500 });
    }
  }

  