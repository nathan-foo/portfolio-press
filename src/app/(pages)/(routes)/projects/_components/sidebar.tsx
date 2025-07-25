"use client"

import { useTRPC } from '@/trpc/client';
import { useQuery, useSuspenseQuery } from '@tanstack/react-query';
import Link from 'next/link';
import React from 'react'

interface Props {
    projectId: string;
}

export const Sidebar = ({ projectId }: Props) => {
    const trpc = useTRPC();
    const { data: projects } = useQuery(trpc.projects.getMany.queryOptions());

    return (
        <div className='w-full p-4 flex-1 overflow-auto'>
            <h1 className='text-xl font-semibold pb-4 p-2'>
                Your Projects
            </h1>
            <div className='flex flex-col gap-y-2'>
                {projects?.map((project, index) => (
                    <Link
                        key={index}
                        href={`/projects/${project.id}`}
                        className={`p-2 rounded-lg ${project.id === projectId && 'bg-muted'}`}
                    >
                        {project.name}
                    </Link>
                ))}
            </div>
        </div>
    )
}
