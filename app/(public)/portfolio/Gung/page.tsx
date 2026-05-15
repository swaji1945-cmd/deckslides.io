import type { Metadata } from "next";
import SvgDeckPage from "../../_components/SvgDeckPage";

export const metadata: Metadata = {
  title: "Gung | DeckSlides",
  description: "Gung deck presentation.",
};

const slides = Array.from({ length: 29 }, (_, i) => `${i + 1}.svg`);

export default function GungPage() {
  return <SvgDeckPage title="Gung" folderName="Gung" slides={slides} />;
}
