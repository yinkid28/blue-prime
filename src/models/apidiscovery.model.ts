import { StaticImageData } from "next/image";
export type IMockApi = {
  id?: number;
  img: StaticImageData;
  title: string;
  description: string;
  category: string;
  bookmarked?: boolean;
};
export type ApiDiscoveryInititals = {
  api: IMockApi | null;
  libraryAPIs: IMockApi[];
};
export type FileType = {
  name: string;
  size: number;
  type: string;
  webkitRelativePath: string;
  lastModified: number;
};
