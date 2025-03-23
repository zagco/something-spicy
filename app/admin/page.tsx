// app/admin/page.tsx
'use client';
import React, { useState, useEffect } from 'react';
import { Section, Product } from '@/types/types';
import SectionForm from '@/components/SectionForm';
import ProductForm from '@/components/ProductForm';
import SettingsForm from '@/components/SettingsForm';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { initializeFirebaseForApi } from '@/config/firebase';

export default function AdminPage() {
  const [sections, setSections] = useState<Section[]>([]);
  const [selectedSection, setSelectedSection] = useState<Section | null>(null);
  const [loading, setLoading] = useState(true);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    const fetchSections = async () => {
      try {
        const { db } = initializeFirebaseForApi();
        if (!db) {
          throw new Error('Firebase not initialized');
        }
        const response = await fetch('/api/sections');
        if (!response.ok) {
          throw new Error('Failed to fetch sections');
        }
        const data: Section[] = await response.json();
        setSections(data);
        if (data.length > 0) {
          setSelectedSection(data[0]);
        }
      } catch (error: any) {
        console.error('Error fetching sections:', error);
        setErrorMessage(error.message || 'Failed to fetch sections');
      } finally {
        setLoading(false);
      }
    };

    fetchSections();
  }, []);

  const handleSectionCreated = (newSection: Section) => {
    setSections([...sections, newSection]);
    setSelectedSection(newSection);
    setSuccessMessage('Section created successfully!');
    setTimeout(() => setSuccessMessage(null), 4000);
  };

  const handleSectionUpdated = (updatedSection: Section) => {
    const updatedSections = sections.map((s) =>
      s.id === updatedSection.id ? updatedSection : s
    );
    setSections(updatedSections);
    setSelectedSection(updatedSection);
    setSuccessMessage('Section updated successfully!');
    setTimeout(() => setSuccessMessage(null), 4000);
  };

  const handleSectionDeleted = (sectionId: string) => {
    const updatedSections = sections.filter((s) => s.id !== sectionId);
    setSections(updatedSections);
    setSelectedSection(updatedSections.length > 0 ? updatedSections[0] : null);
    setSuccessMessage('Section deleted successfully!');
    setTimeout(() => setSuccessMessage(null), 4000);
  };

  const handleProductCreated = (newProduct: Product) => {
    if (!selectedSection) return;
    const updatedSections = sections.map((s) => {
      if (s.id === selectedSection.id) {
        return { ...s, products: [...s.products, newProduct] };
      }
      return s;
    });
    setSections(updatedSections);
    setSelectedSection(updatedSections.find(s => s.id === selectedSection.id) || null);
    setSuccessMessage('Product Created successfully!');
    setTimeout(() => setSuccessMessage(null), 4000);
  };

  const handleProductUpdated = (updatedProduct: Product) => {
    if (!selectedSection) return;
    const updatedSections = sections.map((s) => {
      if (s.id === selectedSection.id) {
        return {
          ...s,
          products: s.products.map((p) =>
            p.productId === updatedProduct.productId ? updatedProduct : p
          ),
        };
      }
      return s;
    });
    setSections(updatedSections);
    setSelectedSection(updatedSections.find(s => s.id === selectedSection.id) || null);
    setSuccessMessage('Product updated successfully!');
    setTimeout(() => setSuccessMessage(null), 4000);
  };

  const handleProductDeleted = (productId: string) => {
    if (!selectedSection) return;

    const updatedSections = sections.map((s) => {
      if (s.id === selectedSection.id) {
        return {
          ...s,
          products: s.products.filter((p) => p.productId !== productId),
        };
      }
      return s;
    });

    setSections(updatedSections);
    setSelectedSection(updatedSections.find(s => s.id === selectedSection.id) || null);
    setSuccessMessage('Product deleted successfully!');
    setTimeout(() => setSuccessMessage(null), 4000);
  };

  if (loading) {
    return <div className="text-center p-4">Loading...</div>;
  }

    if (errorMessage) {
    return (
      <div className="text-center p-4">
        <div className="bg-red-500 text-white p-2 rounded-md inline-block">
          Error: {errorMessage}
        </div>
      </div>
    );
  }


  return (
    <div className="container mx-auto p-4 font-raleway">
      <h1 className="text-3xl font-bold mb-4">Admin Dashboard</h1>

      {/* Success Message Alert */}
      {successMessage && (
        <div className="bg-green-500 text-white p-2 rounded-md mb-4">
          {successMessage}
        </div>
      )}

      {/* Section Management */}
      <h2 className="text-2xl font-bold mb-2">Sections</h2>
      <SectionForm onSectionCreated={handleSectionCreated} onSectionUpdated={handleSectionUpdated} />
      <Separator className='my-4' />
      {/* Display existing sections and allow updates/deletes */}
      <div className="flex space-x-2 mb-4">
        {sections.map((section) => (
          <Button
            key={section.id}
            variant={selectedSection?.id === section.id ? "default" : "outline"}
            onClick={() => setSelectedSection(section)}
          >
            {section.name}
          </Button>
        ))}
      </div>
      {sections.map((section) => (
        <div className="flex space-x-2 mb-4" key={section.id}>
          {selectedSection?.id === section.id ? (
            <SectionForm
              section={section}
              onSectionUpdated={handleSectionUpdated}
              onSectionDeleted={handleSectionDeleted}
            />
          ) : null}
        </div>
      ))}

      {/* Product Management - Horizontal Layout */}
      {selectedSection && (
        <>
          <h2 className="text-2xl font-bold mb-2">Products (in {selectedSection.name})</h2>
          <Separator className='my-4' />
          <div className="flex overflow-x-auto space-x-4"> {/* Key change: Horizontal layout */}
            <ProductForm
              sectionId={selectedSection.id}
              onProductCreated={handleProductCreated}
              onProductUpdated={handleProductUpdated}
              onProductDeleted={handleProductDeleted}
            />
            {selectedSection.products.map((product) => (
              <ProductForm
                key={product.productId}
                sectionId={selectedSection.id}
                product={product}
                onProductUpdated={handleProductUpdated}
                onProductDeleted={handleProductDeleted}
              />
            ))}
          </div>
        </>
      )}
      <Separator className='my-4' />
      {/* Store Settings Management */}
      <h2 className="text-2xl font-bold mb-2">Store Settings</h2>
      <SettingsForm />
    </div>
  );
}