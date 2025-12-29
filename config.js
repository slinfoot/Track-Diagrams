const CONFIG = {
  // Update this URL when deploying to production
  // API_BASE_URL: 'http://localhost:3000/api/routes'
  API_BASE_URL: 'https://track-diagrams-server.onrender.com/api/routes'
};

// Export for Node scripts (sync, tooling). In browser this leaves global `CONFIG`.
if (typeof module !== 'undefined' && module.exports) {
  module.exports = CONFIG;
}
