export interface AppUser {
  iat?: number;
  sub?: TokenSubject;
  username?: string;
}

export interface TokenSubject {
  administrativeId?: number;
  email?: string;
  id?: number;
  name?:string;
  userName?:string;
}
