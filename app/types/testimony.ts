export interface Testimony {
  id?: string;
  author: string;
  date: string;
  title: string;
  content: string;
  category?: string;
  likes?: number;
  image?: string;
  createdAt?: Date;
}