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
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function DrawerDialogDemo() {
  const [open, setOpen] = React.useState(false)
  const isDesktop = useMediaQuery("(min-width: 768px)")

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
        <button className='raleway font-extrabold mt-1 w-full bg-black text-white py-2 px-4 rounded hover:bg-[#353535] '>Where To Buy?</button>

        </DialogTrigger>
        <DialogContent className="bg-[#ffff] sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="raleway font-extrabold text-2xl flex">Find Us <MapPin className="mt-1"/></DialogTitle>

            <DialogDescription className="raleway">
              Find our shop by simply visiting the address below or Contact us the Directors of Something Spicy SA
            </DialogDescription>
            
          </DialogHeader>
          <ProfileForm />
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Drawer  open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
      <button className='raleway font-bold mt-1 w-full bg-black text-white py-2 px-4 rounded hover:bg-white hover:text-black hover:border hover:border-gray-200'>Where To Buy?</button>
      </DrawerTrigger>
      <DrawerContent className="bg-[#fff]">
        <DrawerHeader className="text-left">
        <DialogTitle className="raleway font-extrabold text-2xl flex">Find Us <MapPin className="mt-1"/></DialogTitle>
          <DialogDescription className="raleway">
              Find our shop by simply visiting the address below or Contact us the Directors of Something Spicy SA
            </DialogDescription>
        </DrawerHeader>
        <ProfileForm className="px-4" />
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button>Close</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}

function ProfileForm({ className }: React.ComponentProps<"form">) {
  return (
    <form className={cn("grid items-start gap-4", className)}>
      <div className="grid gap-2 border-b border-gray-200 pb-5">
        <h2 className="raleway font-extrabold">Something Spicy SA, Scott Street</h2>
        <h2 className="raleway font-extrabold">Scottburgh, 4180 (Stall No: 14)</h2>
      </div>
      <div className="grid gap-2 border-b border-gray-200 pb-5">
        <h2 className="raleway font-extrabold">Sandile Cele: 071 169 9870 </h2>
        <h2 className="raleway font-extrabold">Sanele Tom: 073 707 3683 </h2>
      </div>
      
    </form>
  )
}
