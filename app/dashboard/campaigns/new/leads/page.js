"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  ChevronRight,
  ChevronDown,
  ArrowRight,
  Search,
  ChevronLeft,
  AlertCircle,
  LinkIcon,
} from "lucide-react";
import { useLinkedIn } from "@/components/contexts/LinkedInContext";
import { useCampaignStore } from "@/app/store/campaignStore";
import { useQuery } from "@tanstack/react-query";

export default function AddLeadsPage() {
  const router = useRouter();
  const { linkedInStatus } = useLinkedIn();
  const {
    selectedLeads,
    setSelectedLeads,
    addSelectedLead,
    removeSelectedLead,
  } = useCampaignStore();
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedSections, setExpandedSections] = useState({});
  const [maxLeads, setMaxLeads] = useState(0);
  const [exclusions, setExclusions] = useState({
    excludeProfilesWithoutPhotos: false,
    excludeFirstDegreeConnections: false,
    premiumUsersOnly: false,
    includeLeadsFromOtherCampaigns: false,
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const resultsPerPage = 10;

  // Advanced search parameters
  const [advancedSearch, setAdvancedSearch] = useState({
    company: "",
    location: "",
    industry: "",
    school: "",
    networkDistance: [],
    sortBy: "relevance",
  });

  // Track selected profiles
  const [selectedProfiles, setSelectedProfiles] = useState([]);

  // Add state for checkout URL
  const [checkoutUrl, setCheckoutUrl] = useState(null);

  // Use React Query for search
  const {
    data: searchResults = [],
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: [
      "linkedinSearch",
      searchQuery,
      advancedSearch,
      exclusions,
      currentPage,
    ],
    queryFn: async () => {
      if (!searchQuery.trim()) {
        return [];
      }

      // Check LinkedIn status before performing search
      if (!linkedInStatus.connected) {
        throw new Error(
          "LinkedIn account not connected. Please connect your LinkedIn account in settings."
        );
      }

      // Prepare search parameters based on form values
      const searchParams = {
        keywords: searchQuery,
      };

      // Only add parameters if they have values
      if (advancedSearch.company) searchParams.company = advancedSearch.company;
      if (advancedSearch.location)
        searchParams.location = advancedSearch.location;
      if (advancedSearch.industry)
        searchParams.industry = advancedSearch.industry;
      if (advancedSearch.school) searchParams.school = advancedSearch.school;

      // Only add network distance if there are options selected
      if (advancedSearch.networkDistance.length > 0) {
        searchParams.networkDistance = advancedSearch.networkDistance;
      }

      // Apply exclusions
      if (
        exclusions.excludeFirstDegreeConnections &&
        !searchParams.networkDistance
      ) {
        searchParams.networkDistance = [
          "SECOND_DEGREE",
          "THIRD_DEGREE_AND_BEYOND",
        ];
      }

      if (advancedSearch.sortBy) {
        searchParams.sortBy = advancedSearch.sortBy;
      }

      const response = await fetch("/api/linkedin/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(searchParams),
      });

      if (!response.ok) {
        const errorData = await response.json();

        // Check if this is a subscription required error with checkout URL
        if (
          errorData.error === "Subscription required" &&
          errorData.checkoutUrl
        ) {
          // Store the checkout URL in state to handle the redirect
          setCheckoutUrl(errorData.checkoutUrl);
          throw new Error("Subscription required");
        }

        throw new Error(
          errorData.error ||
            `Search failed: ${response.status} ${response.statusText}`
        );
      }

      const results = await response.json();

      // Check if results indicate subscription required
      if (results.error === "Subscription required" && results.checkoutUrl) {
        // Store the checkout URL in state to handle the redirect
        setCheckoutUrl(results.checkoutUrl);
        throw new Error("Subscription required");
      }

      if (!results || !Array.isArray(results)) {
        throw new Error("Invalid response format from search API");
      }

      return results;
    },
    enabled: false, // Don't run query on mount
  });

  // Handle redirect to checkout when needed
  useEffect(() => {
    if (checkoutUrl) {
      router.push(checkoutUrl);
    }
  }, [checkoutUrl, router]);

  // Toggle section expansion
  const toggleSection = (section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  // Handle exclusion checkbox changes
  const handleExclusionChange = (exclusion) => {
    setExclusions((prev) => ({
      ...prev,
      [exclusion]: !prev[exclusion],
    }));
  };

  // Handle advanced search parameter changes
  const handleAdvancedSearchChange = (field, value) => {
    setAdvancedSearch((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Handle search form submission
  const handleSearch = (e) => {
    e?.preventDefault();
    refetch();
    setCurrentPage(1); // Reset to first page when performing a new search
  };

  // Toggle lead selection
  const toggleLeadSelection = (profile) => {
    if (selectedProfiles.some((p) => p.identifier === profile.identifier)) {
      setSelectedProfiles(
        selectedProfiles.filter((p) => p.identifier !== profile.identifier)
      );
      removeSelectedLead(profile.identifier);
    } else {
      setSelectedProfiles([...selectedProfiles, profile]);
      addSelectedLead(profile);
    }
  };

  // Save selected leads and go to next step
  const goToNextStep = () => {
    setSelectedLeads(selectedProfiles);
    router.push("/dashboard/campaigns/new/sequence");
  };

  // Initialize selected profiles from store on mount
  useEffect(() => {
    setSelectedProfiles(selectedLeads);
  }, [selectedLeads]);

  // Change page
  const handlePageChange = (newPage) => {
    if (newPage < 1 || newPage > Math.ceil(totalResults / resultsPerPage))
      return;
    setCurrentPage(newPage);
  };

  // Get current page results
  const getCurrentPageResults = () => {
    const startIndex = (currentPage - 1) * resultsPerPage;
    const endIndex = startIndex + resultsPerPage;
    return searchResults.slice(startIndex, endIndex);
  };

  // Filter sections
  const filterSections = [
    {
      id: "connections",
      title: "Connections",
      content: (
        <div className="space-y-2">
          <div className="flex flex-col space-y-1">
            <label className="text-[#A3A3A3] text-sm">Network Distance</label>
            <div className="flex flex-wrap gap-2">
              {["FIRST_DEGREE", "SECOND_DEGREE", "THIRD_DEGREE_AND_BEYOND"].map(
                (distance) => {
                  const distLabel =
                    distance === "FIRST_DEGREE"
                      ? "1st connections"
                      : distance === "SECOND_DEGREE"
                      ? "2nd connections"
                      : "3rd+ connections";
                  return (
                    <div key={distance} className="flex items-center">
                      <input
                        type="checkbox"
                        id={`distance-${distance}`}
                        checked={advancedSearch.networkDistance.includes(
                          distance
                        )}
                        onChange={() => {
                          if (
                            advancedSearch.networkDistance.includes(distance)
                          ) {
                            handleAdvancedSearchChange(
                              "networkDistance",
                              advancedSearch.networkDistance.filter(
                                (d) => d !== distance
                              )
                            );
                          } else {
                            handleAdvancedSearchChange("networkDistance", [
                              ...advancedSearch.networkDistance,
                              distance,
                            ]);
                          }
                        }}
                        className="h-4 w-4 rounded border-[#2A2A2A] bg-black text-blue-600"
                      />
                      <label
                        htmlFor={`distance-${distance}`}
                        className="ml-2 text-[#A3A3A3] text-sm"
                      >
                        {distLabel}
                      </label>
                    </div>
                  );
                }
              )}
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "companies",
      title: "Companies",
      content: (
        <div className="space-y-3">
          <div>
            <label className="block text-[#A3A3A3] text-sm mb-1">
              Current Company
            </label>
            <Input
              type="text"
              value={advancedSearch.company}
              onChange={(e) =>
                handleAdvancedSearchChange("company", e.target.value)
              }
              placeholder="Enter company name"
              className="bg-black border-[#2A2A2A] text-white"
            />
          </div>
        </div>
      ),
    },
    {
      id: "locations",
      title: "Locations",
      content: (
        <div>
          <label className="block text-[#A3A3A3] text-sm mb-1">Location</label>
          <Input
            type="text"
            value={advancedSearch.location}
            onChange={(e) =>
              handleAdvancedSearchChange("location", e.target.value)
            }
            placeholder="Enter location"
            className="bg-black border-[#2A2A2A] text-white"
          />
        </div>
      ),
    },
    {
      id: "industries",
      title: "Industries",
      content: (
        <div>
          <label className="block text-[#A3A3A3] text-sm mb-1">Industry</label>
          <Input
            type="text"
            value={advancedSearch.industry}
            onChange={(e) =>
              handleAdvancedSearchChange("industry", e.target.value)
            }
            placeholder="Enter industry"
            className="bg-black border-[#2A2A2A] text-white"
          />
        </div>
      ),
    },
    {
      id: "schools",
      title: "Schools",
      content: (
        <div>
          <label className="block text-[#A3A3A3] text-sm mb-1">School</label>
          <Input
            type="text"
            value={advancedSearch.school}
            onChange={(e) =>
              handleAdvancedSearchChange("school", e.target.value)
            }
            placeholder="Enter school name"
            className="bg-black border-[#2A2A2A] text-white"
          />
        </div>
      ),
    },
    {
      id: "sortOptions",
      title: "Sort Options",
      content: (
        <div>
          <label className="block text-[#A3A3A3] text-sm mb-1">Sort By</label>
          <select
            value={advancedSearch.sortBy}
            onChange={(e) =>
              handleAdvancedSearchChange("sortBy", e.target.value)
            }
            className="w-full p-2 bg-black border border-[#2A2A2A] rounded-md text-white"
          >
            <option value="relevance">Relevance</option>
            <option value="date">Date</option>
          </select>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6 p-6 bg-black">
      {/* Step Indicator */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-4">
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full bg-[#C9E5FF] text-black flex items-center justify-center font-bold">
              1
            </div>
            <span className="ml-2 text-white font-medium">Add Leads</span>
          </div>
          <div className="w-8 h-0.5 bg-[#2A2A2A]"></div>
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full bg-[#2A2A2A] text-[#A3A3A3] flex items-center justify-center font-bold">
              2
            </div>
            <span className="ml-2 text-[#A3A3A3] font-medium">
              Set Sequence
            </span>
          </div>
          <div className="w-8 h-0.5 bg-[#2A2A2A]"></div>
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full bg-[#2A2A2A] text-[#A3A3A3] flex items-center justify-center font-bold">
              3
            </div>
            <span className="ml-2 text-[#A3A3A3] font-medium">
              Review And Publish
            </span>
          </div>
        </div>
        <Button
          onClick={goToNextStep}
          className="bg-blue-600 hover:bg-blue-700 text-white"
        >
          Next
        </Button>
      </div>

      {/* LinkedIn Connection Warning */}
      {linkedInStatus.checked && !linkedInStatus.connected && (
        <div className="p-4 bg-yellow-900/20 border border-yellow-800 rounded-md text-yellow-200 mb-6 flex items-center">
          <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0" />
          <div className="flex-1">
            <p className="font-medium">LinkedIn account not connected</p>
            <p className="text-sm mt-1">
              You need to connect your LinkedIn account to search for leads.
            </p>
          </div>
          <Button
            className="bg-yellow-600 hover:bg-yellow-700 text-white ml-4"
            onClick={() => router.push("/dashboard/settings/")}
          >
            <LinkIcon className="h-4 w-4 mr-2" />
            Connect LinkedIn
          </Button>
        </div>
      )}

      {/* Main Content */}
      <div className="space-y-6">
        {/* Search Form */}
        <form onSubmit={handleSearch} className="space-y-4">
          <div className="space-y-2">
            <label className="block text-white font-medium">
              Who would you like to find? (eg. Job title, company name, etc.)
            </label>
            <div className="relative">
              <Input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="eg. project manager OR manager OR senior project manager"
                className="bg-black border-[#2A2A2A] text-white pr-10"
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-[#A3A3A3] hover:text-white"
                disabled={isLoading}
              >
                <Search className="h-5 w-5" />
              </button>
            </div>
          </div>

          <div className="flex justify-end">
            <Button
              type="submit"
              disabled={isLoading}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              {isLoading ? "Searching..." : "Search LinkedIn"}{" "}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </form>

        {/* Error Message */}
        {error && error.message !== "Subscription required" && (
          <div className="p-3 bg-red-900/20 border border-red-800 rounded-md text-red-400">
            {typeof error === "string"
              ? error
              : error instanceof Error
              ? error.message
              : "An error occurred during search"}
          </div>
        )}

        {/* Subscription Required Message - Optional if you want to show something before redirect */}
        {error && error.message === "Subscription required" && !checkoutUrl && (
          <div className="p-3 bg-yellow-900/20 border border-yellow-800 rounded-md text-yellow-400">
            Subscription required. Redirecting to checkout...
          </div>
        )}

        {/* Search Results */}
        {searchResults.length > 0 && (
          <div className="mt-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-white text-lg font-medium">Search Results</h3>
              <div className="flex items-center">
                <span className="text-[#A3A3A3] mr-4">
                  {totalResults} leads found
                </span>
                <span className="text-blue-400">
                  {selectedProfiles.length} selected
                </span>
              </div>
            </div>

            <div className="space-y-4">
              {getCurrentPageResults().map((profile) => (
                <div
                  key={profile.identifier || profile.id}
                  className={`p-4 border rounded-lg transition-colors ${
                    selectedProfiles.some(
                      (p) => p.identifier === profile.identifier
                    )
                      ? "bg-blue-900/20 border-blue-800"
                      : "bg-[#0C0C0C] border-[#2A2A2A] hover:border-[#3A3A3A]"
                  }`}
                >
                  <div className="flex">
                    <div className="mr-4 flex items-center">
                      <input
                        type="checkbox"
                        checked={selectedProfiles.some(
                          (p) => p.identifier === profile.identifier
                        )}
                        onChange={() => toggleLeadSelection(profile)}
                        className="h-5 w-5 rounded border-[#2A2A2A] bg-black text-blue-600"
                      />
                    </div>

                    {profile.profile_picture && (
                      <div className="mr-4 flex-shrink-0">
                        <img
                          src={profile.profile_picture}
                          alt={profile.name}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                      </div>
                    )}

                    <div className="flex-1">
                      <div className="flex justify-between">
                        <div>
                          <h4 className="text-white font-medium">
                            {profile.name}
                          </h4>
                          <p className="text-[#A3A3A3] text-sm">
                            {profile.headline}
                          </p>
                          <div className="flex items-center mt-1">
                            <span className="text-[#A3A3A3] text-xs">
                              {profile.location}
                            </span>
                            {profile.company && (
                              <>
                                <span className="mx-1 text-[#A3A3A3]">•</span>
                                <span className="text-[#A3A3A3] text-xs">
                                  {profile.company}
                                </span>
                              </>
                            )}
                          </div>
                        </div>
                        <div className="flex flex-col items-end">
                          <div className="text-xs px-2 py-1 bg-[#1A1A1A] rounded-full text-[#A3A3A3]">
                            {profile.network_distance === "FIRST_DEGREE"
                              ? "1st"
                              : profile.network_distance === "SECOND_DEGREE"
                              ? "2nd"
                              : profile.network_distance ===
                                "THIRD_DEGREE_AND_BEYOND"
                              ? "3rd+"
                              : profile.network_distance}
                          </div>
                          {profile.shared_connections_count > 0 && (
                            <span className="text-xs text-[#A3A3A3] mt-1">
                              {profile.shared_connections_count} shared
                              connection
                              {profile.shared_connections_count !== 1
                                ? "s"
                                : ""}
                            </span>
                          )}
                        </div>
                      </div>
                      {profile.profile_url && (
                        <div className="mt-2">
                          <a
                            href={profile.profile_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs text-blue-400 hover:underline"
                          >
                            View LinkedIn Profile
                          </a>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            {totalResults > resultsPerPage && (
              <div className="flex justify-center items-center mt-6 space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="border-[#2A2A2A] text-[#A3A3A3] hover:text-white"
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>

                <div className="flex items-center space-x-1">
                  {Array.from(
                    {
                      length: Math.min(
                        5,
                        Math.ceil(totalResults / resultsPerPage)
                      ),
                    },
                    (_, i) => {
                      const pageNumber = i + 1;
                      return (
                        <Button
                          key={pageNumber}
                          variant={
                            currentPage === pageNumber ? "default" : "outline"
                          }
                          size="sm"
                          onClick={() => handlePageChange(pageNumber)}
                          className={
                            currentPage === pageNumber
                              ? "bg-blue-600 text-white"
                              : "border-[#2A2A2A] text-[#A3A3A3] hover:text-white"
                          }
                        >
                          {pageNumber}
                        </Button>
                      );
                    }
                  )}

                  {Math.ceil(totalResults / resultsPerPage) > 5 && (
                    <span className="text-[#A3A3A3]">...</span>
                  )}
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={
                    currentPage === Math.ceil(totalResults / resultsPerPage)
                  }
                  className="border-[#2A2A2A] text-[#A3A3A3] hover:text-white"
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            )}
          </div>
        )}

        {/* Advanced Filters */}
        <div className="mt-6">
          <h3 className="text-white font-medium mb-4">
            Want to be more precise?
          </h3>

          {/* Filter Sections */}
          <div className="space-y-2">
            {filterSections.map((section) => (
              <div
                key={section.id}
                className="border border-[#2A2A2A] rounded-md overflow-hidden"
              >
                <button
                  type="button"
                  className="w-full p-3 flex items-center justify-between bg-[#0C0C0C] text-left"
                  onClick={() => toggleSection(section.id)}
                >
                  <span className="text-white">{section.title}</span>
                  {expandedSections[section.id] ? (
                    <ChevronDown className="h-5 w-5 text-[#A3A3A3]" />
                  ) : (
                    <ChevronRight className="h-5 w-5 text-[#A3A3A3]" />
                  )}
                </button>

                {expandedSections[section.id] && (
                  <div className="p-3 bg-black border-t border-[#2A2A2A]">
                    {section.content}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Apply Filters Button */}
          <div className="mt-4 flex justify-end">
            <Button
              onClick={handleSearch}
              className="bg-[#2A2A2A] hover:bg-[#3A3A3A] text-white"
            >
              Apply Filters
            </Button>
          </div>
        </div>

        {/* Maximum amount of leads */}
        <div className="mt-6">
          <h3 className="text-white font-medium mb-2">
            Maximum amount of leads:
          </h3>
          <div className="flex items-center space-x-4">
            <input
              type="range"
              min="0"
              max="2000"
              value={maxLeads}
              onChange={(e) => setMaxLeads(parseInt(e.target.value))}
              className="w-full h-2 bg-[#2A2A2A] rounded-lg appearance-none cursor-pointer"
              style={{
                background: `linear-gradient(to right, #0066FF 0%, #0066FF ${
                  maxLeads / 20
                }%, #2A2A2A ${maxLeads / 20}%, #2A2A2A 100%)`,
              }}
            />
            <span className="text-white font-medium min-w-[50px]">
              {maxLeads}
            </span>
          </div>
        </div>

        {/* Exclusion Options */}
        <div className="mt-6 space-y-3">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="excludeProfilesWithoutPhotos"
              checked={exclusions.excludeProfilesWithoutPhotos}
              onChange={() =>
                handleExclusionChange("excludeProfilesWithoutPhotos")
              }
              className="h-4 w-4 rounded border-[#2A2A2A] bg-black text-blue-600"
            />
            <label
              htmlFor="excludeProfilesWithoutPhotos"
              className="ml-2 text-[#A3A3A3]"
            >
              Exclude profiles without photos.
            </label>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="excludeFirstDegreeConnections"
              checked={exclusions.excludeFirstDegreeConnections}
              onChange={() =>
                handleExclusionChange("excludeFirstDegreeConnections")
              }
              className="h-4 w-4 rounded border-[#2A2A2A] bg-black text-blue-600"
            />
            <label
              htmlFor="excludeFirstDegreeConnections"
              className="ml-2 text-[#A3A3A3]"
            >
              Exclude 1st degree connections.
            </label>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="premiumUsersOnly"
              checked={exclusions.premiumUsersOnly}
              onChange={() => handleExclusionChange("premiumUsersOnly")}
              className="h-4 w-4 rounded border-[#2A2A2A] bg-black text-blue-600"
            />
            <label htmlFor="premiumUsersOnly" className="ml-2 text-[#A3A3A3]">
              Premium users only.
            </label>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="includeLeadsFromOtherCampaigns"
              checked={exclusions.includeLeadsFromOtherCampaigns}
              onChange={() =>
                handleExclusionChange("includeLeadsFromOtherCampaigns")
              }
              className="h-4 w-4 rounded border-[#2A2A2A] bg-black text-blue-600"
            />
            <label
              htmlFor="includeLeadsFromOtherCampaigns"
              className="ml-2 text-[#A3A3A3]"
            >
              Include leads from other campaigns.
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}
