import { Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { CONTACT_EMAIL } from "@/lib/site-data";

const links = [
  { to: "/", label: "Home" },
  { to: "/experience", label: "Experience" },
  { to: "/publications", label: "Publications" },
  { to: "/free-template", label: "Free resource" },
] as const;

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const drawerRef = useRef<HTMLDialogElement>(null);
  const closeMenu = () => drawerRef.current?.close();

  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 651px)");
    const closeOnDesktop = () => { if (desktop.matches) drawerRef.current?.close(); };
    desktop.addEventListener("change", closeOnDesktop);
    return () => desktop.removeEventListener("change", closeOnDesktop);
  }, []);

  return <>
    <header><div className="container nav">
      <Link className="logo" to="/" aria-label="Feyikemi Akinyelure home"><span className="logo-mark" aria-hidden="true">f<span>.</span></span><span>FEYIKEMI<br />AKINYELURE</span></Link>
      <button className="menu-toggle" type="button" aria-expanded={menuOpen} aria-controls="mobile-menu" aria-haspopup="dialog" onClick={() => { drawerRef.current?.showModal(); setMenuOpen(true); }}><span>Menu</span><span className="hamburger" aria-hidden="true"><i /><i /></span></button>
      <nav aria-label="Main navigation" className="navlinks">{links.map(link => <Link key={link.to} to={link.to} activeOptions={{ exact: true, includeHash: false }} activeProps={{ className: "active-link", "aria-current": "page" }}>{link.label}</Link>)}</nav>
      <a className="nav-contact" href={`mailto:${CONTACT_EMAIL}`}>Let’s connect ↗</a>
    </div></header>
    <dialog id="mobile-menu" className="mobile-drawer" ref={drawerRef} aria-labelledby="mobile-menu-title" onClose={() => setMenuOpen(false)} onKeyDown={event => {
      if (event.key !== "Tab") return;
      const controls = event.currentTarget.querySelectorAll<HTMLElement>('a[href], button:not([disabled])');
      const first = controls[0];
      const last = controls[controls.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
    }} onClick={event => {
      const bounds = event.currentTarget.getBoundingClientRect();
      if (event.target === event.currentTarget && (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom)) closeMenu();
    }}>
      <div className="drawer-top"><span className="logo-mark" aria-hidden="true">f<span>.</span></span><button type="button" className="drawer-close" autoFocus onClick={closeMenu} aria-label="Close menu">Close <span aria-hidden="true">×</span></button></div>
      <div className="drawer-intro"><span className="eyebrow">FEYIKEMI AKINYELURE</span><h2 id="mobile-menu-title">Explore<br /><em>the possibilities.</em></h2></div>
      <nav className="drawer-links" aria-label="Mobile navigation">{links.map((link, index) => <Link key={link.to} to={link.to} activeOptions={{ exact: true, includeHash: false }} activeProps={{ className: "active-link", "aria-current": "page" }} onClick={closeMenu}><span className="drawer-link-number">0{index + 1}</span><span>{link.label}</span><span className="drawer-link-arrow" aria-hidden="true">↗</span></Link>)}</nav>
      <div className="drawer-footer"><span className="drawer-flower" aria-hidden="true">✳</span><p>Good things begin<br />with a conversation.</p><a className="btn" href={`mailto:${CONTACT_EMAIL}`} onClick={closeMenu}>Let’s connect <span>↗</span></a><span className="drawer-location">Springfield, Virginia · Connected to community</span></div>
    </dialog>
  </>;
}
