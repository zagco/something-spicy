// app/api/upload/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { initializeFirebaseForApi } from '@/config/firebase'; // CORRECT IMPORT
import multer from 'multer';
import { v4 as uuidv4 } from 'uuid';
import { Readable } from 'stream'; // Import Readable

const upload = multer({ storage: multer.memoryStorage() });

// Helper function to convert ReadableStream to Buffer (remains unchanged)
async function streamToBuffer(readableStream: ReadableStream<Uint8Array>): Promise<Buffer> {
  const chunks: Buffer[] = [];
  const reader = readableStream.getReader();

  while (true) {
    const { done, value } = await reader.read();
    if (done) {
      break;
    }
    chunks.push(Buffer.from(value));
  }

  return Buffer.concat(chunks);
}

export async function POST(req: NextRequest) {
  const { storage } = initializeFirebaseForApi(); // CORRECT INITIALIZATION
  if(!storage){
     return NextResponse.json({ message: 'Firebase not initialized' }, { status: 500 });
  }
  try {
    // Convert the NextRequest body to a Buffer
    const buffer = await streamToBuffer(req.body as ReadableStream<Uint8Array>);

    // Create a Node.js Readable stream from the buffer.
    const stream = new Readable();
    stream.push(buffer);
    stream.push(null); // Signal the end of the stream

    // Create a mock request object with the necessary properties.
    const mockReq = {
      headers: Object.fromEntries(req.headers.entries()),
      method: req.method,
      body: {}, // Multer will populate this.
      file: undefined,
      files: undefined,
      pipe: (dest: any) => {
        stream.pipe(dest);
      },
      unpipe: (dest: any) => {
        stream.unpipe(dest);
      },
    } as any;

    // Promisify the multer middleware
    const uploadMiddleware = upload.single('image');
    await new Promise((resolve, reject) => {
      uploadMiddleware(mockReq as any, {} as any, (err: any) => {
        if (err) {
          console.error("Multer Error:", err);
          return reject(err); // Reject with the error
        }
        resolve(true);
      });
    });

    const file = mockReq.file;

    if (!file) {
      return NextResponse.json({ message: 'No file uploaded' }, { status: 400 });
    }

    const uniqueFileName = `${uuidv4()}-${file.originalname}`;
    const fileRef = ref(storage, `uploads/${uniqueFileName}`);
    const uploadTask = uploadBytesResumable(fileRef, file.buffer, {
      contentType: file.mimetype,
    });

    return new Promise((resolve, reject) => { // Wrap in a promise
      uploadTask.on('state_changed',
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress + '% done');
        },
        (error) => {
          console.error('Error uploading file:', error);
          reject(error); // Reject the promise on error
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref)
            .then((downloadURL) => {
              console.log('File available at', downloadURL);
              resolve(NextResponse.json({ url: downloadURL }, { status: 200 })); // Resolve the promise
            })
             .catch((err) => { // Handle getDownloadURL errors
                console.error("Failed to get download URL", err);
                reject(err); // Reject the promise
            });
        }
      );
    });

  } catch (error) {
    console.error('Error in upload handler:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}

export const config = {
  api: {
    bodyParser: false,
  },
};