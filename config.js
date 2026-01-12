const PROD_API = 'https://track-diagrams-server.onrender.com/api/routes';
const DEV_API = 'http://127.0.0.1:3000/api/routes';

let selectedApi = PROD_API;

// Auto-detect environment
if (typeof window !== 'undefined') {
  const hostname = window.location.hostname;
  const protocol = window.location.protocol;
  
  // Use DEV API if running on localhost, 127.0.0.1, or opened as a local file
  if (hostname === 'localhost' || hostname === '127.0.0.1' || protocol === 'file:') {
    selectedApi = DEV_API;
    console.log('Running locally, using DEV API:', DEV_API);
  } else {
    console.log('Running remotely, using PROD API:', PROD_API);
  }
}

const CONFIG = {
  API_BASE_URL: selectedApi 
};

// Export for Node scripts (sync, tooling). In browser this leaves global `CONFIG`.
if (typeof module !== 'undefined' && module.exports) {
  module.exports = CONFIG;
}
