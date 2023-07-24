export interface LOCATIONSUGGESTSchema {
    error?: Error;
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
export interface Transportation {
    allCoords?: Array<Array<Array<any[] | CoordClass | number>>>;
    assignedStop?: string;
    assignedStopId?: string;
    coords?: Array<Array<Array<any[] | CoordClass | number>>>;
    description?: string;
    destination?: Location;
    disassembledName?: string;
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
    d?: number;
    n?: number;
    nF?: number;
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
    parkingSpaces?: Array<any[] | boolean | ParkingSpaceTypeClass | number | number | null | string>;
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
    properties?: {
        [key: string]: any;
    };
    usageCosts?: LanguageString[];
}
export interface ConnectorType {
    id?: string;
    properties?: {
        [key: string]: any;
    };
}
export interface ChargingOperator {
    id?: string;
    name?: string;
    properties?: {
        [key: string]: any;
    };
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
export declare enum DataSource {
    Profile = "PROFILE",
    Realtime = "REALTIME",
    Unknown = "UNKNOWN"
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
export declare enum BikeFuncClass {
    Bmx = "BMX",
    Cross = "CROSS",
    Cruiser = "CRUISER",
    Freight = "FREIGHT",
    Hybrid = "HYBRID",
    Motorized = "MOTORIZED",
    Mountain = "MOUNTAIN",
    Racing = "RACING",
    Road = "ROAD",
    Touring = "TOURING",
    Undefined = "UNDEFINED",
    Utility = "UTILITY"
}
export declare enum CarClass {
    Citycar = "CITYCAR",
    Executivecar = "EXECUTIVECAR",
    Largefamilycar = "LARGEFAMILYCAR",
    Luxurycar = "LUXURYCAR",
    Multipurposecars = "MULTIPURPOSECARS",
    Smallfamilycar = "SMALLFAMILYCAR",
    Sportcoupes = "SPORTCOUPES",
    Sportutility = "SPORTUTILITY",
    Supermini = "SUPERMINI",
    Undefined = "UNDEFINED"
}
export declare enum EbikeClass {
    Pedelec = "PEDELEC",
    PedelecS = "PEDELEC_S",
    PowerOnDemandOnly = "POWER_ON_DEMAND_ONLY",
    PowerOnDemandPedalAssist = "POWER_ON_DEMAND_PEDAL_ASSIST",
    Undefined = "UNDEFINED"
}
export declare enum Engine {
    Combustion = "COMBUSTION",
    Electric = "ELECTRIC",
    Hybrid = "HYBRID",
    Undefined = "UNDEFINED"
}
export declare enum EXT {
    Bad = "BAD",
    Good = "GOOD",
    Neutral = "NEUTRAL",
    Unacceptable = "UNACCEPTABLE",
    Undefined = "UNDEFINED",
    Verybad = "VERYBAD",
    Verygood = "VERYGOOD"
}
export declare enum Gearshift {
    Automatic = "AUTOMATIC",
    Manual = "MANUAL",
    SemiManual = "SEMI_MANUAL",
    Undefined = "UNDEFINED"
}
export declare enum MotorcycleClass {
    CabinFullyenclosed = "CABIN_FULLYENCLOSED",
    CabinSemienclosed = "CABIN_SEMIENCLOSED",
    Cruiser = "CRUISER",
    Dualsport = "DUALSPORT",
    Moped = "MOPED",
    OffroadEnduro = "OFFROAD_ENDURO",
    OffroadMotocross = "OFFROAD_MOTOCROSS",
    OffroadRallyraid = "OFFROAD_RALLYRAID",
    OffroadTrackracing = "OFFROAD_TRACKRACING",
    OffroadTrail = "OFFROAD_TRAIL",
    Scooter = "SCOOTER",
    Sportbike = "SPORTBIKE",
    Sporttouring = "SPORTTOURING",
    Standard = "STANDARD",
    Touring = "TOURING",
    Tricycle = "TRICYCLE",
    Undefined = "UNDEFINED",
    Underbone = "UNDERBONE"
}
export declare enum VehType {
    Bike = "BIKE",
    Car = "CAR",
    Motorcycle = "MOTORCYCLE",
    Undefined = "UNDEFINED"
}
export declare enum CoordInfoDetailsType {
    Freefloater = "FREEFLOATER",
    Parking = "PARKING",
    Station = "STATION",
    Unknown = "UNKNOWN"
}
export interface Download {
    email?: string;
    properties?: any;
    size?: number;
    type?: string;
    url?: string;
}
export declare enum Occupancy {
    CrushedStanding = "CRUSHED_STANDING",
    Empty = "EMPTY",
    FewSeats = "FEW_SEATS",
    Full = "FULL",
    ManySeats = "MANY_SEATS",
    NotAcceptingPassengers = "NOT_ACCEPTING_PASSENGERS",
    StandingOnly = "STANDING_ONLY",
    Unknown = "UNKNOWN"
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
export declare enum ParkingSpaceTypeType {
    Bicycle = "BICYCLE",
    BicycleBox = "BICYCLE_BOX",
    BicycleChargingStation = "BICYCLE_CHARGING_STATION",
    BicycleShelter = "BICYCLE_SHELTER",
    Bus = "BUS",
    CampingVan = "CAMPING_VAN",
    Car = "CAR",
    CarChargingStation = "CAR_CHARGING_STATION",
    CarFamily = "CAR_FAMILY",
    CarFemale = "CAR_FEMALE",
    CarHandicapped = "CAR_HANDICAPPED",
    Motorcycle = "MOTORCYCLE",
    Truck = "TRUCK",
    Unknown = "UNKNOWN"
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
    properties?: {
        [key: string]: any;
    };
    telephone?: string;
}
export declare enum Accessibility {
    AccessibilityPublicAccess = "ACCESSIBILITY_PUBLIC_ACCESS",
    AccessibilityRestrictedAccess = "ACCESSIBILITY_RESTRICTED_ACCESS",
    AccessibilityUndefined = "ACCESSIBILITY_UNDEFINED"
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
    coordinates?: any[] | boolean | CoordinatesClass | number | number | null | string;
    geometries?: any[];
    mapName?: string;
    type?: GeometryObjectType;
}
export interface CoordinatesClass {
}
export declare enum GeometryObjectType {
    GeometryCollection = "GeometryCollection",
    LineString = "LineString",
    MultiLineString = "MultiLineString",
    MultiPoint = "MultiPoint",
    MultiPolygon = "MultiPolygon",
    Point = "Point",
    Polygon = "Polygon"
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
export declare enum ParkingTaxType {
    Day = "DAY",
    Hour = "HOUR",
    Month = "MONTH",
    Unknown = "UNKNOWN"
}
export declare enum RealtimeCallStatus {
    AreaChanged = "AREA_CHANGED",
    ArrivalCancelled = "ARRIVAL_CANCELLED",
    DepartureCancelled = "DEPARTURE_CANCELLED",
    DeviationFromLine = "DEVIATION_FROM_LINE",
    ExtraStop = "EXTRA_STOP",
    ExtraTrip = "EXTRA_TRIP",
    NoCallAtStop = "NO_CALL_AT_STOP",
    ScheduledTimeChanged = "SCHEDULED_TIME_CHANGED",
    TripCancelled = "TRIP_CANCELLED"
}
export declare enum LocationType {
    Address = "address",
    Crossing = "crossing",
    GIS = "gis",
    Locality = "locality",
    Parking = "parking",
    Platform = "platform",
    Poi = "poi",
    PoiHierarchy = "poiHierarchy",
    Sharing = "sharing",
    Stop = "stop",
    Street = "street",
    Suburb = "suburb",
    Unknown = "unknown"
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
export declare enum LineDisplay {
    Line = "LINE",
    Train = "TRAIN",
    Unknown = "UNKNOWN"
}
export declare enum SpecialFares {
    IceRoute = "ICE_ROUTE",
    RouteInTransportAuthorityArea = "ROUTE_IN_TRANSPORT_AUTHORITY_AREA",
    RouteInTransportAuthorityAreaNoFareCalculation = "ROUTE_IN_TRANSPORT_AUTHORITY_AREA_NO_FARE_CALCULATION",
    RouteOutsideOfTransportAuthorityArea = "ROUTE_OUTSIDE_OF_TRANSPORT_AUTHORITY_AREA",
    RouteWithSupplement = "ROUTE_WITH_SUPPLEMENT",
    RouteWithSupplementNoFareCalculation = "ROUTE_WITH_SUPPLEMENT_NO_FARE_CALCULATION",
    Unknown = "UNKNOWN"
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
export declare enum Status {
    AdditionalStop = "ADDITIONAL_STOP",
    Blocked = "BLOCKED",
    Delayed = "DELAYED"
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
export declare enum Module {
    Ahf = "AHF",
    Broker = "BROKER",
    Dispatcher = "DISPATCHER",
    Efapsched = "EFAPSCHED",
    ItKernel = "IT_KERNEL",
    ItpMonomodal = "itp-monomodal",
    MapKernel = "MAP_KERNEL",
    PDA = "PDA",
    Pprof = "PPROF",
    PtKernel = "PT_KERNEL",
    Rop = "ROP",
    Stt = "STT",
    Ttb = "TTB",
    Unknown = "UNKNOWN"
}
export declare enum SystemMessageType {
    Error = "error",
    Message = "message",
    Warning = "warning"
}
export interface SERVINGLINESSchema {
    lines?: Transportation[];
    serverInfo?: ServerInfo;
    systemMessages?: SystemMessage[];
    version?: string;
}
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
export declare enum CommType {
    Fax = "FAX",
    HTTP = "HTTP",
    ISDN = "ISDN",
    JSON = "JSON",
    Tcpip = "TCPIP",
    Unknown = "UNKNOWN"
}
export interface JourneyFare {
    tickets?: Array<any[] | boolean | number | number | null | TicketObject | string>;
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
    properties?: any[] | boolean | number | number | null | PurpleProperties | string;
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
export declare enum IsShortHaul {
    No = "NO",
    Unknown = "UNKNOWN",
    Yes = "YES"
}
export declare enum Person {
    Adult = "ADULT",
    Apprentice = "APPRENTICE",
    Child = "CHILD",
    Family = "FAMILY",
    Kindergarten = "KINDERGARTEN",
    Multiadults = "MULTIADULTS",
    Multichilds = "MULTICHILDS",
    Multipersons = "MULTIPERSONS",
    Other = "OTHER",
    Reduced = "REDUCED",
    Scholar = "SCHOLAR",
    Senior = "SENIOR",
    Student = "STUDENT"
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
export declare enum TimeValidity {
    Day = "DAY",
    Halfyear = "HALFYEAR",
    Month = "MONTH",
    Multiple = "MULTIPLE",
    OtherValiditytime = "OTHER_VALIDITYTIME",
    Single = "SINGLE",
    Week = "WEEK",
    Year = "YEAR"
}
export declare enum TravellerClass {
    Business = "BUSINESS",
    Economy = "ECONOMY",
    First = "FIRST",
    Other = "OTHER",
    Second = "SECOND"
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
    footPathInfo?: Array<any[] | boolean | FootPathInfoClass | number | number | null | string>;
    hints?: Info[];
    infos?: Info[];
    interchange?: Interchange;
    isRealtimeControlled?: boolean;
    origin?: JourneyLocationElement;
    pathDescriptions?: Array<any[] | boolean | PathDescriptionClass | number | number | null | string>;
    properties?: any[] | boolean | number | number | null | FluffyProperties | string;
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
    footPathElem?: Array<any[] | boolean | number | number | null | FootPathElemObject | string>;
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
export declare enum Level {
    Down = "DOWN",
    Level = "LEVEL",
    Up = "UP"
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
export declare enum FootPathElemType {
    Dangerous = "DANGEROUS",
    Elevator = "ELEVATOR",
    Escalator = "ESCALATOR",
    Illuminated = "ILLUMINATED",
    Level = "LEVEL",
    Ramp = "RAMP",
    Stairs = "STAIRS"
}
export declare enum Position {
    After = "AFTER",
    Before = "BEFORE",
    Idest = "IDEST",
    Unknown = "unknown"
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
    properties?: {
        [key: string]: any;
    };
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
export declare enum GuidanceSignType {
    Direction = "DIRECTION",
    ExitNumber = "EXIT_NUMBER",
    RouteID = "ROUTE_ID",
    UnknownSignType = "UNKNOWN_SIGN_TYPE"
}
export declare enum Manoeuvre {
    Continue = "CONTINUE",
    Destination = "DESTINATION",
    Enter = "ENTER",
    EnterBuiltuparea = "ENTER_BUILTUPAREA",
    EnterRoundabout = "ENTER_ROUNDABOUT",
    EnterToll = "ENTER_TOLL",
    Keep = "KEEP",
    Leave = "LEAVE",
    LeaveBuiltuparea = "LEAVE_BUILTUPAREA",
    LeaveRoundabout = "LEAVE_ROUNDABOUT",
    LeaveToll = "LEAVE_TOLL",
    OffRamp = "OFF_RAMP",
    OnRamp = "ON_RAMP",
    Origin = "ORIGIN",
    Ramp = "RAMP",
    StayRoundabout = "STAY_ROUNDABOUT",
    TraverseCrossing = "TRAVERSE_CROSSING",
    Turn = "TURN",
    UTurn = "U_TURN",
    Unknown = "UNKNOWN"
}
export declare enum TurnDirection {
    Left = "LEFT",
    Right = "RIGHT",
    SharpLeft = "SHARP_LEFT",
    SharpRight = "SHARP_RIGHT",
    SlightLeft = "SLIGHT_LEFT",
    SlightRight = "SLIGHT_RIGHT",
    Straight = "STRAIGHT",
    UTurn = "U_TURN",
    Unknown = "UNKNOWN"
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
export declare enum RealtimeTripStatus {
    Deviation = "DEVIATION",
    ExtraStops = "EXTRA_STOPS",
    ExtraTrip = "EXTRA_TRIP",
    Monitored = "MONITORED",
    OutsideRealtimeWindow = "OUTSIDE_REALTIME_WINDOW",
    PrognosisImpossible = "PROGNOSIS_IMPOSSIBLE",
    RealtimeOnlyInformative = "REALTIME_ONLY_INFORMATIVE",
    TripCancelled = "TRIP_CANCELLED"
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
export declare class Convert {
    static toLOCATIONSUGGESTSchema(json: string): LOCATIONSUGGESTSchema;
    static lOCATIONSUGGESTSchemaToJson(value: LOCATIONSUGGESTSchema): string;
    static toSERVINGLINESSchema(json: string): SERVINGLINESSchema;
    static sERVINGLINESSchemaToJson(value: SERVINGLINESSchema): string;
    static toTRIPSchema(json: string): TRIPSchema;
    static tRIPSchemaToJson(value: TRIPSchema): string;
}
