import type { Metadata } from "next";
import SvgDeckPage from "../../_components/SvgDeckPage";

export const metadata: Metadata = {
  title: "Revest | DeckSlides",
  description: "Revest deck presentation.",
};

const slides = Array.from({ length: 22 }, (_, i) => `${i + 1}.svg`);

export default function RevestPage() {
  return <SvgDeckPage title="Revest" folderName="Revest" slides={slides} />;
}
