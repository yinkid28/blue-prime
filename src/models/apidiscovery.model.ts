import { StaticImageData } from "next/image";
import { IApi } from "./api.model";
export type IMockApi = {
  id?: number;
  img: StaticImageData;
  title: string;
  description: string;
  category: string;
  bookmarked?: boolean;
};
export type ApiDiscoveryInititals = {
  api: IApi | null;
  bookmarkedAPIs: IApi[];
  libraryView: string;
  apiProduct: IMockapiProduct | null;
};
export type FileType = {
  name: string;
  size: number;
  type: string;
  webkitRelativePath: string;
  lastModified: number;
};

export type IMockapiProduct = {
  img: StaticImageData;
  title: string;
  description: string;
  category: string;
};
