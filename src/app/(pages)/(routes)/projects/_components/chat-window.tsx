import React from 'react'

interface Props {
    projectId: string;
}

export const ChatWindow = ({ projectId }: Props) => {
    return (
        <div className='w-full'>
            chat {projectId}
        </div>
    )
}
