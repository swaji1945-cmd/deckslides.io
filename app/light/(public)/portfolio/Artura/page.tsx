import type { Metadata } from "next";
import SvgDeckPage from "../../_components/SvgDeckPage";

export const metadata: Metadata = {
  title: "Artura | DeckSlides",
  description: "Artura deck presentation.",
};

const slides = Array.from({ length: 20 }, (_, i) => `${i + 1}.svg`);

export default function ArturaPage() {
  return <SvgDeckPage title="Artura" folderName="Artura" slides={slides} />;
}
