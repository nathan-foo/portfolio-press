import React from 'react'
import { UserMessage } from './user-message';
import { AgentMessage } from './agent-message';

interface Props {
    projectId: string;
}

const messages = [
    "hello",
    "goodbye",
    "test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test",
    "test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test"
]

export const ChatMessages = ({ projectId }: Props) => {
    return (
        <div className="flex-1 overflow-y-auto p-4">
            {messages.map((msg, index) => (
                <div key={index}>
                    <UserMessage projectId={projectId} input={msg} />
                    <AgentMessage projectId={projectId} input={msg} />
                </div>
            ))}
        </div>
    );
};