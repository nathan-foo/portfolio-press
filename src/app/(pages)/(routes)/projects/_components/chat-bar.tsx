"use client"

import { useForm } from "react-hook-form";
import TextareaAutosize from "react-textarea-autosize";
import { useState } from "react";
import { Clipboard, SparkleIcon, UploadIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import React from 'react'
import { useTRPC } from "@/trpc/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

interface Props {
    projectId: string;
}

export const ChatBar = ({ projectId }: Props) => {
    const [isFocused, setIsFocused] = useState(false);
    
    const trpc = useTRPC();
    const queryClient = useQueryClient();

    const createMessage = useMutation(trpc.messages.create.mutationOptions({
        onSuccess: () => {
            reset();
            queryClient.invalidateQueries(
                trpc.messages.getMany.queryOptions({ projectId }),
            )
        },
        onError: (error) => {
            toast.error(error.message);
        }
    }))

    const { register, handleSubmit, reset } = useForm<{ value: string }>({
        defaultValues: { value: "" },
    });

    const onSubmit = async ({ value }: { value: string }) => {
        if (!value.trim()) return;

        await createMessage.mutateAsync({
            value: value,
            projectId
        });
    };

    const handleUpload = () => {
        console.log('upload');
    }

    const handleDummy = () => {
        console.log('dummy');
    }

    return (
        <div className="absolute bottom-4 w-full p-4 pt-1">
            <form
                onSubmit={handleSubmit(onSubmit)}
                className={`relative p-4 pt-1 rounded-2xl bg-white/30 dark:bg-sidebar/30 border transition-all backdrop-blur-sm backdrop-saturate-150 ${isFocused && "shadow-sm"}`}
            >
                <TextareaAutosize
                    {...register("value")}
                    onBlur={() => setIsFocused(false)}
                    onFocus={() => setIsFocused(true)}
                    minRows={1}
                    maxRows={4}
                    className="pt-4 w-full resize-none border-none outline-none bg-transparent"
                    placeholder="What would you like to build?"
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            e.preventDefault();
                            handleSubmit(onSubmit)();
                        }
                    }}
                />
                <div className="flex items-end justify-between gap-x-2 pt-2">
                    <div className="flex text-muted-foreground gap-0.5">
                        <button onClick={handleDummy}>
                            <div className="hover:bg-gray-200 dark:hover:bg-gray-700 hover:text-foreground transition-all duration-100 rounded p-1.5">
                                <Clipboard size='14px' />
                            </div>
                        </button>
                        <button onClick={handleUpload}>
                            <div className="hover:bg-gray-200 dark:hover:bg-gray-700 hover:text-foreground transition-all duration-100 rounded p-1.5">
                                <UploadIcon size='14px' />
                            </div>
                        </button>
                    </div>
                    <Button className="size-8 rounded-full">
                        <SparkleIcon />
                    </Button>
                </div>
            </form>
        </div>
    );
};