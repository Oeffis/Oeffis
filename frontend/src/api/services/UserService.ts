/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { User } from '../models/User';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class UserService {

    /**
     * Create a User
     * @param requestBody 
     * @returns User Create a User.
     * @throws ApiError
     */
    public static userControllerCreate(
requestBody: User,
): CancelablePromise<User> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/user',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * Return all Users
     * @returns User Return all Users as JSON array.
     * @throws ApiError
     */
    public static userControllerFindAll(): CancelablePromise<Array<User>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/user/get/all',
        });
    }

    /**
     * Return a User by index
     * @param index Users index
     * @returns User Return a User by index.
     * @throws ApiError
     */
    public static userControllerFindOne(
index: string,
): CancelablePromise<User> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/user/get/{index}',
            path: {
                'index': index,
            },
            errors: {
                404: `User not found.`,
            },
        });
    }

    /**
     * Update a User by index
     * @param index Users index
     * @param requestBody 
     * @returns User Update a User by index.
     * @throws ApiError
     */
    public static userControllerUpdate(
index: string,
requestBody: User,
): CancelablePromise<User> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/user/update/{index}',
            path: {
                'index': index,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                404: `User not found.`,
            },
        });
    }

    /**
     * Delete a User by index
     * @param index Users index
     * @returns User Delete a User by index.
     * @throws ApiError
     */
    public static userControllerRemove(
index: string,
): CancelablePromise<User> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/user/delete/{index}',
            path: {
                'index': index,
            },
            errors: {
                404: `User not found.`,
            },
        });
    }

}
