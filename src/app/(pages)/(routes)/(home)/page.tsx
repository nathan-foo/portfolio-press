"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import enUS from "@/app/en_us.json";

const Page = () => {
    return (
        <div className="w-full">
            <div className="flex flex-col pt-[28vh] px-24">
                <h1 className="text-[3.4rem] font-semibold leading-15 max-w-xl w-full">
                    {enUS.home.hero_header}<span className="bg-gradient-to-r from-orange-400 to-orange-600 dark:from-orange-500 dark:to-orange-700 bg-clip-text text-transparent">{enUS.home.hero_header_color}</span>
                </h1>
                <p className="text-lg text-muted-foreground max-w-lg w-full pt-4">
                    {enUS.home.hero_subheader}
                </p>
                <Button size='lg' className="w-full max-w-40 mt-6" asChild>
                    <Link href='/create'>
                        {enUS.home.hero_button}
                    </Link>
                </Button>
            </div>
            <div className="absolute inset-0 -z-10 h-full w-full bg-background dark:bg-[radial-gradient(#393e4a_1px,transparent_1px)] bg-[radial-gradient(#dadde2_1px,transparent_1px)] [background-size:16px_16px]" />
        </div>
    )
}

export default Page