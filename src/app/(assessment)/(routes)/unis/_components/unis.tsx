import { useEffect, useState } from "react";
import Image from "next/image";
import { StaticImport } from "next/dist/shared/lib/get-img-props";

type DataTypes = {
  name: string | undefined;
  nickname: string | undefined;
  location: string | undefined;
  logo: string | undefined;
  icon: string | undefined;
  website: string | undefined;
  type: string | undefined;
}[];

interface UnisProps {
  filteredData: DataTypes;
  data: DataTypes;
}

export const Unis = ({ filteredData, data }: UnisProps) => {
  return (
    <div className="grid grid-cols-3 gap-4 max-w-[1380px] w-full mx-auto mt-9 px-7 py-0">
      {/* Mapping through the university data and rendering individual cards */}
      {filteredData.length > 0
        ? filteredData.map((item, i: React.Key | null | undefined) => (
            <a
              key={i}
              target="_blank"
              href={item?.website}
              className="w-auto h-auto bg-[#F1F2F2] rounded-xl transition unis"
            >
              <div className="p-6">
                <div className="p-5">
                  {/* Rendering the university logo or a default message if no logo */}
                  {item.logo !== "" ? (
                    <img src={item?.icon} width={60} height={60} alt="icon" />
                  ) : (
                    <p className="text-base">No Logo </p>
                  )}
                </div>
                {/* Displaying university details */}
                <h3 className="text-[20px] name">{item.name}</h3>
                <p className="text-base nickname">Nickname - {item.nickname}</p>
                <p className="text-base location">Location - {item.location}</p>
                <p className="text-base type">Type - {item.type}</p>
              </div>
            </a>
          ))
        : data.map((item, i: React.Key | null | undefined) => (
            <a
              key={i}
              target="_blank"
              href={item?.website}
              className="w-auto h-auto bg-[#F1F2F2] rounded-xl transition unis"
            >
              <div className="p-6">
                <div className="p-5">
                  {/* Rendering the university logo or a default message if no logo */}
                  {item.logo !== "" ? (
                    <img src={item?.icon} width={60} height={60} alt="icon" />
                  ) : (
                    <p className="text-base">No Logo </p>
                  )}
                </div>
                {/* Displaying university details */}
                <h3 className="text-[20px] name">{item.name}</h3>
                <p className="text-base nickname">Nickname - {item.nickname}</p>
                <p className="text-base location">Location - {item.location}</p>
                <p className="text-base type">Type - {item.type}</p>
              </div>
            </a>
          ))}
    </div>
  );
};
