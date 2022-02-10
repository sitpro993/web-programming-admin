module.exports = {
  reactStrictMode: true,
  cssModules: true,
  images: {
    domains: ["res.cloudinary.com"],
  },
  env: {
    //API_URL: "https://web-programming-api.herokuapp.com",
    API_URL: "http://localhost:5000",
    BASE_URL: "http://localhost:3001",
    CLOUDINARY_URL:
      "cloudinary://948981829889381:2949tnH2B_D54DJIjZiXqdClhR4@beeyou",
    CLOUD_NAME: "beeyou",
    CLOUD_UPDATE_PRESET: "phaicuen",
  },
};
