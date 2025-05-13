import { QueryClient } from "@tanstack/react-query";

/**
 * Checks if the response is ok, throws an error if not
 * @param {Response} res - The fetch response
 * @returns {Promise<Response>} - The response if it's ok
 * @throws {Error} - If the response is not ok
 */
async function throwIfResNotOk(res) {
  if (!res.ok) {
    let errorText;
    try {
      const errorData = await res.json();
      errorText = errorData.message || `Error: ${res.status} ${res.statusText}`;
    } catch (e) {
      errorText = `Error: ${res.status} ${res.statusText}`;
    }
    throw new Error(errorText);
  }
  return res;
}

/**
 * Makes an API request
 * @param {string} method - The HTTP method
 * @param {string} endpoint - The API endpoint
 * @param {Object} data - The data to send
 * @returns {Promise<any>} - The response data
 */
export async function apiRequest(method, endpoint, data) {
  const options = {
    method,
    headers: {
      "Content-Type": "application/json",
    },
  };

  if (data && method !== "GET") {
    options.body = JSON.stringify(data);
  }

  const res = await fetch(endpoint, options);
  await throwIfResNotOk(res);
  return res.json();
}

/**
 * Creates a query function
 * @param {Object} options - The query options
 * @param {string} options.on401 - What to do on 401 errors
 * @returns {Function} - The query function
 */
export const getQueryFn = (options) => {
  return async ({ queryKey }) => {
    const [endpoint] = queryKey;
    try {
      const res = await fetch(endpoint);
      
      if (res.status === 401 && options?.on401 === "returnNull") {
        return null;
      }
      
      await throwIfResNotOk(res);
      return res.json();
    } catch (error) {
      throw error;
    }
  };
};

// Set up React Query client
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 5 * 60 * 1000, // 5 minutes
      queryFn: getQueryFn({ on401: "throw" }),
    },
  },
});