import type { Metadata } from "next";
import SvgDeckPage from "../../_components/SvgDeckPage";

export const metadata: Metadata = {
  title: "Outland Creative | DeckSlides",
  description: "Outland Creative deck presentation.",
};

const slides = Array.from({ length: 9 }, (_, i) => `${i + 1}.svg`);

export default function OutlandCreativePage() {
  return <SvgDeckPage title="Outland Creative" folderName="Outland-creative" slides={slides} />;
}
