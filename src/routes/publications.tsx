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
        <div className="research-overview">
          <div className="eyebrow">Scholarly focus</div>
          <h3>From clinical questions to shared knowledge.</h3>
          <p>Authored and contributed to research on occupational therapy interventions, psychiatric rehabilitation and neurological care, including work on substance use and therapeutic approaches for older adults.</p>
          <div className="pillbox"><span className="pill">Occupational therapy</span><span className="pill">Psychiatric rehabilitation</span><span className="pill">Neurological care</span><span className="pill">Substance use</span><span className="pill">Older-adult care</span></div>
        </div>
        <div className="listgrid" style={{ marginTop: 27 }}>
          <div className="panel">
            <span className="kicker">Conference · 2022</span>
            <h3>Alzheimer’s Association International Conference, San Diego</h3>
            <p>
              “Music and Dance Therapy; The Effectiveness of Occupational Therapy Intervention in Preventing Depression amongst Persons Living with Alzheimer’s in Lagos, Nigeria.”
            </p>
          </div>
          <div className="panel">
            <span className="kicker">Proposed conference project · 2024</span>
            <h3>Alzheimer’s Association International Conference, Philadelphia</h3>
            <p>
              “A Study and Training of Carers in Effective Cognitive Therapy for the Elderly to Prevent Dementia in Lagos, Nigeria.” Listed in the CV as a proposed project.
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
      <section className="section pale" id="media" aria-labelledby="media-title"><div className="container">
        <div className="sectionhead"><div><div className="eyebrow">Selected media coverage</div><h2 id="media-title">Bringing mental health<br /><em>into the conversation.</em></h2></div><p>Selected coverage listed in the professional CV, with references available in the linked media collection.</p></div>
        <div className="media-coverage-grid">
          <article className="panel"><span className="kicker">November 2024</span><h3>Vanguard</h3><p>Coverage of Dora-Care educator training on mental health tools and best practices.</p></article>
          <article className="panel"><span className="kicker">Community partnerships</span><h3>New Telegraph</h3><p>Coverage of the Dora-Care and Nigerian Red Cross mental health awareness walk.</p></article>
          <article className="panel"><span className="kicker">Mental health advocacy</span><h3>Punch Healthwise</h3><p>Coverage of mental health advocacy and stress and depression awareness.</p></article>
        </div>
        <div style={{marginTop:25}}><ViewLink id="press-references" className="btn outline" href={PRESS_URL}>Explore media references ↗</ViewLink></div>
      </div></section>
      <details className="container engagement-disclosure"><summary>Portfolio activity <span>Views, visits &amp; downloads +</span></summary><Engagement /></details>
    </>
  );
}
