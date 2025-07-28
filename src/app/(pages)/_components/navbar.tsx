"use client"

import UserControl from "@/app/(pages)/_components/user-control"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem
} from "@/components/ui/dropdown-menu"
import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs"
import { MoonStarIcon } from "lucide-react"
import { useTheme } from "next-themes"
import Link from "next/link"
import enUS from "@/app/en_us.json";

export const Navbar = () => {
    const { setTheme, theme } = useTheme();

    return (
        <div className="w-full h-16 border-b flex items-center px-4 bg-background">
            <div className="flex items-center justify-between w-full">
                <Link href='/' className="font-bold">
                    {enUS.navbar.logo_text}
                </Link>
                <div className="flex items-center justify-center gap-4">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button
                                variant='ghost'
                                className='border focus-visible:ring-0 hover:bg-muted transition-opacity'
                            >
                                <MoonStarIcon />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent side='bottom' align='end'>
                            <DropdownMenuRadioGroup value={theme} onValueChange={setTheme}>
                                <DropdownMenuRadioItem value='light'>
                                    <span>{enUS.navbar.appearance.light}</span>
                                </DropdownMenuRadioItem>
                                <DropdownMenuRadioItem value='dark'>
                                    <span>{enUS.navbar.appearance.dark}</span>
                                </DropdownMenuRadioItem>
                                <DropdownMenuRadioItem value='system'>
                                    <span>{enUS.navbar.appearance.system}</span>
                                </DropdownMenuRadioItem>
                            </DropdownMenuRadioGroup>
                        </DropdownMenuContent>
                    </DropdownMenu>
                    <div className="flex items-center justify-center">
                        <SignedIn>
                            <UserControl />
                        </SignedIn>
                        <SignedOut>
                            <Button asChild>
                                <SignInButton />
                            </Button>
                        </SignedOut>
                    </div>
                </div>
            </div>
        </div>
    )
}