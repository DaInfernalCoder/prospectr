"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChevronRight, ChevronDown, ArrowRight } from "lucide-react";

export default function AddLeadsPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedSections, setExpandedSections] = useState({});
  const [maxLeads, setMaxLeads] = useState(0);
  const [exclusions, setExclusions] = useState({
    excludeProfilesWithoutPhotos: false,
    excludeFirstDegreeConnections: false,
    premiumUsersOnly: false,
    includeLeadsFromOtherCampaigns: false
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [previewResults, setPreviewResults] = useState([]);
  const [error, setError] = useState(null);

  // Toggle section expansion
  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  // Handle exclusion checkbox changes
  const handleExclusionChange = (exclusion) => {
    setExclusions(prev => ({
      ...prev,
      [exclusion]: !prev[exclusion]
    }));
  };

  // Handle preview sample results
  const handlePreviewResults = async () => {
    if (!searchQuery.trim()) {
      setError("Please enter a search query");
      return;
    }

    setIsLoading(true);
    setError(null);
    
    try {
      // Prepare search parameters based on form values
      const searchParams = {
        name: searchQuery,
        jobTitle: searchQuery,
        // Add other parameters as they're implemented
      };
      
      // Call the existing LinkedIn search API
      const response = await fetch('/api/linkedin/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(searchParams)
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Search failed');
      }
      
      const results = await response.json();
      setPreviewResults(results);
      setShowPreview(true);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Navigate to next step
  const goToNextStep = () => {
    router.push('/dashboard/campaigns/new/sequence');
  };

  // Filter sections
  const filterSections = [
    { id: 'connections', title: 'Connections' },
    { id: 'industries', title: 'Industries' },
    { id: 'keywords', title: 'Specify keywords' },
    { id: 'currentCompanies', title: 'Current companies' },
    { id: 'pastCompanies', title: 'Past companies' },
    { id: 'profileLanguages', title: 'Profile languages' },
    { id: 'schools', title: 'Schools' },
    { id: 'locations', title: 'Locations' }
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
            <span className="ml-2 text-[#A3A3A3] font-medium">Set Sequence</span>
          </div>
          <div className="w-8 h-0.5 bg-[#2A2A2A]"></div>
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full bg-[#2A2A2A] text-[#A3A3A3] flex items-center justify-center font-bold">
              3
            </div>
            <span className="ml-2 text-[#A3A3A3] font-medium">Review And Publish</span>
          </div>
        </div>
        <Button 
          onClick={goToNextStep} 
          className="bg-blue-600 hover:bg-blue-700 text-white"
        >
          Next
        </Button>
      </div>

      {/* Main Content */}
      <div className="space-y-6">
        {/* Search Query */}
        <div className="space-y-2">
          <label className="block text-white font-medium">
            Who would you like to find? (eg. Job title, company name, etc.)
          </label>
          <Input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="eg. project manager OR manager OR senior project manager"
            className="bg-black border-[#2A2A2A] text-white"
          />
        </div>

        {/* Preview Button */}
        <div className="flex justify-end">
          <Button
            variant="outline"
            onClick={handlePreviewResults}
            disabled={isLoading}
            className="text-white border-[#2A2A2A]"
          >
            {isLoading ? "Loading..." : "Preview sample results"} <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>

        {/* Error Message */}
        {error && (
          <div className="p-3 bg-red-900/20 border border-red-800 rounded-md text-red-400">
            {error}
          </div>
        )}

        {/* Preview Results */}
        {showPreview && previewResults.length > 0 && (
          <div className="mt-4 p-4 bg-[#0C0C0C] border border-[#2A2A2A] rounded-lg">
            <h3 className="text-white font-medium mb-3">Preview Results</h3>
            <div className="space-y-3">
              {previewResults.slice(0, 5).map((profile) => (
                <div key={profile.id} className="p-3 bg-black border border-[#2A2A2A] rounded-md">
                  <div className="flex justify-between">
                    <div>
                      <h4 className="text-white font-medium">{profile.name}</h4>
                      <p className="text-[#A3A3A3] text-sm">{profile.headline}</p>
                      <div className="flex items-center mt-1">
                        <span className="text-[#A3A3A3] text-xs">{profile.location}</span>
                        {profile.company && (
                          <>
                            <span className="mx-1 text-[#A3A3A3]">•</span>
                            <span className="text-[#A3A3A3] text-xs">{profile.company}</span>
                          </>
                        )}
                      </div>
                    </div>
                    <div className="text-xs text-[#A3A3A3]">
                      {profile.network_distance === 'SECOND_DEGREE' ? '2nd' : 
                       profile.network_distance === 'THIRD_DEGREE' ? '3rd' : 
                       profile.network_distance}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {previewResults.length > 5 && (
              <div className="mt-3 text-center text-[#A3A3A3] text-sm">
                Showing 5 of {previewResults.length} results
              </div>
            )}
          </div>
        )}

        {/* Want to be more precise? */}
        <div className="mt-6">
          <h3 className="text-white font-medium mb-4">Want to be more precise?</h3>
          
          {/* Filter Sections */}
          <div className="space-y-2">
            {filterSections.map((section) => (
              <div 
                key={section.id}
                className="border border-[#2A2A2A] rounded-md overflow-hidden"
              >
                <button
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
                    <p className="text-[#A3A3A3]">Filter options for {section.title} will be implemented here</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Maximum amount of leads */}
        <div className="mt-6">
          <h3 className="text-white font-medium mb-2">Maximum amount of leads:</h3>
          <div className="flex items-center space-x-4">
            <input
              type="range"
              min="0"
              max="2000"
              value={maxLeads}
              onChange={(e) => setMaxLeads(parseInt(e.target.value))}
              className="w-full h-2 bg-[#2A2A2A] rounded-lg appearance-none cursor-pointer"
              style={{
                background: `linear-gradient(to right, #0066FF 0%, #0066FF ${maxLeads / 20}%, #2A2A2A ${maxLeads / 20}%, #2A2A2A 100%)`
              }}
            />
            <span className="text-white font-medium min-w-[50px]">{maxLeads}</span>
          </div>
        </div>

        {/* Exclusion Options */}
        <div className="mt-6 space-y-3">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="excludeProfilesWithoutPhotos"
              checked={exclusions.excludeProfilesWithoutPhotos}
              onChange={() => handleExclusionChange('excludeProfilesWithoutPhotos')}
              className="h-4 w-4 rounded border-[#2A2A2A] bg-black text-blue-600"
            />
            <label htmlFor="excludeProfilesWithoutPhotos" className="ml-2 text-[#A3A3A3]">
              Exclude profiles without photos.
            </label>
          </div>
          
          <div className="flex items-center">
            <input
              type="checkbox"
              id="excludeFirstDegreeConnections"
              checked={exclusions.excludeFirstDegreeConnections}
              onChange={() => handleExclusionChange('excludeFirstDegreeConnections')}
              className="h-4 w-4 rounded border-[#2A2A2A] bg-black text-blue-600"
            />
            <label htmlFor="excludeFirstDegreeConnections" className="ml-2 text-[#A3A3A3]">
              Exclude 1st degree connections.
            </label>
          </div>
          
          <div className="flex items-center">
            <input
              type="checkbox"
              id="premiumUsersOnly"
              checked={exclusions.premiumUsersOnly}
              onChange={() => handleExclusionChange('premiumUsersOnly')}
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
              onChange={() => handleExclusionChange('includeLeadsFromOtherCampaigns')}
              className="h-4 w-4 rounded border-[#2A2A2A] bg-black text-blue-600"
            />
            <label htmlFor="includeLeadsFromOtherCampaigns" className="ml-2 text-[#A3A3A3]">
              Include leads from other campaigns.
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}
