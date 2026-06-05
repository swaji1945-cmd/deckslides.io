import type { Metadata } from "next";
import SvgDeckPage from "../../_components/SvgDeckPage";

export const metadata: Metadata = {
  title: "Tamara | DeckSlides",
  description: "Tamara deck presentation.",
};

const slides = Array.from({ length: 14 }, (_, i) => `${i + 1}.svg`);

export default function TamaraPage() {
  return <SvgDeckPage title="Tamara" folderName="Tamara" slides={slides} />;
}
