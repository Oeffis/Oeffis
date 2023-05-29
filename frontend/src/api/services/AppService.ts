/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { HelloWorld } from '../models/HelloWorld';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class AppService {

    /**
     * Returns "Hello World!"
     * @returns HelloWorld Returns a "Hello World!" message.
     * @throws ApiError
     */
    public static appControllerGetHello(): CancelablePromise<Array<HelloWorld>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/app/helloworld',
        });
    }

}
