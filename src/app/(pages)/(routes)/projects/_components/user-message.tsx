import React from 'react'

interface Props {
    input: string;
}

export const UserMessage = ({ input }: Props) => {
    return (
        <div className='flex items-start justify-end'>
            <div className='p-4 mb-5 max-w-[65%] rounded-2xl bg-muted border break-words'>
                {input}
            </div>
        </div>
    )
}
