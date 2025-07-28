"use client"

import { Button } from '@/components/ui/button'
import { SignedIn, SignedOut, SignInButton } from '@clerk/nextjs'
import React from 'react'
import UserControl from '../../../_components/user-control'
import enUS from "@/app/en_us.json";

const Navbar = () => {
    return (
        <div className="lg:hidden flex items-center justify-center">
            <div className={
                `flex items-center justify-between py-5 px-6 rounded-3xl transition-all duration-500 ease-out z-50 my-4 w-4xl
                `}>
                <div className='font-bold text-lg'>
                    {enUS.navbar.logo_text}
                </div>
                <div>
                    <SignedIn>
                        <div className='flex items-center justify-center'>
                            <UserControl showName />
                        </div>
                    </SignedIn>
                    <SignedOut>
                        <div className='flex items-center justify-center'>
                            <Button className='rounded-lg' size='lg' asChild>
                                <SignInButton />
                            </Button>
                        </div>
                    </SignedOut>
                </div>
            </div>
        </div>
    )
}

export default Navbar