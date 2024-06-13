// login
export interface LoginData {
  userId: string;
  password: string;
}

// site
export type SiteTypes =
  | 'DEVELOP'
  | 'REFERENCE'
  | 'USEFUL'
  | 'ENTERTAIN'
  | 'ETC';

export interface SiteData {
  id?: number;
  webSiteType: SiteTypes;
  name: string;
  description: string;
  url: string;
}
