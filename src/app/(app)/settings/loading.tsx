import LoadingSpinner from "@/components/LoadingSpinner";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function Loading() {
  return (
    <main>
      <h2>Settings</h2>
      <div className="mt-4 opacity-50 animate-pulse">
        <div>
          <Label>Name</Label>
          <Input />
        </div>
        <div>
          <Label>Email</Label>
          <Input />
        </div>
        <div>
          <Label>Location</Label>
          <Input />
        </div>
      </div>
    </main>
  );
}
