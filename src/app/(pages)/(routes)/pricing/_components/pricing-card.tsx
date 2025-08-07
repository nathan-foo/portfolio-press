import React from 'react'

interface Props {
    title: string;
    body: string;
}

export const PricingCard = ({ title, body }: Props) => {
  return (
    <div className='w-full h-full bg-muted shadow-md flex flex-col gap-4 text-center py-8 px-4 items-center justify-center rounded-md'>
        <h1 className='text-2xl font-bold'>
            {title}
        </h1>
        <p className='text-muted-foreground'>
            {body}
        </p>
    </div>
  )
}
