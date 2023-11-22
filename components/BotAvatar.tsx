import { Avatar, AvatarImage } from '@/components/ui/avatar';
import React from 'react';

const BotAvatar = () => {
  return (
   
      <Avatar className='h-8 w-8'>
        <AvatarImage src="./logo.png"/>
      </Avatar>
   
  );
}

export default BotAvatar;
