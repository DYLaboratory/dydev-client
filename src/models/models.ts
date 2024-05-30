export type SiteTypes = 'reference' | 'useful' | 'entertainment';

export interface SiteData {
  id: number;
  type: SiteTypes;
  name: string;
  description: string;
  url: string;
}