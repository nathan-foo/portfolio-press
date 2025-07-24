import React from 'react'

interface Props {
    projectId: string;
    input: string;
}

export const AgentMessage = ({ projectId, input }: Props) => {
    return (
        <div className='flex items-start justify-start'>
            <div className='p-4 mb-5 max-w-[65%] rounded-2xl border break-words'>
                {input}
            </div>
        </div>
    )
}
