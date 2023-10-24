export const VRR_TEST_API_BASE_URL = "https://openservice-test.vrr.de/";

export default [
  {
    id: "passThrough",
    url: "/*",
    variants: [
      {
        id: "VRR-API",
        type: "proxy",
        options: {
          host: VRR_TEST_API_BASE_URL
        }
      }
    ]
  }
];
