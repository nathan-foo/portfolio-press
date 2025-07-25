"use client";

import { Navbar } from "../../_components/navbar";

const ProductPage = () => {

    return (
        <div className="flex flex-col h-screen">
            <Navbar />
            <div className="flex flex-col w-full p-8">
                <div className="flex flex-col items-center justify-center">
                    <div className="text-5xl font-bold pt-20">
                        What is Portfolio Press?
                    </div>
                    <p className="text-lg pt-8 pb-20 text-muted-foreground">
                        Learn how our product can kickstart your career.
                    </p>
                    
                </div>
            </div>
        </div>
    )
}

export default ProductPage