import Link from "next/link";

export default function Nav() {
  return (
    <header id="navbar" className="nav-wrap">
      <div className="container nav-inner">
        <Link href="/cream" className="logo" aria-label="pitchdeck home">
          <img src="/images/logo-ink.svg" alt="pitchdeck" className="logo-img" width={160} height={32} />
        </Link>
        <nav className="nav-links" aria-label="Primary">
          <Link href="/light/about">About</Link>
          <Link href="/light/portfolio">Portfolio</Link>
          <Link href="/light/services">Services</Link>
          <Link href="/light/pricing">Pricing</Link>
          <Link href="/light/blog">Reading room</Link>
        </nav>
        <Link href="/light/contact" className="btn btn--pill btn--primary nav-cta">Make me a deck</Link>
      </div>
    </header>
  );
}
