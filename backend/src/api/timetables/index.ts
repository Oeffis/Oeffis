/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export { ApiError } from './core/ApiError';
export { CancelablePromise, CancelError } from './core/CancelablePromise';
export { OpenAPI } from './core/OpenAPI';
export type { OpenAPIConfig } from './core/OpenAPI';

export type { connection } from './models/connection';
export { connectionStatus } from './models/connectionStatus';
export { delaySource } from './models/delaySource';
export type { distributorMessage } from './models/distributorMessage';
export { distributorType } from './models/distributorType';
export type { event } from './models/event';
export { eventStatus } from './models/eventStatus';
export type { historicDelay } from './models/historicDelay';
export type { historicPlatformChange } from './models/historicPlatformChange';
export type { message } from './models/message';
export { messageType } from './models/messageType';
export type { multipleStationData } from './models/multipleStationData';
export { priority } from './models/priority';
export type { referenceTrip } from './models/referenceTrip';
export type { referenceTripLabel } from './models/referenceTripLabel';
export type { referenceTripRelation } from './models/referenceTripRelation';
export { referenceTripRelationToStop } from './models/referenceTripRelationToStop';
export type { referenceTripStopLabel } from './models/referenceTripStopLabel';
export type { stationData } from './models/stationData';
export type { timetable } from './models/timetable';
export type { timetableStop } from './models/timetableStop';
export type { tripLabel } from './models/tripLabel';
export type { tripReference } from './models/tripReference';
export { tripType } from './models/tripType';

export { TimetablesService } from './services/TimetablesService';
