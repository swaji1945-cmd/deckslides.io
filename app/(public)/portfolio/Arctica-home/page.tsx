import type { Metadata } from "next";
import SvgDeckPage from "../../_components/SvgDeckPage";

export const metadata: Metadata = {
  title: "Arctica Home | DeckSlides",
  description: "Arctica Home deck presentation.",
};

const slides = Array.from({ length: 16 }, (_, i) => `${i + 1}.svg`);

export default function ArcticaHomePage() {
  return <SvgDeckPage title="Arctica Home" folderName="Arctica-home" slides={slides} />;
}
