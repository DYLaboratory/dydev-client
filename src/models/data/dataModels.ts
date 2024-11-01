interface BaseCData {
  createDateTime?: string;
  createUserId?: string;
}

interface BaseUData {
  updateDateTime?: string;
  updateUserId?: string;
}

interface IdData {
  id: number;
}

// login
export interface LoginData {
  userId: string;
  password: string;
}

// system settings
export interface SystemSettingsData {
  id?: number;
  version: string;
  defaultTheme: 'DARK' | 'WHITE' | null;
  defaultLang: 'KR' | 'EN' | null;
  feedDays: number;
}

// file
export interface FileData {
  id?: number;
  seq?: number;
  ext?: string;
  file?: File;
}

export type UserTypes = 'USER' | 'ADMIN' | 'SUPER';

// page
export interface Paging {
  page?: number;
  size?: number;
  sort?: string;
}

export interface AccessHistoryData extends BaseCData {
  id?: number;
  accessIp?: string;
  url?: string;
}

// notice
export type NoticeTypes = 'NOTICE' | 'VERSION' | 'ETC';

export interface NoticeSearch {

}

export interface NoticeData extends BaseCData, BaseUData {
  id?: number;
  noticeType: NoticeTypes;
  title: string;
  content: string;
  viewCount?: number;
}

// feed
export interface FeedData extends BaseCData {
  id?: number;
  title: string;
  content: string;
  place?: string;
  link?: string;
  viewCount?: number;

  // update
  insertFiles?: FileData[];
  updateFiles?: FileData[];
  deleteFiles?: IdData[];

  // 변수 참조용
  fileList?: FileData[];
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
