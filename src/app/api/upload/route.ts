import { NextRequest, NextResponse } from "next/server";

// ── Allowed File Types ──────────────────────────────────────────────

const ALLOWED_MIME_TYPES: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/jpg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/gif": "gif",
  "application/pdf": "pdf",
};

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

// ── POST Handler ────────────────────────────────────────────────────

export async function POST(request: NextRequest) {
  try {
    const contentType = request.headers.get("content-type") || "";

    if (!contentType.includes("multipart/form-data")) {
      return NextResponse.json(
        {
          success: false,
          error: {
            message: "Content-Type must be multipart/form-data",
            code: "INVALID_CONTENT_TYPE",
          },
        },
        { status: 400 }
      );
    }

    let formData: FormData;
    try {
      formData = await request.formData();
    } catch {
      return NextResponse.json(
        {
          success: false,
          error: {
            message: "Failed to parse form data. Ensure a valid file is attached.",
            code: "PARSE_ERROR",
          },
        },
        { status: 400 }
      );
    }

    const file = formData.get("file") as File | null;
    const folder = (formData.get("folder") as string) || "buildng/uploads";
    const projectId = (formData.get("projectId") as string) || null;

    if (!file) {
      return NextResponse.json(
        {
          success: false,
          error: {
            message: "No file provided. Include a file with the key 'file'.",
            code: "FILE_MISSING",
          },
        },
        { status: 400 }
      );
    }

    // Validate file type
    const mimeType = file.type.toLowerCase();
    const extension = ALLOWED_MIME_TYPES[mimeType];

    if (!extension) {
      return NextResponse.json(
        {
          success: false,
          error: {
            message: `File type '${file.type}' is not allowed. Accepted types: JPEG, PNG, WebP, GIF, PDF.`,
            code: "INVALID_FILE_TYPE",
            details: {
              allowedTypes: Object.keys(ALLOWED_MIME_TYPES),
            },
          },
        },
        { status: 400 }
      );
    }

    // Validate file size
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        {
          success: false,
          error: {
            message: `File size (${(file.size / 1024 / 1024).toFixed(1)}MB) exceeds maximum allowed size of ${MAX_FILE_SIZE / 1024 / 1024}MB.`,
            code: "FILE_TOO_LARGE",
          },
        },
        { status: 400 }
      );
    }

    // Validate file name
    const originalName = file.name || `upload.${extension}`;
    const sanitizedName = originalName
      .replace(/[^a-zA-Z0-9._-]/g, "_")
      .toLowerCase();

    // Generate mock Cloudinary-style response
    const timestamp = Date.now();
    const publicId = `${folder}/${sanitizedName.replace(/\.[^.]+$/, "")}_${timestamp}`;
    const version = `v${timestamp}`;

    const mockUrl = `https://res.cloudinary.com/buildng/${extension === "pdf" ? "raw" : "image"}/upload/${version}/${publicId}.${extension}`;
    const mockSecureUrl = mockUrl;
    const mockThumbnailUrl =
      extension !== "pdf"
        ? `https://res.cloudinary.com/buildng/image/upload/c_thumb,w_200,h_200/${version}/${publicId}.${extension}`
        : null;

    console.log(
      `[Upload API] Mock upload: ${originalName} (${(file.size / 1024).toFixed(1)}KB, ${mimeType}) -> ${mockUrl}`
    );

    return NextResponse.json(
      {
        success: true,
        data: {
          publicId,
          url: mockUrl,
          secureUrl: mockSecureUrl,
          thumbnailUrl: mockThumbnailUrl,
          originalFilename: originalName,
          format: extension,
          resourceType: extension === "pdf" ? "raw" : "image",
          bytes: file.size,
          width: extension !== "pdf" ? 1920 : null,
          height: extension !== "pdf" ? 1080 : null,
          folder,
          version,
          createdAt: new Date().toISOString(),
          ...(projectId && { projectId }),
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("[Upload API] Error:", error);
    return NextResponse.json(
      {
        success: false,
        error: { message: "File upload failed. Please try again." },
      },
      { status: 500 }
    );
  }
}
