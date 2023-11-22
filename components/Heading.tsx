import { LucideIcon } from 'lucide-react';
import React from 'react';
interface HeadingProps{
    title:string,
    description:string,
    Icon:LucideIcon,
    iconColor:string,
    bgColor:string
}
const Heading = ({title,description,Icon,iconColor,bgColor}:HeadingProps) => {
  return (
    <div className='flex items-center px-2 lg:px-8 gap-x-3 mb-8'>
      <div className={`${bgColor} rounded-md w-fit p-2`}>
          <Icon className={`w-10 h-10 ${iconColor}`}/>
      </div>
      <div>
        <h1 className='text-3xl font-bold'>{title}</h1>
        <p className='text-muted-foreground text-sm'>{description}</p>
      </div>
    </div>
  );
}

export default Heading;
