import type { Metadata } from "next";
import SvgDeckPage from "../../_components/SvgDeckPage";

export const metadata: Metadata = {
  title: "Noonan Performance — Driver Performance Framework",
  description:
    "The Noonan Performance Driver Performance Framework — an integrated, elite driver development system.",
};

const slides = Array.from({ length: 23 }, (_, i) => `${i + 1}.svg`);

export default function NoonanPerformancePage() {
  return (
    <SvgDeckPage
      title="Noonan Performance"
      folderName="noonan-performance"
      slides={slides}
    />
  );
}
