interface BaseCData {
  createDateTime?: string;
  createUserId?: string;
}

interface BaseUData {
  updateDateTime?: string;
  updateUserId?: string;
}

// login
export interface LoginData {
  userId: string;
  password: string;
}

export type UserTypes = 'USER' | 'ADMIN' | 'SUPER';

// notice
export type NoticeTypes = 'NOTICE' | 'VERSION' | 'ETC';

export interface NoticeData extends BaseCData, BaseUData{
  id?: number;
  noticeType: NoticeTypes;
  title: string;
  content: string;
  viewCount?: number;
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
