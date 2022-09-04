export interface User {
  id: number;
  email: string;
}

export interface Redirect {
  id: number;
  url: Url;
  dateTime: Date;
  ipAddress: string;
  referrer: string;
}

export interface Url {
  id: number;
  destinationUrl: string;
  urlCode: string;
  shortUrl: string;
  user: User;
  redirects: Redirect[];
}
