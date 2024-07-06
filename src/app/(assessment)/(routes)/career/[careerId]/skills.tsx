// Import useGlobalContext from the context/store module
import { useGlobalContext } from "@/app/context/store";

// Import React for creating React components
import React, { useEffect, useState } from "react";

// Skills component
const Skills = (props: any) => {
  // Destructure data from the global context
  const { data } = useGlobalContext();

  // Destructure id from props
  const { id } = props;

  // State to store career information
  const [career, setCareer]: any = useState([]);

  // useEffect to update career state when data changes
  useEffect(() => {
    const unparsed: any = localStorage.getItem("Categorie");
    const cat = JSON.parse(unparsed);
    setCareer(cat);
  }, [data]);

  return (
    <div className="border-solid border-2 border-[#00aeef] mt-4">
      {/* Header section with a background color */}
      <div className="bg-[#00aeef] border-[#00aeef] px-[15px] py-2.5 rounded-t-[3px] border-b-transparent border-b border-solid">
        {/* Display the header dynamically */}
        <h1 className="text-white font-semibold">
          {`What skills are required for ${career[id]?.name}?`}
        </h1>
      </div>
      {/* Main content section */}
      <div className="p-5">
        {/* List of skills for the selected career */}
        <ul className="grid grid-cols-2 gap-7 list-disc ml-7">
          {career[id]?.skills?.map((item: any, i: number) => (
            <li key={i} className="text-sm">
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

// Export the Skills component as the default export
export default Skills;
