"use client";

import { UploadDropzone } from "@/utils/uploadthing";
import Navbar from "../../_components/navbar";
import { toast } from "sonner";

const Page = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <Navbar />
            Home
            <UploadDropzone
                endpoint="pdfUploader"
                onClientUploadComplete={(res) => {
                    // Do something with the response
                    console.log("Files: ", res);
                    toast("Upload complete!");
                }}
                onUploadError={(error: Error) => {
                    // Do something with the error.
                    toast("Upload error.");
                }}
            />
        </div>
    )
}

export default Page