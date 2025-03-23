// app/api/sections/[sectionId]/products/route.ts
import { NextRequest, NextResponse } from 'next/server';
import {
  collection,
  getDocs,
  doc,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  arrayUnion,
  arrayRemove,
  query,
  where,
} from 'firebase/firestore';
import { Product } from '@/types/types';
import { initializeFirebaseForApi } from '@/config/firebase'; // CORRECT IMPORT

export async function GET(req: NextRequest, { params }: { params: { sectionId: string } }) {
    const { db } = initializeFirebaseForApi(); // CORRECT INITIALIZATION
      if(!db){
        return NextResponse.json({ message: 'Firebase not initialized' }, { status: 500 });
    }
     const  sectionId  = params.sectionId;
    try {
        if (!sectionId || typeof sectionId !== 'string') {
            return NextResponse.json({ message: 'Invalid section ID' }, { status: 400 });
        }
        const sectionRef = doc(db, 'sections', sectionId);
        const sectionDoc = await getDoc(sectionRef);

        if (!sectionDoc.exists()) {
            return NextResponse.json({ message: 'Section not found' }, { status: 404 });
        }

        const sectionData = sectionDoc.data() as { products: Product[] }; // Type assertion
        const products = sectionData.products ? sectionData.products.sort((a, b) => a.order - b.order): [];
        return NextResponse.json(products);
    } catch (error) {
        console.error('Error fetching products:', error);
        return NextResponse.json({ message: 'Error fetching products' }, { status: 500 });
    }
}

export async function POST(req: NextRequest, { params }: { params: { sectionId: string } }) {
    const { db } = initializeFirebaseForApi(); // CORRECT INITIALIZATION
      if(!db){
        return NextResponse.json({ message: 'Firebase not initialized' }, { status: 500 });
    }
    const  sectionId  = params.sectionId;
    try {


        if (!sectionId || typeof sectionId !== 'string') {
        return NextResponse.json({ message: 'Invalid section ID' }, { status: 400 });
        }

        const { name, image, description, price, whereToBuy, order } = await req.json();

        if (!name || !image || !description || !price || !whereToBuy || order === undefined) {
        return NextResponse.json({ message: 'Missing product details' }, { status: 400 });
        }

        const newProduct: Product = {
        productId: doc(collection(db, 'sections')).id, // Generate unique ID
        name,
        image,
        description,
        price,
        whereToBuy,
        order,
        };

        const sectionRef = doc(db, 'sections', sectionId); // Use doc()
        await updateDoc(sectionRef, {
        products: arrayUnion(newProduct), // Use arrayUnion
        });

        return NextResponse.json(newProduct, { status: 201 });
    } catch (error) {
        console.error('Error creating product:', error);
        return NextResponse.json({ message: 'Error creating product' }, { status: 500 });
    }
}