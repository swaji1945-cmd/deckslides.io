import Link from "next/link";

export default function Nav() {
  return (
    <header id="navbar" className="nav-wrap">
      <div className="container nav-inner">
        <Link href="/" className="logo" aria-label="pitchdeck home">
          <img src="/images/logo.svg" alt="pitchdeck" className="logo-img" width={160} height={32} />
        </Link>
        <nav className="nav-links" aria-label="Primary">
          <Link href="/about">About</Link>
          <Link href="/portfolio">Portfolio</Link>
          <Link href="/services">Services</Link>
          <Link href="/pricing">Pricing</Link>
          <Link href="/blog">Reading room</Link>
        </nav>
        <Link href="/contact" className="btn btn--pill btn--primary nav-cta">Make me a deck</Link>
      </div>
    </header>
  );
}
