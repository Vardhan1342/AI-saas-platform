import React from 'react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { AvatarImage } from '@radix-ui/react-avatar';
import { useUser } from '@clerk/nextjs';

const UserAvatar = () => {
    const {user}=useUser()
  return (
    <Avatar className='w-8 h-8'>
      <AvatarImage src={user?.imageUrl} />
      <AvatarFallback>
        {user?.firstName?.charAt(0)}
        {user?.lastName?.charAt(0)}
      </AvatarFallback>
    </Avatar>
  );
}

export default UserAvatar;
