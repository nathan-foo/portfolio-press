"use client";

import { Button } from "@/components/ui/button";
import { Navbar } from "../../_components/navbar";
import enUS from "@/app/en_us.json";
import Link from "next/link";

const ProductPage = () => {

    return (
        <div className="flex flex-col h-full mb-16">
            <Navbar />
            <div className="flex flex-col items-center justify-center p-8">
                {/* Hero section */}
                <div className="flex flex-col items-center justify-center">
                    <div className="text-5xl font-bold pt-20">
                        {enUS.product.header}
                    </div>
                    <p className="text-lg pt-8 text-muted-foreground">
                        {enUS.product.subheader}
                    </p>
                </div>
                {/* Body 1 */}
                <div className="px-24 flex flex-col items-center justify-center text-center w-full pt-20">
                    <div className="text-4xl font-semibold max-w-3xl pt-4">
                        {enUS.product.body.title}
                    </div>
                    <div className="text-muted-foreground text-lg max-w-3xl pt-12">
                        {enUS.product.body.paragraph_1}
                    </div>
                    <div className="pt-2 text-muted-foreground text-lg max-w-3xl">
                        {enUS.product.body.paragraph_2}
                    </div>
                </div>
                {/* Body 2 */}
                <div className="px-24 flex flex-col items-center justify-center text-center w-full pt-12">
                    <div className="text-4xl font-semibold max-w-3xl pt-4">
                        {enUS.product.pitch.title}
                    </div>
                    <div className="text-muted-foreground text-lg max-w-3xl pt-12">
                        {enUS.product.pitch.subtitle}
                    </div>
                    {/* List 1 */}
                    <div className="pt-12 text-lg">
                        <div className="font-semibold text-2xl max-w-3xl">
                            {enUS.product.pitch.benefits.title}
                        </div>
                        <div className="pt-8 text-muted-foreground max-w-3xl">
                            {enUS.product.pitch.benefits.point_1}
                        </div>
                        <div className="pt-2 text-muted-foreground max-w-3xl">
                            {enUS.product.pitch.benefits.point_2}
                        </div>
                        <div className="pt-2 text-muted-foreground max-w-3xl">
                            {enUS.product.pitch.benefits.point_3}
                        </div>
                        <div className="pt-2 text-muted-foreground max-w-3xl">
                            {enUS.product.pitch.benefits.point_4}
                        </div>
                    </div>
                    {/* List 2 */}
                    <div className="pt-12 text-lg">
                        <div className="font-semibold text-2xl max-w-3xl">
                            {enUS.product.pitch.applications.title}
                        </div>
                        <div className="pt-8 text-muted-foreground max-w-3xl">
                            {enUS.product.pitch.applications.point_1}
                        </div>
                        <div className="pt-2 text-muted-foreground max-w-3xl">
                            {enUS.product.pitch.applications.point_2}
                        </div>
                        <div className="pt-2 text-muted-foreground max-w-3xl">
                            {enUS.product.pitch.applications.point_3}
                        </div>
                        <div className="pt-4 text-muted-foreground max-w-3xl">
                            <i>
                                {enUS.product.pitch.applications.summary}
                            </i>
                        </div>
                    </div>
                    {/* Closing */}
                    <div className="pt-16">
                        <div className="font-semibold text-4xl max-w-3xl">
                            {enUS.product.footer.title}
                        </div>
                        <div className="text-xl text-muted-foreground pt-8 max-w-4xl">
                            {enUS.product.footer.subtitle}
                        </div>
                        <div className="text-xl text-muted-foreground pt-2 max-w-4xl">
                            {enUS.product.footer.closing}
                        </div>
                        <Button size='lg' className="m-8 px-8 py-6" asChild>
                            <Link href='/create'>
                                {enUS.button.get_started}
                            </Link>
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductPage