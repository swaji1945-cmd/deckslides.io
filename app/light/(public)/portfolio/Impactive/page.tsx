import type { Metadata } from "next";
import SvgDeckPage from "../../_components/SvgDeckPage";

export const metadata: Metadata = {
  title: "Impactive | DeckSlides",
  description: "Impactive deck presentation.",
};

const slides = Array.from({ length: 15 }, (_, i) => `${i + 1}.svg`);

export default function ImpactivePage() {
  return <SvgDeckPage title="Impactive" folderName="Impactive" slides={slides} />;
}
