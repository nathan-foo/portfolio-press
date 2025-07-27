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
import { Navbar } from "../../_components/navbar";

const CreatePage = () => {
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const trpc = useTRPC();
    const queryClient = useQueryClient();

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

    return (
        <div className="flex flex-col h-screen">
            <Navbar />
            <div className="flex flex-col items-center justify-center p-8">
                <h1 className="pt-20 text-5xl font-bold">
                    Ready to boost your career?
                </h1>
                <p className="text-lg py-8 text-muted-foreground">
                    Upload your resume to get started.
                </p>
                {!isLoading && (
                    <UploadDropzone
                        endpoint="pdfUploader"
                        onClientUploadComplete={async (res) => {
                            toast("Getting ready, hang tight!");
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
            </div>
        </div>
    );
};

export default CreatePage;