import { createFileRoute } from "@tanstack/react-router";

import { Engagement } from "@/components/Engagement";
import { ImpactBand, PageTopline } from "@/components/ImpactBand";
import { ViewLink } from "@/components/Tracked";
import { pageHead } from "@/lib/page-head";
import { AMAZON_URL, PRESS_URL, SCHOLAR_URL } from "@/lib/site-data";
import { usePageView, useSiteStats } from "@/lib/use-stats";

export const Route = createFileRoute("/publications")({
  head: pageHead("Publications", "Research & Publications"),
  component: PublicationsPage,
});

function PublicationsPage() {
  usePageView("publications");
  const { views } = useSiteStats();

  return (
    <>
      <ImpactBand />
      <PageTopline label="PUBLICATIONS" />
      <Engagement />

      <section className="section container" id="research">
        <div className="sectionhead">
          <div>
            <div className="eyebrow">Research &amp; publications</div>
            <h2>Turning clinical knowledge into practical resources.</h2>
          </div>
          <p>
            Research, education and knowledge-sharing across psychiatric rehabilitation,
            occupational therapy and community mental health.
          </p>
        </div>
        <div className="publication">
          <div className="book-art">
            <div className="cover-showcase">
              <span className="cover-chip">Official handbook visuals</span>
              <div className="cover-card cover-secondary one">
                <img alt="Handbook about-the-author page" src="/assets/handbook_7.png" />
              </div>
              <div className="cover-card cover-secondary two">
                <img alt="Handbook title page" src="/assets/handbook_8.png" />
              </div>
              <div className="cover-card cover-main">
                <img
                  alt="Official 2026 Mental Health First Aid Handbook cover"
                  src="/assets/handbook_1.png"
                />
              </div>
            </div>
            <div className="cover-caption">
              Front cover, interior title page, and about-the-author page from the original
              handbook.
            </div>
          </div>
          <div>
            <span className="kicker">Featured publication · 2026</span>
            <h2 style={{ fontSize: 35, margin: "17px 0" }}>
              Mental Health First Aid Handbook for Children and Teenagers
            </h2>
            <p>
              Developed to help readers recognize emotional and behavioral concerns, respond
              supportively and connect young people with appropriate help. Published and launched
              in July 2026, with print distribution in Nigeria and availability on Amazon.
            </p>
            <div className="pillbox">
              <span className="pill">Youth mental health</span>
              <span className="pill">Mental health literacy</span>
              <span className="pill">Early intervention</span>
            </div>
            <p style={{ marginTop: 16 }}>
              The publication showcase uses the{" "}
              <strong>actual handbook cover and official supporting pages</strong> to make the
              portfolio feel more authentic and visually grounded.
            </p>
            <p style={{ marginTop: 22 }}>
              <ViewLink id="handbook-amazon" className="btn" href={AMAZON_URL}>
                Find on Amazon ↗
              </ViewLink>
            </p>
            <span className="count-note" style={{ marginTop: 0 }}>
              {(views["handbook-amazon"] ?? 0).toLocaleString("en-US")} Amazon link views
            </span>
          </div>
        </div>
        <div className="listgrid" style={{ marginTop: 27 }}>
          <div className="panel">
            <span className="kicker">Conference · 2022</span>
            <h3>Alzheimer’s Association International Conference, San Diego</h3>
            <p>
              Presented work on music and dance therapy and occupational therapy interventions
              related to depression among people living with Alzheimer’s in Lagos, Nigeria.
            </p>
          </div>
          <div className="panel">
            <span className="kicker">Conference · 2024</span>
            <h3>Alzheimer’s Association International Conference, Philadelphia</h3>
            <p>
              CV-listed proposed project on caregiver training and cognitive therapy for older
              adults to prevent dementia in Lagos, Nigeria. Listed as a proposed project rather than
              a confirmed presentation.
            </p>
          </div>
        </div>
        <div style={{ marginTop: 23, display: "flex", gap: 12, flexWrap: "wrap" }}>
          <ViewLink id="google-scholar" className="btn outline" href={SCHOLAR_URL}>
            Google Scholar publications ↗
          </ViewLink>
          <ViewLink id="press-references" className="btn outline" href={PRESS_URL}>
            Media and press references ↗
          </ViewLink>
        </div>
      </section>
    </>
  );
}
