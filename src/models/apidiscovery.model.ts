import { StaticImageData } from "next/image";
export type IMockApi = {
  img: StaticImageData;
  title: string;
  description: string;
  category: string;
};
export type ApiDiscoveryInititals = {
  api: IMockApi | null;
};
export type FileType = {
  name: string;
  size: number;
  type: string;
  webkitRelativePath: string;
  lastModified: number;
};
