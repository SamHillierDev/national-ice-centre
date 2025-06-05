export interface Event {
  id: string;
  title: string;
  date: string;
  dates?: string[];
  image: string;
  category: string;
  description: string;
  url: string;
  isPanthersGame?: boolean;
  onsaleDate: string;
  offsaleDate: string;
  contentId: string;
  largeImage?: string;
  featureImage?: string;
  genre?: string[];
  time?: string;
  when?: string;
  productTypes?: string[];
}
