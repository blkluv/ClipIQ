import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import React from "react";

type props = {
  trigger: React.ReactNode;
  children?: React.ReactNode;
  title: string;
  description: string;
  className?: string;
};
const Modal = ({ trigger, children, title, description, className }: props) => {
  return (
    <div>
      <Dialog>
        <DialogTrigger className={className}>{trigger}</DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription>{description}</DialogDescription>
          </DialogHeader>
          {children}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Modal;
