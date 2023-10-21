import {
  FootPathInfoClass,
  Leg as VrrLeg,
  Manoeuvre,
  PathDescriptionClass,
  Position,
  TurnDirection
} from "@oeffis/vrr_client/dist/vendor/VrrApiTypes";
import { Footpath } from "../../entity/footpath.entity";
import { FootpathMapperService } from "./footpathMapper.service";

let footpathMapper: FootpathMapperService;

beforeEach(() => {
  footpathMapper = new FootpathMapperService();
});

it.each([
  ["missing path descriptions",
    vrrFootpathLeg(vrrFootpathInfos(), undefined), false],
  ["missing footpath infos",
    vrrFootpathLeg(undefined, vrrPathDescriptions()), true],
  ["missing path descriptions + footpath infos",
    vrrFootpathLeg(), false],
  ["complete footpath information",
    vrrFootpathLeg(vrrFootpathInfos(), vrrPathDescriptions()), true]
])("check footpath leg information: %s", (_descr, vrrLeg, expectedResult) => {
  // Given
  // When
  const checkResult = footpathMapper.checkVrrFootpathIntegrity(vrrLeg);

  // Then
  expect(checkResult).toBe(expectedResult);
});

it.each([
  ["missing path descriptions",
    vrrInterchangeLeg(vrrFootpathInfos(), undefined), false],
  ["missing footpath infos",
    vrrInterchangeLeg(undefined, vrrPathDescriptions()), true],
  ["missing path descriptions + footpath infos",
    vrrInterchangeLeg(), false],
  ["complete footpath information",
    vrrInterchangeLeg(vrrFootpathInfos(), vrrPathDescriptions()), true]
])("check interchange footpath information: %s", (_descr, vrrLeg, expectedResult) => {
  // Given
  // When
  const checkResult = footpathMapper.checkVrrFootpathIntegrity(vrrLeg);

  // Then
  expect(checkResult).toBe(expectedResult);
});

it.each([
  ["footpath leg", vrrFootpathLeg(vrrFootpathInfos(), vrrPathDescriptions()),
    { totalDistance: 66, totalDuration: 50 } as Footpath],
  ["interchange leg", vrrInterchangeLeg(vrrFootpathInfos(), vrrPathDescriptions()),
    { totalDistance: 66, totalDuration: 50 } as Footpath]
])("map footpath with all fields given (%s).", (_descr, vrrLeg, expectedFootpath) => {
  // Given
  // When
  const mappedFootpath = footpathMapper.mapVrrFootpath(vrrLeg);

  // Then
  expect(mappedFootpath).toEqual(expectedFootpath);
});

it("map footpath with missing optional fields.", () => {
  // Given
  const vrrLegWithMissingFootpathInfo: VrrLeg = vrrInterchangeLeg(undefined, vrrPathDescriptions());

  const expectedFootpath: Footpath = {
    totalDistance: 66,
    totalDuration: 59
  } as Footpath;

  // When
  const mappedFootpath = footpathMapper.mapVrrFootpath(vrrLegWithMissingFootpathInfo);

  // Then
  expect(mappedFootpath).toEqual(expectedFootpath);
});

it("throw error if invalid footpath information.", () => {
  // Given
  const vrrInterchangeLegWithoutPathDescriptions: VrrLeg = vrrInterchangeLeg(vrrFootpathInfos(), undefined);

  // When & Then
  expect(() => footpathMapper.mapVrrFootpath(vrrInterchangeLegWithoutPathDescriptions))
    .toThrowError("leg has no valid footpath information");
});

function vrrFootpathLeg(
  footpathInfos?: FootPathInfoClass[],
  pathDescriptions?: PathDescriptionClass[]
): VrrLeg {

  return {
    transportation: {
      product: {
        class: 99,
        name: "footpath",
        iconId: 99
      }
    },
    footPathInfo: footpathInfos,
    pathDescriptions: pathDescriptions
  } as VrrLeg;
}

function vrrInterchangeLeg(
  footpathInfos?: FootPathInfoClass[],
  pathDescriptions?: PathDescriptionClass[]
): VrrLeg {

  return {
    transportation: {
      id: "sto:15X42:S:H:j23",
      name: "XB X42",
      number: "X42",
      product: {
        id: 31,
        class: 7,
        name: "XB",
        iconId: 5
      }
    },
    interchange: {
      desc: "Fussweg",
      type: 100,
      coords: [
        [51.1, 7.1]
      ]
    },
    footPathInfo: footpathInfos,
    pathDescriptions: pathDescriptions
  } as VrrLeg;
}

function vrrFootpathInfos(): FootPathInfoClass[] {

  return [
    {
      position: Position.Idest,
      duration: 50,
      footPathElem: []
    } as FootPathInfoClass
  ];
}

function vrrPathDescriptions(): PathDescriptionClass[] {

  return [
    {
      turnDirection: TurnDirection.Unknown,
      manoeuvre: Manoeuvre.Leave,
      name: "Ausstieg Niederflurbus rechts",
      coord: [
        5273346,
        777759
      ],
      duration: 0,
      cumDuration: 59,
      distance: 0,
      cumDistance: 66,
      fromCoordsIndex: 0,
      toCoordsIndex: 0
    },
    {
      turnDirection: TurnDirection.Left,
      manoeuvre: Manoeuvre.Turn,
      name: "Bahnsteig",
      coord: [
        5273549,
        777496
      ],
      duration: 59,
      cumDuration: 59,
      distance: 66,
      cumDistance: 66,
      fromCoordsIndex: 0,
      toCoordsIndex: 11
    },
    {
      turnDirection: TurnDirection.Unknown,
      manoeuvre: Manoeuvre.Enter,
      name: "Einstieg Zug",
      coord: [
        5273608,
        777507
      ],
      duration: 0,
      cumDuration: 59,
      distance: 0,
      cumDistance: 66,
      fromCoordsIndex: 11,
      toCoordsIndex: 12
    }
  ];
}
