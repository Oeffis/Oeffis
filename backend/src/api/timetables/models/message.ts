/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { distributorMessage } from './distributorMessage';
import type { messageType } from './messageType';
import type { priority } from './priority';
import type { tripLabel } from './tripLabel';

/**
 * A message that is associated with an event, a stop or a trip.
 */
export type message = {
    /**
     * Code.
     */
    'c'?: number;
    /**
     * Category.
     */
    cat?: string;
    /**
     * Deleted.
     */
    del?: number;
    /**
     * Distributor message.
     */
    dm?: Array<distributorMessage>;
    /**
     * External category.
     */
    ec?: string;
    /**
     * External link associated with the message.
     */
    elnk?: string;
    /**
     * External text.
     */
    ext?: string;
    /**
     * Valid from. The time, in ten digit 'YYMMddHHmm' format, e.g. '1404011437' for 14:37 on April the 1st of 2014.
     */
    from?: string;
    /**
     * Message id.
     */
    id: string;
    /**
     * Internal text.
     */
    int?: string;
    /**
     * Owner.
     */
    'o'?: string;
    pr?: priority;
    't': messageType;
    /**
     * Trip label.
     */
    tl?: Array<tripLabel>;
    /**
     * Valid to. The time, in ten digit 'YYMMddHHmm' format, e.g. '1404011437' for 14:37 on April the 1st of 2014.
     */
    to?: string;
    /**
     * Timestamp. The time, in ten digit 'YYMMddHHmm' format, e.g. "1404011437" for 14:37 on April the 1st of 2014.
     */
    ts: string;
};

