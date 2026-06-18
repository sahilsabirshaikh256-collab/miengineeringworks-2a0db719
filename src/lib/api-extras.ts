export interface Media {
  id: number;
  type: "photo" | "video" | "pdf" | "certificate";
  url: string;
  title: string;
  caption: string;
  thumbnail: string;
}
export { api } from "./api";
