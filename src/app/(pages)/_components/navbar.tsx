"use client"

import { Button } from '@/components/ui/button'
import { useScroll } from '@/hooks/use-scroll'
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs'
import Link from 'next/link'
import React from 'react'

const Navbar = () => {
    const isScrolled = useScroll();

    return (
        <div className="hidden lg:inline fixed top-0 left-1/2 transform -translate-x-1/2">
            <div className='flex items-center justify-center'>
                <div className={
                    `flex items-center justify-between py-4.5 px-6 rounded-3xl transition-all duration-500 ease-out z-50 my-4
                ${isScrolled ? 'bg-gray/80 backdrop-blur-md shadow-lg w-4xl' : 'w-5xl'}
                `}>
                    <div className='font-bold text-xl'>
                        <Link href='/'>
                            📚 Portfolio Press
                        </Link>
                    </div>
                    <div className='flex items-center justify-center gap-x-8 text-muted-foreground font-medium'>
                        <Link href='/product'>Product</Link>
                        <Link href='/pricing'>Pricing</Link>
                        <Link href='/dashboard'>Dashboard</Link>
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
        </div>
    )
}

export default Navbar