// Import useGlobalContext from the context/store module
import { useGlobalContext } from "@/app/context/store";
import React, { useEffect, useState } from "react";

// Education component
const Education = (props: any) => {
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
      <div className="bg-[#00aeef] border-[#00aeef]  px-[15px] py-2.5 rounded-t-[3px] border-b-transparent border-b border-solid">
        {/* Display the career name dynamically */}
        <h1 className="text-white font-semibold">
          {`What Should I Major in to Become an ${career[id]?.name}?`}
        </h1>
      </div>
      {/* Main content section */}
      <div className="p-5">
        {/* Description of related college majors */}
        <div className="text-base p-3">
          These college majors are closest related to this career (actual
          program names will vary from school to school).
        </div>
        {/* List of related college majors */}
        <ul className="grid grid-cols-2 list-disc ml-7">
          {career[id]?.education?.map((item: any, i: number) => (
            <li key={i} className="text-sm">
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

// Export the Education component as the default export
export default Education;
