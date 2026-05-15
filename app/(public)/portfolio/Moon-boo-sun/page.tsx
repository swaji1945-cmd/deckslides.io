import type { Metadata } from "next";
import SvgDeckPage from "../../_components/SvgDeckPage";

export const metadata: Metadata = {
  title: "Moon Boo Sun | DeckSlides",
  description: "Moon Boo Sun deck presentation.",
};

const slides = Array.from({ length: 17 }, (_, i) => `${i + 1}.svg`);

export default function MoonBooSunPage() {
  return <SvgDeckPage title="Moon Boo Sun" folderName="Moon-boo-sun" slides={slides} />;
}
