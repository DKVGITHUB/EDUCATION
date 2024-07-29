import { useEffect, useState } from "react";

export default function College() {
  const [unis, setUnis] = useState<any[]>([]);
  useEffect(() => {
    // Transforming the assessment data into an array if it's not already
    const unparsed: string | null = localStorage.getItem("UNIS");
    const unis = JSON.parse(unparsed as string);

    // Use a Set to filter out duplicate universities by name
    const uniqueFiltered = Array.from(
      new Set(unis.map((item: { name: any }) => item.name))
    ).map((name) => {
      return unis.find((item: { name: unknown }) => item.name === name);
    });

    setUnis(uniqueFiltered);
  }, [unis]);
  return (
    <div className="w-full grid grid-cols-2 gap-4">
      {unis.length !== 0 ? (
        unis?.map((item: any) => (
          <a
            key={item.id}
            target="_blank"
            href={item?.website}
            className=" w-auto h-auto bg-[#F1F2F2] rounded-xl hover:bg-[#F1F2F2] transition"
          >
            <div className="p-6">
              <h3 className="text-[20px] underline text-[#00aeef]">
                {item?.name}
              </h3>
              <p className="text-base">Nickname - {item?.nickname}</p>
              <p className="text-base">Location - {item?.location}</p>
              <p className="text-base">Type - {item?.type}</p>
            </div>
          </a>
        ))
      ) : (
        <div className="p-5">
          <h3 className="text-base">
            We can&apos;t provide you with the universities you required.
          </h3>
        </div>
      )}
      {/* Mapping through matched universities and displaying them */}
    </div>
  );
}
