import type { Metadata } from "next";
import SvgDeckPage from "../../_components/SvgDeckPage";

export const metadata: Metadata = {
  title: "Bahrain Rugby Club | DeckSlides",
  description: "Bahrain Rugby Club deck presentation.",
};

const slides = Array.from({ length: 11 }, (_, i) => `${i + 1}.svg`);

export default function BahrainRugbyClubPage() {
  return <SvgDeckPage title="Bahrain Rugby Club" folderName="Bahrain-rugby-club" slides={slides} />;
}
