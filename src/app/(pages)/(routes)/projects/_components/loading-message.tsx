import React from 'react'
import enUS from "@/app/en_us.json";

export const LoadingMessage = () => {
    return (
        <div className='flex items-start justify-start'>
            <div className='p-4 mb-5 max-w-[65%] rounded-2xl border break-words'>
                {enUS.toast.loading}
            </div>
        </div>
    )
}
