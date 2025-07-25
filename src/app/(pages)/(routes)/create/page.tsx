"use client";

import { useTRPC } from "@/trpc/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const CreatePage = () => {
    const router = useRouter();
    const trpc = useTRPC();
    const queryClient = useQueryClient();

    const { register, handleSubmit, reset } = useForm<{ value: string }>({
        defaultValues: { value: "" },
    });

    const createProject = useMutation(trpc.projects.create.mutationOptions({
        onSuccess: (data) => {
            queryClient.invalidateQueries(
                trpc.projects.getMany.queryOptions(),
            );
            router.push(`/projects/${data.id}`);
        },
        onError: (error) => {
            toast.error(error.message);

            if (error.data?.code === "UNAUTHORIZED") {
                router.push('/sign-in');
            }
        }
    }));

    const onSubmit = async ({ value }: { value: string }) => {
        if (!value.trim()) return;
        await createProject.mutateAsync({ value });
        reset();
    };

    return (
        <div className="flex flex-col items-center justify-center p-8">
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 w-full max-w-md">
                <label htmlFor="value" className="text-lg font-medium">Message</label>
                <input
                    id="value"
                    {...register("value")}
                    className="p-2 border rounded-md"
                    placeholder="Enter project idea"
                />
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md">
                    Create Project
                </button>
            </form>
        </div>
    );
};

export default CreatePage;