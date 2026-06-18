export interface Media {
  id: number;
  type: "photo" | "video" | "pdf";
  url: string;
  title: string;
  caption: string;
  thumbnail: string;
}
export { api } from "./api";
