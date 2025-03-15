"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { createClient } from "@/utils/supabase/client";

// Create the Analytics context
const AnalyticsContext = createContext();

export function AnalyticsProvider({ children }) {
  const [analyticsData, setAnalyticsData] = useState({
    isLoading: true,
    data: null,
    error: null,
    lastFetched: null,
  });
  const supabase = createClient();

  // Fetch analytics data when user is authenticated and page is loaded
  useEffect(() => {
    const fetchAnalyticsData = async () => {
      try {
        // Get current user to ensure we're authenticated
        const { data: { session } } = await supabase.auth.getSession();
        
        if (session?.user) {
          // Only make the initial API call once per page refresh
          const cachedData = sessionStorage.getItem('analyticsData');
          
          if (cachedData) {
            // Use cached data if available
            setAnalyticsData(JSON.parse(cachedData));
          } else {
            // Make API call if no cached data
            setAnalyticsData(prev => ({ ...prev, isLoading: true }));
            
            const response = await fetch('/api/linkedin/analytics');
            if (response.ok) {
              const data = await response.json();
              const newAnalyticsData = {
                isLoading: false,
                data: data,
                error: null,
                lastFetched: new Date().toISOString(),
              };
              
              // Update state and cache
              setAnalyticsData(newAnalyticsData);
              sessionStorage.setItem('analyticsData', JSON.stringify(newAnalyticsData));
            } else {
              throw new Error('Failed to fetch analytics data');
            }
          }
        }
      } catch (error) {
        console.error("Failed to fetch analytics data:", error);
        setAnalyticsData({
          isLoading: false,
          data: null,
          error: error.message || 'An error occurred while fetching analytics data',
          lastFetched: new Date().toISOString(),
        });
      }
    };

    // Fetch data on auth state change
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
      if (event === 'SIGNED_IN') {
        fetchAnalyticsData();
      } else if (event === 'SIGNED_OUT') {
        // Clear analytics data on sign out
        setAnalyticsData({
          isLoading: true,
          data: null,
          error: null,
          lastFetched: null,
        });
        sessionStorage.removeItem('analyticsData');
      }
    });

    // Initial fetch
    fetchAnalyticsData();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // Function to refresh analytics data on demand
  const refreshAnalyticsData = async () => {
    try {
      setAnalyticsData(prevState => ({ ...prevState, isLoading: true }));
      
      const response = await fetch('/api/linkedin/analytics');
      if (response.ok) {
        const data = await response.json();
        const newAnalyticsData = {
          isLoading: false,
          data: data,
          error: null,
          lastFetched: new Date().toISOString(),
        };
        
        // Update state and cache
        setAnalyticsData(newAnalyticsData);
        sessionStorage.setItem('analyticsData', JSON.stringify(newAnalyticsData));
        return newAnalyticsData;
      } else {
        throw new Error('Failed to fetch analytics data');
      }
    } catch (error) {
      console.error("Failed to refresh analytics data:", error);
      const errorState = {
        isLoading: false,
        data: analyticsData.data, // Keep old data if available
        error: error.message || 'An error occurred while refreshing analytics data',
        lastFetched: analyticsData.lastFetched,
      };
      setAnalyticsData(errorState);
      return errorState;
    }
  };

  return (
    <AnalyticsContext.Provider value={{ 
      analyticsData, 
      refreshAnalyticsData 
    }}>
      {children}
    </AnalyticsContext.Provider>
  );
}

// Custom hook to use the Analytics context
export function useAnalytics() {
  const context = useContext(AnalyticsContext);
  if (context === undefined) {
    throw new Error("useAnalytics must be used within an AnalyticsProvider");
  }
  return context;
} 