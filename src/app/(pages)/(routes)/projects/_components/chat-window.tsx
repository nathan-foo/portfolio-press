import React from 'react'
import { ChatBar } from './chat-bar';

interface Props {
    projectId: string;
}

export const ChatWindow = ({ projectId }: Props) => {
    return (
        <div className='relative w-full h-screen'>
            <ChatBar projectId={projectId} />
        </div>
    )
}
