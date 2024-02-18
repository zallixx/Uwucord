import Image from "next/image";
import {UserButton} from "@clerk/nextjs";
import {ModeToggle} from "@/components/mode-toggle";

export default function Home() {
  return (
      <div>
          <p className="text-3xl font-bold text-indigo-500">
              Discord Test
        </p>
          <UserButton afterSignOutUrl="/"/>
          <ModeToggle/>
      </div>
  );
}
