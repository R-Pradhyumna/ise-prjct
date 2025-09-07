import { useQuery } from "@tanstack/react-query";
import Papa from "papaparse";

// Extract Papa.parse logic into a Promise-based function
const fetchCSVData = (csvUrl) => {
  console.log("CSV URL from .env:", csvUrl);

  return new Promise((resolve, reject) => {
    Papa.parse(csvUrl, {
      download: true,
      header: true,
      complete: (results) => {
        if (results.errors.length > 0) {
          reject(new Error(`CSV parsing failed: ${results.errors[0].message}`));
        } else {
          resolve(results.data);
        }
      },
      error: (error) => {
        reject(new Error(`Failed to fetch CSV: ${error.message}`));
      },
    });
  });
};

const useDriveData = (csvUrl) => {
  return useQuery({
    queryKey: ["csvData", csvUrl],
    queryFn: () => fetchCSVData(csvUrl),
    staleTime: 5 * 60 * 1000, // 5 minutes
    cacheTime: 10 * 60 * 1000, // 10 minutes
    retry: 3,
    enabled: !!csvUrl, // Only run if csvUrl exists
  });
};

export default useDriveData;

// import { useState, useEffect } from "react";
// import Papa from "papaparse";

// const useDriveData = (csvUrl) => {
//   const [data, setData] = useState([]);
// console.log("CSV URL from .env:", csvUrl);
//   useEffect(() => {
//     Papa.parse(csvUrl, {
//       download: true,
//       header: true,
//       complete: (results) => setData(results.data),
//     });
//   }, [csvUrl]);

//   return data;
// };

// export default useDriveData;
