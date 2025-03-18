interface item {
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
  nextSlide: () => void;
  prevSlide: () => void;
}
