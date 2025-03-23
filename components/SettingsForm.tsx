// components/SettingsForm.tsx
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

interface SettingsFormProps {}

const FormSchema = z.object({
    storeName: z.string().min(1),
    address: z.string().min(1),
    contact1Name: z.string().min(1),
    contact1Phone: z.string().min(1),
    contact2Name: z.string().min(1),
    contact2Phone: z.string().min(1),
});

const SettingsForm: React.FC<SettingsFormProps> = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [initialDataLoaded, setInitialDataLoaded] = useState(false); // New state
    const [successMessage, setSuccessMessage] = useState<string | null>(null); // State for success message
    const [errorMessage, setErrorMessage] = useState<string | null>(null); // State for error message


  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      storeName: "",
      address: "",
      contact1Name: "",
      contact1Phone: "",
      contact2Name: "",
      contact2Phone: "",
    },
  });

    useEffect(() => {
    const fetchSettings = async () => {
      setIsLoading(true);
      try {
        const response = await fetch('/api/settings/location');
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Failed to fetch settings');
        }
        const data = await response.json();
        form.setValue('storeName', data.storeName);
        form.setValue('address', data.address);
        form.setValue('contact1Name', data.contact1Name);
        form.setValue('contact1Phone', data.contact1Phone);
        form.setValue('contact2Name', data.contact2Name);
        form.setValue('contact2Phone', data.contact2Phone);

      } catch (error: any) {
        console.error('Error fetching settings:', error);
        setErrorMessage(error.message || 'Failed to fetch settings.'); // Set error message
      } finally {
        setIsLoading(false);
        setInitialDataLoaded(true); // Mark data as loaded
      }
    };

    fetchSettings();
    }, [form]); // Depend on form so it re-fetches if form changes

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    setIsLoading(true)
    try {
      const response = await fetch('/api/settings/location', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json(); // Get error message from response
        throw new Error(errorData.message || 'Failed to update settings'); // Use server error message or default
      }
      setSuccessMessage('Settings updated successfully!'); // Set success message
      setTimeout(() => setSuccessMessage(null), 4000); // Clear message after 4 seconds

      // Handle success (e.g., show a success message)
    } catch (error: any) {
      console.error('Error submitting form:', error);
       setErrorMessage(error.message || 'Failed to update settings.'); // Set error message
    }finally{
        setIsLoading(false)
    }
  }
    // Prevent rendering the form before initial data is loaded
    if (!initialDataLoaded) {
        return <div>Loading settings...</div>;
    }
    // Reusable Form fields
    const TextField: React.FC<{
        control: any;
        name: keyof z.infer<typeof FormSchema>;
        label: string;
        placeholder?: string;
    }> = ({control, name, label, placeholder}) => (
     <FormField
        control={form.control}
        name={name}
        render={({ field }) => (
            <FormItem>
            <FormLabel>{label}</FormLabel>
            <FormControl>
                <Input placeholder={placeholder} {...field} className="text-black"/>
            </FormControl>
            <FormMessage />
            </FormItem>
        )}
        />
    );

  return (
   <div className="p-4 bg-gray-200 rounded-md">
        {/* Success Message */}
        {successMessage && (
            <div className="bg-green-500 text-white p-2 rounded-md mb-4">
            {successMessage}
            </div>
        )}

        {/* Error Message */}
        {errorMessage && (
            <div className="bg-red-500 text-white p-2 rounded-md mb-4">
            {errorMessage}
            </div>
        )}
        <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <TextField control={form.control} name="storeName" label="Store Name" placeholder="e.g My Store" />
            <TextField control={form.control} name="address" label="Address" placeholder="e.g 123 Main street" />
            <TextField control={form.control} name="contact1Name" label="Contact 1 Name" placeholder="e.g John Doe" />
            <TextField control={form.control} name="contact1Phone" label="Contact 1 Phone" placeholder="e.g 0726568989" />
            <TextField control={form.control} name="contact2Name" label="Contact 2 Name" placeholder="e.g John Cena" />
            <TextField control={form.control} name="contact2Phone" label="Contact 2 Phone" placeholder="e.g 0726568989" />

            <Button type="submit" disabled={isLoading}>Update Settings</Button>
        </form>
        </Form>
    </div>
  );
};

export default SettingsForm;