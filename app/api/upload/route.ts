// app/api/upload/route.ts
import { writeFile } from 'fs/promises'; // Import writeFile
import { NextRequest, NextResponse } from 'next/server';
import { join } from 'path';

// VERY IMPORTANT: No export const config = { ... }

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const filename = `<span class="math-inline">\{Date\.now\(\)\}\-</span>{file.name}`; // Use a unique filename
    const filepath = join(process.cwd(), 'public/uploads', filename); // Correct path

    // Ensure the 'public/uploads' directory exists
    // In a production environment, you would *not* typically write directly to the filesystem.
    // You would upload to cloud storage (e.g., AWS S3, Google Cloud Storage, Azure Blob Storage).
    // I'll show that alternative below.

    await writeFile(filepath, buffer);

    const fileUrl = `/uploads/${filename}`; // Public URL

    return NextResponse.json({ success: true, url: fileUrl });
  } catch (error) {
    console.error('Error uploading file:', error);
    return NextResponse.json({ error: 'Failed to upload file' }, { status: 500 });
  }
}