'use client';

import { X } from 'lucide-react';
import Image from 'next/image';

import { UploadDropzone } from '@/lib/uploadthing';

import '@uploadthing/react/styles.css';

interface FileUploadProps {
    // eslint-disable-next-line no-unused-vars
    readonly onChange: (url?: string) => void;
    readonly value: string;
    readonly endpoint: 'messageFile' | 'serverImage';
}

function FileUpload({ onChange, value, endpoint }: FileUploadProps) {
    const fileType = value?.split('.').pop();

    if (value && fileType !== 'pdf') {
        return (
            <div className="relative h-20 w-20">
                <Image fill src={value} alt="Upload" className="rounded-full" />
                {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
                <button
                    onClick={() => onChange('')}
                    className="bg-rose-500 text-white p-1 rounded-full absolute top-0 right-0 shadow-sm"
                    type="button"
                >
                    <X className="h-4 w-4" />
                </button>
            </div>
        );
    }
    return (
        <UploadDropzone
            endpoint={endpoint}
            onClientUploadComplete={(res) => {
                onChange(res?.[0].url);
            }}
            onUploadError={(error: Error) => {
                console.log(error);
            }}
        />
    );
}

export default FileUpload;
