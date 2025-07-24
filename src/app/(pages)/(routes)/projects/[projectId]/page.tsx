import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable';
import { Sidebar } from '../_components/sidebar'
import React from 'react'
import { ChatWindow } from '../_components/chat-window';

interface Props {
    params: Promise<{
        projectId: string
    }>
};

const ProjectPage = async ({ params }: Props) => {
    const { projectId } = await params;

    return (
        <div className='h-screen'>
            <ResizablePanelGroup direction='horizontal'>
                <ResizablePanel defaultSize={22.5} minSize={15} className='flex flex-col min-h-0'>
                    <Sidebar projectId={projectId} />
                </ResizablePanel>
                <ResizableHandle />
                <ResizablePanel defaultSize={70} minSize={50} className='flex flex-col min-h-0'>
                    <ChatWindow projectId={projectId} />
                </ResizablePanel>
            </ResizablePanelGroup>
        </div>
    )
}

export default ProjectPage