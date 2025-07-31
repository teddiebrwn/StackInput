import { ModeToggle } from "@/app/ui/mode-toggle";
import InputStack from "@/app/inputStack/page";

export default function Page() {
  return (
    <div>
      <ModeToggle />
      <InputStack />
      <h1>Welcome to My Website</h1>
      <p>This is a sample page.</p>
    </div>
  );
}
