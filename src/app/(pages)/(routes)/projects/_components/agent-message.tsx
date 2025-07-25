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
                <div className='flex flex-col'>
                    {input}
                    <div className='p-2 my-2 bg-muted border rounded-lg text-sm'>
                        <a href={url} target='_blank'>
                            {url} &#8599;
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )
}
