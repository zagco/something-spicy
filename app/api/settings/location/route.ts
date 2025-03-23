// app/api/settings/location/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { initializeFirebaseForApi } from '@/config/firebase'; // CORRECT IMPORT

interface LocationInfo {
  storeName: string;
  address: string;
  contact1Name: string;
  contact1Phone: string;
  contact2Name: string;
  contact2Phone: string;
}

export async function GET(req: NextRequest) {
    const { db } = initializeFirebaseForApi(); // CORRECT INITIALIZATION
    // Add a check for db
    if (!db) {
        return NextResponse.json({ message: 'Firebase not initialized' }, { status: 500 });
    }
  try {
    const docRef = doc(db, 'settings', 'locationInfo');
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      return NextResponse.json({ message: 'Location information not found' }, { status: 404 });
    }

    const data = docSnap.data() as LocationInfo;
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching location information:', error);
    return NextResponse.json({ message: 'Error fetching location information' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
    const { db } = initializeFirebaseForApi(); // CORRECT INITIALIZATION
    // Add a check for db
    if (!db) {
        return NextResponse.json({ message: 'Firebase not initialized' }, { status: 500 });
    }
  try {
    const locationData: LocationInfo = await req.json();
      if (
        !locationData.storeName ||
        !locationData.address ||
        !locationData.contact1Name ||
        !locationData.contact1Phone ||
        !locationData.contact2Name ||
        !locationData.contact2Phone
      ) {
        return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
      }


    const docRef = doc(db, 'settings', 'locationInfo');
    await setDoc(docRef, locationData, { merge: true });

    return NextResponse.json({ message: 'Location information updated successfully' });
  } catch (error) {
    console.error('Error updating location information:', error);
    return NextResponse.json({ message: 'Error updating location information' }, { status: 500 });
  }
}