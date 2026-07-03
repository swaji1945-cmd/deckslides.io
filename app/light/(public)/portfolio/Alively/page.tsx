import type { Metadata } from "next";
import SvgDeckPage from "../../_components/SvgDeckPage";

export const metadata: Metadata = {
  title: "Alively | DeckSlides",
  description: "Alively deck presentation.",
};

const slides = Array.from({ length: 31 }, (_, i) => `${i + 1}.svg`);

export default function AlivedlyPage() {
  return <SvgDeckPage title="Alively" folderName="Alively" slides={slides} />;
}
