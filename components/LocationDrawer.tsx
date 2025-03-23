// components/LocationDrawer.tsx
'use client'
import * as React from "react"
import { MapPin } from 'lucide-react';
import { cn } from "@/lib/utils"
import { useMediaQuery } from "@/hooks/use-media-query"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { useEffect, useState } from 'react'; // Import useEffect and useState
import { LocationInfo } from "@/types/types";


export default function LocationDrawer() {
  const [open, setOpen] = React.useState(false);
  const [locationInfo, setLocationInfo] = useState<LocationInfo | null>(null); // State for location data
  const [loading, setLoading] = useState(true); // State for loading
  const isDesktop = useMediaQuery("(min-width: 768px)");

  useEffect(() => {
    const fetchLocationInfo = async () => {
      try {
        const response = await fetch('/api/settings/location');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data: LocationInfo = await response.json();
        setLocationInfo(data);
      } catch (error) {
        console.error("Error fetching location info:", error);
        // Handle error (e.g., display an error message to the user)
      } finally {
        setLoading(false);
      }
    };

    fetchLocationInfo();
  }, []); // Empty dependency array: fetch data only once on mount

  if (loading) {
    return <div>Loading location information...</div>; // Or a more sophisticated loading indicator
  }

  if (!locationInfo) {
      return <div>Error: Location information not found.</div>; // Or handle the error more gracefully
  }

  return (
    isDesktop ? (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <button className='raleway font-extrabold mt-1 w-full bg-black text-white py-2 px-4 rounded hover:bg-[#353535] '>Where To Buy?</button>
        </DialogTrigger>
        <DialogContent className="bg-[#ffff] sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="raleway font-extrabold text-2xl flex">Find Us <MapPin className="mt-1" /></DialogTitle>
            <DialogDescription className="raleway">
              Find our shop by simply visiting the address below or Contact us the Directors of Something Spicy SA
            </DialogDescription>
          </DialogHeader>
          <ProfileForm locationInfo={locationInfo} />
        </DialogContent>
      </Dialog>
    ) : (
      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerTrigger asChild>
          <button className='raleway font-bold mt-1 w-full bg-black text-white py-2 px-4 rounded hover:bg-white hover:text-black hover:border hover:border-gray-200'>Where To Buy?</button>
        </DrawerTrigger>
        <DrawerContent className="bg-[#fff]">
          <DrawerHeader className="text-left">
            <DialogTitle className="raleway font-extrabold text-2xl flex">Find Us <MapPin className="mt-1" /></DialogTitle>
            <DialogDescription className="raleway">
              Find our shop by simply visiting the address below or Contact us the Directors of Something Spicy SA
            </DialogDescription>
          </DrawerHeader>
          <ProfileForm locationInfo={locationInfo} className="px-4" />
          <DrawerFooter className="pt-2">
            <DrawerClose asChild>
              <Button>Close</Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    )
  );
}

interface ProfileFormProps extends React.ComponentProps<"form"> {
    locationInfo: LocationInfo;
}

function ProfileForm({ className, locationInfo }: ProfileFormProps) {
  return (
    <form className={cn("grid items-start gap-4", className)}>
      <div className="grid gap-2 border-b border-gray-200 pb-5">
        <h2 className="raleway font-extrabold">{locationInfo.storeName}</h2>
        <h2 className="raleway font-extrabold">{locationInfo.address}</h2>
      </div>
      <div className="grid gap-2 border-b border-gray-200 pb-5">
        <h2 className="raleway font-extrabold">{locationInfo.contact1Name}: {locationInfo.contact1Phone}</h2>
        <h2 className="raleway font-extrabold">{locationInfo.contact2Name}: {locationInfo.contact2Phone}</h2>
      </div>
    </form>
  );
}