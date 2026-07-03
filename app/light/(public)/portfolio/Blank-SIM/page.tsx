import type { Metadata } from "next";
import SvgDeckPage from "../../_components/SvgDeckPage";

export const metadata: Metadata = {
  title: "Blank SIM | DeckSlides",
  description: "Blank SIM deck presentation.",
};

const slides = Array.from({ length: 21 }, (_, i) => `${i + 1}.svg`);

export default function BlankSIMPage() {
  return <SvgDeckPage title="Blank SIM" folderName="Blank-SIM" slides={slides} />;
}
