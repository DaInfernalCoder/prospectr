"use client";
import React, { useEffect, useState } from "react";

function Test() {
  const [data, setData] = useState([]);
  console.log(data);

  const recipients = ["moussa-gbamou-72443b308", "oussama-labchari"].map(
    (identifier) => ({ identifier: identifier })
  );
  useEffect(() => {
    async function testFetch() {
      const res = await fetch("/api/linkedin/invitations/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          recipients: recipients,
          // message: message,
        }),
      });
      const data = await res.json();
      setData(data);
    }

    testFetch();
  }, []);

  // useEffect(() => {
  //   async function testFetch() {
  //     const res = await fetch("/api/linkedin/search", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({
  //         name: "",
  //         jobTitle: "full stack",
  //         //   location not work for now
  //         location: "",
  //         company: "",
  //         industry: "",
  //         keywords: "",
  //         networkDistance: "",
  //         profileLanguage: "",
  //         school: "",
  //         sortBy: "",
  //         pastCompany: "",
  //         yearsOfExperience: "",
  //         openToWork: true,
  //       }),
  //     });
  //     const data = await res.json();
  //     setData(data);
  //   }

  //   testFetch();
  // }, []);

  // useEffect(() => {
  //   async function testFetch() {
  //     const res = await fetch("/api/linkedin/invitations/send", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({
  //         identifier: "sunny-datta-mba-cbi-84b69622",
  //         message:
  //           "Hi Sunny Datta, MBA, CBI, I just send you an invitation from the backend",
  //       }),
  //     });
  //     const data = await res.json();
  //     setData(data);
  //   }

  //   testFetch();
  // }, []);

  return <div>Test</div>;
}

export default Test;
