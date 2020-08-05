export enum STATUS_CODES {
  OK = 200,
  UNAUTHORIZED = 401,
  BAD_REQUEST = 400,
}

export enum ERROR_TYPES {
  ACCESS_TOKEN_EXPIRED = 'Token is expired',
  REFRESH_TOKEN_EXPIRED = 'Refresh token is expired',
}
