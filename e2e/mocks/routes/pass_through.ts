export const VRR_TEST_API_BASE_URL = "https://openservice-test.vrr.de/";

export default [
  {
    id: "pass-through",
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
