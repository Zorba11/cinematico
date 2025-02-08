'use client';

interface ImageUploadProps {
  onImageUpload: (file: File) => void;
}

export default function ImageUpload({ onImageUpload }: ImageUploadProps) {
  return (
    <div
      className="w-full h-48 border-2 border-dashed border-gray-400/30 rounded-xl
                 flex flex-col items-center justify-center p-4
                 bg-[rgba(0,0,0,0.2)] backdrop-blur-sm
                 transition-colors duration-300
                 hover:border-gray-400/50"
      onDragOver={(e) => {
        e.preventDefault();
        e.stopPropagation();
      }}
      onDrop={(e) => {
        e.preventDefault();
        e.stopPropagation();
        const files = Array.from(e.dataTransfer.files);
        if (files[0]) onImageUpload(files[0]);
      }}
    >
      <input
        type="file"
        accept="image/*"
        className="hidden"
        id="image-upload"
        onChange={(e) => {
          const files = Array.from(e.target.files || []);
          if (files[0]) onImageUpload(files[0]);
        }}
      />
      <label htmlFor="image-upload" className="cursor-pointer text-center">
        <div className="text-gray-400 mb-2">
          <svg
            className="w-10 h-10 mx-auto mb-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          <p className="text-sm">
            Drag and drop an image here, or click to select
          </p>
        </div>
      </label>
    </div>
  );
}
