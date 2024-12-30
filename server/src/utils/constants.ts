export const MAX_TEMP_FILE_SIZE = 10 * 1024 * 1024; // 10 MB
export const MAX_WINDOW_LIFETIME = 15 * 60 * 1000; // 15 minutes
export const MAX_REQUESTS_PER_WNDOW = 150;

export const CURRENT_YEAR = new Date().getFullYear();

export const ALLOWED_ERROR_CODES = [
  400, 401, 403, 404, 409, 422, 500, 502,
] as const;
