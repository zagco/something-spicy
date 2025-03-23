// components/ImageUpload.tsx
'use client';
import React, { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button"
import { initializeFirebaseForApi } from '@/config/firebase';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'; // Import storage functions

interface ImageUploadProps {
  onUpload: (url: string) => void;
  value?: string; // Add value prop for existing image URL
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onUpload, value }) => {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0); // Progress state
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (value) {
        setPreviewUrl(value)
    }
  },[value])
    // Function to handle file selection
  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setPreviewUrl(URL.createObjectURL(file)); // Create a temporary URL for preview
    handleUpload(file); // Call handleUpload with the selected file
  };

  const handleUpload = async (file: File) => {
    setUploading(true);
    setProgress(0);
     const { storage } = initializeFirebaseForApi(); // Initialize Firebase Storage

    if (!storage) {
        console.error("Firebase storage is not initialized");
        return;
    }

    try {
      const uniqueFileName = `${Date.now()}-${file.name}`;
      const storageRef = ref(storage, `uploads/${uniqueFileName}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on('state_changed',
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setProgress(progress);
        },
        (error) => {
          console.error("Upload failed:", error);
          setUploading(false);
          // Handle error (e.g., show an error message)
        },
        async () => {
            // Get the download URL
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            setUploading(false);
            onUpload(downloadURL); // Pass the URL to the parent component
        }
      );
    } catch (error) {
      console.error("Error initiating upload:", error);
      setUploading(false);
      // Handle error
    }
  };

  return (
    <div>
      <input
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        ref={fileInputRef}
        style={{ display: 'none' }}
      />
      <Button type="button" onClick={() => fileInputRef.current?.click()} disabled={uploading}>
        {uploading ? 'Uploading...' : 'Choose File'}
      </Button>
      {previewUrl && (
        <img src={previewUrl} alt="Preview" className="mt-2 max-w-[200px] max-h-[200px]" />
      )}
       {uploading && (
        <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
          <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${progress}%` }}></div>
        </div>
      )}
    </div>
  );
};

export default ImageUpload;