import { Link, createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

import { Engagement } from "@/components/Engagement";
import { ImpactBand } from "@/components/ImpactBand";
import { pageHead } from "@/lib/page-head";
import { DORACARE_URL, LINKEDIN_URL, SCHOLAR_URL, CONTACT_EMAIL, mailto } from "@/lib/site-data";
import { usePageView } from "@/lib/use-stats";

export const Route = createFileRoute("/")({
  head: pageHead("Home", "Behavioral Health Innovation"),
  component: HomePage,
});

type Filter = "all" | "digital" | "community" | "clinical";

const filters: { id: Filter; label: string }[] = [
  { id: "all", label: "All projects" },
  { id: "digital", label: "Digital health" },
  { id: "community", label: "Community impact" },
  { id: "clinical", label: "Clinical innovation" },
];

const timeline = [
  [
    "Clinical foundation · 2005–2015",
    "Occupational therapy and rehabilitation",
    "Developed a foundation in individualized interventions, functional recovery and family-centered rehabilitation.",
  ],
  [
    "Leadership · 2016–2023",
    "Head of Occupational Therapy, Federal Neuropsychiatric Hospital, Yaba",
    "Led clinical services, supervised a 12-person occupational therapy team and supported care for more than 1,000 patients.",
  ],
  [
    "Community building · 2019–present",
    "Founded Dora-Care Behavioral Foundation",
    "Expanded mental health literacy, psychosocial support and school-based early-intervention initiatives.",
  ],
  [
    "Digital innovation · 2025–present",
    "Health access and technology-enabled care",
    "Advanced CareEquity Navigator and HomeCircle Africa alongside work in IT, data analysis and care operations.",
  ],
] as const;

function HomePage() {
  usePageView("home");
  const [filter, setFilter] = useState<Filter>("all");
  const shown = (type: Filter) => filter === "all" || filter === type;

  return (
    <>
      <section className="container hero" id="home">
        <div>
          <div className="eyebrow">
            Behavioral health innovation · Mental health systems · Social impact
          </div>
          <h1>
            Advancing mental health care <span>through people, programs &amp; innovation.</span>
          </h1>
          <p className="sub">
            I’m Feyikemi Akinyelure, MSc, PMP, a behavioral health innovator, occupational therapy
            professional, researcher and founder. My work connects clinical rehabilitation, early
            intervention, digital solutions and community partnerships to expand pathways to mental
            health support.
          </p>
          <div className="hero-actions">
            <a className="btn" href="#work">
              Explore my work ↗
            </a>
            <a className="btn outline" href={SCHOLAR_URL} rel="noopener" target="_blank">
              View research profile ↗
            </a>
          </div>
          <div className="hero-meta">
            <span>
              📍 <b>Springfield, Virginia</b>
            </span>
            <span>
              ✦ <b>MSc · PMP</b>
            </span>
            <span>
              ◉ <b>Founder, Dora-Care Behavioral Foundation</b>
            </span>
          </div>
        </div>
        <div
          aria-label="Abstract visual representing connected people and mental health innovation"
          className="art"
          role="img"
        >
          <span className="float-tag">Care · Access · Innovation</span>
          <div className="orbit" />
          <div className="orbit two" />
          <div className="art-core" />
          <div className="art-label">
            <strong>Making support more accessible.</strong>
            <small>From clinical settings to schools, families and communities.</small>
          </div>
        </div>
      </section>

      <Engagement />
      <ImpactBand />

      <section className="section container story" id="about">
        <div>
          <div className="eyebrow">My story</div>
          <h2>Clinical experience meets systems thinking.</h2>
          <p className="lede">
            I have spent my career helping individuals and communities access the support they
            need, then asking how programs, partnerships and technology can make that support more
            effective and accessible.
          </p>
          <p>
            My background spans occupational therapy leadership, school mental health outreach,
            health technology, data management and founding social-impact initiatives. Each chapter
            builds toward a shared priority: practical, people-centered mental health support.
          </p>
          <a className="btn outline" href={LINKEDIN_URL} rel="noopener" target="_blank">
            Connect on LinkedIn ↗
          </a>
        </div>
        <div className="timeline">
          {timeline.map(([when, title, body]) => (
            <article key={title}>
              <small>{when}</small>
              <h3>{title}</h3>
              <p>{body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section pale" id="work">
        <div className="container">
          <div className="sectionhead">
            <div>
              <div className="eyebrow">Selected work</div>
              <h2>Projects designed to reach beyond a single setting.</h2>
            </div>
            <p>
              Community programs, clinical innovations and digital platforms, each addressing a
              practical gap in access, support or service coordination.
            </p>
          </div>
          <div aria-label="Project filters" className="filterbar">
            {filters.map((f) => (
              <button
                key={f.id}
                type="button"
                className={`filter${filter === f.id ? " active" : ""}`}
                aria-pressed={filter === f.id}
                onClick={() => setFilter(f.id)}
              >
                {f.label}
              </button>
            ))}
          </div>
          <div className="cards">
            {shown("digital") && (
              <article className="card feature wide">
                <div className="marker">✳</div>
                <span className="kicker">Digital mental health · 2026–present</span>
                <h3>CareEquity Navigator</h3>
                <p>
                  A web-based resource navigation platform developed to help underserved and
                  vulnerable populations discover mental health resources and identify pathways to
                  relevant support. Part of a broader commitment to early intervention and more
                  equitable healthcare access.
                </p>
                <a className="text-link" href={mailto("CareEquity Navigator Inquiry")}>
                  Discuss the project ↗
                </a>
              </article>
            )}
            {shown("community") && (
              <article className="card">
                <div className="marker">◈</div>
                <span className="kicker">Education &amp; prevention · 2024–present</span>
                <h3>School Mental Health Transformation Program</h3>
                <p>
                  School-based mental health literacy and early-support programming, including
                  government-authorized outreach to public primary and secondary schools in Lagos
                  State.
                </p>
                <a className="text-link" href={DORACARE_URL} rel="noopener" target="_blank">
                  Dora-Care website ↗
                </a>
              </article>
            )}
            {shown("digital") && (
              <article className="card">
                <div className="marker">⌂</div>
                <span className="kicker">Caregiving technology · 2025–present</span>
                <h3>HomeCircle Africa</h3>
                <p>
                  A digital caregiving venture with a planned platform for caregiver verification,
                  needs-based matching, booking, session documentation and secure payment
                  workflows.
                </p>
                <a className="text-link" href={mailto("HomeCircle Africa Inquiry")}>
                  Discuss the venture ↗
                </a>
              </article>
            )}
            {shown("clinical") && (
              <article className="card">
                <div className="marker">✺</div>
                <span className="kicker">Psychiatric rehabilitation · 2016–2023</span>
                <h3>Sensory integration and creative-arts approaches</h3>
                <p>
                  Introduced sensory integration therapy, helped coordinate art-in-medicine projects
                  and supported staff training on creative arts and technology-enabled
                  rehabilitation approaches.
                </p>
                <Link className="text-link" to="/experience">
                  Explore clinical leadership ↗
                </Link>
              </article>
            )}
            {shown("community") && (
              <article className="card">
                <div className="marker">♡</div>
                <span className="kicker">Community initiatives</span>
                <h3>Early support across communities</h3>
                <p>
                  Initiatives include Catch Them Young School Outreach, Voices on the Street, mental
                  health awareness walks, mentorship, mental health clubs and programs involving
                  older adults.
                </p>
                <a className="text-link" href={DORACARE_URL} rel="noopener" target="_blank">
                  Explore Dora-Care ↗
                </a>
              </article>
            )}
          </div>
        </div>
      </section>

      <section className="container" id="contact">
        <div className="contact">
          <div>
            <div className="eyebrow" style={{ color: "#cbe7a9" }}>
              Let's connect
            </div>
            <h2>Building more accessible mental health support takes collaboration.</h2>
            <p>
              Open to discussions on behavioral health innovation, community initiatives, research,
              partnerships and speaking opportunities.
            </p>
            <p style={{ marginBottom: 0, color: "#e7f1e7" }}>
              Springfield, Virginia · <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
            </p>
          </div>
          <a className="btn" href={mailto("Professional Collaboration Inquiry")}>
            Start a conversation ↗
          </a>
        </div>
      </section>
    </>
  );
}
