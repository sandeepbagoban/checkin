"use client";

import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { FiUpload, FiX, FiImage } from 'react-icons/fi';

interface ImageUploadProps {
  label: string;
  multiple?: boolean;
  onChange: (files: File[]) => void;
  value?: File[];
}

const ImageUpload: React.FC<ImageUploadProps> = ({ 
  label, 
  multiple = false, 
  onChange,
  value = []
}) => {
  const [files, setFiles] = useState<File[]>(value);
  const [previews, setPreviews] = useState<string[]>([]);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const newFiles = multiple ? [...files, ...acceptedFiles] : acceptedFiles;
    setFiles(newFiles);
    onChange(newFiles);
    
    // Create previews
    const newPreviews = acceptedFiles.map(file => URL.createObjectURL(file));
    setPreviews(prev => multiple ? [...prev, ...newPreviews] : newPreviews);
  }, [files, multiple, onChange]);

  const removeFile = (index: number) => {
    const newFiles = [...files];
    newFiles.splice(index, 1);
    setFiles(newFiles);
    onChange(newFiles);
    
    const newPreviews = [...previews];
    URL.revokeObjectURL(newPreviews[index]);
    newPreviews.splice(index, 1);
    setPreviews(newPreviews);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.webp'],
      'video/*': ['.mp4', '.mov']
    },
    multiple
  });

  return (
    <div className="space-y-4">
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      
      <div 
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${
          isDragActive ? 'border-pink-500 bg-pink-50' : 'border-gray-300 hover:border-pink-400'
        }`}
      >
        <input {...getInputProps()} />
        <div className="flex flex-col items-center justify-center space-y-2">
          <FiUpload className="h-8 w-8 text-gray-400" />
          {isDragActive ? (
            <p className="text-pink-500">Drop the files here...</p>
          ) : (
            <>
              <p className="text-sm text-gray-600">
                Drag & drop {multiple ? 'photos/videos' : 'a photo'} here, or click to select
              </p>
              <p className="text-xs text-gray-500">
                {multiple ? 'Multiple files allowed' : 'Only one file allowed'}
              </p>
            </>
          )}
        </div>
      </div>

      {previews.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-4">
          {previews.map((preview, index) => (
            <div key={index} className="relative group">
              {preview.includes('blob:') ? (
                preview.startsWith('blob:video') ? (
                  <video 
                    src={preview} 
                    className="w-full h-32 object-cover rounded-lg"
                    controls
                  />
                ) : (
                  <img 
                    src={preview} 
                    alt={`Preview ${index}`}
                    className="w-full h-32 object-cover rounded-lg"
                  />
                )
              ) : (
                <div className="w-full h-32 bg-gray-100 rounded-lg flex items-center justify-center">
                  <FiImage className="h-8 w-8 text-gray-400" />
                </div>
              )}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  removeFile(index);
                }}
                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <FiX className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageUpload;