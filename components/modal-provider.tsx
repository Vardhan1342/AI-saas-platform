"use client"
import React, { useEffect, useState } from 'react';
import ProModal from './ProModal';

const ModalProvider = () => {

const [mounted,setMOunted]=useState(false);
useEffect(()=>{
    setMOunted(true);
},[])
if(!mounted){
    return null;
}
  return (
    <>
      <ProModal />
    </>
  );
}

export default ModalProvider;
