"use client";
import React, { useEffect, useState } from "react";

import {
  PARAMETER_TYPES,
  fetchLinkedInParameterIds,
} from "../utils/linkedin/searchParameters";

function Test() {
  const [data, setData] = useState([]);
  const [parameterResults, setParameterResults] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Test parameter search
  const testParameterSearch = async () => {
    try {
      setIsLoading(true);
      setError(null);

      // Test location parameter search
      const locationParams = await fetchLinkedInParameterIds(
        PARAMETER_TYPES.LOCATION,
        "New York"
      );

      // Test company parameter search
      const companyParams = await fetchLinkedInParameterIds(
        PARAMETER_TYPES.COMPANY,
        "Google"
      );

      // Test industry parameter search
      const industryParams = await fetchLinkedInParameterIds(
        PARAMETER_TYPES.INDUSTRY,
        "Software"
      );

      setParameterResults({
        locations: locationParams,
        companies: companyParams,
        industries: industryParams,
      });
    } catch (err) {
      setError(err.message || "Failed to fetch parameters");
    } finally {
      setIsLoading(false);
    }
  };

  // Test search with parameter IDs
  const testSearchWithParameters = async () => {
    try {
      setIsLoading(true);
      setError(null);

      // First get some parameter IDs
      const locationParams = await fetchLinkedInParameterIds(
        PARAMETER_TYPES.LOCATION,
        "San Francisco"
      );

      const companyParams = await fetchLinkedInParameterIds(
        PARAMETER_TYPES.COMPANY,
        "Microsoft"
      );

      // Use the first ID from each result (if available)
      const locationIds =
        locationParams.length > 0 ? [locationParams[0].id] : [];
      const companyIds = companyParams.length > 0 ? [companyParams[0].id] : [];

      // Perform search with parameter IDs
      const res = await fetch("/api/linkedin/search", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          jobTitle: "software developer",
          locationIds: locationIds,
          companyIds: companyIds,
          networkDistance: [1, 2, 3],
        }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || `Search failed: ${res.status}`);
      }

      const data = await res.json();
      setSearchResults(data);
    } catch (err) {
      setError(err.message || "Failed to search with parameters");
    } finally {
      setIsLoading(false);
    }
  };

  // Original search test
  const testOriginalSearch = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const res = await fetch("/api/linkedin/search", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          jobTitle: "software developer",
          location: "USA",
          company: "apple",
        }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || `Search failed: ${res.status}`);
      }

      const data = await res.json();
      setData(data);
    } catch (err) {
      setError(err.message || "Failed to search");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">LinkedIn API Test Page</h1>

      <div className="space-y-8">
        {/* Parameter Search Test */}
        <div className="border p-4 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Parameter Search Test</h2>
          <button
            onClick={testParameterSearch}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 mr-4"
            disabled={isLoading}
          >
            {isLoading ? "Loading..." : "Test Parameter Search"}
          </button>

          {parameterResults && Object.keys(parameterResults).length > 0 && (
            <div className="mt-4">
              <h3 className="text-lg font-medium mb-2">Parameter Results:</h3>

              {/* Locations */}
              {parameterResults.locations &&
                parameterResults.locations.length > 0 && (
                  <div className="mb-4">
                    <h4 className="font-medium">Locations:</h4>
                    <ul className="list-disc pl-5">
                      {parameterResults.locations.map((item) => (
                        <li key={item.id}>
                          {item.title} (ID: {item.id})
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

              {/* Companies */}
              {parameterResults.companies &&
                parameterResults.companies.length > 0 && (
                  <div className="mb-4">
                    <h4 className="font-medium">Companies:</h4>
                    <ul className="list-disc pl-5">
                      {parameterResults.companies.map((item) => (
                        <li key={item.id}>
                          {item.title} (ID: {item.id})
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

              {/* Industries */}
              {parameterResults.industries &&
                parameterResults.industries.length > 0 && (
                  <div className="mb-4">
                    <h4 className="font-medium">Industries:</h4>
                    <ul className="list-disc pl-5">
                      {parameterResults.industries.map((item) => (
                        <li key={item.id}>
                          {item.title} (ID: {item.id})
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
            </div>
          )}
        </div>

        {/* Search with Parameters Test */}
        <div className="border p-4 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">
            Search with Parameters Test
          </h2>
          <button
            onClick={testSearchWithParameters}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 mr-4"
            disabled={isLoading}
          >
            {isLoading ? "Loading..." : "Test Search with Parameters"}
          </button>

          {searchResults && searchResults.results && (
            <div className="mt-4">
              <h3 className="text-lg font-medium mb-2">Search Results:</h3>
              <p>Found {searchResults.results.length} profiles</p>

              <ul className="mt-2 space-y-2">
                {searchResults.results.map((profile) => (
                  <li key={profile.id} className="border p-2 rounded">
                    <div className="font-medium">{profile.name}</div>
                    <div className="text-sm">{profile.headline}</div>
                    <div className="text-xs text-gray-500">
                      {profile.location} • {profile.company || "No company"}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Original Search Test */}
        <div className="border p-4 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Original Search Test</h2>
          <button
            onClick={testOriginalSearch}
            className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
            disabled={isLoading}
          >
            {isLoading ? "Loading..." : "Test Original Search"}
          </button>

          {data && data.results && (
            <div className="mt-4">
              <h3 className="text-lg font-medium mb-2">
                Original Search Results:
              </h3>
              <p>Found {data.results.length} profiles</p>
            </div>
          )}
        </div>
      </div>

      {/* Error Display */}
      {error && (
        <div className="mt-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
          <strong>Error:</strong> {error}
        </div>
      )}
    </div>
  );
}

export default Test;
