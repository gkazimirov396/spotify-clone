import { ALLOWED_ERROR_CODES } from './constants';

import type { Nullable } from '../types/util';

type HttpErrorStatus = (typeof ALLOWED_ERROR_CODES)[number];

export class ServerError {
  public readonly message: string;
  public readonly status: HttpErrorStatus;
  public readonly payload: unknown[];

  constructor(
    status: HttpErrorStatus,
    message?: Nullable<string>,
    payload?: unknown[]
  ) {
    this.status = status;
    this.payload = payload ?? [];
    this.message = message ?? this.configErrorMessage();
  }

  private configErrorMessage() {
    switch (this.status) {
      case 400:
        return 'Bad Request.';
      case 401:
        return 'Unauthorized - you must be logged in';
      case 403:
        return 'You Are Forbidden to Access This Page.';
      case 404:
        return 'Not Found.';
      case 409:
        return 'Conflict.';
      case 422:
        return 'Validation Failed.';
      case 502:
        return 'Bad Gateway.';
      default:
        return 'Internal Server Error.';
    }
  }
}
