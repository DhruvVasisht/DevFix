'use client';
import Image from 'next/image';
import { UploadDropzone } from '@/lib/uploadthing';
import { X } from 'lucide-react';

interface FileUploadProps {
	onChange: (url?: string) => void;
	endpoint: 'messageFile' | 'serverImage';
	value?: string;
}

const FileUpload = ({ onChange, value, endpoint }: FileUploadProps) => {
	const fileType = value?.split('.').pop();
	if (value && fileType !== 'pdf') {
		return (
			<div className="relative h-20 w-20 mx-auto">
				<Image src={value} alt="Upload" fill className="rounded-full object-cover object-center" />
				<button
					onClick={() => onChange("")}
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
				onChange(res?.[0].ufsUrl);
			}}
			onUploadError={(error: Error) => {
				console.log(error);
			}}
		/>
	);
};

export default FileUpload;