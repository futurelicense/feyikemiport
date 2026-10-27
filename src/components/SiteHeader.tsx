import { Link } from "@tanstack/react-router";

const links = [
  { to: "/", label: "Home" },
  { to: "/experience", label: "Experience" },
  { to: "/publications", label: "Publications" },
  { to: "/free-template", label: "Free Template" },
] as const;

export function SiteHeader() {
  return (
    <header>
      <div className="container nav">
        <Link className="logo" to="/">
          <span className="logo-mark">FA</span>
          <span>
            FEYIKEMI
            <br />
            AKINYELURE
          </span>
        </Link>
        <nav aria-label="Main navigation" className="navlinks">
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              activeOptions={{ exact: true, includeHash: false }}
              activeProps={{ className: "active-link", "aria-current": "page" }}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
