// components/SectionForm.tsx
import React, { useState, useEffect } from 'react';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Section } from '@/types/types';
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

interface SectionFormProps {
    onSectionCreated?: (section: Section) => void;
    onSectionUpdated?: (section: Section) => void; // Add this
    onSectionDeleted?: (id: string) => void; // Add This
    section?: Section; // Make section optional
}
const FormSchema = z.object({
  name: z.string().min(1, { message: "Section name is required" }),
  order: z.coerce.number().min(0, { message: "Order must be a non-negative number" }),
})

const SectionForm: React.FC<SectionFormProps> = ({ onSectionCreated, section, onSectionUpdated, onSectionDeleted }) => {
  const [isLoading, setIsLoading] = useState(false);
    const [progress, setProgress] = useState(0); // Add progress state

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: section?.name || "",
      order: section?.order || 0,
    },
  })

  useEffect(() => {
    if (section) {
      form.setValue('name', section.name);
      form.setValue('order', section.order);
    }
  }, [section, form]);


  async function onSubmit(data: z.infer<typeof FormSchema>) {
      setIsLoading(true)
       setProgress(0); // Reset progress
    try {
        if (section) {
             const response = await fetch('/api/sections', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id: section.id, ...data }),
            });

            if (!response.ok) {
                throw new Error('Failed to update section');
            }

            const updatedSection = await response.json();
            onSectionUpdated?.(updatedSection);

        }else{
             const response = await fetch('/api/sections', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                throw new Error('Failed to create section');
            }
             const newSection = await response.json();
            onSectionCreated?.(newSection); // Call the callback

        }

    } catch (error) {
      console.error('Error submitting form:', error);
      // Handle error (e.g., show error message to the user)
    }
    finally{
        setIsLoading(false);
        setProgress(0);
        form.reset()
    }
  }
    async function onDelete() {
     if (!section) return;
      setIsLoading(true)

    try {
      const response = await fetch('/api/sections', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: section.id }),
      });

      if (!response.ok) {
        throw new Error('Failed to delete section');
      }

      onSectionDeleted?.(section.id);
    } catch (error) {
      console.error('Error deleting section:', error);
      // Handle error
    } finally {
        setIsLoading(false)
    }
  }


  return (
   <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="raleway font-semibold space-y-4 p-4 bg-[#505050] text-white rounded-md">
         {/* Progress Bar */}
        {isLoading && (
          <div className="w-full bg-gray-700 rounded-full h-2.5 dark:bg-gray-700">
            <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${progress}%` }}></div>
          </div>
        )}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-white">Section Name</FormLabel>
              <FormControl>
                <Input placeholder="e.g., Masalas" {...field} className="text-white" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="order"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-white">Order</FormLabel>
              <FormControl>
                <Input type="number" placeholder="e.g., 1" {...field} className="text-white"/>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex space-x-2">
            <Button type="submit" disabled={isLoading} variant="default">
            {section ? 'Update' : 'Create'} Section
            </Button>
            {section && (
                <AlertDialog>
                <AlertDialogTrigger asChild>
                    <Button variant="destructive" disabled={isLoading}>Delete</Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete the section
                        and all products within it.
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

export default SectionForm;