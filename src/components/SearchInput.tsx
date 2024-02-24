import { SearchIcon } from "lucide-react";
import { Input } from "./ui/input";

export default function SearchInput() {
  return (
    <div className="flex items-center justify-center relative">
      <Input
        className="bg-gray-100 ring-0 ring-offset-0 px-10 outline-none focus:outline-none outline-offset-0"
        placeholder="what are you looking for ?"
      />
      <SearchIcon className="absolute right-2 gap-5" />
    </div>
  );
}
