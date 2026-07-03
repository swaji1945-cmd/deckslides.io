import type { Metadata } from "next";
import SvgDeckPage from "../../_components/SvgDeckPage";

export const metadata: Metadata = {
  title: "Skinetix | DeckSlides",
  description: "Skinetix deck presentation.",
};

const slides = Array.from({ length: 17 }, (_, i) => `${i + 1}.svg`);

export default function SkinetixPage() {
  return <SvgDeckPage title="Skinetix" folderName="Skinetix" slides={slides} />;
}
