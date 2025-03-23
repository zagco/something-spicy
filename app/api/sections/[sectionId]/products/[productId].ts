// app/api/sections/[sectionId]/products/[productId].ts
import { NextApiRequest, NextApiResponse } from 'next';
import { adminDb } from '@/config/firebaseAdmin';
import { Product } from '@/types/types';
import { FieldValue } from 'firebase-admin/firestore';


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { sectionId, productId } = req.query;

  if (
    !sectionId ||
    typeof sectionId !== 'string' ||
    !productId ||
    typeof productId !== 'string'
  ) {
    res.status(400).json({ message: 'Invalid section ID or product ID' });
    return;
  }

  if (req.method === 'PUT') {
    // Update an existing product
    try {
      const { name, image, description, price, whereToBuy, order } = req.body;

      if (!name || !image || !description || !price || !whereToBuy || order === undefined) {
        res.status(400).json({ message: 'Missing product details' });
        return;
      }

      const sectionRef = adminDb.collection('sections').doc(sectionId);
      const sectionDoc = await sectionRef.get();

      if (!sectionDoc.exists) {
        res.status(404).json({ message: 'Section not found' });
        return;
      }

      const sectionData = sectionDoc.data() as { products: Product[] };
      const updatedProducts = sectionData.products.map((product) =>
        product.productId === productId
          ? { productId, name, image, description, price, whereToBuy, order }
          : product
      );

      await sectionRef.update({ products: updatedProducts });
      res.status(200).json({ message: 'Product updated successfully' });
    } catch (error) {
      console.error('Error updating product:', error);
      res.status(500).json({ message: 'Error updating product' });
    }
  } else if (req.method === 'DELETE') {
    // Delete a product
    try {
      const sectionRef = adminDb.collection('sections').doc(sectionId);
      const sectionDoc = await sectionRef.get();

      if (!sectionDoc.exists) {
        res.status(404).json({ message: 'Section not found' });
        return;
      }

      const sectionData = sectionDoc.data() as { products: Product[] };
      const updatedProducts = sectionData.products.filter(
        (product) => product.productId !== productId
      );

      await sectionRef.update({ products: updatedProducts });
      res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
      console.error('Error deleting product:', error);
      res.status(500).json({ message: 'Error deleting product' });
    }
  } else {
    res.setHeader('Allow', ['PUT', 'DELETE']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}