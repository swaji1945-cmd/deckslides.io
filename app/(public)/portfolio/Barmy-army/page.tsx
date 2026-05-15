import type { Metadata } from "next";
import SvgDeckPage from "../../_components/SvgDeckPage";

export const metadata: Metadata = {
  title: "Barmy Army | DeckSlides",
  description: "Barmy Army deck presentation.",
};

const slides = Array.from({ length: 15 }, (_, i) => `${i + 1}.svg`);

export default function BarmyArmyPage() {
  return <SvgDeckPage title="Barmy Army" folderName="Barmy-army" slides={slides} />;
}
