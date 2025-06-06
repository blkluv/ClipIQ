import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import React from "react";

type props={
    trigger?:string
    title?: string;
    description?: string;

}
const modal = ({trigger,title,description}:props) => {
  return (
    <div>
      <Dialog>
        <DialogTrigger>{trigger}</DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription>
              {description}
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default modal;
