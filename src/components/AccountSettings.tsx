"use client";
import { Session } from "next-auth";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { useTransition } from "react";
import { updateUser } from "@/actions/user";
import { redirect } from "next/navigation";
import FormActionButtons from "./FormActionButtons";

export default function AccountSettings({
  session,
  location,
}: {
  session: Session | null;
  location: string | null;
}) {
  let [isPending, startTransition] = useTransition();
  const handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();
    const target = event.target as HTMLFormElement;
    const form = new FormData(target);
    const formData = Object.fromEntries(form.entries()) as {
      name: string;
      email: string;
      location: string;
    };
    startTransition(() => {
      updateUser({
        id: session?.user.id as number,
        name: formData.name,
        email: formData.email,
        currentLocation: formData.location,
      });
      redirect("/");
    });
    // target.reset();
  };

  return (
    <section>
      <form onSubmit={handleSubmit}>
        <div className="my-4">
          <Label>Name</Label>
          <Input
            defaultValue={(session?.user.name as string) ?? ""}
            name="name"
          />
        </div>
        <div className="my-4">
          <Label>Email</Label>
          <Input
            defaultValue={(session?.user.email as string) ?? ""}
            name="email"
          />
        </div>
        <div className="my-4">
          <Label>Current Location (city)</Label>
          <Input defaultValue={location ?? ""} name="location" />
        </div>
        <FormActionButtons isPending={isPending} saveButtonTitle="Save" />
      </form>
    </section>
  );
}
