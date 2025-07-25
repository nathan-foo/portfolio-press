"use client";

import { Navbar } from "../../_components/navbar";

const PricingPage = () => {

    return (
        <div className="flex flex-col h-screen">
            <Navbar />
            <div className="flex flex-col w-full p-8">
                <div className="flex flex-col items-center justify-center">
                    <div className="text-5xl font-bold pt-20">
                        Pricing
                    </div>
                    <p className="text-lg pt-8 pb-20 text-muted-foreground">
                        Discover the right plan for your needs.
                    </p>
                    
                </div>
            </div>
        </div>
    )
}

export default PricingPage