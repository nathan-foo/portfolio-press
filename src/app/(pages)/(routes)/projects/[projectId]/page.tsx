import React from 'react'

interface Props {
    params: Promise<{
        projectId: string
    }>
};

const ProjectPage = async ({ params }: Props) => {
    const { projectId } = await params;

    return (
        <div>
            Project {projectId}
        </div>
    )
}

export default ProjectPage