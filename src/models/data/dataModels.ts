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

// file
export interface FileData {
  id?: number;
  seq?: number;
  ext?: string;
}

export type UserTypes = 'USER' | 'ADMIN' | 'SUPER';

// page
export interface Paging {
  page?: number;
  size?: number;
  sort?: string;
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
