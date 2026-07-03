import "../globals.css";
import Ambient from "../components/Ambient";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import HomeAnimations from "../HomeAnimations";

export const dynamic = "force-dynamic";

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <HomeAnimations />
      <Ambient />
      <Nav />
      {children}
      <Footer />
    </>
  );
}
