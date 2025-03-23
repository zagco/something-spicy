// app/api/sections/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { collection, getDocs, orderBy, addDoc, doc, updateDoc, deleteDoc, query } from 'firebase/firestore';
import { Section } from '@/types/types';
import { initializeFirebaseForApi } from '@/config/firebase'; // CORRECT IMPORT

export async function GET(req: NextRequest) {
  const { db } = initializeFirebaseForApi(); // CORRECT INITIALIZATION
    if(!db){
        return NextResponse.json({ message: 'Firebase not initialized' }, { status: 500 });
    }
  try {
    const q = query(collection(db, 'sections'), orderBy('order'));
    const snapshot = await getDocs(q);
    const sections: Section[] = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...(doc.data() as Omit<Section, 'id'>),
    }));
    return NextResponse.json(sections);
  } catch (error) {
    console.error('Error fetching sections:', error);
    return NextResponse.json({ message: 'Error fetching sections' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const { db } = initializeFirebaseForApi(); // CORRECT INITIALIZATION
      if(!db){
        return NextResponse.json({ message: 'Firebase not initialized' }, { status: 500 });
    }
  try {
    const { name, order } = await req.json();

    if (!name || order === undefined) {
      return NextResponse.json({ message: 'Missing section name or order' }, { status: 400 });
    }

    const newSection: Omit<Section, 'id'> = {
      name,
      order,
      products: [],
    };

    const docRef = await addDoc(collection(db, 'sections'), newSection);
    const createdSection: Section = {
      id: docRef.id,
      ...newSection,
    };
    return NextResponse.json(createdSection, { status: 201 });
  } catch (error) {
    console.error('Error creating section:', error);
    return NextResponse.json({ message: 'Error creating section' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
    const { db } = initializeFirebaseForApi(); // CORRECT INITIALIZATION
        if(!db){
        return NextResponse.json({ message: 'Firebase not initialized' }, { status: 500 });
    }
  try {
    const { id, name, order } = await req.json();

    if (!id || !name || order === undefined) {
      return NextResponse.json({ message: 'Missing section ID, name, or order' }, { status: 400 });
    }

    const docRef = doc(db, 'sections', id);
    await updateDoc(docRef, { name, order });
    return NextResponse.json({ message: 'Section updated successfully' });
  } catch (error) {
    console.error('Error updating section:', error);
    return NextResponse.json({ message: 'Error updating section' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
    const { db } = initializeFirebaseForApi(); // CORRECT INITIALIZATION
        if(!db){
        return NextResponse.json({ message: 'Firebase not initialized' }, { status: 500 });
    }
  try {
    const {id} = await req.json();

    if (!id) {
      return NextResponse.json({ message: 'Missing section ID' }, { status: 400 });
    }

    const docRef = doc(db, 'sections', id);
    await deleteDoc(docRef);
    return NextResponse.json({ message: 'Section deleted successfully' });
  } catch (error) {
    console.error('Error deleting section:', error);
    return NextResponse.json({ message: 'Error deleting section' }, { status: 500 });
  }
}