import { IconButtonProps } from "@mui/material";

export interface Image {
  id?: number;
  url: string;
  base64?: string;
}

export interface EventType {
  id: number;
  title: string;
  images: Image[];
  start: Date;
  end: Date;
  description: string;
  participants: { id: number; email: string; fullname: string; year: string }[];
}
