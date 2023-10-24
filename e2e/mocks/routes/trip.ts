
export default [
  {
    id: "trip",
    url: "/static03/XML_TRIP_REQUEST2",
    method: "GET",
    variants: [
      {
        id: "GE to K",
        type: "file",
        options: {
          path: "mocks/fixtures/trip/geToK.json",
          status: 200
        }
      }
    ]
  }
];
