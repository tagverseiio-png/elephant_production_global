'use client';

import React, { useState, useRef, ChangeEvent } from 'react';
import { UploadCloud, X, Film, Image as ImageIcon } from 'lucide-react';

interface UploaderProps {
  label: string;
  value: string;
  onChange: (url: string) => void;
  accept: string;
  type: 'image' | 'video';
  required?: boolean;
}

export function Uploader({ label, value, onChange, accept, type, required }: UploaderProps) {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState('');
  const [dragActive, setDragActive] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleUpload = async (file: File) => {
    // Basic validation
    if (file.size > 100 * 1024 * 1024) {
      setError('File exceeds maximum size of 100MB');
      return;
    }
    setError('');
    setUploading(true);
    setProgress(0);

    const formData = new FormData();
    formData.append('file', file);

    const uploadBase = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api';

    try {
      const xhr = new XMLHttpRequest();
      xhr.open('POST', `${uploadBase}/upload`, true);
      
      xhr.upload.onprogress = (e) => {
        if (e.lengthComputable) {
          const percentComplete = Math.round((e.loaded / e.total) * 100);
          setProgress(percentComplete);
        }
      };

      xhr.onload = () => {
        if (xhr.status === 200) {
          const res = JSON.parse(xhr.responseText);
          onChange(res.url); // The backend returns { url: '/api/media/filename.ext' }
        } else {
          try {
            const res = JSON.parse(xhr.responseText);
            setError(res.error || 'Upload failed');
          } catch {
            setError('Upload failed');
          }
        }
        setUploading(false);
      };

      xhr.onerror = () => {
        setError('Upload failed');
        setUploading(false);
      };

      xhr.send(formData);
    } catch (err) {
      console.error(err);
      setError('Upload failed');
      setUploading(false);
    }
  };

  const onDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleUpload(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleUpload(e.target.files[0]);
    }
  };

  const removeFile = () => {
    onChange('');
    if (inputRef.current) inputRef.current.value = '';
  };

  return (
    <div className="space-y-2">
      <label className="block text-[10px] tracking-widest uppercase text-white/60 mb-1">
        {label}{required && '*'}
      </label>

      {value ? (
        <div className="relative rounded-lg overflow-hidden border border-white/10 bg-black/30 group">
          {type === 'image' ? (
            <img src={value} alt={label} className="w-full h-auto max-h-48 object-contain bg-black/50" />
          ) : (
            <video src={value} controls className="w-full h-auto max-h-48 bg-black/50" />
          )}
          <button
            type="button"
            onClick={removeFile}
            className="absolute top-2 right-2 bg-black/60 hover:bg-red-500/80 p-1.5 rounded-full text-white backdrop-blur transition-colors opacity-0 group-hover:opacity-100"
            title="Remove file"
          >
            <X size={16} />
          </button>
        </div>
      ) : (
        <div
          className={`relative border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center transition-colors ${
            dragActive ? 'border-elephant-ivory bg-white/5' : 'border-white/10 hover:border-white/20 bg-black/20 hover:bg-black/40'
          }`}
          onDragEnter={onDrag}
          onDragLeave={onDrag}
          onDragOver={onDrag}
          onDrop={onDrop}
        >
          <input
            ref={inputRef}
            type="file"
            accept={accept}
            onChange={handleChange}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
          <div className="flex flex-col items-center pointer-events-none space-y-3">
            {type === 'image' ? (
              <ImageIcon className="text-white/40" size={32} />
            ) : (
              <Film className="text-white/40" size={32} />
            )}
            
            {uploading ? (
              <div className="text-center w-full">
                <div className="text-sm font-semibold tracking-wide text-elephant-ivory mb-2">
                  Uploading... {progress}%
                </div>
                <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden max-w-xs mx-auto">
                  <div
                    className="bg-elephant-ivory h-full transition-all duration-300"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
            ) : (
              <div className="text-center">
                <p className="text-sm text-white/80 font-medium">Click to upload or drag and drop</p>
                <p className="text-[10px] text-white/40 tracking-wider uppercase mt-1">
                  Supported: {accept}
                </p>
              </div>
            )}
          </div>
        </div>
      )}
      
      {error && <p className="text-red-400 text-xs tracking-wider uppercase">{error}</p>}
    </div>
  );
}
