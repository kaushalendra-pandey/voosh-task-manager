import * as React from "react";

import { cn } from "../../lib/utils";
import { Button } from "../ui/Button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/Dialog";
import {
  Drawer as ShadcnDrawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "../ui/Drawer";
import { Input } from "../ui/Input";
import { Label } from "../ui/Label";
import useMediaQuery from "../../hooks/useMediaQuery";

type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
  children: React.ReactNode;
};

const Details = ({open,setOpen,children }: Props) => {
  const { isMobile } = useMediaQuery();

  return (
    <ShadcnDrawer direction="right" open={open} onOpenChange={setOpen}>
      <DrawerContent className="top-0 right-0 left-auto mt-0 w-[500px] rounded-none">
        {children}
      </DrawerContent>
    </ShadcnDrawer>
  );
};

export default Details;
