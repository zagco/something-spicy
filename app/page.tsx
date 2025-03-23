// app/page.tsx
import Banner from "@/components/Banner";
import Footer from "@/components/Footer";
import VideoPlayer from '@/components/Video';
import ProductSection from "@/components/ProductSection";
import { Section, LocationInfo } from "@/types/types";
// REMOVE: import { db } from "@/config/firebase" // Don't import the top-level db
import { initializeFirebaseForServerComponent } from "@/config/firebase"; // Import the new function
import { collection, getDocs, orderBy, query } from "firebase/firestore";

export default async function Home() {
  const { db } = initializeFirebaseForServerComponent(); // Initialize Firebase for Server Components

  if (!db) {
    // Handle the case where Firebase isn't initialized (e.g., missing env variables)
    return <div>Error: Firebase not initialized. Check your environment variables.</div>;
  }

  // Fetch sections data directly within the component
  const sectionsQuery = query(collection(db, "sections"), orderBy("order"));
  const sectionsSnapshot = await getDocs(sectionsQuery);

  const sections: Section[] = sectionsSnapshot.docs.map((doc) => {
    const data = doc.data() as Omit<Section, "id">;
     // Ensure products are sorted, even if they somehow weren't
    const sortedProducts = data.products.sort((a, b) => a.order - b.order);
    return {
      id: doc.id,
      ...data,
      products: sortedProducts,
    };
  });

  return (
    <div>
      <section>
        <Banner />
      </section>

      <div className="container mx-auto p-4">
        <VideoPlayer src="/videos/test.mp4" />
      </div>

      {/* Dynamically render ProductSection components */}
      {sections.map((section) => (
        <ProductSection key={section.id} section={section} />
      ))}

      <section>
        <Footer />
      </section>
    </div>
  );
}