"use client";

import { useTRPC } from "@/trpc/client";
import { UploadDropzone } from "@/utils/uploadthing";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { transcribePdf } from "@/models/transcribe-pdf";
import { useState } from "react";
import { LoaderIcon } from "lucide-react";

const CreatePage = () => {
    const [isLoading, setIsLoading] = useState(false);
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
            setIsLoading(false);

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
            {!isLoading && (
                <UploadDropzone
                    endpoint="pdfUploader"
                    onClientUploadComplete={async (res) => {
                        // Do something with the response
                        toast("Analyzing your resume, hang tight!");
                        setIsLoading(true);
                        const result = await transcribePdf(res[0].ufsUrl);
                        const text = result.response.text();
                        await createProject.mutateAsync({ value: text });
                    }}
                    onUploadError={(error: Error) => {
                        toast("Sorry, something went wrong.");
                        setIsLoading(false);
                    }}
                />
            )}
            {isLoading && (
                <div>
                    <LoaderIcon className="animate-spin" />
                </div>
            )}

            {/* <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 w-full max-w-md">
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
            </form> */}
        </div>
    );
};

export default CreatePage;