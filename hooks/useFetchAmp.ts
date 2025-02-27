import { getAmplifierBySlug, getAmplifiers } from "@/actions/amplifier";

import { useQuery } from "@tanstack/react-query";

export const useAmps = () => {
  return useQuery({
    queryKey: ["amplifiers"],
    queryFn: getAmplifiers,
  });
};

export const fetchAmp = (slug: string) => {
  return getAmplifierBySlug(slug);
};
