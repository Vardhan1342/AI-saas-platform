import { auth } from "@clerk/nextjs"
import prismadb from "./prismadb";

const dayinms=86_400_000;

export const checkSubscription=async()=>{
    const {userId} =auth();
    if(!userId){
        return false;
    }

    const userSubscribed=await prismadb.userSubscription.findUnique({
        where:{
            userId
        },
        select:{
            stripeSubscriptionId: true,
            stripeCurrentPeriodEnd:true,
            stripeCustomerId:true,
            stripePriceId:true
        }
    })
    if(!userSubscribed){
        return false;
    }
    const isValid=userSubscribed.stripePriceId && userSubscribed.stripeCurrentPeriodEnd?.getTime()! + dayinms > Date.now();
    return !!isValid
}