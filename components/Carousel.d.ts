import type { ReactElement } from "react";

export interface CarouselItemType {
  id: number;
  title: string;
  description: string;
  icon?: ReactElement;
  video?: string;
}

export interface CarouselProps {
  items?: CarouselItemType[];
  baseWidth?: number;
  autoplay?: boolean;
  autoplayDelay?: number;
  pauseOnHover?: boolean;
  loop?: boolean;
  round?: boolean;
  fullHeight?: boolean;
}

declare const Carousel: (props: CarouselProps) => JSX.Element;
export default Carousel;
