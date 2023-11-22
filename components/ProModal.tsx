"use client"

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useProModal } from "@/hooks/use-pro-modal";
import { Badge } from "./ui/badge";
import { Card } from "./ui/card";
import { tools } from "@/Works";
import { Check, Zap } from "lucide-react";
import { Button } from "./ui/button";
import axios from "axios";

const ProModal = () => {
  const proModal = useProModal();
  const [loading,setLoading]=useState(false)
  
  const onSubscribe=async()=>{
  try {
    setLoading(true);
    const response = axios.get("/api/stripe");
    window.location.href = (await response).data.url

  } catch (error) {
    console.log(error,'stripe client error');
    
  }
  finally{
    setLoading(false) 
  }
}


  return (
    <Dialog open={proModal.isOpen} onOpenChange={proModal.onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex justify-center items-center flex-col gap-y-4 pb-2">
            <div className="text-sm uppercase flex items-center justify-center gap-x-4 ">
                Upgrade to Premium
                <Badge>
                    PRO
                </Badge>
            </div>
          </DialogTitle>
          <DialogDescription>
            {tools.map(tool=>(
            <Card 
            key={tool.label}
            className="flex justify-between items-center space-y-4 border-black/5 p-3"

            >
             <div className="flex items-center justify-center gap-x-4 ">
                 <div className={`${tool.bgColor} p-2 rounded-md w-fit`}>
                   <tool.icon className={`w-6 h-6 ${tool.color}`} />
                 </div>

                 <div className="text-sm font-semibold">
                    {tool.label}
                 </div>
             </div>
             <Check className="text-primary w-5 h-5"/>
            </Card> 
            ))}
         
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
            <Button variant="premium" className="w-full text-sm text-white gap-x-2" onClick={onSubscribe}>
                Upgrade
                <Zap />
            </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ProModal;
