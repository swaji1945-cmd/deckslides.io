import type { Metadata } from "next";
import SvgDeckPage from "../../_components/SvgDeckPage";

export const metadata: Metadata = {
  title: "Govmaven | DeckSlides",
  description: "Govmaven deck presentation.",
};

const slides = Array.from({ length: 12 }, (_, i) => `${i + 1}.svg`);

export default function GovmavenPage() {
  return <SvgDeckPage title="Govmaven" folderName="Govmaven" slides={slides} />;
}
