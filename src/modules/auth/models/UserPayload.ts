export interface UserPayload {
  sub: string;
  email: string;
  displayName: string;
  iat?: number;
  exp?: number;
}
