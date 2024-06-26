import { NextResponse } from "next/server";
import OpenAI from "openai";
import { auth } from "@clerk/nextjs";
import { open } from "fs/promises";
import { IncreaseApiLimit, checkApiLimit } from "@/lib/api-limit";
import { checkSubscription } from "@/lib/subscription";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const instructions:any={
    role:"system",
    content:"Your are a code generator.You must generate code based on the user prompt"
}


  
  export async function POST(req:Request) {

    try{
      const { userId } = auth();
      const body = await req.json();
      const { messages  } = body;
       console.log("fetching started");
       
         if (!userId) {
           return new NextResponse("Unauthorized", { status: 401 });
         }
     
         if (!openai.apiKey) {
          return new NextResponse("OpenAI API Key not configured.", { status: 500 });
        }
     
         if (!messages) {
          
           return new NextResponse("Messages are required", { status: 400 });
         }
         const freetrail=await checkApiLimit();
         const isSubscribed=await checkSubscription();
         if(!freetrail && !isSubscribed){
          return new NextResponse("Free trail expired,",{status:403})
         }
        console.log("before response");
        
         const response = await openai.chat.completions.create({
          model: "gpt-3.5-turbo",
          messages:[instructions,...messages]
        });
        console.log("after response and responesis");
        if(!isSubscribed){

          await IncreaseApiLimit();
        }
       
        return NextResponse.json(response.choices[0].message);
    }
    catch(error){
      console.log('[CODE GENARATION_ERROR]', error);
      return new NextResponse("Internal Error", { status: 500 });
    }
  }

  