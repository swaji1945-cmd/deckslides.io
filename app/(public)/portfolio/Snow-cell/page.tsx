import type { Metadata } from "next";
import SvgDeckPage from "../../_components/SvgDeckPage";

export const metadata: Metadata = {
  title: "Snow Cell | DeckSlides",
  description: "Snow Cell deck presentation.",
};

const slides = Array.from({ length: 19 }, (_, i) => `${i + 1}.svg`);

export default function SnowCellPage() {
  return <SvgDeckPage title="Snow Cell" folderName="Snow-cell" slides={slides} />;
}
