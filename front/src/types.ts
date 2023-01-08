import { IconButtonProps } from "@mui/material";

export interface EventType {
  id: number;
  title: string;
  images: { id: number }[];
  start: Date;
  end: Date;
  description: string;
  participants: { id: number; email: string; fullname: string; year: string }[];
}
