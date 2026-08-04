'use client';

import React, { useState, useRef, ChangeEvent } from 'react';
import { Image as ImageIcon, X, GripVertical } from 'lucide-react';

interface GalleryUploaderProps {
  label: string;
  items: string[];
  onChange: (urls: string[]) => void;
  maxFiles?: number;
}

export function GalleryUploader({ label, items, onChange, maxFiles = 20 }: GalleryUploaderProps) {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState('');
  const [dragActive, setDragActive] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleUpload = async (files: FileList) => {
    if (items.length + files.length > maxFiles) {
      setError(`Maximum ${maxFiles} images allowed`);
      return;
    }
    setError('');
    setUploading(true);
    setProgress(0);

    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      if (files[i].size > 50 * 1024 * 1024) {
        setError('One or more files exceed 50MB');
        setUploading(false);
        return;
      }
      formData.append('files', files[i]);
    }

    try {
      const xhr = new XMLHttpRequest();
      xhr.open('POST', `${process.env.NEXT_PUBLIC_API_URL}/upload/multiple`, true);
      
      xhr.upload.onprogress = (e) => {
        if (e.lengthComputable) {
          setProgress(Math.round((e.loaded / e.total) * 100));
        }
      };

      xhr.onload = () => {
        if (xhr.status === 200) {
          const res = JSON.parse(xhr.responseText);
          onChange([...items, ...res.urls]);
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
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleUpload(e.dataTransfer.files);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files.length > 0) {
      handleUpload(e.target.files);
    }
  };

  const removeFile = (index: number) => {
    const next = [...items];
    next.splice(index, 1);
    onChange(next);
  };

  // Basic drag and drop reordering inside the gallery
  const [draggedIdx, setDraggedIdx] = useState<number | null>(null);

  const onDragStartItem = (e: React.DragEvent, index: number) => {
    setDraggedIdx(index);
    e.dataTransfer.effectAllowed = 'move';
    // Small timeout for visual dragging effect
    setTimeout(() => {
      const target = e.target as HTMLElement;
      target.style.opacity = '0.5';
    }, 0);
  };

  const onDragEnterItem = (index: number) => {
    if (draggedIdx === null || draggedIdx === index) return;
    
    const next = [...items];
    const draggedItem = next[draggedIdx];
    
    // Remove dragged item
    next.splice(draggedIdx, 1);
    // Insert at new position
    next.splice(index, 0, draggedItem);
    
    setDraggedIdx(index);
    onChange(next);
  };

  const onDragEndItem = (e: React.DragEvent) => {
    setDraggedIdx(null);
    const target = e.target as HTMLElement;
    target.style.opacity = '1';
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <label className="text-[10px] tracking-widest uppercase text-white/60">
          {label} ({items.length}/{maxFiles})
        </label>
      </div>

      {items.length > 0 && (
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4">
          {items.map((url, i) => (
            <div
              key={`${url}-${i}`}
              draggable
              onDragStart={(e) => onDragStartItem(e, i)}
              onDragEnter={() => onDragEnterItem(i)}
              onDragEnd={onDragEndItem}
              onDragOver={(e) => e.preventDefault()}
              className="relative aspect-square rounded overflow-hidden border border-white/10 group cursor-move bg-black/50 hover:border-white/30 transition-colors"
            >
              <img src={url} alt="Gallery item" className="w-full h-full object-cover pointer-events-none" />
              
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <GripVertical className="text-white/60" size={24} />
              </div>
              
              <button
                type="button"
                onClick={() => removeFile(i)}
                className="absolute top-1 right-1 bg-black/60 hover:bg-red-500/80 p-1 rounded-full text-white backdrop-blur transition-colors opacity-0 group-hover:opacity-100"
                title="Remove image"
              >
                <X size={14} />
              </button>
            </div>
          ))}
        </div>
      )}

      {items.length < maxFiles && (
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
            accept=".jpg,.jpeg,.png,.webp"
            multiple
            onChange={handleChange}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
          <div className="flex flex-col items-center pointer-events-none space-y-3">
            <ImageIcon className="text-white/40" size={28} />
            
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
                <p className="text-sm text-white/80 font-medium">Add gallery images</p>
                <p className="text-[10px] text-white/40 tracking-wider uppercase mt-1">
                  Drag & Drop or Click (Max {maxFiles})
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
