import React from 'react';
import Image from 'next/image';
const Loader = () => {
  return (
    <div className='h-full flex flex-col justify-center items-center space-y-2'>
      <div className='w-10 h-10 relative animate-spin'>
        <Image 
        alt="logo"
        fill
        src="/logo.png"
        />
      </div>
      <p className='text-muted-foreground text-sm animate-bounce'>
        Genius is thinking...
      </p>
    </div>
  );
}

export default Loader;
