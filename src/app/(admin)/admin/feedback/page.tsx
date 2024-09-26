import { db } from "@/lib/db";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { MessageCircle } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Feedback = async () => {
  const feedbacks = await db.feedback.findMany();

  return (
    <div className="grid grid-cols-3 gap-4">
      {feedbacks.map((feedback) => (
        <Card className="bg-slate-100" key={feedback.id}>
          <CardHeader>
            <CardDescription className="flex items-center gap-2">
              <MessageCircle /> feedback
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-base">{feedback.feedback}</p>
          </CardContent>
          <CardFooter className="flex items-center gap-2">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
            </Avatar>

            <p className="text-base">{feedback.email}</p>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default Feedback;
