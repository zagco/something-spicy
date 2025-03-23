// components/ProductForm.tsx
import React, { useState, useEffect } from 'react';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import ImageUpload from './ImageUpload';
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Product } from '@/types/types';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

interface ProductFormProps {
  sectionId: string;
  onProductCreated?: (product: Product) => void;
  onProductUpdated?: (product: Product) => void;
  onProductDeleted?: (productId: string) => void;
  product?: Product; // Make product optional
}

const FormSchema = z.object({
  name: z.string().min(1, {message: "Product name is required"}),
  image: z.string().min(1, {message: "Product image is required"}),
  description: z.string().min(1, {message: "Product description is required"}),
  price: z.string().min(1, {message: "Product price is required"}),
  whereToBuy: z.string().min(1, {message: "Where to buy is required"}),
  order: z.coerce.number().min(0, {message: "Order must be non-negative number"}),
})

const ProductForm: React.FC<ProductFormProps> = ({ sectionId, onProductCreated, onProductUpdated, product, onProductDeleted }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [progress, setProgress] = useState(0); // Add progress state
    const [imageUrl, setImageUrl] = useState(product?.image || ''); // Add imageUrl state


  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: product?.name || "",
      image: product?.image || "",
      description: product?.description || "",
      price: product?.price || "",
      whereToBuy: product?.whereToBuy || "",
      order: product?.order || 0,
    },
  })

   useEffect(() => {
    if (product) {
      form.setValue('name', product.name);
      form.setValue('image', product.image);
      form.setValue('description', product.description);
      form.setValue('price', product.price);
      form.setValue('whereToBuy', product.whereToBuy);
      form.setValue('order', product.order);
      setImageUrl(product.image);
    }
  }, [product, form]);

   const handleImageUpload = (url: string) => {
    form.setValue('image', url); // Update form value
    setImageUrl(url); // Update displayed image
  };

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    setIsLoading(true);
    setProgress(0);

    try {
        if(product){ //Update
            const response = await fetch(`/api/sections/${sectionId}/products/${product.productId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
            });

            if (!response.ok) {
            throw new Error('Failed to update product');
            }
            const updatedProduct: Product = await response.json();
            onProductUpdated?.(updatedProduct);


        }else{ //Create
            const response = await fetch(`/api/sections/${sectionId}/products`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
            });

            if (!response.ok) {
            throw new Error('Failed to create product');
            }

            const newProduct: Product = await response.json();
            onProductCreated?.(newProduct);
        }

    } catch (error) {
      console.error('Error submitting form:', error);
      // Handle error (e.g., show error message to the user)
    } finally {
        setIsLoading(false)
        setProgress(0);
        form.reset();
        setImageUrl(''); // Reset image URL after successful submission
    }
  }

   async function onDelete() {
    if (!product) return;
     setIsLoading(true)

    try {
      const response = await fetch(`/api/sections/${sectionId}/products/${product.productId}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
      });

      if (!response.ok) {
        throw new Error('Failed to delete product');
      }

      onProductDeleted?.(product.productId);
    } catch (error) {
      console.error('Error deleting product:', error);
      // Handle error
    } finally {
        setIsLoading(false)
    }
  }
  //Reusable FormFields
  const TextField: React.FC<{
      control: any;
      name: keyof z.infer<typeof FormSchema>;
      label: string;
      placeholder?: string;
      type?: string;
    }> = ({ control, name, label, placeholder, type = 'text' }) => (
      <FormField
        control={control}
        name={name}
        render={({ field }) => (
          <FormItem className='w-full'>
            <FormLabel className="text-white raleway">{label}</FormLabel>
            <FormControl>
              <Input type={type} placeholder={placeholder} {...field} className="text-white raleway" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    );

    const TextAreaField: React.FC<{
      control: any;
      name: keyof z.infer<typeof FormSchema>;
      label: string;
      placeholder?: string;
    }> = ({ control, name, label, placeholder }) => (
      <FormField
        control={control}
        name={name}
        render={({ field }) => (
          <FormItem className='w-[300px]'>
            <FormLabel className="text-white">{label}</FormLabel>
            <FormControl>
              <Textarea placeholder={placeholder} {...field} className="text-white" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    );

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-[500px] space-y-4 p-4 bg-[#363636] text-white rounded-md"> {/* Removed flex, flex-row */}
        {/* Progress Bar */}
        {isLoading && (
          <div className="w-full bg-gray-700 rounded-full h-2.5">
            <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${progress}%` }}></div>
          </div>
        )}

        <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
                <FormItem>
                <FormLabel className="text-white">Product Image</FormLabel>
                <FormControl>
                    <ImageUpload onUpload={handleImageUpload} value={imageUrl} />
                </FormControl>

                <FormMessage />
                </FormItem>
            )}
            />

        <TextField control={form.control} name="name" label="Product Name" placeholder="e.g., Chilli Powder" />
        <TextAreaField control={form.control} name="description" label="Description" placeholder="e.g., A fiery blend..." />
        <TextField control={form.control} name="price" label="Price" placeholder="e.g., 29.99" />
        <TextField control={form.control} name="whereToBuy" label="Where to Buy" placeholder="name" />
        <TextField control={form.control} name="order" label="Order" placeholder="e.g., 1" type="number"/>
        <div className="flex flex-row space-x-2"> {/* Kept this flex-row for buttons */}
            <Button type="submit" disabled={isLoading} variant="default">
            {product ? 'Update' : 'Create'} Product
            </Button>

            {product && (

                <AlertDialog>
                <AlertDialogTrigger asChild>
                    <Button variant="destructive" disabled={isLoading}>Delete</Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete this product.
                    </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={onDelete}>Continue</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
                </AlertDialog>
            )}
        </div>
      </form>
    </Form>
  );
};

export default ProductForm;