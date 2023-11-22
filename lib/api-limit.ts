import { auth } from "@clerk/nextjs";
import prismadb from "./prismadb";
import { use } from "react";
import { MAX_FREE_COUNTS } from "@/constants";

export const IncreaseApiLimit=async()=>{
    const { userId } = auth();

    if (!userId) {
      return;
    }
  
    const userApiLimit = await prismadb.userApiLimit.findUnique({
      where: { userId: userId },
    });
    
    if (userApiLimit) {
      await prismadb.userApiLimit.update({
        where: { userId: userId },
        data: { count:  userApiLimit.count + 1 },
      });
    } else {
      await prismadb.userApiLimit.create({
        data: { userId: userId, count: 1 },
      });
    }
}

export const checkApiLimit=async()=>{
    const {userId}=auth();
    if(!userId){
        return false;
    }
    const userApiLimit=await prismadb.userApiLimit.findUnique({
        where: { userId: userId },
      });
      if(!userApiLimit || userApiLimit.count < MAX_FREE_COUNTS){
        return true;
      }
      else{
        return false;
      }
}

export const getApiLimitCOunt=async()=>{
  const {userId}=auth();
  if(!userId){
    return 0;
  }
  const userApiLimit=await prismadb.userApiLimit.findUnique({
    where: { userId: userId },
  });
  if(!userApiLimit){
    return 0;
  }
  return userApiLimit.count;
}