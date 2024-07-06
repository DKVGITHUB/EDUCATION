// Import React for creating React components
import React, { useEffect, useState } from "react";

// Import useGlobalContext from the context/store module
import { useGlobalContext } from "@/app/context/store";

// Define the type for the data
type DataType = {
  map(arg0: (item: any, i: any) => React.JSX.Element): React.ReactNode;
  name: String;
  nickname: String;
  location: String;
  logo: String;
  icon: String;
  website: String;
  type: String;
};

// Schools component
const Schools = (props: any) => {
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
        <h1 className="text-white font-semibold">{`Result`}</h1>
      </div>
      {/* Main content section */}
      <div className="p-5">
        <div className="">
          {/* Display a title with the selected career name */}
          <h1 className="text-black text-xl max-w-[1380px] w-full mx-auto mt-9 px-7 py-0">
            These are schools with instructional programs in{" "}
            <strong>{career[id]?.name}</strong>
          </h1>
          {/* Display a grid of school information */}
          <div className="grid grid-cols-2 gap-9 max-w-[1380px] w-full mx-auto mt-9 px-7 py-0">
            {/* Map through schools and display each as a link */}
            {career[id]?.schools?.map((item: any, i: number) => (
              <a
                key={i}
                target="_blank"
                href={item?.website}
                className=" w-auto h-auto bg-[#F1F2F2] rounded-xl hover:bg-[#F1F2F2] transition"
              >
                <div className="p-6">
                  {/* Display school name as a link */}
                  <h3 className="text-[20px] underline text-[#00aeef]">
                    {item?.name}
                  </h3>
                  {/* Display additional information about the school */}
                  <p className="text-base">Nickname - {item?.nickname}</p>
                  <p className="text-base">Location - {item?.location}</p>
                  <p className="text-base">Type - {item?.type}</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// Export the Schools component as the default export
export default Schools;
