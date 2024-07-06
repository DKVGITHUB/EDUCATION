"use client";

import { useEffect, useState } from "react";
import { Unis } from "./unis";
import { SearchInput } from "./search";

type DataTypes = {
  name: string | undefined;
  nickname: string | undefined;
  location: string | undefined;
  logo: string | undefined;
  icon: string | undefined;
  website: string | undefined;
  type: string | undefined;
}[];

interface UniversityProps {
  university: DataTypes;
}

export default function UNIS({ university }: UniversityProps) {
  const [value, setValue] = useState("");
  const [data, setData] = useState(university);
  const [filteredData, setFilteredData] = useState<DataTypes>([]);

  const handleChange = (e: { target: { value: string } }) => {
    // Update the searchQuery state when the input value changes
    const term = e.target.value;
    setValue(e.target.value);

    const filtered: any = data.filter(
      (item: any) =>
        item.name?.toLowerCase().includes(term.toLowerCase()) ||
        item.nickname?.toLowerCase().includes(term.toLowerCase()) ||
        item.location?.toLowerCase().includes(term.toLowerCase()) ||
        item.type?.toLowerCase().includes(term.toLowerCase())
    );

    // Use a Set to filter out duplicate universities by name
    const uniqueFiltered = Array.from(
      new Set(filtered.map((item: { name: any }) => item.name))
    ).map((name) => {
      return filtered.find((item: { name: unknown }) => item.name === name);
    });

    setFilteredData(uniqueFiltered);
  };
  return (
    <div className="mt-5">
      <div className="flex flex-col items-center justify-center">
        <SearchInput handleChange={handleChange} value={value} />
        <Unis filteredData={filteredData} data={data} />
      </div>
    </div>
  );
}
