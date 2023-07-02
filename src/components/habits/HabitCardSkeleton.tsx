import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";

export default function HabitCardSkeleton() {
  return (
    <Card className="h-60 select-none animate-pulse">
      <CardHeader className="mb-0">
        <CardTitle className="h-10 bg-slate-100 w-full"></CardTitle>
      </CardHeader>
      <CardContent className="">
        <div className="flex items-center justify-between ">
          <div className="bg-slate-100 w-full p-6 flex items-center justify-center flex-col rounded-md">
            <p className=" text-sm font-light h-14"></p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
