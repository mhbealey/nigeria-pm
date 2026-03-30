"use client";

import * as React from "react";
import { Upload, X, File, Image, FileText } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

interface FileUploadProps {
  label?: string;
  accept?: string;
  multiple?: boolean;
  maxFiles?: number;
  onUpload?: (files: File[]) => void;
}

interface UploadedFile {
  file: File;
  id: string;
  progress: number;
  status: "uploading" | "complete" | "error";
}

function getFileIcon(type: string) {
  if (type.startsWith("image/")) return Image;
  if (type === "application/pdf") return FileText;
  return File;
}

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export function FileUpload({
  label = "Upload files",
  accept = "image/*,.pdf",
  multiple = true,
  maxFiles = 5,
  onUpload,
}: FileUploadProps) {
  const [files, setFiles] = React.useState<UploadedFile[]>([]);
  const [isDragging, setIsDragging] = React.useState(false);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const dragCounterRef = React.useRef(0);

  const simulateUpload = React.useCallback(
    (newFiles: UploadedFile[]) => {
      newFiles.forEach((uploadedFile) => {
        let progress = 0;
        const interval = setInterval(() => {
          progress += Math.random() * 25 + 10;
          if (progress >= 100) {
            progress = 100;
            clearInterval(interval);
            setFiles((prev) =>
              prev.map((f) =>
                f.id === uploadedFile.id
                  ? { ...f, progress: 100, status: "complete" }
                  : f
              )
            );
          } else {
            setFiles((prev) =>
              prev.map((f) =>
                f.id === uploadedFile.id ? { ...f, progress } : f
              )
            );
          }
        }, 200);
      });
    },
    []
  );

  const handleFiles = React.useCallback(
    (incoming: FileList | File[]) => {
      const fileArray = Array.from(incoming);
      const remaining = maxFiles - files.length;
      if (remaining <= 0) return;

      const sliced = fileArray.slice(0, remaining);
      const newUploads: UploadedFile[] = sliced.map((file) => ({
        file,
        id: `${file.name}-${Date.now()}-${Math.random().toString(36).slice(2)}`,
        progress: 0,
        status: "uploading" as const,
      }));

      setFiles((prev) => [...prev, ...newUploads]);
      simulateUpload(newUploads);
      onUpload?.(sliced);
    },
    [files.length, maxFiles, onUpload, simulateUpload]
  );

  const removeFile = React.useCallback((id: string) => {
    setFiles((prev) => prev.filter((f) => f.id !== id));
  }, []);

  const handleDragEnter = React.useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    dragCounterRef.current += 1;
    if (dragCounterRef.current === 1) {
      setIsDragging(true);
    }
  }, []);

  const handleDragLeave = React.useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    dragCounterRef.current -= 1;
    if (dragCounterRef.current === 0) {
      setIsDragging(false);
    }
  }, []);

  const handleDragOver = React.useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDrop = React.useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      dragCounterRef.current = 0;
      setIsDragging(false);
      if (e.dataTransfer.files?.length) {
        handleFiles(e.dataTransfer.files);
      }
    },
    [handleFiles]
  );

  return (
    <div className="space-y-3">
      {label && (
        <label className="block text-sm font-medium text-gray-700">
          {label}
        </label>
      )}

      <div
        className={cn(
          "relative flex flex-col items-center justify-center rounded-lg border-2 border-dashed px-6 py-8 transition-colors",
          isDragging
            ? "border-emerald-400 bg-emerald-50"
            : "border-gray-300 bg-gray-50 hover:border-gray-400 hover:bg-gray-100",
          files.length >= maxFiles && "pointer-events-none opacity-50"
        )}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            inputRef.current?.click();
          }
        }}
      >
        <Upload
          className={cn(
            "mb-2 h-8 w-8",
            isDragging ? "text-emerald-500" : "text-gray-400"
          )}
        />
        <p className="text-sm font-medium text-gray-700">
          Drag &amp; drop or click to upload
        </p>
        <p className="mt-1 text-xs text-gray-500">
          Images and PDF files accepted
          {maxFiles > 1 && ` (max ${maxFiles} files)`}
        </p>

        <input
          ref={inputRef}
          type="file"
          accept={accept}
          multiple={multiple}
          className="hidden"
          onChange={(e) => {
            if (e.target.files?.length) {
              handleFiles(e.target.files);
              e.target.value = "";
            }
          }}
        />
      </div>

      {files.length > 0 && (
        <ul className="space-y-2">
          {files.map((item) => {
            const Icon = getFileIcon(item.file.type);
            return (
              <li
                key={item.id}
                className="flex items-center gap-3 rounded-lg border border-gray-200 bg-white px-3 py-2.5"
              >
                <Icon className="h-5 w-5 shrink-0 text-gray-400" />

                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between">
                    <p className="truncate text-sm font-medium text-gray-700">
                      {item.file.name}
                    </p>
                    <span className="ml-2 shrink-0 text-xs text-gray-400">
                      {formatFileSize(item.file.size)}
                    </span>
                  </div>
                  {item.status === "uploading" && (
                    <Progress value={item.progress} className="mt-1.5 h-1.5" />
                  )}
                  {item.status === "complete" && (
                    <p className="mt-0.5 text-xs text-green-600">
                      Upload complete
                    </p>
                  )}
                </div>

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeFile(item.id);
                  }}
                  className="shrink-0 rounded-md p-1 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
                  aria-label={`Remove ${item.file.name}`}
                >
                  <X className="h-4 w-4" />
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
