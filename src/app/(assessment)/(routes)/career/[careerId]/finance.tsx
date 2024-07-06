// Import useGlobalContext from the context/store module
import { useGlobalContext } from "@/app/context/store";
import React, { useEffect, useState } from "react";

// Finance component
const Finance = (props: any) => {
  // Destructure data from the global context
  const { data } = useGlobalContext();

  // Destructure id from props
  const { id } = props;

  // State to store major information
  const [major, setMajor]: any = useState([]);

  // useEffect to update major state when data changes
  useEffect(() => {
    const unparsed: any = localStorage.getItem("Categorie");
    const cat = JSON.parse(unparsed);
    setMajor(cat);
  }, [data]);

  // Function to convert USD to Ghanaian Cedis
  const convertToGhanaCedis = (usdAmount: any) => {
    // Define the exchange rate
    const exchangeRate = 12;

    // Convert USD to Cedis
    const cedis = usdAmount * exchangeRate;

    // Format the Cedis amount with commas
    return cedis.toLocaleString("en-US");
  };

  return (
    <div className="border-solid border-2 border-[#00aeef] mt-4 w-1/3">
      {/* Header section with a background color */}
      <div className="bg-[#00aeef] border-[#00aeef] px-[15px] py-2.5 rounded-t-[3px] border-b-transparent border-b border-solid">
        {/* Display the header dynamically */}
        <h1 className="text-white font-semibold">{`Salary Info`}</h1>
      </div>
      {/* Conditional rendering based on the availability of salary information */}
      {major[id]?.Salaries !== null ? (
        // Render if salary information is available
        <div className="p-5">
          <p className="text-sm ">
            Aprox Median Annual Wage :{" "}
            <strong>{`₵${convertToGhanaCedis(
              major[id]?.salaries?.MAW
            )}`}</strong>{" "}
          </p>
          <p className="text-sm ">
            Median Hourly Wage :{" "}
            <strong>{`₵${convertToGhanaCedis(
              major[id]?.salaries?.MHW
            )}`}</strong>{" "}
          </p>
          <p className="text-sm ">
            Total Employed Nationally :{" "}
            <strong>{major[id]?.salaries?.TEN}</strong>{" "}
          </p>
        </div>
      ) : (
        // Render if no salary information is available
        <div className="p-5">
          <p className="text-sm ">
            We do not have a salary list for this major
          </p>
        </div>
      )}
    </div>
  );
};

// Export the Finance component as the default export
export default Finance;
