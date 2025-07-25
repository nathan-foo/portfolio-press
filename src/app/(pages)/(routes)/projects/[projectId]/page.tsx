import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable';
import { Sidebar } from '../_components/sidebar'
import React from 'react'
import { ChatWindow } from '../_components/chat-window';
import { Navbar } from '../../../_components/navbar';

interface Props {
    params: Promise<{
        projectId: string
    }>
};

const ProjectPage = async ({ params }: Props) => {
    const { projectId } = await params;

    return (
        <div className='flex flex-col h-screen'>
            <Navbar />
            <ResizablePanelGroup direction='horizontal'>
                <ResizablePanel defaultSize={22.5} minSize={15} className='flex flex-col min-h-0'>
                    <Sidebar projectId={projectId} />
                </ResizablePanel>
                <ResizableHandle />
                <ResizablePanel defaultSize={77.5} minSize={65} className='flex flex-col min-h-0'>
                    <ChatWindow projectId={projectId} />
                </ResizablePanel>
            </ResizablePanelGroup>
        </div>
    )
}

export default ProjectPage