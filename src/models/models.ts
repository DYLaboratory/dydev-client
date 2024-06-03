export type SiteTypes = 'develop' | 'reference' | 'useful' | 'entertain' | 'etc';

export interface SiteData {
  id: number;
  type: SiteTypes;
  name: string;
  description: string;
  url: string;
}