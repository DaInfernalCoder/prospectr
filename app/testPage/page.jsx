"use client";
import React, { useEffect, useState } from "react";

function Test() {
  const [data, setData] = useState([]);
  console.log(data);

  useEffect(() => {
    async function testFetch() {
      const res = await fetch("/api/linkedin/search", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: "",
          jobTitle: "doctor",
          //   location not work for now
          location: "canada",
          company: "",
          industry: "",
          keywords: "",
          networkDistance: "",
          profileLanguage: "",
          school: "",
          sortBy: "",
          pastCompany: "",
          yearsOfExperience: "",
          openToWork: true,
        }),
      });
      const data = await res.json();
      setData(data);
    }

    testFetch();
  }, []);
  return <div>Test</div>;
}

export default Test;
