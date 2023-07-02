import Link from "next/link";
import LoadingSpinner from "./LoadingSpinner";
import { Button } from "./ui/button";

export default function FormActionButtons({
  isPending,
  saveButtonTitle = "Save",
  backButtonLink = "/",
}: {
  isPending: boolean;
  saveButtonTitle?: string;
  backButtonLink?: string;
}) {
  return (
    <div>
      {" "}
      <Button variant={"default"} className="mr-2">
        {isPending ? <LoadingSpinner size="sm" /> : saveButtonTitle}
      </Button>
      <Link href={backButtonLink}>
        <Button variant={"secondary"}>Back</Button>
      </Link>
    </div>
  );
}
