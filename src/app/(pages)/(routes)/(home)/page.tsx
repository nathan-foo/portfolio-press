"use client";

import { UploadDropzone } from "@/utils/uploadthing";
import { toast } from "sonner";

const Page = () => {
    return (
        <div className="flex flex-col items-center justify-center h-[200vh]">
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