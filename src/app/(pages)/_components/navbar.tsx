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

export const Navbar = () => {
    const { setTheme, theme } = useTheme();

    return (
        <div className="w-full h-16 border-b flex items-center px-4 bg-background">
            <div className="flex items-center justify-between w-full">
                <Link href='/' className="font-bold">
                    📚 Portfolio Press
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
                                    <span>Light</span>
                                </DropdownMenuRadioItem>
                                <DropdownMenuRadioItem value='dark'>
                                    <span>Dark</span>
                                </DropdownMenuRadioItem>
                                <DropdownMenuRadioItem value='system'>
                                    <span>System</span>
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
                                <Link href='/sign-in'>
                                    Sign In
                                </Link>
                            </Button>
                        </SignedOut>
                    </div>
                </div>
            </div>
        </div>
    )
}