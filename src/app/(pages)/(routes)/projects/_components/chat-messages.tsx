"use client"

import React, { useEffect, useRef } from 'react'
import { UserMessage } from './user-message';
import { AgentMessage } from './agent-message';
import { useTRPC } from '@/trpc/client';
import {useSuspenseQuery } from '@tanstack/react-query';
import { LoadingMessage } from './loading-message';

interface Props {
    projectId: string;
}

export const ChatMessages = ({ projectId }: Props) => {
    const trpc = useTRPC();
    const bottomRef = useRef<HTMLDivElement>(null);
    const lastAgentMessageIdRef = useRef<string | null>(null);

    const { data: messages } = useSuspenseQuery(trpc.messages.getMany.queryOptions({
        projectId: projectId,
    }, {
        refetchInterval: 2000,
    }));

    useEffect(() => {
        const lastAgentMessage = messages.findLast((message) => message.role === "AGENT");

        if (lastAgentMessage?.sandbox && lastAgentMessage.id !== lastAgentMessageIdRef.current) {
            console.log('new sandbox')
        }
    }, []);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages.length]);

    const lastMessage = messages[messages.length - 1];
    const lastMessageUser = lastMessage?.role === "USER";

    return (
        <div className="flex-1 overflow-y-auto px-8 py-6 mb-32">
            {messages.map((msg, index) => (
                <div key={index}>
                    {msg.role === "USER" && (
                        <UserMessage input={msg.content} />
                    )}
                    {msg.role === "AGENT" && (
                        <AgentMessage input={msg.content} url={msg.sandbox?.sandboxUrl} />
                    )}
                </div>
            ))}
            {lastMessageUser && <LoadingMessage />}
            <div ref={bottomRef} />
        </div>
    );
};