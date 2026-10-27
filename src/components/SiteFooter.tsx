import { DORACARE_URL, LINKEDIN_URL, SCHOLAR_URL } from "@/lib/site-data";

export function SiteFooter() {
  return (
    <footer className="container footer">
      <span>
        © {new Date().getFullYear()} Feyikemi Akinyelure · Behavioral health innovation and social
        impact
      </span>
      <span>
        <a href={LINKEDIN_URL} rel="noopener" target="_blank">
          LinkedIn
        </a>{" "}
        ·{" "}
        <a href={DORACARE_URL} rel="noopener" target="_blank">
          Dora-Care
        </a>{" "}
        ·{" "}
        <a href={SCHOLAR_URL} rel="noopener" target="_blank">
          Scholar
        </a>
      </span>
    </footer>
  );
}
