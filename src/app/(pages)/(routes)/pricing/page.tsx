"use client";

import { Navbar } from "../../_components/navbar";
import enUS from "@/app/en_us.json";
import { PricingCard } from "./_components/pricing-card";

const PricingPage = () => {

    return (
        <div className="flex flex-col h-full mb-16">
            <Navbar />
            <div className="flex flex-col w-full p-8">
                <div className="flex flex-col items-center justify-center">
                    <div className="text-5xl font-bold pt-20">
                        {enUS.pricing.header}
                    </div>
                    <p className="text-lg pt-8 pb-20 text-muted-foreground">
                        {enUS.pricing.subheader}
                    </p>
                </div>
                <div className="w-full flex items-center justify-center">
                    <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-12 w-[50%]">
                        <PricingCard
                            title={`${enUS.pricing.cards.free_title}`}
                            body={`${enUS.pricing.cards.free_body}`}
                        />
                        <PricingCard
                            title={`${enUS.pricing.cards.pro_title}`}
                            body={`${enUS.pricing.cards.pro_body}`}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PricingPage