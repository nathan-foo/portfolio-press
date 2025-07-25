"use client";

import { useTRPC } from "@/trpc/client";
import { Navbar } from "../../_components/navbar";
import { useQuery } from "@tanstack/react-query";
import { formatDistanceToNow } from "date-fns";
import Link from "next/link";

const DashboardPage = () => {
    const trpc = useTRPC();
    const { data: projects } = useQuery(trpc.projects.getMany.queryOptions());

    return (
        <div className="flex flex-col h-screen">
            <Navbar />
            <div className="flex flex-col w-full p-8">
                <div className="flex flex-col items-center justify-center">
                    <div className="text-5xl font-bold pt-20">
                        Your Portfolios
                    </div>
                    <p className="text-lg pt-8 pb-20 text-muted-foreground">
                        View and edit your generated websites here.
                    </p>
                    <div className="w-4xl">
                        <div className="grid grid-cols-3 gap-4 p-6 w-full bg-muted rounded-xl border">
                            {projects?.map((project, index) => (
                                <Link
                                    key={index}
                                    href={`/projects/${project.id}`}
                                    className="flex flex-col bg-sidebar border p-4 rounded-lg truncate"
                                >
                                    <div>
                                        {project.name}
                                    </div>
                                    <div className="text-xs text-muted-foreground">
                                        {formatDistanceToNow(project.updatedAt)}
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DashboardPage