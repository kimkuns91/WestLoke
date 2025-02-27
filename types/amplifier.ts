export interface AmplifierSpecs {
  controls: string;
  preampTube: string;
  powerTube: string;
  rectifier: string;
  speaker: string;
  cabinet: string;
}

export interface Amplifier {
  id: number;
  name: string;
  name_slug: string;
  description: string;
  price: number;
  specs: AmplifierSpecs;
  image: string;
}
