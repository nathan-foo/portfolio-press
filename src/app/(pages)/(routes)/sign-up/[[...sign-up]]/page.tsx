"use client";

import { useCurrentTheme } from "@/hooks/use-current-theme";
import { SignUp } from "@clerk/nextjs";
import { dark } from "@clerk/themes";

const Page = () => {
    const currentTheme = useCurrentTheme();

    return (
        <div className="flex items-center justify-center h-screen">
            <SignUp
                appearance={{
                    baseTheme: currentTheme === "dark" ? dark : undefined
                }}
            />
        </div>
    );
}

export default Page;