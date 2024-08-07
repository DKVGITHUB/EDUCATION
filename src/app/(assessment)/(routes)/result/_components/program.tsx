import { useEffect, useState } from "react";

export default function Program() {
  const [careers, setCareers] = useState<string[]>([]);
  const [name, setName] = useState<string>("");

  useEffect(() => {
    const Unparsed: string | null = localStorage.getItem("PROGRAMS-CAREER");

    const program = JSON.parse(Unparsed as string);

    setCareers(program.careers);
    setName(program.name);
  }, [careers, name]);
  return (
    <div>
      {careers.length !== 0 ? (
        <>
          {/* Displaying a heading with the selected skill */}
          <div className="p-2" data-testid="heading">
            These are the careers you can excel in based on the program you have
            chosen.
            <strong className="px-2 underline">{name}</strong>
          </div>

          {/* Displaying a list of career names */}
          <ul
            className="grid grid-cols-2  list-disc ml-7"
            data-testid="list-container"
          >
            {careers?.map((item: string, i: number) => (
              <li key={i} className="text-sm item-list" data-testid="item-list">
                {item}
              </li>
            ))}
          </ul>
        </>
      ) : (
        <div className="p-5">
          <h3 className="text-base">
            We can&apos;t provide you with the careers you required.
          </h3>
        </div>
      )}
    </div>
  );
}
