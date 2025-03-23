// app/api/sections/[sectionId]/products/[productId]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { doc, getDoc, updateDoc, deleteDoc, arrayRemove } from 'firebase/firestore';
import { Product } from '@/types/types';
import { initializeFirebaseForApi } from '@/config/firebase'; // CORRECT IMPORT

export async function PUT(req: NextRequest, { params }: { params: { sectionId: string; productId: string } }) {
  const { db } = initializeFirebaseForApi(); // CORRECT INITIALIZATION
    if(!db){
        return NextResponse.json({ message: 'Firebase not initialized' }, { status: 500 });
    }
  const { sectionId, productId } = params;
  try {


    if (!sectionId || typeof sectionId !== 'string' || !productId || typeof productId !== 'string') {
      return NextResponse.json({ message: 'Invalid section ID or product ID' }, { status: 400 });
    }

    const { name, image, description, price, whereToBuy, order } = await req.json();

    if (!name || !image || !description || !price || !whereToBuy || order === undefined) {
      return NextResponse.json({ message: 'Missing product details' }, { status: 400 });
    }

    const sectionRef = doc(db, 'sections', sectionId);
    const sectionSnap = await getDoc(sectionRef);

    if (!sectionSnap.exists()) {
      return NextResponse.json({ message: 'Section not found' }, { status: 404 });
    }

    const sectionData = sectionSnap.data() as { products: Product[] };
    const updatedProducts = sectionData.products.map((product) =>
      product.productId === productId
        ? { productId, name, image, description, price, whereToBuy, order }
        : product
    );

    await updateDoc(sectionRef, { products: updatedProducts });
    return NextResponse.json({ message: 'Product updated successfully' });
  } catch (error) {
    console.error('Error updating product:', error);
    return NextResponse.json({ message: 'Error updating product' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { sectionId: string; productId: string } }) {
  const { db } = initializeFirebaseForApi(); // CORRECT INITIALIZATION
    if(!db){
        return NextResponse.json({ message: 'Firebase not initialized' }, { status: 500 });
    }
    const { sectionId, productId } = params;
  try {


    if (!sectionId || typeof sectionId !== 'string' || !productId || typeof productId !== 'string') {
      return NextResponse.json({ message: 'Invalid section ID or product ID' }, { status: 400 });
    }
     const sectionRef = doc(db, 'sections', sectionId);
    const sectionDoc = await getDoc(sectionRef);
    if (!sectionDoc.exists()) {
      return NextResponse.json({ message: 'Section not found' }, { status: 404 });
    }
     const sectionData = sectionDoc.data() as { products: Product[] };

    const updatedProducts = sectionData.products.filter((product) => product.productId !== productId);

    await updateDoc(sectionRef, {products: updatedProducts});

    return NextResponse.json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Error deleting product:', error);
    return NextResponse.json({ message: 'Error deleting product' }, { status: 500 });
  }
}