/**
 * Fetches LinkedIn parameter IDs based on keywords and type
 *
 * @param {string} type - The type of parameter (LOCATION, COMPANY, INDUSTRY, etc.)
 * @param {string} keywords - The search keywords
 * @param {number} limit - Optional limit for results (default: 10)
 * @returns {Promise<Array>} - Array of parameter objects with id and title
 */
export async function fetchLinkedInParameterIds(type, keywords, limit = 10) {
  try {
    // Add retry logic
    const maxRetries = 3;
    let retryCount = 0;
    let lastError = null;

    while (retryCount < maxRetries) {
      try {
        const response = await fetch(
          `/api/linkedin/search/parameters?type=${type}&keywords=${encodeURIComponent(
            keywords
          )}&limit=${limit}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          const error = await response.json();
          throw new Error(
            error.message || `Failed to fetch ${type} parameters`
          );
        }

        const data = await response.json();
        return data.items || [];
      } catch (error) {
        lastError = error;
        retryCount++;
        if (retryCount < maxRetries) {
          // Wait before retrying (exponential backoff)
          await new Promise((resolve) =>
            setTimeout(resolve, Math.pow(2, retryCount) * 1000)
          );
        }
      }
    }

    // If we've exhausted all retries, throw the last error
    throw lastError;
  } catch (error) {
    console.error(`Error fetching ${type} parameters:`, error);
    throw error;
  }
}

/**
 * Parameter types supported by LinkedIn search
 */
export const PARAMETER_TYPES = {
  LOCATION: "LOCATION",
  COMPANY: "COMPANY",
  INDUSTRY: "INDUSTRY",
  SCHOOL: "SCHOOL",
  FUNCTION: "FUNCTION", // Job function
  TITLE: "TITLE", // Job title
  SKILL: "SKILL",
};
