import { UserRole } from "@prisma/client";

export interface ISpecs {
  controls: string;
  preampTube: string;
  powerTube: string;
  rectifier: string;
  speaker: string;
  cabinet: string;
}

export interface IWarranty {
  amp: string;
  tubes: string;
}

export interface IAmplifier {
  id: string;
  name: string;
  name_slug: string;
  description: string;
  price: number;
  specs: ISpecs;
  thumbnail: string;
  spec_image: string;
  warranty: IWarranty;
  images: string[];
  createdAt: Date;
}

export interface IUser {
  id: string;
  name: string | null;
  email: string;
  image: string | null;
  role: UserRole;
  createdAt: Date;
}
