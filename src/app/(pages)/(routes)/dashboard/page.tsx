"use client";

import { useTRPC } from "@/trpc/client";
import { Navbar } from "../../_components/navbar";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { formatDistanceToNow } from "date-fns";
import Link from "next/link";
import { XIcon } from "lucide-react";
import { toast } from "sonner";

const DashboardPage = () => {
    const trpc = useTRPC();
    const { data: projects } = useQuery(trpc.projects.getMany.queryOptions());
    const queryClient = useQueryClient();

    const deleteProject = useMutation(trpc.projects.delete.mutationOptions({
        onSuccess: () => {
            toast("Portfolio deleted!");
            queryClient.invalidateQueries(trpc.projects.getMany.queryOptions());
        },
        onError: () => {
            toast("Something went wrong, please try again.");
        }
    }));

    const handleDelete = (projectId: string) => {
        deleteProject.mutate({ id: projectId });
    }

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
                                <div key={index} className="relative">
                                    <button
                                        className="absolute top-3 right-3 text-muted-foreground hover:text-red-500 dark:hover:text-red-700 transition-all duration-200"
                                        onClick={() => handleDelete(project.id)}
                                    >
                                        <XIcon size='16px' />
                                    </button>
                                    <Link
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
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DashboardPage