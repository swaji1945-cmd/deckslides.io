import type { Metadata } from "next";
import SvgDeckPage from "../../_components/SvgDeckPage";

export const metadata: Metadata = {
  title: "Sumeria | DeckSlides",
  description: "Sumeria deck presentation.",
};

const slides = Array.from({ length: 17 }, (_, i) => `${i + 1}.svg`);

export default function SumeriaPage() {
  return <SvgDeckPage title="Sumeria" folderName="Sumeria" slides={slides} />;
}
