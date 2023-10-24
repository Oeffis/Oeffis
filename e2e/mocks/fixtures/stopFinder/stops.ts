export const stops = [
  {
    "id": "poiID:70667:5513000:-1:Gelsenkirchen Hauptbahnhof Bahnhofsvorplatz:Gelsenkirchen:Gelsenkirchen Hauptbahnhof Bahnhofsvorplatz:ANY:POI:790425:5288652:MRCV:nrw",
    "name": "Gelsenkirchen, Gelsenkirchen Hauptbahnhof Bahnhofsvorplatz",
    "disassembledName": "Gelsenkirchen Hauptbahnhof Bahnhofsvorplatz",
    "coord": [
      5288652.0,
      790425.0
    ],
    "type": "poi",
    "matchQuality": 243,
    "isBest": false,
    "parent": {
      "id": "placeID:5513000:-1",
      "name": "Gelsenkirchen",
      "type": "locality"
    }
  },
  {
    "id": "poiID:70666:5513000:-1:Gelsenkirchen Hauptbahnhof Südausgang:Gelsenkirchen:Gelsenkirchen Hauptbahnhof Südausgang:ANY:POI:790698:5288992:MRCV:nrw",
    "name": "Gelsenkirchen, Gelsenkirchen Hauptbahnhof Südausgang",
    "disassembledName": "Gelsenkirchen Hauptbahnhof Südausgang",
    "coord": [
      5288992.0,
      790698.0
    ],
    "type": "poi",
    "matchQuality": 244,
    "isBest": false,
    "parent": {
      "id": "placeID:5513000:-1",
      "name": "Gelsenkirchen",
      "type": "locality"
    }
  },
  {
    "id": "poiID:65953:5513000:-1:Parkhaus Hauptbahnhof-Süd:Gelsenkirchen:Parkhaus Hauptbahnhof-Süd:ANY:POI:790858:5288938:MRCV:nrw",
    "name": "Gelsenkirchen, Parkhaus Hauptbahnhof-Süd",
    "disassembledName": "Parkhaus Hauptbahnhof-Süd",
    "coord": [
      5288938.0,
      790858.0
    ],
    "type": "poi",
    "matchQuality": 243,
    "isBest": false,
    "parent": {
      "id": "placeID:5513000:-1",
      "name": "Gelsenkirchen",
      "type": "locality"
    }
  },
  {
    "id": "poiID:71952:5513000:-1:Hauptbahnhof Parkhaus:Gelsenkirchen:Hauptbahnhof Parkhaus:ANY:POI:790652:5288935:MRCV:nrw",
    "name": "Gelsenkirchen, Hauptbahnhof Parkhaus",
    "disassembledName": "Hauptbahnhof Parkhaus",
    "coord": [
      5288935.0,
      790652.0
    ],
    "type": "poi",
    "matchQuality": 245,
    "isBest": false,
    "parent": {
      "id": "placeID:5513000:-1",
      "name": "Gelsenkirchen",
      "type": "locality"
    }
  },
  {
    "id": "de:05513:5613",
    "isGlobalId": true,
    "name": "Gelsenkirchen, Hbf",
    "disassembledName": "Hbf",
    "coord": [
      5288900.0,
      790614.0
    ],
    "type": "stop",
    "matchQuality": 993,
    "isBest": true,
    "productClasses": [
      0,
      1,
      4,
      5,
      7,
      10
    ],
    "parent": {
      "id": "placeID:5513000:9",
      "name": "Gelsenkirchen",
      "type": "locality"
    },
    "properties": {
      "stopId": "20005613"
    }
  },
  {
    "id": "poiID:68760:5315000:-1:KVB-Kundencenter Dom/Hbf:Köln:KVB-Kundencenter Dom/Hbf:ANY:POI:774580:5388991:MRCV:nrw",
    "name": "Köln, KVB-Kundencenter Dom/Hbf",
    "disassembledName": "KVB-Kundencenter Dom/Hbf",
    "coord": [5388991.0, 774580.0],
    "type": "poi",
    "matchQuality": 240,
    "isBest": false,
    "parent": {
      "id": "placeID:5315000:-1",
      "name": "Köln",
      "type": "locality"
    }
  },
  {
    "id": "de:05315:11201",
    "isGlobalId": true,
    "name": "Köln, Köln Hbf",
    "disassembledName": "Köln Hbf",
    "coord": [5388777.0, 774642.0],
    "type": "stop",
    "matchQuality": 989,
    "isBest": true,
    "productClasses": [0, 1],
    "parent": {
      "id": "placeID:5315000:1",
      "name": "Köln",
      "type": "locality"
    },
    "properties": { "stopId": "22000008" }
  },
  {
    "id": "de:05315:11212",
    "isGlobalId": true,
    "name": "Köln, Breslauer Platz/Hbf",
    "disassembledName": "Breslauer Platz/Hbf",
    "coord": [5388784.0, 774828.0],
    "type": "stop",
    "matchQuality": 982,
    "isBest": false,
    "productClasses": [0, 4, 5],
    "parent": {
      "id": "placeID:5315000:1",
      "name": "Köln",
      "type": "locality"
    },
    "properties": { "stopId": "22000009" }
  },
  {
    "id": "de:05315:11211",
    "isGlobalId": true,
    "name": "Köln, Dom/Hbf",
    "disassembledName": "Dom/Hbf",
    "coord": [5388994.0, 774457.0],
    "type": "stop",
    "matchQuality": 986,
    "isBest": false,
    "productClasses": [4, 5],
    "parent": {
      "id": "placeID:5315000:1",
      "name": "Köln",
      "type": "locality"
    },
    "properties": { "stopId": "22000752" }
  }
];

export type Stop = typeof stops[number];
