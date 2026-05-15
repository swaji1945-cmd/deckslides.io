import type { Metadata } from "next";
import SvgDeckPage from "../../_components/SvgDeckPage";

export const metadata: Metadata = {
  title: "Dubai Culture | DeckSlides",
  description: "Dubai Culture deck presentation.",
};

const slides = Array.from({ length: 23 }, (_, i) => `${i + 1}.svg`);

export default function DubaiCulturePage() {
  return <SvgDeckPage title="Dubai Culture" folderName="Dubai-culture" slides={slides} />;
}
