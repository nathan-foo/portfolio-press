import React from 'react'

interface Props {
    projectId: string;
    input: string;
    url: string | undefined;
}

export const AgentMessage = ({ projectId, input, url }: Props) => {
    return (
        <div className='flex items-start justify-start'>
            <div className='p-4 mb-5 max-w-[65%] rounded-2xl border break-words'>
                {input}
                {url}
            </div>
        </div>
    )
}
