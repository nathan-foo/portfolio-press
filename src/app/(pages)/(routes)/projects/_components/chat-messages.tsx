"use client"

import React, { useEffect, useRef } from 'react'
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
    const bottomRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, []);

    return (
        <div className="flex-1 overflow-y-auto px-8 py-6 mb-32">
            {messages.map((msg, index) => (
                <div key={index}>
                    <UserMessage projectId={projectId} input={msg} />
                    <AgentMessage projectId={projectId} input={msg} />
                </div>
            ))}
            <div ref={bottomRef} />
        </div>
    );
};