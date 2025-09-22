import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Skeleton } from "./ui/skeleton";

export function SkeletonCard() {
  return (
    <Card className="bg-card text-card-foreground p-4 rounded-lg text-center">
      <CardHeader>
        <Skeleton className="h-6 w-3/4 mx-auto" />
      </CardHeader>
      <CardContent>
        <Skeleton className="h-24 w-24 rounded-full mx-auto" />
      </CardContent>
      <CardFooter className="flex justify-center gap-2 mt-2">
        <Skeleton className="h-6 w-16 rounded-full" />
        <Skeleton className="h-6 w-16 rounded-full" />
      </CardFooter>
    </Card>
  );
}
