import "dotenv/config";

export default ({ config }) => ({
  ...config,
  extra: {
    api_url: process.env.API_URL,
  },
});