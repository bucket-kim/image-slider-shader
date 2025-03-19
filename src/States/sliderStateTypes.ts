export interface item {
  image: string;
  short: string;
  title: string;
  description: string;
  color: string;
}

export interface sliderStateTypes {
  currSlide: number;
  direction: string;
  items: item[];
  mounted: boolean;
  setMounted: (mounted: boolean) => void;
  isAnimating: boolean;
  setIsAnimating: (isAnimating: boolean) => void;
  nextSlide: () => void;
  prevSlide: () => void;
}
