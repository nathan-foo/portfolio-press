"use client"

import { Button } from '@/components/ui/button'
import { useScroll } from '@/hooks/use-scroll'
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs'
import React from 'react'

const Navbar = () => {
    return (
        <div className="lg:hidden flex items-center justify-center">
            <div className={
                `flex items-center justify-between py-5 px-6 rounded-3xl transition-all duration-500 ease-out z-50 my-4 w-4xl
                `}>
                <div className='font-bold text-lg'>
                    📚 Portfolio Press
                </div>
                <div>
                    <SignedIn>
                        <div className='flex items-center justify-center'>
                            <UserButton showName />
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