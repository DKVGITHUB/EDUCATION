import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useState } from "react";

interface SearchInputProps {
  handleChange: (e: { target: { value: string } }) => void;
  value: string | undefined;
}

export const SearchInput = ({ handleChange, value }: SearchInputProps) => {
  return (
    <div className="relative mb-7">
      <Search className="w-4 h-4 absolute top-3 left-3 text-slate-600" />
      <Input
        onChange={handleChange}
        value={value}
        className="w-full md:w-[300px] pl-9 rounded-lg bg-slate-100 focus-visible:ring-slate-200 "
        placeholder="universities"
      />
    </div>
  );
};
