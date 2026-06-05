import type { Metadata } from "next";
import SvgDeckPage from "../../_components/SvgDeckPage";

export const metadata: Metadata = {
  title: "Black Sheep Foods | DeckSlides",
  description: "Black Sheep Foods deck presentation.",
};

const slides = Array.from({ length: 15 }, (_, i) => `${i + 1}.svg`);

export default function BlackSheepFoodsPage() {
  return <SvgDeckPage title="Black Sheep Foods" folderName="Black-sheep-foods" slides={slides} />;
}
