import type { Metadata } from "next";
import SvgDeckPage from "../../_components/SvgDeckPage";

export const metadata: Metadata = {
  title: "Dominique Geroulis | DeckSlides",
  description: "Dominique Geroulis deck presentation.",
};

const slides = Array.from({ length: 16 }, (_, i) => `${i + 1}.svg`);

export default function DominiqueGeroulisPage() {
  return <SvgDeckPage title="Dominique Geroulis" folderName="Dominique-geroulis" slides={slides} />;
}
