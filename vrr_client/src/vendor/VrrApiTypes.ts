// To parse this data:
//
//   import { Convert, LOCATIONSUGGESTSchema, SERVINGLINESSchema, TRIPSchema } from "./file";
//
//   const lOCATIONSUGGESTSchema = Convert.toLOCATIONSUGGESTSchema(json);
//   const sERVINGLINESSchema = Convert.toSERVINGLINESSchema(json);
//   const tRIPSchema = Convert.toTRIPSchema(json);
//
// These functions will throw an error if the JSON doesn't
// match the expected interface, even if the JSON is valid.

/**
 * stopFinder
 */
export interface LOCATIONSUGGESTSchema {
  error?: Error;
  /**
   * points
   */
  locations?: Location[];
  properties?: any;
  serverInfo?: ServerInfo;
  systemMessages?: SystemMessage[];
  version: string;
}

export interface Error {
  message?: string;
  versions?: Versions;
  [property: string]: any;
}

export interface Versions {
  controller?: string;
  interfaceMax?: string;
  interfaceMin?: string;
  [property: string]: any;
}

export interface JourneyLocationElement {
  assignedStops?: AssignedLocation[];
  buildingNumber?: string;
  coord?: Array<any[] | CoordClass | number>;
  disassembledName?: string;
  id?: string;
  infos?: Info[];
  isBest?: boolean;
  isGlobalId?: boolean;
  matchQuality?: number;
  name?: string;
  niveau?: number;
  parent?: Location;
  productClasses?: number[];
  properties?: LocationProperties;
  streetName?: string;
  type?: LocationType;
  arrivalTimeBaseTimetable?: string;
  arrivalTimeEstimated?: string;
  arrivalTimePlanned?: string;
  departureTimeBaseTimetable?: string;
  departureTimeEstimated?: string;
  departureTimePlanned?: string;
  isRealtimeControlled?: boolean;
  [property: string]: any;
}

/**
 * meansOfTransport
 */
export interface Transportation {
  allCoords?: Array<Array<Array<any[] | CoordClass | number>>>;
  assignedStop?: string;
  assignedStopId?: string;
  coords?: Array<Array<Array<any[] | CoordClass | number>>>;
  description?: string;
  destination?: Location;
  disassembledName?: string;
  /**
   * statelessId aus motDivaParams
   */
  id?: string;
  index?: string;
  localitySequence?: Location[];
  locationSequence?: JourneyLocationElement[];
  name?: string;
  number?: string;
  operator?: OperatorObject;
  origin?: Location;
  product?: Product;
  properties?: LineProperties;
  trips?: TransportationTrip[];
}

export interface Affected {
  countys?: County[];
  lines?: Transportation[];
  places?: Location[];
  stops?: Location[];
}

export interface Info {
  additionalText?: string;
  affected?: Affected;
  blockingType?: string;
  content?: string;
  id?: string;
  image?: string;
  priority?: string;
  properties?: InfoProperties;
  providerCode?: string;
  subtitle?: string;
  timestamps?: Timestamps;
  title?: string;
  type?: string;
  url?: string;
  urlText?: string;
  version?: number;
}

export interface AssignedLocation {
  assignedStops?: AssignedLocation[];
  buildingNumber?: string;
  coord?: Array<any[] | CoordClass | number>;
  disassembledName?: string;
  id?: string;
  infos?: Info[];
  isBest?: boolean;
  isGlobalId?: boolean;
  matchQuality?: number;
  name?: string;
  niveau?: number;
  parent?: Location;
  productClasses?: number[];
  properties?: LocationProperties;
  streetName?: string;
  type?: LocationType;
  assignedLocation?: string;
  connectingMode?: number;
  distance?: number;
  duration?: number;
  [property: string]: any;
}

export interface Location {
  assignedStops?: AssignedLocation[];
  buildingNumber?: string;
  coord?: Array<any[] | CoordClass | number>;
  disassembledName?: string;
  id?: string;
  infos?: Info[];
  isBest?: boolean;
  isGlobalId?: boolean;
  matchQuality?: number;
  name?: string;
  niveau?: number;
  parent?: Location;
  productClasses?: number[];
  properties?: LocationProperties;
  streetName?: string;
  type?: LocationType;
  [property: string]: any;
}

export interface CoordClass {
  /**
   * distance
   */
  d?: number;
  /**
   * niveau
   */
  n?: number;
  /**
   * fractional part of niveau
   */
  nF?: number;
  /**
   * height
   */
  z?: number;
}

export interface LocationProperties {
  areaGid?: string;
  businessHoursInfo?: LanguageString[];
  chargingStations?: ChargingInfrastructure[];
  coordInfoDetails?: CoordInfoDetails;
  dataSet?: ParkingDataSet;
  distance?: number;
  downloads?: Download[];
  occupancy?: Occupancy;
  parkingProfileInfo?: ParkingProfileInfoClass;
  parkingRealtimeInfo?: ParkingDataSet;
  parkingSpaces?: Array<
    any[] | boolean | ParkingSpaceTypeClass | number | number | null | string
  >;
  parkingStaticInfo?: ParkingStaticInfo;
  parkingTax?: ParkingTax;
  realtimeStatus?: RealtimeCallStatus[];
  zone?: string;
  [property: string]: any;
}

export interface LanguageString {
  langIso639?: string;
  string?: string;
}

export interface ChargingInfrastructure {
  ChargerConnections?: ConnectorType[];
  chargingOperator?: ChargingOperator;
  ConnectorTypes?: ConnectorType[];
  description?: string;
  id?: string;
  properties?: { [key: string]: any };
  usageCosts?: LanguageString[];
}

export interface ConnectorType {
  id?: string;
  properties?: { [key: string]: any };
}

export interface ChargingOperator {
  id?: string;
  name?: string;
  properties?: { [key: string]: any };
  [property: string]: any;
}

export interface CoordInfoDetails {
  operatingAreaId?: string;
  parkingDataSet?: ParkingDataSet;
  providerId?: number;
  station?: Station;
  type?: CoordInfoDetailsType;
  vehicleDetails?: Vehicle;
}

export interface ParkingDataSet {
  additionalInformations?: string[];
  dataSource?: DataSource;
  freePlaces?: number;
  measuredAt?: string;
  occ?: number;
  occLevel?: string;
  occLOS?: number;
  occTrend?: number;
}

export enum DataSource {
  Profile = 'PROFILE',
  Realtime = 'REALTIME',
  Unknown = 'UNKNOWN',
}

export interface Station {
  addr?: string;
  bikeSlots?: Slots;
  carCombustionSlots?: Slots;
  carElectricSlots?: Slots;
  carHybridSlots?: Slots;
  carSlots?: Slots;
  combinedSlots?: Slots;
  coord?: Array<any[] | CoordClass | number>;
  eBikeSlots?: Slots;
  id?: string;
  lastUpdate?: string;
  motorcycleCombustionSlots?: Slots;
  motorcycleElectricSlots?: Slots;
  motorcycleHybridSlots?: Slots;
  motorcycleSlots?: Slots;
  name?: string;
  oOS?: boolean;
  operatingAreaId?: string;
  operatingAreaName?: string;
  pos?: string;
  providerId?: number;
  providerName?: string;
  stNum?: string;
  vehicles?: Vehicle[];
}

export interface Slots {
  emptySlots?: number;
  freeVehicles?: number;
  totalSlots?: number;
  [property: string]: any;
}

export interface Vehicle {
  addr?: string;
  availabilities?: Availabilities;
  bikeFuncClass?: BikeFuncClass;
  capacity?: number;
  carClass?: CarClass;
  catId?: string;
  catName?: string;
  charging?: boolean;
  coord?: Array<any[] | CoordClass | number>;
  dLAndroid?: string;
  dLIOS?: string;
  dLWindows?: string;
  ebikeClass?: EbikeClass;
  engine?: Engine;
  ext?: EXT;
  fuelLevel?: number;
  gearshift?: Gearshift;
  id?: string;
  int?: EXT;
  lastUpdate?: string;
  motorcycleClass?: MotorcycleClass;
  operatingAreaId?: string;
  operatingAreaName?: string;
  phone?: string;
  plate?: string;
  pos?: string;
  providerId?: number;
  providerName?: string;
  rangeKm?: string;
  vehModel?: string;
  vehType?: VehType;
}

export interface Availabilities {
  avail?: Intervall[];
  oOO?: Intervall[];
  unavail?: Intervall[];
}

export interface Intervall {
  from?: string;
  to?: string;
}

export enum BikeFuncClass {
  Bmx = 'BMX',
  Cross = 'CROSS',
  Cruiser = 'CRUISER',
  Freight = 'FREIGHT',
  Hybrid = 'HYBRID',
  Motorized = 'MOTORIZED',
  Mountain = 'MOUNTAIN',
  Racing = 'RACING',
  Road = 'ROAD',
  Touring = 'TOURING',
  Undefined = 'UNDEFINED',
  Utility = 'UTILITY',
}

export enum CarClass {
  Citycar = 'CITYCAR',
  Executivecar = 'EXECUTIVECAR',
  Largefamilycar = 'LARGEFAMILYCAR',
  Luxurycar = 'LUXURYCAR',
  Multipurposecars = 'MULTIPURPOSECARS',
  Smallfamilycar = 'SMALLFAMILYCAR',
  Sportcoupes = 'SPORTCOUPES',
  Sportutility = 'SPORTUTILITY',
  Supermini = 'SUPERMINI',
  Undefined = 'UNDEFINED',
}

export enum EbikeClass {
  Pedelec = 'PEDELEC',
  PedelecS = 'PEDELEC_S',
  PowerOnDemandOnly = 'POWER_ON_DEMAND_ONLY',
  PowerOnDemandPedalAssist = 'POWER_ON_DEMAND_PEDAL_ASSIST',
  Undefined = 'UNDEFINED',
}

export enum Engine {
  Combustion = 'COMBUSTION',
  Electric = 'ELECTRIC',
  Hybrid = 'HYBRID',
  Undefined = 'UNDEFINED',
}

export enum EXT {
  Bad = 'BAD',
  Good = 'GOOD',
  Neutral = 'NEUTRAL',
  Unacceptable = 'UNACCEPTABLE',
  Undefined = 'UNDEFINED',
  Verybad = 'VERYBAD',
  Verygood = 'VERYGOOD',
}

export enum Gearshift {
  Automatic = 'AUTOMATIC',
  Manual = 'MANUAL',
  SemiManual = 'SEMI_MANUAL',
  Undefined = 'UNDEFINED',
}

export enum MotorcycleClass {
  CabinFullyenclosed = 'CABIN_FULLYENCLOSED',
  CabinSemienclosed = 'CABIN_SEMIENCLOSED',
  Cruiser = 'CRUISER',
  Dualsport = 'DUALSPORT',
  Moped = 'MOPED',
  OffroadEnduro = 'OFFROAD_ENDURO',
  OffroadMotocross = 'OFFROAD_MOTOCROSS',
  OffroadRallyraid = 'OFFROAD_RALLYRAID',
  OffroadTrackracing = 'OFFROAD_TRACKRACING',
  OffroadTrail = 'OFFROAD_TRAIL',
  Scooter = 'SCOOTER',
  Sportbike = 'SPORTBIKE',
  Sporttouring = 'SPORTTOURING',
  Standard = 'STANDARD',
  Touring = 'TOURING',
  Tricycle = 'TRICYCLE',
  Undefined = 'UNDEFINED',
  Underbone = 'UNDERBONE',
}

export enum VehType {
  Bike = 'BIKE',
  Car = 'CAR',
  Motorcycle = 'MOTORCYCLE',
  Undefined = 'UNDEFINED',
}

export enum CoordInfoDetailsType {
  Freefloater = 'FREEFLOATER',
  Parking = 'PARKING',
  Station = 'STATION',
  Unknown = 'UNKNOWN',
}

export interface Download {
  email?: string;
  properties?: any;
  size?: number;
  type?: string;
  url?: string;
}

export enum Occupancy {
  CrushedStanding = 'CRUSHED_STANDING',
  Empty = 'EMPTY',
  FewSeats = 'FEW_SEATS',
  Full = 'FULL',
  ManySeats = 'MANY_SEATS',
  NotAcceptingPassengers = 'NOT_ACCEPTING_PASSENGERS',
  StandingOnly = 'STANDING_ONLY',
  Unknown = 'UNKNOWN',
}

export interface ParkingProfileInfoClass {
  currentDayIdx?: number;
  parkingProfileInfo?: ParkingProfileInfoObject;
}

export interface ParkingProfileInfoObject {
  profileValueInfoArray?: ProfileValueInfo[];
  [property: string]: any;
}

export interface ProfileValueInfo {
  description?: string;
  parkingDataType?: string;
  [property: string]: any;
}

export interface ParkingSpaceTypeClass {
  capacity?: number;
  freeSpaces?: number;
  type: ParkingSpaceTypeType;
}

export enum ParkingSpaceTypeType {
  Bicycle = 'BICYCLE',
  BicycleBox = 'BICYCLE_BOX',
  BicycleChargingStation = 'BICYCLE_CHARGING_STATION',
  BicycleShelter = 'BICYCLE_SHELTER',
  Bus = 'BUS',
  CampingVan = 'CAMPING_VAN',
  Car = 'CAR',
  CarChargingStation = 'CAR_CHARGING_STATION',
  CarFamily = 'CAR_FAMILY',
  CarFemale = 'CAR_FEMALE',
  CarHandicapped = 'CAR_HANDICAPPED',
  Motorcycle = 'MOTORCYCLE',
  Truck = 'TRUCK',
  Unknown = 'UNKNOWN',
}

export interface ParkingStaticInfo {
  accessibility?: Accessibility;
  address?: Address;
  email?: string;
  geometryObject?: GeometryObject;
  link?: string;
  maxParkingTime?: number;
  maxVehicleDimensions?: MaxVehicleDimensions;
  operator?: OperatorClass;
  properties?: { [key: string]: any };
  telephone?: string;
}

export enum Accessibility {
  AccessibilityPublicAccess = 'ACCESSIBILITY_PUBLIC_ACCESS',
  AccessibilityRestrictedAccess = 'ACCESSIBILITY_RESTRICTED_ACCESS',
  AccessibilityUndefined = 'ACCESSIBILITY_UNDEFINED',
}

export interface Address {
  address?: string;
  country?: string;
  housenumber?: string;
  omc?: number;
  place?: string;
  placeId?: number;
  postalCode?: string;
  region?: string;
}

export interface GeometryObject {
  coordinates?:
    | any[]
    | boolean
    | CoordinatesClass
    | number
    | number
    | null
    | string;
  geometries?: any[];
  mapName?: string;
  type?: GeometryObjectType;
}

export interface CoordinatesClass {}

export enum GeometryObjectType {
  GeometryCollection = 'GeometryCollection',
  LineString = 'LineString',
  MultiLineString = 'MultiLineString',
  MultiPoint = 'MultiPoint',
  MultiPolygon = 'MultiPolygon',
  Point = 'Point',
  Polygon = 'Polygon',
}

export interface MaxVehicleDimensions {
  height?: number;
  length?: number;
  weight?: number;
  width?: number;
}

export interface OperatorClass {
  address?: Address;
  name?: string;
  phone?: string;
}

export interface ParkingTax {
  currency?: string;
  fare?: number;
  languageStrings?: LanguageString[];
  type?: ParkingTaxType;
}

export enum ParkingTaxType {
  Day = 'DAY',
  Hour = 'HOUR',
  Month = 'MONTH',
  Unknown = 'UNKNOWN',
}

export enum RealtimeCallStatus {
  AreaChanged = 'AREA_CHANGED',
  ArrivalCancelled = 'ARRIVAL_CANCELLED',
  DepartureCancelled = 'DEPARTURE_CANCELLED',
  DeviationFromLine = 'DEVIATION_FROM_LINE',
  ExtraStop = 'EXTRA_STOP',
  ExtraTrip = 'EXTRA_TRIP',
  NoCallAtStop = 'NO_CALL_AT_STOP',
  ScheduledTimeChanged = 'SCHEDULED_TIME_CHANGED',
  TripCancelled = 'TRIP_CANCELLED',
}

export enum LocationType {
  Address = 'address',
  Crossing = 'crossing',
  GIS = 'gis',
  Locality = 'locality',
  Parking = 'parking',
  Platform = 'platform',
  Poi = 'poi',
  PoiHierarchy = 'poiHierarchy',
  Sharing = 'sharing',
  Stop = 'stop',
  Street = 'street',
  Suburb = 'suburb',
  Unknown = 'unknown',
}

export interface OperatorObject {
  code?: string;
  id?: string;
  name?: string;
  [property: string]: any;
}

export interface Product {
  class?: number;
  iconId?: number;
  /**
   * was available via transportation.iconId before.
   */
  id?: number;
  name?: string;
  [property: string]: any;
}

export interface LineProperties {
  globalId?: string;
  isROP?: boolean;
  isSTT?: boolean;
  isTTB?: boolean;
  lineDisplay?: LineDisplay;
  specialFares?: SpecialFares;
  trainName?: string;
  trainType?: string;
  tripCode?: number;
  validity?: TimePeriod;
  version?: string;
  [property: string]: any;
}

export enum LineDisplay {
  Line = 'LINE',
  Train = 'TRAIN',
  Unknown = 'UNKNOWN',
}

export enum SpecialFares {
  IceRoute = 'ICE_ROUTE',
  RouteInTransportAuthorityArea = 'ROUTE_IN_TRANSPORT_AUTHORITY_AREA',
  RouteInTransportAuthorityAreaNoFareCalculation = 'ROUTE_IN_TRANSPORT_AUTHORITY_AREA_NO_FARE_CALCULATION',
  RouteOutsideOfTransportAuthorityArea = 'ROUTE_OUTSIDE_OF_TRANSPORT_AUTHORITY_AREA',
  RouteWithSupplement = 'ROUTE_WITH_SUPPLEMENT',
  RouteWithSupplementNoFareCalculation = 'ROUTE_WITH_SUPPLEMENT_NO_FARE_CALCULATION',
  Unknown = 'UNKNOWN',
}

export interface TimePeriod {
  from?: string;
  to?: string;
}

export interface TransportationTrip {
  arrivalTimePlannedJourneyDestination?: string;
  departureTimePlannedJourneyOrigin?: string;
  status?: Status;
  trainNumber?: string;
  trainType?: any;
  tripCode: number;
}

export enum Status {
  AdditionalStop = 'ADDITIONAL_STOP',
  Blocked = 'BLOCKED',
  Delayed = 'DELAYED',
}

export interface County {
  communes?: Commune[];
  id: string;
  isSelected: boolean;
  name: string;
}

export interface Commune {
  id: number;
  isSelected: boolean;
  name: string;
}

export interface InfoProperties {
  additionalLinks?: AdditionalLink[];
  htmlText?: string;
  smsText?: string;
  speechText?: string;
  wapText?: string;
  [property: string]: any;
}

export interface AdditionalLink {
  fileName?: string;
  id?: string;
  linkTarget?: string;
  linkText?: string;
  path?: string;
  size?: number;
  subtitle?: string;
  type?: string;
  url?: string;
  urlText?: string;
  virtPath?: string;
}

export interface Timestamps {
  availability?: TimePeriod;
  creation?: string;
  lastModification?: string;
  validity?: TimePeriod[];
}

export interface ServerInfo {
  calcTime?: number;
  controllerVersion?: string;
  serverID?: string;
  serverTime?: string;
  virtDir?: string;
}

export interface SystemMessage {
  code?: number;
  module?: Module;
  subType?: string;
  text?: string;
  type?: SystemMessageType;
}

export enum Module {
  Ahf = 'AHF',
  Broker = 'BROKER',
  Dispatcher = 'DISPATCHER',
  Efapsched = 'EFAPSCHED',
  ItKernel = 'IT_KERNEL',
  ItpMonomodal = 'itp-monomodal',
  MapKernel = 'MAP_KERNEL',
  PDA = 'PDA',
  Pprof = 'PPROF',
  PtKernel = 'PT_KERNEL',
  Rop = 'ROP',
  Stt = 'STT',
  Ttb = 'TTB',
  Unknown = 'UNKNOWN',
}

export enum SystemMessageType {
  Error = 'error',
  Message = 'message',
  Warning = 'warning',
}

/**
 * ServingLines-Request
 */
export interface SERVINGLINESSchema {
  lines?: Transportation[];
  serverInfo?: ServerInfo;
  systemMessages?: SystemMessage[];
  version?: string;
}

/**
 * tripRequest
 */
export interface TRIPSchema {
  error?: Error;
  journeys?: Journey[];
  properties?: any;
  serverInfo?: ServerInfo;
  systemMessages?: SystemMessage[];
  taxiOperators?: TaxiOperator[];
  version: string;
}

export interface Journey {
  booking?: Booking[];
  fare?: JourneyFare;
  interchanges?: number;
  isAdditional?: boolean;
  isRealtimeOnlyInformative?: boolean;
  legs?: Leg[];
  rating?: number;
}

export interface Booking {
  commType?: CommType;
  fromLeg?: number;
  serverAddress?: string;
  toLeg?: number;
}

export enum CommType {
  Fax = 'FAX',
  HTTP = 'HTTP',
  ISDN = 'ISDN',
  JSON = 'JSON',
  Tcpip = 'TCPIP',
  Unknown = 'UNKNOWN',
}

export interface JourneyFare {
  tickets?: Array<
    any[] | boolean | number | number | null | TicketObject | string
  >;
  zones?: Zone[];
}

export interface TicketObject {
  accompany?: Accompany;
  comment?: string;
  currency?: string;
  fromLeg?: number;
  id?: string;
  isShortHaul?: IsShortHaul;
  name?: string;
  nameValidityArea?: string;
  net?: string;
  numberOfChanges?: number;
  person?: Person;
  priceBrutto?: number;
  priceLevel?: string;
  priceNetto?: number;
  properties?:
    | any[]
    | boolean
    | number
    | number
    | null
    | PurpleProperties
    | string;
  relationKeys?: RelationKey[];
  returnsAllowed?: IsShortHaul;
  targetGroups?: string[];
  taxPercent?: number;
  timeValidity?: TimeValidity;
  toLeg?: number;
  travellerCard?: string;
  travellerClass?: TravellerClass;
  URL?: string;
  validForOneJourneyOnly?: IsShortHaul;
  validForOneOperatorOnly?: IsShortHaul;
  validFrom?: string;
  validMinutes?: number;
  validTo?: string;
  [property: string]: any;
}

export interface Accompany {
  adults: number;
  animals: number;
  bicycles: number;
  children: number;
  endTime: number;
  startTime: number;
}

export enum IsShortHaul {
  No = 'NO',
  Unknown = 'UNKNOWN',
  Yes = 'YES',
}

export enum Person {
  Adult = 'ADULT',
  Apprentice = 'APPRENTICE',
  Child = 'CHILD',
  Family = 'FAMILY',
  Kindergarten = 'KINDERGARTEN',
  Multiadults = 'MULTIADULTS',
  Multichilds = 'MULTICHILDS',
  Multipersons = 'MULTIPERSONS',
  Other = 'OTHER',
  Reduced = 'REDUCED',
  Scholar = 'SCHOLAR',
  Senior = 'SENIOR',
  Student = 'STUDENT',
}

export interface PurpleProperties {
  journeyDetail?: string;
  ticketLongName?: string;
  [property: string]: any;
}

export interface RelationKey {
  areas?: TicketArea[];
  code: string;
  id: string;
  name: string;
  scopeAreas?: number[];
  sections?: number[];
}

export interface TicketArea {
  id: number;
  name: string;
}

export enum TimeValidity {
  Day = 'DAY',
  Halfyear = 'HALFYEAR',
  Month = 'MONTH',
  Multiple = 'MULTIPLE',
  OtherValiditytime = 'OTHER_VALIDITYTIME',
  Single = 'SINGLE',
  Week = 'WEEK',
  Year = 'YEAR',
}

export enum TravellerClass {
  Business = 'BUSINESS',
  Economy = 'ECONOMY',
  First = 'FIRST',
  Other = 'OTHER',
  Second = 'SECOND',
}

export interface Zone {
  fromLeg?: number;
  net?: string;
  neutralZone?: string;
  toLeg?: number;
  zones?: Array<string[]>;
  zonesUnited?: Array<string[]>;
}

export interface Leg {
  coords?: Array<Array<any[] | CoordClass | number>>;
  destination?: JourneyLocationElement;
  distance?: number;
  duration?: number;
  elevationSummary?: ElevationSummary;
  fare?: LegFare;
  footPathInfo?: Array<
    any[] | boolean | FootPathInfoClass | number | number | null | string
  >;
  hints?: Info[];
  infos?: Info[];
  interchange?: Interchange;
  isRealtimeControlled?: boolean;
  origin?: JourneyLocationElement;
  pathDescriptions?: Array<
    any[] | boolean | PathDescriptionClass | number | number | null | string
  >;
  properties?:
    | any[]
    | boolean
    | number
    | number
    | null
    | FluffyProperties
    | string;
  realtimeStatus?: RealtimeTripStatus[];
  stopSequence?: JourneyLocationElement[];
  transportation?: Transportation;
  vehicleAccess?: string[] | string;
}

export interface ElevationSummary {
  altDiffDw?: number;
  altDiffUp?: number;
  DestHeightMeter?: number;
  distDw?: number;
  distUp?: number;
  Length?: number;
  maxAlt?: number;
  MaxDeclinePercent?: number;
  maxGrad?: number;
  MaxHeightMeters?: number;
  MaxInclinePercent?: number;
  maxSlope?: number;
  minAlt?: number;
  MinHeightMeters?: number;
  OrigHeightMeter?: number;
  pixelHeight?: number;
  pixelWidth?: number;
  TotalDeclineMeters?: number;
  TotalDownwardMeters?: number;
  TotalInclineMeter?: number;
  TotalUpwardMeters?: number;
}

export interface LegFare {
  zones?: Zone[];
}

export interface FootPathInfoClass {
  duration?: number;
  footPathElem?: Array<
    any[] | boolean | number | number | null | FootPathElemObject | string
  >;
  position?: Position;
}

export interface FootPathElemObject {
  description?: string;
  destination?: PurpleJourneyLocation;
  level?: Level;
  levelFrom?: number;
  levelTo?: number;
  origin?: FluffyJourneyLocation;
  type?: FootPathElemType;
  [property: string]: any;
}

export interface PurpleJourneyLocation {
  assignedStops?: AssignedLocation[];
  buildingNumber?: string;
  coord?: Array<any[] | CoordClass | number>;
  disassembledName?: string;
  id?: string;
  infos?: Info[];
  isBest?: boolean;
  isGlobalId?: boolean;
  matchQuality?: number;
  name?: string;
  niveau?: number;
  parent?: Location;
  productClasses?: number[];
  properties?: LocationProperties;
  streetName?: string;
  type?: LocationType;
  arrivalTimeBaseTimetable?: string;
  arrivalTimeEstimated?: string;
  arrivalTimePlanned?: string;
  departureTimeBaseTimetable?: string;
  departureTimeEstimated?: string;
  departureTimePlanned?: string;
  isRealtimeControlled?: boolean;
  [property: string]: any;
}

export enum Level {
  Down = 'DOWN',
  Level = 'LEVEL',
  Up = 'UP',
}

export interface FluffyJourneyLocation {
  assignedStops?: AssignedLocation[];
  buildingNumber?: string;
  coord?: Array<any[] | CoordClass | number>;
  disassembledName?: string;
  id?: string;
  infos?: Info[];
  isBest?: boolean;
  isGlobalId?: boolean;
  matchQuality?: number;
  name?: string;
  niveau?: number;
  parent?: Location;
  productClasses?: number[];
  properties?: LocationProperties;
  streetName?: string;
  type?: LocationType;
  arrivalTimeBaseTimetable?: string;
  arrivalTimeEstimated?: string;
  arrivalTimePlanned?: string;
  departureTimeBaseTimetable?: string;
  departureTimeEstimated?: string;
  departureTimePlanned?: string;
  isRealtimeControlled?: boolean;
  [property: string]: any;
}

export enum FootPathElemType {
  Dangerous = 'DANGEROUS',
  Elevator = 'ELEVATOR',
  Escalator = 'ESCALATOR',
  Illuminated = 'ILLUMINATED',
  Level = 'LEVEL',
  Ramp = 'RAMP',
  Stairs = 'STAIRS',
}

export enum Position {
  After = 'AFTER',
  Before = 'BEFORE',
  Idest = 'IDEST',
  Unknown = 'unknown',
}

export interface Interchange {
  coords?: Array<Array<any[] | CoordClass | number>>;
  desc?: string;
  type?: number;
}

export interface PathDescriptionClass {
  addInfo?: string[];
  coord?: Array<any[] | CoordClass | number>;
  cumDistance?: number;
  cumDuration?: number;
  distance?: number;
  distanceDown?: number;
  distanceUp?: number;
  duration?: number;
  fromCoordsIndex?: number;
  guidanceSigns?: GuidanceSign[];
  manoeuvre?: Manoeuvre;
  name?: string;
  niveau?: number;
  properties?: { [key: string]: any };
  skyDirection?: number;
  toCoordsIndex?: number;
  turnDirection?: TurnDirection;
}

export interface GuidanceSign {
  skyDirection?: string;
  text?: string;
  type?: GuidanceSignType;
  url?: string;
}

export enum GuidanceSignType {
  Direction = 'DIRECTION',
  ExitNumber = 'EXIT_NUMBER',
  RouteID = 'ROUTE_ID',
  UnknownSignType = 'UNKNOWN_SIGN_TYPE',
}

export enum Manoeuvre {
  Continue = 'CONTINUE',
  Destination = 'DESTINATION',
  Enter = 'ENTER',
  EnterBuiltuparea = 'ENTER_BUILTUPAREA',
  EnterRoundabout = 'ENTER_ROUNDABOUT',
  EnterToll = 'ENTER_TOLL',
  Keep = 'KEEP',
  Leave = 'LEAVE',
  LeaveBuiltuparea = 'LEAVE_BUILTUPAREA',
  LeaveRoundabout = 'LEAVE_ROUNDABOUT',
  LeaveToll = 'LEAVE_TOLL',
  OffRamp = 'OFF_RAMP',
  OnRamp = 'ON_RAMP',
  Origin = 'ORIGIN',
  Ramp = 'RAMP',
  StayRoundabout = 'STAY_ROUNDABOUT',
  TraverseCrossing = 'TRAVERSE_CROSSING',
  Turn = 'TURN',
  UTurn = 'U_TURN',
  Unknown = 'UNKNOWN',
}

export enum TurnDirection {
  Left = 'LEFT',
  Right = 'RIGHT',
  SharpLeft = 'SHARP_LEFT',
  SharpRight = 'SHARP_RIGHT',
  SlightLeft = 'SLIGHT_LEFT',
  SlightRight = 'SLIGHT_RIGHT',
  Straight = 'STRAIGHT',
  UTurn = 'U_TURN',
  Unknown = 'UNKNOWN',
}

export interface FluffyProperties {
  frequency?: Frequency;
  [property: string]: any;
}

export interface Frequency {
  avDuration: number;
  avTimeGap: number;
  maxDuration: number;
  maxTimeGap: number;
  minDuration: number;
  minTimeGap: number;
}

export enum RealtimeTripStatus {
  Deviation = 'DEVIATION',
  ExtraStops = 'EXTRA_STOPS',
  ExtraTrip = 'EXTRA_TRIP',
  Monitored = 'MONITORED',
  OutsideRealtimeWindow = 'OUTSIDE_REALTIME_WINDOW',
  PrognosisImpossible = 'PROGNOSIS_IMPOSSIBLE',
  RealtimeOnlyInformative = 'REALTIME_ONLY_INFORMATIVE',
  TripCancelled = 'TRIP_CANCELLED',
}

export interface TaxiOperator {
  desc: string;
  omc: string;
  providers: TaxiProvider[];
}

export interface TaxiProvider {
  address: string;
  name: string;
  tel: string;
  url: string;
}

// Converts JSON strings to/from your types
// and asserts the results of JSON.parse at runtime
export class Convert {
  public static toLOCATIONSUGGESTSchema(json: string): LOCATIONSUGGESTSchema {
    return cast(JSON.parse(json), r('LOCATIONSUGGESTSchema'));
  }

  public static lOCATIONSUGGESTSchemaToJson(
    value: LOCATIONSUGGESTSchema,
  ): string {
    return JSON.stringify(uncast(value, r('LOCATIONSUGGESTSchema')), null, 2);
  }

  public static toSERVINGLINESSchema(json: string): SERVINGLINESSchema {
    return cast(JSON.parse(json), r('SERVINGLINESSchema'));
  }

  public static sERVINGLINESSchemaToJson(value: SERVINGLINESSchema): string {
    return JSON.stringify(uncast(value, r('SERVINGLINESSchema')), null, 2);
  }

  public static toTRIPSchema(json: string): TRIPSchema {
    return cast(JSON.parse(json), r('TRIPSchema'));
  }

  public static tRIPSchemaToJson(value: TRIPSchema): string {
    return JSON.stringify(uncast(value, r('TRIPSchema')), null, 2);
  }
}

function invalidValue(typ: any, val: any, key: any, parent: any = ''): never {
  const prettyTyp = prettyTypeName(typ);
  const parentText = parent ? ` on ${parent}` : '';
  const keyText = key ? ` for key "${key}"` : '';
  throw Error(
    `Invalid value${keyText}${parentText}. Expected ${prettyTyp} but got ${JSON.stringify(
      val,
    )}`,
  );
}

function prettyTypeName(typ: any): string {
  if (Array.isArray(typ)) {
    if (typ.length === 2 && typ[0] === undefined) {
      return `an optional ${prettyTypeName(typ[1])}`;
    } else {
      return `one of [${typ.map((a) => prettyTypeName(a)).join(', ')}]`;
    }
  } else if (typeof typ === 'object' && typ.literal !== undefined) {
    return typ.literal;
  } else {
    return typeof typ;
  }
}

function jsonToJSProps(typ: any): any {
  if (typ.jsonToJS === undefined) {
    const map: any = {};
    typ.props.forEach((p: any) => (map[p.json] = { key: p.js, typ: p.typ }));
    typ.jsonToJS = map;
  }
  return typ.jsonToJS;
}

function jsToJSONProps(typ: any): any {
  if (typ.jsToJSON === undefined) {
    const map: any = {};
    typ.props.forEach((p: any) => (map[p.js] = { key: p.json, typ: p.typ }));
    typ.jsToJSON = map;
  }
  return typ.jsToJSON;
}

function transform(
  val: any,
  typ: any,
  getProps: any,
  key: any = '',
  parent: any = '',
): any {
  function transformPrimitive(typ: string, val: any): any {
    if (typeof typ === typeof val) return val;
    return invalidValue(typ, val, key, parent);
  }

  function transformUnion(typs: any[], val: any): any {
    // val must validate against one typ in typs
    const l = typs.length;
    for (let i = 0; i < l; i++) {
      const typ = typs[i];
      try {
        return transform(val, typ, getProps);
      } catch (_) {}
    }
    return invalidValue(typs, val, key, parent);
  }

  function transformEnum(cases: string[], val: any): any {
    if (cases.indexOf(val) !== -1) return val;
    return invalidValue(
      cases.map((a) => l(a)),
      val,
      key,
      parent,
    );
  }

  function transformArray(typ: any, val: any): any {
    // val must be an array with no invalid elements
    if (!Array.isArray(val)) return invalidValue(l('array'), val, key, parent);
    return val.map((el) => transform(el, typ, getProps));
  }

  function transformDate(val: any): any {
    if (val === null) {
      return null;
    }
    const d = new Date(val);
    if (isNaN(d.valueOf())) {
      return invalidValue(l('Date'), val, key, parent);
    }
    return d;
  }

  function transformObject(
    props: { [k: string]: any },
    additional: any,
    val: any,
  ): any {
    if (val === null || typeof val !== 'object' || Array.isArray(val)) {
      return invalidValue(l(ref || 'object'), val, key, parent);
    }
    const result: any = {};
    Object.getOwnPropertyNames(props).forEach((key) => {
      const prop = props[key];
      const v = Object.prototype.hasOwnProperty.call(val, key)
        ? val[key]
        : undefined;
      result[prop.key] = transform(v, prop.typ, getProps, key, ref);
    });
    Object.getOwnPropertyNames(val).forEach((key) => {
      if (!Object.prototype.hasOwnProperty.call(props, key)) {
        result[key] = transform(val[key], additional, getProps, key, ref);
      }
    });
    return result;
  }

  if (typ === 'any') return val;
  if (typ === null) {
    if (val === null) return val;
    return invalidValue(typ, val, key, parent);
  }
  if (typ === false) return invalidValue(typ, val, key, parent);
  let ref: any = undefined;
  while (typeof typ === 'object' && typ.ref !== undefined) {
    ref = typ.ref;
    typ = typeMap[typ.ref];
  }
  if (Array.isArray(typ)) return transformEnum(typ, val);
  if (typeof typ === 'object') {
    return typ.hasOwnProperty('unionMembers')
      ? transformUnion(typ.unionMembers, val)
      : typ.hasOwnProperty('arrayItems')
      ? transformArray(typ.arrayItems, val)
      : typ.hasOwnProperty('props')
      ? transformObject(getProps(typ), typ.additional, val)
      : invalidValue(typ, val, key, parent);
  }
  // Numbers can be parsed by Date but shouldn't be.
  if (typ === Date && typeof val !== 'number') return transformDate(val);
  return transformPrimitive(typ, val);
}

function cast<T>(val: any, typ: any): T {
  return transform(val, typ, jsonToJSProps);
}

function uncast<T>(val: T, typ: any): any {
  return transform(val, typ, jsToJSONProps);
}

function l(typ: any) {
  return { literal: typ };
}

function a(typ: any) {
  return { arrayItems: typ };
}

function u(...typs: any[]) {
  return { unionMembers: typs };
}

function o(props: any[], additional: any) {
  return { props, additional };
}

function m(additional: any) {
  return { props: [], additional };
}

function r(name: string) {
  return { ref: name };
}

const typeMap: any = {
  LOCATIONSUGGESTSchema: o(
    [
      { json: 'error', js: 'error', typ: u(undefined, r('Error')) },
      {
        json: 'locations',
        js: 'locations',
        typ: u(undefined, a(r('Location'))),
      },
      { json: 'properties', js: 'properties', typ: u(undefined, 'any') },
      {
        json: 'serverInfo',
        js: 'serverInfo',
        typ: u(undefined, r('ServerInfo')),
      },
      {
        json: 'systemMessages',
        js: 'systemMessages',
        typ: u(undefined, a(r('SystemMessage'))),
      },
      { json: 'version', js: 'version', typ: '' },
    ],
    false,
  ),
  Error: o(
    [
      { json: 'message', js: 'message', typ: u(undefined, '') },
      { json: 'versions', js: 'versions', typ: u(undefined, r('Versions')) },
    ],
    'any',
  ),
  Versions: o(
    [
      { json: 'controller', js: 'controller', typ: u(undefined, '') },
      { json: 'interfaceMax', js: 'interfaceMax', typ: u(undefined, '') },
      { json: 'interfaceMin', js: 'interfaceMin', typ: u(undefined, '') },
    ],
    'any',
  ),
  JourneyLocationElement: o(
    [
      {
        json: 'assignedStops',
        js: 'assignedStops',
        typ: u(undefined, a(r('AssignedLocation'))),
      },
      { json: 'buildingNumber', js: 'buildingNumber', typ: u(undefined, '') },
      {
        json: 'coord',
        js: 'coord',
        typ: u(undefined, a(u(a('any'), r('CoordClass'), 3.14))),
      },
      {
        json: 'disassembledName',
        js: 'disassembledName',
        typ: u(undefined, ''),
      },
      { json: 'id', js: 'id', typ: u(undefined, '') },
      { json: 'infos', js: 'infos', typ: u(undefined, a(r('Info'))) },
      { json: 'isBest', js: 'isBest', typ: u(undefined, true) },
      { json: 'isGlobalId', js: 'isGlobalId', typ: u(undefined, true) },
      { json: 'matchQuality', js: 'matchQuality', typ: u(undefined, 3.14) },
      { json: 'name', js: 'name', typ: u(undefined, '') },
      { json: 'niveau', js: 'niveau', typ: u(undefined, 3.14) },
      { json: 'parent', js: 'parent', typ: u(undefined, r('Location')) },
      {
        json: 'productClasses',
        js: 'productClasses',
        typ: u(undefined, a(3.14)),
      },
      {
        json: 'properties',
        js: 'properties',
        typ: u(undefined, r('LocationProperties')),
      },
      { json: 'streetName', js: 'streetName', typ: u(undefined, '') },
      { json: 'type', js: 'type', typ: u(undefined, r('LocationType')) },
      {
        json: 'arrivalTimeBaseTimetable',
        js: 'arrivalTimeBaseTimetable',
        typ: u(undefined, ''),
      },
      {
        json: 'arrivalTimeEstimated',
        js: 'arrivalTimeEstimated',
        typ: u(undefined, ''),
      },
      {
        json: 'arrivalTimePlanned',
        js: 'arrivalTimePlanned',
        typ: u(undefined, ''),
      },
      {
        json: 'departureTimeBaseTimetable',
        js: 'departureTimeBaseTimetable',
        typ: u(undefined, ''),
      },
      {
        json: 'departureTimeEstimated',
        js: 'departureTimeEstimated',
        typ: u(undefined, ''),
      },
      {
        json: 'departureTimePlanned',
        js: 'departureTimePlanned',
        typ: u(undefined, ''),
      },
      {
        json: 'isRealtimeControlled',
        js: 'isRealtimeControlled',
        typ: u(undefined, true),
      },
    ],
    'any',
  ),
  Transportation: o(
    [
      {
        json: 'allCoords',
        js: 'allCoords',
        typ: u(undefined, a(a(a(u(a('any'), r('CoordClass'), 3.14))))),
      },
      { json: 'assignedStop', js: 'assignedStop', typ: u(undefined, '') },
      { json: 'assignedStopId', js: 'assignedStopId', typ: u(undefined, '') },
      {
        json: 'coords',
        js: 'coords',
        typ: u(undefined, a(a(a(u(a('any'), r('CoordClass'), 3.14))))),
      },
      { json: 'description', js: 'description', typ: u(undefined, '') },
      {
        json: 'destination',
        js: 'destination',
        typ: u(undefined, r('Location')),
      },
      {
        json: 'disassembledName',
        js: 'disassembledName',
        typ: u(undefined, ''),
      },
      { json: 'id', js: 'id', typ: u(undefined, '') },
      { json: 'index', js: 'index', typ: u(undefined, '') },
      {
        json: 'localitySequence',
        js: 'localitySequence',
        typ: u(undefined, a(r('Location'))),
      },
      {
        json: 'locationSequence',
        js: 'locationSequence',
        typ: u(undefined, a(r('JourneyLocationElement'))),
      },
      { json: 'name', js: 'name', typ: u(undefined, '') },
      { json: 'number', js: 'number', typ: u(undefined, '') },
      {
        json: 'operator',
        js: 'operator',
        typ: u(undefined, r('OperatorObject')),
      },
      { json: 'origin', js: 'origin', typ: u(undefined, r('Location')) },
      { json: 'product', js: 'product', typ: u(undefined, r('Product')) },
      {
        json: 'properties',
        js: 'properties',
        typ: u(undefined, r('LineProperties')),
      },
      {
        json: 'trips',
        js: 'trips',
        typ: u(undefined, a(r('TransportationTrip'))),
      },
    ],
    false,
  ),
  Affected: o(
    [
      { json: 'countys', js: 'countys', typ: u(undefined, a(r('County'))) },
      { json: 'lines', js: 'lines', typ: u(undefined, a(r('Transportation'))) },
      { json: 'places', js: 'places', typ: u(undefined, a(r('Location'))) },
      { json: 'stops', js: 'stops', typ: u(undefined, a(r('Location'))) },
    ],
    false,
  ),
  Info: o(
    [
      { json: 'additionalText', js: 'additionalText', typ: u(undefined, '') },
      { json: 'affected', js: 'affected', typ: u(undefined, r('Affected')) },
      { json: 'blockingType', js: 'blockingType', typ: u(undefined, '') },
      { json: 'content', js: 'content', typ: u(undefined, '') },
      { json: 'id', js: 'id', typ: u(undefined, '') },
      { json: 'image', js: 'image', typ: u(undefined, '') },
      { json: 'priority', js: 'priority', typ: u(undefined, '') },
      {
        json: 'properties',
        js: 'properties',
        typ: u(undefined, r('InfoProperties')),
      },
      { json: 'providerCode', js: 'providerCode', typ: u(undefined, '') },
      { json: 'subtitle', js: 'subtitle', typ: u(undefined, '') },
      {
        json: 'timestamps',
        js: 'timestamps',
        typ: u(undefined, r('Timestamps')),
      },
      { json: 'title', js: 'title', typ: u(undefined, '') },
      { json: 'type', js: 'type', typ: u(undefined, '') },
      { json: 'url', js: 'url', typ: u(undefined, '') },
      { json: 'urlText', js: 'urlText', typ: u(undefined, '') },
      { json: 'version', js: 'version', typ: u(undefined, 3.14) },
    ],
    false,
  ),
  AssignedLocation: o(
    [
      {
        json: 'assignedStops',
        js: 'assignedStops',
        typ: u(undefined, a(r('AssignedLocation'))),
      },
      { json: 'buildingNumber', js: 'buildingNumber', typ: u(undefined, '') },
      {
        json: 'coord',
        js: 'coord',
        typ: u(undefined, a(u(a('any'), r('CoordClass'), 3.14))),
      },
      {
        json: 'disassembledName',
        js: 'disassembledName',
        typ: u(undefined, ''),
      },
      { json: 'id', js: 'id', typ: u(undefined, '') },
      { json: 'infos', js: 'infos', typ: u(undefined, a(r('Info'))) },
      { json: 'isBest', js: 'isBest', typ: u(undefined, true) },
      { json: 'isGlobalId', js: 'isGlobalId', typ: u(undefined, true) },
      { json: 'matchQuality', js: 'matchQuality', typ: u(undefined, 3.14) },
      { json: 'name', js: 'name', typ: u(undefined, '') },
      { json: 'niveau', js: 'niveau', typ: u(undefined, 3.14) },
      { json: 'parent', js: 'parent', typ: u(undefined, r('Location')) },
      {
        json: 'productClasses',
        js: 'productClasses',
        typ: u(undefined, a(3.14)),
      },
      {
        json: 'properties',
        js: 'properties',
        typ: u(undefined, r('LocationProperties')),
      },
      { json: 'streetName', js: 'streetName', typ: u(undefined, '') },
      { json: 'type', js: 'type', typ: u(undefined, r('LocationType')) },
      {
        json: 'assignedLocation',
        js: 'assignedLocation',
        typ: u(undefined, ''),
      },
      { json: 'connectingMode', js: 'connectingMode', typ: u(undefined, 3.14) },
      { json: 'distance', js: 'distance', typ: u(undefined, 3.14) },
      { json: 'duration', js: 'duration', typ: u(undefined, 3.14) },
    ],
    'any',
  ),
  Location: o(
    [
      {
        json: 'assignedStops',
        js: 'assignedStops',
        typ: u(undefined, a(r('AssignedLocation'))),
      },
      { json: 'buildingNumber', js: 'buildingNumber', typ: u(undefined, '') },
      {
        json: 'coord',
        js: 'coord',
        typ: u(undefined, a(u(a('any'), r('CoordClass'), 3.14))),
      },
      {
        json: 'disassembledName',
        js: 'disassembledName',
        typ: u(undefined, ''),
      },
      { json: 'id', js: 'id', typ: u(undefined, '') },
      { json: 'infos', js: 'infos', typ: u(undefined, a(r('Info'))) },
      { json: 'isBest', js: 'isBest', typ: u(undefined, true) },
      { json: 'isGlobalId', js: 'isGlobalId', typ: u(undefined, true) },
      { json: 'matchQuality', js: 'matchQuality', typ: u(undefined, 3.14) },
      { json: 'name', js: 'name', typ: u(undefined, '') },
      { json: 'niveau', js: 'niveau', typ: u(undefined, 3.14) },
      { json: 'parent', js: 'parent', typ: u(undefined, r('Location')) },
      {
        json: 'productClasses',
        js: 'productClasses',
        typ: u(undefined, a(3.14)),
      },
      {
        json: 'properties',
        js: 'properties',
        typ: u(undefined, r('LocationProperties')),
      },
      { json: 'streetName', js: 'streetName', typ: u(undefined, '') },
      { json: 'type', js: 'type', typ: u(undefined, r('LocationType')) },
    ],
    'any',
  ),
  CoordClass: o(
    [
      { json: 'd', js: 'd', typ: u(undefined, 3.14) },
      { json: 'n', js: 'n', typ: u(undefined, 3.14) },
      { json: 'nF', js: 'nF', typ: u(undefined, 3.14) },
      { json: 'z', js: 'z', typ: u(undefined, 3.14) },
    ],
    false,
  ),
  LocationProperties: o(
    [
      { json: 'areaGid', js: 'areaGid', typ: u(undefined, '') },
      {
        json: 'businessHoursInfo',
        js: 'businessHoursInfo',
        typ: u(undefined, a(r('LanguageString'))),
      },
      {
        json: 'chargingStations',
        js: 'chargingStations',
        typ: u(undefined, a(r('ChargingInfrastructure'))),
      },
      {
        json: 'coordInfoDetails',
        js: 'coordInfoDetails',
        typ: u(undefined, r('CoordInfoDetails')),
      },
      {
        json: 'dataSet',
        js: 'dataSet',
        typ: u(undefined, r('ParkingDataSet')),
      },
      { json: 'distance', js: 'distance', typ: u(undefined, 3.14) },
      {
        json: 'downloads',
        js: 'downloads',
        typ: u(undefined, a(r('Download'))),
      },
      { json: 'occupancy', js: 'occupancy', typ: u(undefined, r('Occupancy')) },
      {
        json: 'parkingProfileInfo',
        js: 'parkingProfileInfo',
        typ: u(undefined, r('ParkingProfileInfoClass')),
      },
      {
        json: 'parkingRealtimeInfo',
        js: 'parkingRealtimeInfo',
        typ: u(undefined, r('ParkingDataSet')),
      },
      {
        json: 'parkingSpaces',
        js: 'parkingSpaces',
        typ: u(
          undefined,
          a(u(a('any'), true, r('ParkingSpaceTypeClass'), 3.14, 0, null, '')),
        ),
      },
      {
        json: 'parkingStaticInfo',
        js: 'parkingStaticInfo',
        typ: u(undefined, r('ParkingStaticInfo')),
      },
      {
        json: 'parkingTax',
        js: 'parkingTax',
        typ: u(undefined, r('ParkingTax')),
      },
      {
        json: 'realtimeStatus',
        js: 'realtimeStatus',
        typ: u(undefined, a(r('RealtimeCallStatus'))),
      },
      { json: 'zone', js: 'zone', typ: u(undefined, '') },
    ],
    'any',
  ),
  LanguageString: o(
    [
      { json: 'langIso639', js: 'langIso639', typ: u(undefined, '') },
      { json: 'string', js: 'string', typ: u(undefined, '') },
    ],
    false,
  ),
  ChargingInfrastructure: o(
    [
      {
        json: 'ChargerConnections',
        js: 'ChargerConnections',
        typ: u(undefined, a(r('ConnectorType'))),
      },
      {
        json: 'chargingOperator',
        js: 'chargingOperator',
        typ: u(undefined, r('ChargingOperator')),
      },
      {
        json: 'ConnectorTypes',
        js: 'ConnectorTypes',
        typ: u(undefined, a(r('ConnectorType'))),
      },
      { json: 'description', js: 'description', typ: u(undefined, '') },
      { json: 'id', js: 'id', typ: u(undefined, '') },
      { json: 'properties', js: 'properties', typ: u(undefined, m('any')) },
      {
        json: 'usageCosts',
        js: 'usageCosts',
        typ: u(undefined, a(r('LanguageString'))),
      },
    ],
    false,
  ),
  ConnectorType: o(
    [
      { json: 'id', js: 'id', typ: u(undefined, '') },
      { json: 'properties', js: 'properties', typ: u(undefined, m('any')) },
    ],
    false,
  ),
  ChargingOperator: o(
    [
      { json: 'id', js: 'id', typ: u(undefined, '') },
      { json: 'name', js: 'name', typ: u(undefined, '') },
      { json: 'properties', js: 'properties', typ: u(undefined, m('any')) },
    ],
    'any',
  ),
  CoordInfoDetails: o(
    [
      { json: 'operatingAreaId', js: 'operatingAreaId', typ: u(undefined, '') },
      {
        json: 'parkingDataSet',
        js: 'parkingDataSet',
        typ: u(undefined, r('ParkingDataSet')),
      },
      { json: 'providerId', js: 'providerId', typ: u(undefined, 3.14) },
      { json: 'station', js: 'station', typ: u(undefined, r('Station')) },
      {
        json: 'type',
        js: 'type',
        typ: u(undefined, r('CoordInfoDetailsType')),
      },
      {
        json: 'vehicleDetails',
        js: 'vehicleDetails',
        typ: u(undefined, r('Vehicle')),
      },
    ],
    false,
  ),
  ParkingDataSet: o(
    [
      {
        json: 'additionalInformations',
        js: 'additionalInformations',
        typ: u(undefined, a('')),
      },
      {
        json: 'dataSource',
        js: 'dataSource',
        typ: u(undefined, r('DataSource')),
      },
      { json: 'freePlaces', js: 'freePlaces', typ: u(undefined, 3.14) },
      { json: 'measuredAt', js: 'measuredAt', typ: u(undefined, '') },
      { json: 'occ', js: 'occ', typ: u(undefined, 3.14) },
      { json: 'occLevel', js: 'occLevel', typ: u(undefined, '') },
      { json: 'occLOS', js: 'occLOS', typ: u(undefined, 3.14) },
      { json: 'occTrend', js: 'occTrend', typ: u(undefined, 3.14) },
    ],
    false,
  ),
  Station: o(
    [
      { json: 'addr', js: 'addr', typ: u(undefined, '') },
      { json: 'bikeSlots', js: 'bikeSlots', typ: u(undefined, r('Slots')) },
      {
        json: 'carCombustionSlots',
        js: 'carCombustionSlots',
        typ: u(undefined, r('Slots')),
      },
      {
        json: 'carElectricSlots',
        js: 'carElectricSlots',
        typ: u(undefined, r('Slots')),
      },
      {
        json: 'carHybridSlots',
        js: 'carHybridSlots',
        typ: u(undefined, r('Slots')),
      },
      { json: 'carSlots', js: 'carSlots', typ: u(undefined, r('Slots')) },
      {
        json: 'combinedSlots',
        js: 'combinedSlots',
        typ: u(undefined, r('Slots')),
      },
      {
        json: 'coord',
        js: 'coord',
        typ: u(undefined, a(u(a('any'), r('CoordClass'), 3.14))),
      },
      { json: 'eBikeSlots', js: 'eBikeSlots', typ: u(undefined, r('Slots')) },
      { json: 'id', js: 'id', typ: u(undefined, '') },
      { json: 'lastUpdate', js: 'lastUpdate', typ: u(undefined, '') },
      {
        json: 'motorcycleCombustionSlots',
        js: 'motorcycleCombustionSlots',
        typ: u(undefined, r('Slots')),
      },
      {
        json: 'motorcycleElectricSlots',
        js: 'motorcycleElectricSlots',
        typ: u(undefined, r('Slots')),
      },
      {
        json: 'motorcycleHybridSlots',
        js: 'motorcycleHybridSlots',
        typ: u(undefined, r('Slots')),
      },
      {
        json: 'motorcycleSlots',
        js: 'motorcycleSlots',
        typ: u(undefined, r('Slots')),
      },
      { json: 'name', js: 'name', typ: u(undefined, '') },
      { json: 'oOS', js: 'oOS', typ: u(undefined, true) },
      { json: 'operatingAreaId', js: 'operatingAreaId', typ: u(undefined, '') },
      {
        json: 'operatingAreaName',
        js: 'operatingAreaName',
        typ: u(undefined, ''),
      },
      { json: 'pos', js: 'pos', typ: u(undefined, '') },
      { json: 'providerId', js: 'providerId', typ: u(undefined, 3.14) },
      { json: 'providerName', js: 'providerName', typ: u(undefined, '') },
      { json: 'stNum', js: 'stNum', typ: u(undefined, '') },
      { json: 'vehicles', js: 'vehicles', typ: u(undefined, a(r('Vehicle'))) },
    ],
    false,
  ),
  Slots: o(
    [
      { json: 'emptySlots', js: 'emptySlots', typ: u(undefined, 3.14) },
      { json: 'freeVehicles', js: 'freeVehicles', typ: u(undefined, 3.14) },
      { json: 'totalSlots', js: 'totalSlots', typ: u(undefined, 3.14) },
    ],
    'any',
  ),
  Vehicle: o(
    [
      { json: 'addr', js: 'addr', typ: u(undefined, '') },
      {
        json: 'availabilities',
        js: 'availabilities',
        typ: u(undefined, r('Availabilities')),
      },
      {
        json: 'bikeFuncClass',
        js: 'bikeFuncClass',
        typ: u(undefined, r('BikeFuncClass')),
      },
      { json: 'capacity', js: 'capacity', typ: u(undefined, 3.14) },
      { json: 'carClass', js: 'carClass', typ: u(undefined, r('CarClass')) },
      { json: 'catId', js: 'catId', typ: u(undefined, '') },
      { json: 'catName', js: 'catName', typ: u(undefined, '') },
      { json: 'charging', js: 'charging', typ: u(undefined, true) },
      {
        json: 'coord',
        js: 'coord',
        typ: u(undefined, a(u(a('any'), r('CoordClass'), 3.14))),
      },
      { json: 'dLAndroid', js: 'dLAndroid', typ: u(undefined, '') },
      { json: 'dLIOS', js: 'dLIOS', typ: u(undefined, '') },
      { json: 'dLWindows', js: 'dLWindows', typ: u(undefined, '') },
      {
        json: 'ebikeClass',
        js: 'ebikeClass',
        typ: u(undefined, r('EbikeClass')),
      },
      { json: 'engine', js: 'engine', typ: u(undefined, r('Engine')) },
      { json: 'ext', js: 'ext', typ: u(undefined, r('EXT')) },
      { json: 'fuelLevel', js: 'fuelLevel', typ: u(undefined, 3.14) },
      { json: 'gearshift', js: 'gearshift', typ: u(undefined, r('Gearshift')) },
      { json: 'id', js: 'id', typ: u(undefined, '') },
      { json: 'int', js: 'int', typ: u(undefined, r('EXT')) },
      { json: 'lastUpdate', js: 'lastUpdate', typ: u(undefined, '') },
      {
        json: 'motorcycleClass',
        js: 'motorcycleClass',
        typ: u(undefined, r('MotorcycleClass')),
      },
      { json: 'operatingAreaId', js: 'operatingAreaId', typ: u(undefined, '') },
      {
        json: 'operatingAreaName',
        js: 'operatingAreaName',
        typ: u(undefined, ''),
      },
      { json: 'phone', js: 'phone', typ: u(undefined, '') },
      { json: 'plate', js: 'plate', typ: u(undefined, '') },
      { json: 'pos', js: 'pos', typ: u(undefined, '') },
      { json: 'providerId', js: 'providerId', typ: u(undefined, 3.14) },
      { json: 'providerName', js: 'providerName', typ: u(undefined, '') },
      { json: 'rangeKm', js: 'rangeKm', typ: u(undefined, '') },
      { json: 'vehModel', js: 'vehModel', typ: u(undefined, '') },
      { json: 'vehType', js: 'vehType', typ: u(undefined, r('VehType')) },
    ],
    false,
  ),
  Availabilities: o(
    [
      { json: 'avail', js: 'avail', typ: u(undefined, a(r('Intervall'))) },
      { json: 'oOO', js: 'oOO', typ: u(undefined, a(r('Intervall'))) },
      { json: 'unavail', js: 'unavail', typ: u(undefined, a(r('Intervall'))) },
    ],
    false,
  ),
  Intervall: o(
    [
      { json: 'from', js: 'from', typ: u(undefined, '') },
      { json: 'to', js: 'to', typ: u(undefined, '') },
    ],
    false,
  ),
  Download: o(
    [
      { json: 'email', js: 'email', typ: u(undefined, '') },
      { json: 'properties', js: 'properties', typ: u(undefined, 'any') },
      { json: 'size', js: 'size', typ: u(undefined, 3.14) },
      { json: 'type', js: 'type', typ: u(undefined, '') },
      { json: 'url', js: 'url', typ: u(undefined, '') },
    ],
    false,
  ),
  ParkingProfileInfoClass: o(
    [
      { json: 'currentDayIdx', js: 'currentDayIdx', typ: u(undefined, 3.14) },
      {
        json: 'parkingProfileInfo',
        js: 'parkingProfileInfo',
        typ: u(undefined, r('ParkingProfileInfoObject')),
      },
    ],
    false,
  ),
  ParkingProfileInfoObject: o(
    [
      {
        json: 'profileValueInfoArray',
        js: 'profileValueInfoArray',
        typ: u(undefined, a(r('ProfileValueInfo'))),
      },
    ],
    'any',
  ),
  ProfileValueInfo: o(
    [
      { json: 'description', js: 'description', typ: u(undefined, '') },
      { json: 'parkingDataType', js: 'parkingDataType', typ: u(undefined, '') },
    ],
    'any',
  ),
  ParkingSpaceTypeClass: o(
    [
      { json: 'capacity', js: 'capacity', typ: u(undefined, 3.14) },
      { json: 'freeSpaces', js: 'freeSpaces', typ: u(undefined, 3.14) },
      { json: 'type', js: 'type', typ: r('ParkingSpaceTypeType') },
    ],
    false,
  ),
  ParkingStaticInfo: o(
    [
      {
        json: 'accessibility',
        js: 'accessibility',
        typ: u(undefined, r('Accessibility')),
      },
      { json: 'address', js: 'address', typ: u(undefined, r('Address')) },
      { json: 'email', js: 'email', typ: u(undefined, '') },
      {
        json: 'geometryObject',
        js: 'geometryObject',
        typ: u(undefined, r('GeometryObject')),
      },
      { json: 'link', js: 'link', typ: u(undefined, '') },
      { json: 'maxParkingTime', js: 'maxParkingTime', typ: u(undefined, 3.14) },
      {
        json: 'maxVehicleDimensions',
        js: 'maxVehicleDimensions',
        typ: u(undefined, r('MaxVehicleDimensions')),
      },
      {
        json: 'operator',
        js: 'operator',
        typ: u(undefined, r('OperatorClass')),
      },
      { json: 'properties', js: 'properties', typ: u(undefined, m('any')) },
      { json: 'telephone', js: 'telephone', typ: u(undefined, '') },
    ],
    false,
  ),
  Address: o(
    [
      { json: 'address', js: 'address', typ: u(undefined, '') },
      { json: 'country', js: 'country', typ: u(undefined, '') },
      { json: 'housenumber', js: 'housenumber', typ: u(undefined, '') },
      { json: 'omc', js: 'omc', typ: u(undefined, 3.14) },
      { json: 'place', js: 'place', typ: u(undefined, '') },
      { json: 'placeId', js: 'placeId', typ: u(undefined, 3.14) },
      { json: 'postalCode', js: 'postalCode', typ: u(undefined, '') },
      { json: 'region', js: 'region', typ: u(undefined, '') },
    ],
    false,
  ),
  GeometryObject: o(
    [
      {
        json: 'coordinates',
        js: 'coordinates',
        typ: u(
          undefined,
          u(a('any'), true, r('CoordinatesClass'), 3.14, 0, null, ''),
        ),
      },
      { json: 'geometries', js: 'geometries', typ: u(undefined, a('any')) },
      { json: 'mapName', js: 'mapName', typ: u(undefined, '') },
      { json: 'type', js: 'type', typ: u(undefined, r('GeometryObjectType')) },
    ],
    false,
  ),
  CoordinatesClass: o([], false),
  MaxVehicleDimensions: o(
    [
      { json: 'height', js: 'height', typ: u(undefined, 3.14) },
      { json: 'length', js: 'length', typ: u(undefined, 3.14) },
      { json: 'weight', js: 'weight', typ: u(undefined, 3.14) },
      { json: 'width', js: 'width', typ: u(undefined, 3.14) },
    ],
    false,
  ),
  OperatorClass: o(
    [
      { json: 'address', js: 'address', typ: u(undefined, r('Address')) },
      { json: 'name', js: 'name', typ: u(undefined, '') },
      { json: 'phone', js: 'phone', typ: u(undefined, '') },
    ],
    false,
  ),
  ParkingTax: o(
    [
      { json: 'currency', js: 'currency', typ: u(undefined, '') },
      { json: 'fare', js: 'fare', typ: u(undefined, 3.14) },
      {
        json: 'languageStrings',
        js: 'languageStrings',
        typ: u(undefined, a(r('LanguageString'))),
      },
      { json: 'type', js: 'type', typ: u(undefined, r('ParkingTaxType')) },
    ],
    false,
  ),
  OperatorObject: o(
    [
      { json: 'code', js: 'code', typ: u(undefined, '') },
      { json: 'id', js: 'id', typ: u(undefined, '') },
      { json: 'name', js: 'name', typ: u(undefined, '') },
    ],
    'any',
  ),
  Product: o(
    [
      { json: 'class', js: 'class', typ: u(undefined, 3.14) },
      { json: 'iconId', js: 'iconId', typ: u(undefined, 3.14) },
      { json: 'id', js: 'id', typ: u(undefined, 3.14) },
      { json: 'name', js: 'name', typ: u(undefined, '') },
    ],
    'any',
  ),
  LineProperties: o(
    [
      { json: 'globalId', js: 'globalId', typ: u(undefined, '') },
      { json: 'isROP', js: 'isROP', typ: u(undefined, true) },
      { json: 'isSTT', js: 'isSTT', typ: u(undefined, true) },
      { json: 'isTTB', js: 'isTTB', typ: u(undefined, true) },
      {
        json: 'lineDisplay',
        js: 'lineDisplay',
        typ: u(undefined, r('LineDisplay')),
      },
      {
        json: 'specialFares',
        js: 'specialFares',
        typ: u(undefined, r('SpecialFares')),
      },
      { json: 'trainName', js: 'trainName', typ: u(undefined, '') },
      { json: 'trainType', js: 'trainType', typ: u(undefined, '') },
      { json: 'tripCode', js: 'tripCode', typ: u(undefined, 3.14) },
      { json: 'validity', js: 'validity', typ: u(undefined, r('TimePeriod')) },
      { json: 'version', js: 'version', typ: u(undefined, '') },
    ],
    'any',
  ),
  TimePeriod: o(
    [
      { json: 'from', js: 'from', typ: u(undefined, '') },
      { json: 'to', js: 'to', typ: u(undefined, '') },
    ],
    false,
  ),
  TransportationTrip: o(
    [
      {
        json: 'arrivalTimePlannedJourneyDestination',
        js: 'arrivalTimePlannedJourneyDestination',
        typ: u(undefined, ''),
      },
      {
        json: 'departureTimePlannedJourneyOrigin',
        js: 'departureTimePlannedJourneyOrigin',
        typ: u(undefined, ''),
      },
      { json: 'status', js: 'status', typ: u(undefined, r('Status')) },
      { json: 'trainNumber', js: 'trainNumber', typ: u(undefined, '') },
      { json: 'trainType', js: 'trainType', typ: u(undefined, 'any') },
      { json: 'tripCode', js: 'tripCode', typ: 3.14 },
    ],
    false,
  ),
  County: o(
    [
      { json: 'communes', js: 'communes', typ: u(undefined, a(r('Commune'))) },
      { json: 'id', js: 'id', typ: '' },
      { json: 'isSelected', js: 'isSelected', typ: true },
      { json: 'name', js: 'name', typ: '' },
    ],
    false,
  ),
  Commune: o(
    [
      { json: 'id', js: 'id', typ: 3.14 },
      { json: 'isSelected', js: 'isSelected', typ: true },
      { json: 'name', js: 'name', typ: '' },
    ],
    false,
  ),
  InfoProperties: o(
    [
      {
        json: 'additionalLinks',
        js: 'additionalLinks',
        typ: u(undefined, a(r('AdditionalLink'))),
      },
      { json: 'htmlText', js: 'htmlText', typ: u(undefined, '') },
      { json: 'smsText', js: 'smsText', typ: u(undefined, '') },
      { json: 'speechText', js: 'speechText', typ: u(undefined, '') },
      { json: 'wapText', js: 'wapText', typ: u(undefined, '') },
    ],
    'any',
  ),
  AdditionalLink: o(
    [
      { json: 'fileName', js: 'fileName', typ: u(undefined, '') },
      { json: 'id', js: 'id', typ: u(undefined, '') },
      { json: 'linkTarget', js: 'linkTarget', typ: u(undefined, '') },
      { json: 'linkText', js: 'linkText', typ: u(undefined, '') },
      { json: 'path', js: 'path', typ: u(undefined, '') },
      { json: 'size', js: 'size', typ: u(undefined, 3.14) },
      { json: 'subtitle', js: 'subtitle', typ: u(undefined, '') },
      { json: 'type', js: 'type', typ: u(undefined, '') },
      { json: 'url', js: 'url', typ: u(undefined, '') },
      { json: 'urlText', js: 'urlText', typ: u(undefined, '') },
      { json: 'virtPath', js: 'virtPath', typ: u(undefined, '') },
    ],
    false,
  ),
  Timestamps: o(
    [
      {
        json: 'availability',
        js: 'availability',
        typ: u(undefined, r('TimePeriod')),
      },
      { json: 'creation', js: 'creation', typ: u(undefined, '') },
      {
        json: 'lastModification',
        js: 'lastModification',
        typ: u(undefined, ''),
      },
      {
        json: 'validity',
        js: 'validity',
        typ: u(undefined, a(r('TimePeriod'))),
      },
    ],
    false,
  ),
  ServerInfo: o(
    [
      { json: 'calcTime', js: 'calcTime', typ: u(undefined, 3.14) },
      {
        json: 'controllerVersion',
        js: 'controllerVersion',
        typ: u(undefined, ''),
      },
      { json: 'serverID', js: 'serverID', typ: u(undefined, '') },
      { json: 'serverTime', js: 'serverTime', typ: u(undefined, '') },
      { json: 'virtDir', js: 'virtDir', typ: u(undefined, '') },
    ],
    false,
  ),
  SystemMessage: o(
    [
      { json: 'code', js: 'code', typ: u(undefined, 3.14) },
      { json: 'module', js: 'module', typ: u(undefined, r('Module')) },
      { json: 'subType', js: 'subType', typ: u(undefined, '') },
      { json: 'text', js: 'text', typ: u(undefined, '') },
      { json: 'type', js: 'type', typ: u(undefined, r('SystemMessageType')) },
    ],
    false,
  ),
  SERVINGLINESSchema: o(
    [
      { json: 'lines', js: 'lines', typ: u(undefined, a(r('Transportation'))) },
      {
        json: 'serverInfo',
        js: 'serverInfo',
        typ: u(undefined, r('ServerInfo')),
      },
      {
        json: 'systemMessages',
        js: 'systemMessages',
        typ: u(undefined, a(r('SystemMessage'))),
      },
      { json: 'version', js: 'version', typ: u(undefined, '') },
    ],
    false,
  ),
  TRIPSchema: o(
    [
      { json: 'error', js: 'error', typ: u(undefined, r('Error')) },
      { json: 'journeys', js: 'journeys', typ: u(undefined, a(r('Journey'))) },
      { json: 'properties', js: 'properties', typ: u(undefined, 'any') },
      {
        json: 'serverInfo',
        js: 'serverInfo',
        typ: u(undefined, r('ServerInfo')),
      },
      {
        json: 'systemMessages',
        js: 'systemMessages',
        typ: u(undefined, a(r('SystemMessage'))),
      },
      {
        json: 'taxiOperators',
        js: 'taxiOperators',
        typ: u(undefined, a(r('TaxiOperator'))),
      },
      { json: 'version', js: 'version', typ: '' },
    ],
    false,
  ),
  Journey: o(
    [
      { json: 'booking', js: 'booking', typ: u(undefined, a(r('Booking'))) },
      { json: 'fare', js: 'fare', typ: u(undefined, r('JourneyFare')) },
      { json: 'interchanges', js: 'interchanges', typ: u(undefined, 3.14) },
      { json: 'isAdditional', js: 'isAdditional', typ: u(undefined, true) },
      {
        json: 'isRealtimeOnlyInformative',
        js: 'isRealtimeOnlyInformative',
        typ: u(undefined, true),
      },
      { json: 'legs', js: 'legs', typ: u(undefined, a(r('Leg'))) },
      { json: 'rating', js: 'rating', typ: u(undefined, 3.14) },
    ],
    false,
  ),
  Booking: o(
    [
      { json: 'commType', js: 'commType', typ: u(undefined, r('CommType')) },
      { json: 'fromLeg', js: 'fromLeg', typ: u(undefined, 3.14) },
      { json: 'serverAddress', js: 'serverAddress', typ: u(undefined, '') },
      { json: 'toLeg', js: 'toLeg', typ: u(undefined, 3.14) },
    ],
    false,
  ),
  JourneyFare: o(
    [
      {
        json: 'tickets',
        js: 'tickets',
        typ: u(
          undefined,
          a(u(a('any'), true, 3.14, 0, null, r('TicketObject'), '')),
        ),
      },
      { json: 'zones', js: 'zones', typ: u(undefined, a(r('Zone'))) },
    ],
    false,
  ),
  TicketObject: o(
    [
      { json: 'accompany', js: 'accompany', typ: u(undefined, r('Accompany')) },
      { json: 'comment', js: 'comment', typ: u(undefined, '') },
      { json: 'currency', js: 'currency', typ: u(undefined, '') },
      { json: 'fromLeg', js: 'fromLeg', typ: u(undefined, 3.14) },
      { json: 'id', js: 'id', typ: u(undefined, '') },
      {
        json: 'isShortHaul',
        js: 'isShortHaul',
        typ: u(undefined, r('IsShortHaul')),
      },
      { json: 'name', js: 'name', typ: u(undefined, '') },
      {
        json: 'nameValidityArea',
        js: 'nameValidityArea',
        typ: u(undefined, ''),
      },
      { json: 'net', js: 'net', typ: u(undefined, '') },
      {
        json: 'numberOfChanges',
        js: 'numberOfChanges',
        typ: u(undefined, 3.14),
      },
      { json: 'person', js: 'person', typ: u(undefined, r('Person')) },
      { json: 'priceBrutto', js: 'priceBrutto', typ: u(undefined, 3.14) },
      { json: 'priceLevel', js: 'priceLevel', typ: u(undefined, '') },
      { json: 'priceNetto', js: 'priceNetto', typ: u(undefined, 3.14) },
      {
        json: 'properties',
        js: 'properties',
        typ: u(
          undefined,
          u(a('any'), true, 3.14, 0, null, r('PurpleProperties'), ''),
        ),
      },
      {
        json: 'relationKeys',
        js: 'relationKeys',
        typ: u(undefined, a(r('RelationKey'))),
      },
      {
        json: 'returnsAllowed',
        js: 'returnsAllowed',
        typ: u(undefined, r('IsShortHaul')),
      },
      { json: 'targetGroups', js: 'targetGroups', typ: u(undefined, a('')) },
      { json: 'taxPercent', js: 'taxPercent', typ: u(undefined, 3.14) },
      {
        json: 'timeValidity',
        js: 'timeValidity',
        typ: u(undefined, r('TimeValidity')),
      },
      { json: 'toLeg', js: 'toLeg', typ: u(undefined, 3.14) },
      { json: 'travellerCard', js: 'travellerCard', typ: u(undefined, '') },
      {
        json: 'travellerClass',
        js: 'travellerClass',
        typ: u(undefined, r('TravellerClass')),
      },
      { json: 'URL', js: 'URL', typ: u(undefined, '') },
      {
        json: 'validForOneJourneyOnly',
        js: 'validForOneJourneyOnly',
        typ: u(undefined, r('IsShortHaul')),
      },
      {
        json: 'validForOneOperatorOnly',
        js: 'validForOneOperatorOnly',
        typ: u(undefined, r('IsShortHaul')),
      },
      { json: 'validFrom', js: 'validFrom', typ: u(undefined, '') },
      { json: 'validMinutes', js: 'validMinutes', typ: u(undefined, 3.14) },
      { json: 'validTo', js: 'validTo', typ: u(undefined, '') },
    ],
    'any',
  ),
  Accompany: o(
    [
      { json: 'adults', js: 'adults', typ: 3.14 },
      { json: 'animals', js: 'animals', typ: 3.14 },
      { json: 'bicycles', js: 'bicycles', typ: 3.14 },
      { json: 'children', js: 'children', typ: 3.14 },
      { json: 'endTime', js: 'endTime', typ: 3.14 },
      { json: 'startTime', js: 'startTime', typ: 3.14 },
    ],
    false,
  ),
  PurpleProperties: o(
    [
      { json: 'journeyDetail', js: 'journeyDetail', typ: u(undefined, '') },
      { json: 'ticketLongName', js: 'ticketLongName', typ: u(undefined, '') },
    ],
    'any',
  ),
  RelationKey: o(
    [
      { json: 'areas', js: 'areas', typ: u(undefined, a(r('TicketArea'))) },
      { json: 'code', js: 'code', typ: '' },
      { json: 'id', js: 'id', typ: '' },
      { json: 'name', js: 'name', typ: '' },
      { json: 'scopeAreas', js: 'scopeAreas', typ: u(undefined, a(3.14)) },
      { json: 'sections', js: 'sections', typ: u(undefined, a(3.14)) },
    ],
    false,
  ),
  TicketArea: o(
    [
      { json: 'id', js: 'id', typ: 3.14 },
      { json: 'name', js: 'name', typ: '' },
    ],
    false,
  ),
  Zone: o(
    [
      { json: 'fromLeg', js: 'fromLeg', typ: u(undefined, 3.14) },
      { json: 'net', js: 'net', typ: u(undefined, '') },
      { json: 'neutralZone', js: 'neutralZone', typ: u(undefined, '') },
      { json: 'toLeg', js: 'toLeg', typ: u(undefined, 3.14) },
      { json: 'zones', js: 'zones', typ: u(undefined, a(a(''))) },
      { json: 'zonesUnited', js: 'zonesUnited', typ: u(undefined, a(a(''))) },
    ],
    false,
  ),
  Leg: o(
    [
      {
        json: 'coords',
        js: 'coords',
        typ: u(undefined, a(a(u(a('any'), r('CoordClass'), 3.14)))),
      },
      {
        json: 'destination',
        js: 'destination',
        typ: u(undefined, r('JourneyLocationElement')),
      },
      { json: 'distance', js: 'distance', typ: u(undefined, 3.14) },
      { json: 'duration', js: 'duration', typ: u(undefined, 3.14) },
      {
        json: 'elevationSummary',
        js: 'elevationSummary',
        typ: u(undefined, r('ElevationSummary')),
      },
      { json: 'fare', js: 'fare', typ: u(undefined, r('LegFare')) },
      {
        json: 'footPathInfo',
        js: 'footPathInfo',
        typ: u(
          undefined,
          a(u(a('any'), true, r('FootPathInfoClass'), 3.14, 0, null, '')),
        ),
      },
      { json: 'hints', js: 'hints', typ: u(undefined, a(r('Info'))) },
      { json: 'infos', js: 'infos', typ: u(undefined, a(r('Info'))) },
      {
        json: 'interchange',
        js: 'interchange',
        typ: u(undefined, r('Interchange')),
      },
      {
        json: 'isRealtimeControlled',
        js: 'isRealtimeControlled',
        typ: u(undefined, true),
      },
      {
        json: 'origin',
        js: 'origin',
        typ: u(undefined, r('JourneyLocationElement')),
      },
      {
        json: 'pathDescriptions',
        js: 'pathDescriptions',
        typ: u(
          undefined,
          a(u(a('any'), true, r('PathDescriptionClass'), 3.14, 0, null, '')),
        ),
      },
      {
        json: 'properties',
        js: 'properties',
        typ: u(
          undefined,
          u(a('any'), true, 3.14, 0, null, r('FluffyProperties'), ''),
        ),
      },
      {
        json: 'realtimeStatus',
        js: 'realtimeStatus',
        typ: u(undefined, a(r('RealtimeTripStatus'))),
      },
      {
        json: 'stopSequence',
        js: 'stopSequence',
        typ: u(undefined, a(r('JourneyLocationElement'))),
      },
      {
        json: 'transportation',
        js: 'transportation',
        typ: u(undefined, r('Transportation')),
      },
      {
        json: 'vehicleAccess',
        js: 'vehicleAccess',
        typ: u(undefined, u(a(''), '')),
      },
    ],
    false,
  ),
  ElevationSummary: o(
    [
      { json: 'altDiffDw', js: 'altDiffDw', typ: u(undefined, 3.14) },
      { json: 'altDiffUp', js: 'altDiffUp', typ: u(undefined, 3.14) },
      {
        json: 'DestHeightMeter',
        js: 'DestHeightMeter',
        typ: u(undefined, 3.14),
      },
      { json: 'distDw', js: 'distDw', typ: u(undefined, 3.14) },
      { json: 'distUp', js: 'distUp', typ: u(undefined, 3.14) },
      { json: 'Length', js: 'Length', typ: u(undefined, 3.14) },
      { json: 'maxAlt', js: 'maxAlt', typ: u(undefined, 3.14) },
      {
        json: 'MaxDeclinePercent',
        js: 'MaxDeclinePercent',
        typ: u(undefined, 3.14),
      },
      { json: 'maxGrad', js: 'maxGrad', typ: u(undefined, 3.14) },
      {
        json: 'MaxHeightMeters',
        js: 'MaxHeightMeters',
        typ: u(undefined, 3.14),
      },
      {
        json: 'MaxInclinePercent',
        js: 'MaxInclinePercent',
        typ: u(undefined, 3.14),
      },
      { json: 'maxSlope', js: 'maxSlope', typ: u(undefined, 3.14) },
      { json: 'minAlt', js: 'minAlt', typ: u(undefined, 3.14) },
      {
        json: 'MinHeightMeters',
        js: 'MinHeightMeters',
        typ: u(undefined, 3.14),
      },
      {
        json: 'OrigHeightMeter',
        js: 'OrigHeightMeter',
        typ: u(undefined, 3.14),
      },
      { json: 'pixelHeight', js: 'pixelHeight', typ: u(undefined, 3.14) },
      { json: 'pixelWidth', js: 'pixelWidth', typ: u(undefined, 3.14) },
      {
        json: 'TotalDeclineMeters',
        js: 'TotalDeclineMeters',
        typ: u(undefined, 3.14),
      },
      {
        json: 'TotalDownwardMeters',
        js: 'TotalDownwardMeters',
        typ: u(undefined, 3.14),
      },
      {
        json: 'TotalInclineMeter',
        js: 'TotalInclineMeter',
        typ: u(undefined, 3.14),
      },
      {
        json: 'TotalUpwardMeters',
        js: 'TotalUpwardMeters',
        typ: u(undefined, 3.14),
      },
    ],
    false,
  ),
  LegFare: o(
    [{ json: 'zones', js: 'zones', typ: u(undefined, a(r('Zone'))) }],
    false,
  ),
  FootPathInfoClass: o(
    [
      { json: 'duration', js: 'duration', typ: u(undefined, 3.14) },
      {
        json: 'footPathElem',
        js: 'footPathElem',
        typ: u(
          undefined,
          a(u(a('any'), true, 3.14, 0, null, r('FootPathElemObject'), '')),
        ),
      },
      { json: 'position', js: 'position', typ: u(undefined, r('Position')) },
    ],
    false,
  ),
  FootPathElemObject: o(
    [
      { json: 'description', js: 'description', typ: u(undefined, '') },
      {
        json: 'destination',
        js: 'destination',
        typ: u(undefined, r('PurpleJourneyLocation')),
      },
      { json: 'level', js: 'level', typ: u(undefined, r('Level')) },
      { json: 'levelFrom', js: 'levelFrom', typ: u(undefined, 3.14) },
      { json: 'levelTo', js: 'levelTo', typ: u(undefined, 3.14) },
      {
        json: 'origin',
        js: 'origin',
        typ: u(undefined, r('FluffyJourneyLocation')),
      },
      { json: 'type', js: 'type', typ: u(undefined, r('FootPathElemType')) },
    ],
    'any',
  ),
  PurpleJourneyLocation: o(
    [
      {
        json: 'assignedStops',
        js: 'assignedStops',
        typ: u(undefined, a(r('AssignedLocation'))),
      },
      { json: 'buildingNumber', js: 'buildingNumber', typ: u(undefined, '') },
      {
        json: 'coord',
        js: 'coord',
        typ: u(undefined, a(u(a('any'), r('CoordClass'), 3.14))),
      },
      {
        json: 'disassembledName',
        js: 'disassembledName',
        typ: u(undefined, ''),
      },
      { json: 'id', js: 'id', typ: u(undefined, '') },
      { json: 'infos', js: 'infos', typ: u(undefined, a(r('Info'))) },
      { json: 'isBest', js: 'isBest', typ: u(undefined, true) },
      { json: 'isGlobalId', js: 'isGlobalId', typ: u(undefined, true) },
      { json: 'matchQuality', js: 'matchQuality', typ: u(undefined, 3.14) },
      { json: 'name', js: 'name', typ: u(undefined, '') },
      { json: 'niveau', js: 'niveau', typ: u(undefined, 3.14) },
      { json: 'parent', js: 'parent', typ: u(undefined, r('Location')) },
      {
        json: 'productClasses',
        js: 'productClasses',
        typ: u(undefined, a(3.14)),
      },
      {
        json: 'properties',
        js: 'properties',
        typ: u(undefined, r('LocationProperties')),
      },
      { json: 'streetName', js: 'streetName', typ: u(undefined, '') },
      { json: 'type', js: 'type', typ: u(undefined, r('LocationType')) },
      {
        json: 'arrivalTimeBaseTimetable',
        js: 'arrivalTimeBaseTimetable',
        typ: u(undefined, ''),
      },
      {
        json: 'arrivalTimeEstimated',
        js: 'arrivalTimeEstimated',
        typ: u(undefined, ''),
      },
      {
        json: 'arrivalTimePlanned',
        js: 'arrivalTimePlanned',
        typ: u(undefined, ''),
      },
      {
        json: 'departureTimeBaseTimetable',
        js: 'departureTimeBaseTimetable',
        typ: u(undefined, ''),
      },
      {
        json: 'departureTimeEstimated',
        js: 'departureTimeEstimated',
        typ: u(undefined, ''),
      },
      {
        json: 'departureTimePlanned',
        js: 'departureTimePlanned',
        typ: u(undefined, ''),
      },
      {
        json: 'isRealtimeControlled',
        js: 'isRealtimeControlled',
        typ: u(undefined, true),
      },
    ],
    'any',
  ),
  FluffyJourneyLocation: o(
    [
      {
        json: 'assignedStops',
        js: 'assignedStops',
        typ: u(undefined, a(r('AssignedLocation'))),
      },
      { json: 'buildingNumber', js: 'buildingNumber', typ: u(undefined, '') },
      {
        json: 'coord',
        js: 'coord',
        typ: u(undefined, a(u(a('any'), r('CoordClass'), 3.14))),
      },
      {
        json: 'disassembledName',
        js: 'disassembledName',
        typ: u(undefined, ''),
      },
      { json: 'id', js: 'id', typ: u(undefined, '') },
      { json: 'infos', js: 'infos', typ: u(undefined, a(r('Info'))) },
      { json: 'isBest', js: 'isBest', typ: u(undefined, true) },
      { json: 'isGlobalId', js: 'isGlobalId', typ: u(undefined, true) },
      { json: 'matchQuality', js: 'matchQuality', typ: u(undefined, 3.14) },
      { json: 'name', js: 'name', typ: u(undefined, '') },
      { json: 'niveau', js: 'niveau', typ: u(undefined, 3.14) },
      { json: 'parent', js: 'parent', typ: u(undefined, r('Location')) },
      {
        json: 'productClasses',
        js: 'productClasses',
        typ: u(undefined, a(3.14)),
      },
      {
        json: 'properties',
        js: 'properties',
        typ: u(undefined, r('LocationProperties')),
      },
      { json: 'streetName', js: 'streetName', typ: u(undefined, '') },
      { json: 'type', js: 'type', typ: u(undefined, r('LocationType')) },
      {
        json: 'arrivalTimeBaseTimetable',
        js: 'arrivalTimeBaseTimetable',
        typ: u(undefined, ''),
      },
      {
        json: 'arrivalTimeEstimated',
        js: 'arrivalTimeEstimated',
        typ: u(undefined, ''),
      },
      {
        json: 'arrivalTimePlanned',
        js: 'arrivalTimePlanned',
        typ: u(undefined, ''),
      },
      {
        json: 'departureTimeBaseTimetable',
        js: 'departureTimeBaseTimetable',
        typ: u(undefined, ''),
      },
      {
        json: 'departureTimeEstimated',
        js: 'departureTimeEstimated',
        typ: u(undefined, ''),
      },
      {
        json: 'departureTimePlanned',
        js: 'departureTimePlanned',
        typ: u(undefined, ''),
      },
      {
        json: 'isRealtimeControlled',
        js: 'isRealtimeControlled',
        typ: u(undefined, true),
      },
    ],
    'any',
  ),
  Interchange: o(
    [
      {
        json: 'coords',
        js: 'coords',
        typ: u(undefined, a(a(u(a('any'), r('CoordClass'), 3.14)))),
      },
      { json: 'desc', js: 'desc', typ: u(undefined, '') },
      { json: 'type', js: 'type', typ: u(undefined, 3.14) },
    ],
    false,
  ),
  PathDescriptionClass: o(
    [
      { json: 'addInfo', js: 'addInfo', typ: u(undefined, a('')) },
      {
        json: 'coord',
        js: 'coord',
        typ: u(undefined, a(u(a('any'), r('CoordClass'), 3.14))),
      },
      { json: 'cumDistance', js: 'cumDistance', typ: u(undefined, 3.14) },
      { json: 'cumDuration', js: 'cumDuration', typ: u(undefined, 3.14) },
      { json: 'distance', js: 'distance', typ: u(undefined, 3.14) },
      { json: 'distanceDown', js: 'distanceDown', typ: u(undefined, 3.14) },
      { json: 'distanceUp', js: 'distanceUp', typ: u(undefined, 3.14) },
      { json: 'duration', js: 'duration', typ: u(undefined, 3.14) },
      {
        json: 'fromCoordsIndex',
        js: 'fromCoordsIndex',
        typ: u(undefined, 3.14),
      },
      {
        json: 'guidanceSigns',
        js: 'guidanceSigns',
        typ: u(undefined, a(r('GuidanceSign'))),
      },
      { json: 'manoeuvre', js: 'manoeuvre', typ: u(undefined, r('Manoeuvre')) },
      { json: 'name', js: 'name', typ: u(undefined, '') },
      { json: 'niveau', js: 'niveau', typ: u(undefined, 3.14) },
      { json: 'properties', js: 'properties', typ: u(undefined, m('any')) },
      { json: 'skyDirection', js: 'skyDirection', typ: u(undefined, 3.14) },
      { json: 'toCoordsIndex', js: 'toCoordsIndex', typ: u(undefined, 3.14) },
      {
        json: 'turnDirection',
        js: 'turnDirection',
        typ: u(undefined, r('TurnDirection')),
      },
    ],
    false,
  ),
  GuidanceSign: o(
    [
      { json: 'skyDirection', js: 'skyDirection', typ: u(undefined, '') },
      { json: 'text', js: 'text', typ: u(undefined, '') },
      { json: 'type', js: 'type', typ: u(undefined, r('GuidanceSignType')) },
      { json: 'url', js: 'url', typ: u(undefined, '') },
    ],
    false,
  ),
  FluffyProperties: o(
    [{ json: 'frequency', js: 'frequency', typ: u(undefined, r('Frequency')) }],
    'any',
  ),
  Frequency: o(
    [
      { json: 'avDuration', js: 'avDuration', typ: 3.14 },
      { json: 'avTimeGap', js: 'avTimeGap', typ: 3.14 },
      { json: 'maxDuration', js: 'maxDuration', typ: 3.14 },
      { json: 'maxTimeGap', js: 'maxTimeGap', typ: 3.14 },
      { json: 'minDuration', js: 'minDuration', typ: 3.14 },
      { json: 'minTimeGap', js: 'minTimeGap', typ: 3.14 },
    ],
    false,
  ),
  TaxiOperator: o(
    [
      { json: 'desc', js: 'desc', typ: '' },
      { json: 'omc', js: 'omc', typ: '' },
      { json: 'providers', js: 'providers', typ: a(r('TaxiProvider')) },
    ],
    false,
  ),
  TaxiProvider: o(
    [
      { json: 'address', js: 'address', typ: '' },
      { json: 'name', js: 'name', typ: '' },
      { json: 'tel', js: 'tel', typ: '' },
      { json: 'url', js: 'url', typ: '' },
    ],
    false,
  ),
  DataSource: ['PROFILE', 'REALTIME', 'UNKNOWN'],
  BikeFuncClass: [
    'BMX',
    'CROSS',
    'CRUISER',
    'FREIGHT',
    'HYBRID',
    'MOTORIZED',
    'MOUNTAIN',
    'RACING',
    'ROAD',
    'TOURING',
    'UNDEFINED',
    'UTILITY',
  ],
  CarClass: [
    'CITYCAR',
    'EXECUTIVECAR',
    'LARGEFAMILYCAR',
    'LUXURYCAR',
    'MULTIPURPOSECARS',
    'SMALLFAMILYCAR',
    'SPORTCOUPES',
    'SPORTUTILITY',
    'SUPERMINI',
    'UNDEFINED',
  ],
  EbikeClass: [
    'PEDELEC',
    'PEDELEC_S',
    'POWER_ON_DEMAND_ONLY',
    'POWER_ON_DEMAND_PEDAL_ASSIST',
    'UNDEFINED',
  ],
  Engine: ['COMBUSTION', 'ELECTRIC', 'HYBRID', 'UNDEFINED'],
  EXT: [
    'BAD',
    'GOOD',
    'NEUTRAL',
    'UNACCEPTABLE',
    'UNDEFINED',
    'VERYBAD',
    'VERYGOOD',
  ],
  Gearshift: ['AUTOMATIC', 'MANUAL', 'SEMI_MANUAL', 'UNDEFINED'],
  MotorcycleClass: [
    'CABIN_FULLYENCLOSED',
    'CABIN_SEMIENCLOSED',
    'CRUISER',
    'DUALSPORT',
    'MOPED',
    'OFFROAD_ENDURO',
    'OFFROAD_MOTOCROSS',
    'OFFROAD_RALLYRAID',
    'OFFROAD_TRACKRACING',
    'OFFROAD_TRAIL',
    'SCOOTER',
    'SPORTBIKE',
    'SPORTTOURING',
    'STANDARD',
    'TOURING',
    'TRICYCLE',
    'UNDEFINED',
    'UNDERBONE',
  ],
  VehType: ['BIKE', 'CAR', 'MOTORCYCLE', 'UNDEFINED'],
  CoordInfoDetailsType: ['FREEFLOATER', 'PARKING', 'STATION', 'UNKNOWN'],
  Occupancy: [
    'CRUSHED_STANDING',
    'EMPTY',
    'FEW_SEATS',
    'FULL',
    'MANY_SEATS',
    'NOT_ACCEPTING_PASSENGERS',
    'STANDING_ONLY',
    'UNKNOWN',
  ],
  ParkingSpaceTypeType: [
    'BICYCLE',
    'BICYCLE_BOX',
    'BICYCLE_CHARGING_STATION',
    'BICYCLE_SHELTER',
    'BUS',
    'CAMPING_VAN',
    'CAR',
    'CAR_CHARGING_STATION',
    'CAR_FAMILY',
    'CAR_FEMALE',
    'CAR_HANDICAPPED',
    'MOTORCYCLE',
    'TRUCK',
    'UNKNOWN',
  ],
  Accessibility: [
    'ACCESSIBILITY_PUBLIC_ACCESS',
    'ACCESSIBILITY_RESTRICTED_ACCESS',
    'ACCESSIBILITY_UNDEFINED',
  ],
  GeometryObjectType: [
    'GeometryCollection',
    'LineString',
    'MultiLineString',
    'MultiPoint',
    'MultiPolygon',
    'Point',
    'Polygon',
  ],
  ParkingTaxType: ['DAY', 'HOUR', 'MONTH', 'UNKNOWN'],
  RealtimeCallStatus: [
    'AREA_CHANGED',
    'ARRIVAL_CANCELLED',
    'DEPARTURE_CANCELLED',
    'DEVIATION_FROM_LINE',
    'EXTRA_STOP',
    'EXTRA_TRIP',
    'NO_CALL_AT_STOP',
    'SCHEDULED_TIME_CHANGED',
    'TRIP_CANCELLED',
  ],
  LocationType: [
    'address',
    'crossing',
    'gis',
    'locality',
    'parking',
    'platform',
    'poi',
    'poiHierarchy',
    'sharing',
    'stop',
    'street',
    'suburb',
    'unknown',
  ],
  LineDisplay: ['LINE', 'TRAIN', 'UNKNOWN'],
  SpecialFares: [
    'ICE_ROUTE',
    'ROUTE_IN_TRANSPORT_AUTHORITY_AREA',
    'ROUTE_IN_TRANSPORT_AUTHORITY_AREA_NO_FARE_CALCULATION',
    'ROUTE_OUTSIDE_OF_TRANSPORT_AUTHORITY_AREA',
    'ROUTE_WITH_SUPPLEMENT',
    'ROUTE_WITH_SUPPLEMENT_NO_FARE_CALCULATION',
    'UNKNOWN',
  ],
  Status: ['ADDITIONAL_STOP', 'BLOCKED', 'DELAYED'],
  Module: [
    'AHF',
    'BROKER',
    'DISPATCHER',
    'EFAPSCHED',
    'IT_KERNEL',
    'itp-monomodal',
    'MAP_KERNEL',
    'PDA',
    'PPROF',
    'PT_KERNEL',
    'ROP',
    'STT',
    'TTB',
    'UNKNOWN',
  ],
  SystemMessageType: ['error', 'message', 'warning'],
  CommType: ['FAX', 'HTTP', 'ISDN', 'JSON', 'TCPIP', 'UNKNOWN'],
  IsShortHaul: ['NO', 'UNKNOWN', 'YES'],
  Person: [
    'ADULT',
    'APPRENTICE',
    'CHILD',
    'FAMILY',
    'KINDERGARTEN',
    'MULTIADULTS',
    'MULTICHILDS',
    'MULTIPERSONS',
    'OTHER',
    'REDUCED',
    'SCHOLAR',
    'SENIOR',
    'STUDENT',
  ],
  TimeValidity: [
    'DAY',
    'HALFYEAR',
    'MONTH',
    'MULTIPLE',
    'OTHER_VALIDITYTIME',
    'SINGLE',
    'WEEK',
    'YEAR',
  ],
  TravellerClass: ['BUSINESS', 'ECONOMY', 'FIRST', 'OTHER', 'SECOND'],
  Level: ['DOWN', 'LEVEL', 'UP'],
  FootPathElemType: [
    'DANGEROUS',
    'ELEVATOR',
    'ESCALATOR',
    'ILLUMINATED',
    'LEVEL',
    'RAMP',
    'STAIRS',
  ],
  Position: ['AFTER', 'BEFORE', 'IDEST', 'unknown'],
  GuidanceSignType: [
    'DIRECTION',
    'EXIT_NUMBER',
    'ROUTE_ID',
    'UNKNOWN_SIGN_TYPE',
  ],
  Manoeuvre: [
    'CONTINUE',
    'DESTINATION',
    'ENTER',
    'ENTER_BUILTUPAREA',
    'ENTER_ROUNDABOUT',
    'ENTER_TOLL',
    'KEEP',
    'LEAVE',
    'LEAVE_BUILTUPAREA',
    'LEAVE_ROUNDABOUT',
    'LEAVE_TOLL',
    'OFF_RAMP',
    'ON_RAMP',
    'ORIGIN',
    'RAMP',
    'STAY_ROUNDABOUT',
    'TRAVERSE_CROSSING',
    'TURN',
    'U_TURN',
    'UNKNOWN',
  ],
  TurnDirection: [
    'LEFT',
    'RIGHT',
    'SHARP_LEFT',
    'SHARP_RIGHT',
    'SLIGHT_LEFT',
    'SLIGHT_RIGHT',
    'STRAIGHT',
    'U_TURN',
    'UNKNOWN',
  ],
  RealtimeTripStatus: [
    'DEVIATION',
    'EXTRA_STOPS',
    'EXTRA_TRIP',
    'MONITORED',
    'OUTSIDE_REALTIME_WINDOW',
    'PROGNOSIS_IMPOSSIBLE',
    'REALTIME_ONLY_INFORMATIVE',
    'TRIP_CANCELLED',
  ],
};
