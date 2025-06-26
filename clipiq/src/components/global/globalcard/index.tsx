import React from "react";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type props = {
  title: string;
  description?: string;
  action?: React.ReactNode;
  content?: React.ReactNode;
  footer?: React.ReactNode;
};

const GlobalCard = ({ title, description, action, content, footer }: props) => {
  return (
    <Card className='bg-transparent mt-1 w-full border border-neutral-800 hover:border-neutral-600'>
      <CardHeader >
        <CardTitle className='text-md text-white'>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
        {/* <CardAction>Card Action</CardAction> */}
      </CardHeader>
      {content && <CardContent className="pt-4">
       {content}
      </CardContent>}
      {footer && <CardFooter>
        {footer}
      </CardFooter>}
    </Card>
  );
};

export default GlobalCard;
