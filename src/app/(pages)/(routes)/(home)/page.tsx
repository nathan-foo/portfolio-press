"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";

const Page = () => {
    return (
        <div className="w-full">
            <div className="flex flex-col pt-[28vh] px-24">
                <h1 className="text-5xl font-semibold leading-16 max-w-lg w-full">
                    Go from resume to website, <span className="bg-gradient-to-r from-orange-400 to-orange-600 dark:from-orange-500 dark:to-orange-700 bg-clip-text text-transparent">in seconds.</span>
                </h1>
                <p className="text-lg text-muted-foreground max-w-md w-full pt-4">
                    Build your own personal brand with the help of Portfolio Press, the AI-powered career builder.
                </p>
                <Button size='lg' className="w-full max-w-40 mt-6" asChild>
                    <Link href='/create'>
                        Get started &#8599;
                    </Link>
                </Button>
            </div>
            <div className="absolute inset-0 -z-10 h-[200%] w-full bg-background dark:bg-[radial-gradient(#393e4a_1px,transparent_1px)] bg-[radial-gradient(#dadde2_1px,transparent_1px)] [background-size:16px_16px]" />
        </div>
    )
}

export default Page