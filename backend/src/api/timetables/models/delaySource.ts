/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

/**
 * Delay source.
 *
 * * L - LEIBIT
 * LeiBit/LeiDis.
 * * NA - RISNE AUT
 * IRIS-NE (automatisch).
 * * NM - RISNE MAN
 * IRIS-NE (manuell).
 * * V - VDV
 * Prognosen durch dritte EVU �ber VDVin.
 * * IA - ISTP AUT
 * ISTP automatisch.
 * * IM - ISTP MAN
 * ISTP manuell.
 * * A - AUTOMATIC PROGNOSIS
 * Automatische Prognose durch Prognoseautomat.
 *
 */
export enum delaySource {
    L = 'L',
    NA = 'NA',
    NM = 'NM',
    V = 'V',
    IA = 'IA',
    IM = 'IM',
    A = 'A',
}
