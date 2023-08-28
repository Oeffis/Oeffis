/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { User } from '../models/User';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class UsersService {

  /**
   * returns all users
   * Get all users.
   * @returns User Return all Users as JSON array.
   * @throws ApiError
   */
  public static usersControllerFindAll(): CancelablePromise<Array<User>> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/users',
      errors: {
        404: `Bad request.`,
      },
    });
  }

  /**
   * creates a new user, returns the created on
   * Create a new user.
   * @param requestBody 
   * @returns User Returns the created user.
   * @throws ApiError
   */
  public static usersControllerCreate(
requestBody: User,
): CancelablePromise<User> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/users',
      body: requestBody,
      mediaType: 'application/json',
      errors: {
        404: `Bad request.`,
      },
    });
  }

  /**
   * returns a specific user
   * Get a specific user.
   * @param index Users index
   * @returns User Returns a User by index.
   * @throws ApiError
   */
  public static usersControllerFindOne(
index: string,
): CancelablePromise<User> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/users/{index}',
      path: {
        'index': index,
      },
      errors: {
        404: `User not found.`,
      },
    });
  }

  /**
   * updates a specific user
   * Update a specific user.
   * @param index Users index
   * @param requestBody 
   * @returns User Returns the updated user.
   * @throws ApiError
   */
  public static usersControllerUpdate(
index: string,
requestBody: User,
): CancelablePromise<User> {
    return __request(OpenAPI, {
      method: 'PATCH',
      url: '/users/{index}',
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
   * deletes a specific user
   * Delete a specific user.
   * @param index Users index
   * @returns User Returns the deleted user.
   * @throws ApiError
   */
  public static usersControllerRemove(
index: string,
): CancelablePromise<User> {
    return __request(OpenAPI, {
      method: 'DELETE',
      url: '/users/{index}',
      path: {
        'index': index,
      },
      errors: {
        404: `User not found.`,
      },
    });
  }

}
