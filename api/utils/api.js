/**
 * Safe fetch utility to prevent syntax crashes when calling .json() on non-JSON responses.
 * 
 * Inspects 'content-type', handles Vercel/Express HTML fallbacks, and standardizes error output.
 * 
 * @param {string} url - The endpoint URL to fetch
 * @param {RequestInit} [options={}] - Standard fetch options
 * @returns {Promise<any>} Parsed JSON response or structured error object
 */
export async function safeFetchJson(url, options = {}) {
  const fetchOptions = {
    credentials: 'include',
    ...options,
    headers: {
      Accept: 'application/json',
      ...options.headers,
    },
  };

  let res;
  try {
    res = await fetch(url, fetchOptions);
  } catch (networkErr) {
    return {
      success: false,
      statusCode: 0,
      message: `Network error: Unable to connect to server. Please check your internet connection or backend server status.`,
    };
  }

  const contentType = res.headers.get('content-type') || '';
  let data;

  if (contentType.includes('application/json')) {
    try {
      data = await res.json();
    } catch (parseErr) {
      return {
        success: false,
        statusCode: res.status,
        message: 'Invalid JSON payload received from server.',
      };
    }
  } else {
    const text = await res.text();
    const cleanSnippet = text.replace(/<[^>]*>?/gm, ' ').replace(/\s+/g, ' ').trim().slice(0, 120);

    return {
      success: false,
      statusCode: res.status,
      message: res.ok
        ? 'Unexpected non-JSON response received from server.'
        : `Server Error (${res.status}): ${cleanSnippet || res.statusText || 'Unknown error'}`,
    };
  }

  if (!res.ok && data && typeof data === 'object') {
    if (data.success === undefined) {
      data.success = false;
    }
    if (!data.statusCode) {
      data.statusCode = res.status;
    }
    if (!data.message) {
      data.message = `Request failed with status ${res.status}`;
    }
  }

  return data;
}