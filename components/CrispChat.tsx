"use client";
import { useEffect } from "react";
import { Crisp } from "crisp-sdk-web";
const CrispChat = () => {
    useEffect(()=>{
     Crisp.configure("af20d750-30ec-4966-9fe7-45685d107b00");
    },[])
  return null;
}

export default CrispChat;
