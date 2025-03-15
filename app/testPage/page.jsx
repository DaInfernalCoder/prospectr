"use client";
import React, { useEffect, useState } from "react";

function Test() {
  const [data, setData] = useState([]);
  console.log(data);

  const recipients = [
    // {
    //   identifier: "yassinediwani444",
    //   name: "Yassine Adiouani",
    //   profile_url:
    //     "https://www.linkedin.com/in/yassinediwani444?miniProfileUrn=urn%3Ali%3Afs_miniProfile%3AACoAADlxSz4BwE6Ch8JkWHQEvMMM4MihOZf7LGk",
    // },
    // {
    //   identifier: "anass-irizi-4007a920a",
    //   name: "Anass IRIZI",
    //   profile_url:
    //     "https://www.linkedin.com/in/anass-irizi-4007a920a?miniProfileUrn=urn%3Ali%3Afs_miniProfile%3AACoAADUnnQABQQtvX-xAo1PBsKxle5QZJYc-FQk",
    // },
    {
      identifier: "salmane-zouitni-746b37155",
      name: "Salmane Zouitni",
      profile_url:
        "https://www.linkedin.com/in/salmane-zouitni-746b37155?miniProfileUrn=urn%3Ali%3Afs_miniProfile%3AACoAACVdemYBbD07PkkVHHmurQ-cdPtxgLFLw1k",
    },
    // {
    //   identifier: "sunny-datta-mba-cbi-84b69622",
    //   name: "Sunny Datta, MBA, CBI",
    //   profile_url:
    //     "https://www.linkedin.com/in/sunny-datta-mba-cbi-84b69622?miniProfileUrn=urn%3Ali%3Afs_miniProfile%3AACoAAAS6bjsBdbWTvub77cJC1tITFdi02p0GkqY",
    // },
  ];
  // useEffect(() => {
  //   async function testFetch() {
  //     const res = await fetch("/api/cron/check-invitations");
  //     const data = await res.json();
  //     setData(data);
  //   }
  //   testFetch();
  // }, []);

  useEffect(() => {
    async function testFetch() {
      const res = await fetch("/api/linkedin/analytics");
      const data = await res.json();
      setData(data);
    }

    testFetch();
  }, []);
  // useEffect(() => {
  //   async function testFetch() {
  //     const res = await fetch("/api/linkedin/invitations/send", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({
  //         recipients: recipients,
  //         message: "Hi, I'd like to connect!",
  //         templateName: "My Follow-up Template",
  //         followUpMessage: "Thanks for connecting {{name}}! ...",
  //       }),
  //     });
  //     const data = await res.json();
  //     setData(data);
  //   }

  //   testFetch();
  // }, []);

  // useEffect(() => {
  //   async function testFetch() {
  //     const res = await fetch("/api/linkedin/search", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({
  //         name: "Sunny Datta, MBA, CBI ",
  //         jobTitle: "",
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
  //         // openToWork: true,
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
