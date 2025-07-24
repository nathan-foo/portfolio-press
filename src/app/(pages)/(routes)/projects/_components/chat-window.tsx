import React from 'react'
import { ChatBar } from './chat-bar';
import { ChatMessages } from './chat-messages';

interface Props {
    projectId: string;
}

export const ChatWindow = ({ projectId }: Props) => {
    return (
        <div className='w-full h-full flex flex-col'>
            <div className="flex-1 overflow-y-auto">
                <ChatMessages projectId={projectId} />
            </div>
            <ChatBar projectId={projectId} />
        </div>
    )
}
