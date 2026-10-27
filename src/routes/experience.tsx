import { createFileRoute } from "@tanstack/react-router";

import { Engagement } from "@/components/Engagement";
import { ImpactBand, PageTopline } from "@/components/ImpactBand";
import { pageHead } from "@/lib/page-head";
import { usePageView } from "@/lib/use-stats";

export const Route = createFileRoute("/experience")({
  head: pageHead("Experience", "Professional Experience & Recognition"),
  component: ExperiencePage,
});

const roles = [
  [
    "2026–present · Remote, Chicago",
    "Data Analyst · Dexterous Solutions",
    "Data validation, statistical analysis, SQL, Excel, Power BI, Tableau, dashboarding and KPI-based decision support.",
  ],
  [
    "2025–present · Lagos",
    "Founder & CEO · HomeCircle Africa Limited",
    "Product direction, stakeholder engagement and strategic planning for a digital caregiving platform.",
  ],
  [
    "2025–present · Virginia",
    "IT Support Specialist · Ascend Polywellness Center",
    "Technology and administrative support for clinical operations, patient intake, scheduling, documentation and care coordination.",
  ],
  [
    "2019–present · Lagos",
    "Founder · Dora-Care Behavioral Foundation",
    "Community mental health advocacy, school outreach, educator training and partnerships for mental health literacy.",
  ],
  [
    "2016–2023 · Lagos",
    "Head of Occupational Therapy · Federal Neuropsychiatric Hospital, Yaba",
    "Clinical leadership and team supervision, interdisciplinary psychiatric rehabilitation and therapeutic innovation.",
  ],
  [
    "2022–present · Lagos",
    "Advisory Board Member · Sound Mind Initiative",
    "Advice on community mental health priorities, accessibility, partnerships and evidence-informed program planning.",
  ],
] as const;

const awards = [
  ["2026", "WILD Network Fellow"],
  ["2025", "Skills Builder Global Impact Fellowship, Level 3"],
  ["2024", "International Best Research Award in Mental Health–Occupational Therapy"],
  ["2022", "100 Iconic Personalities of the Year"],
  ["2017", "Exquisite Lady of the Year (ELOY)"],
  ["2024 & 2025", "WUST Presidential Honor Award Certificates"],
] as const;

function ExperiencePage() {
  usePageView("experience");
  return (
    <>
      <ImpactBand />
      <PageTopline label="EXPERIENCE" />
      <Engagement />

      <section className="section pale" id="experience">
        <div className="container">
          <div className="sectionhead">
            <div>
              <div className="eyebrow">Professional experience</div>
              <h2>Leadership across health, technology and social impact.</h2>
            </div>
            <p>
              A multidisciplinary professional history connecting service delivery with research,
              digital infrastructure and program strategy.
            </p>
          </div>
          <div className="listgrid">
            {roles.map(([when, title, body]) => (
              <div className="panel" key={title}>
                <span className="date">{when}</span>
                <h3>{title}</h3>
                <p>{body}</p>
              </div>
            ))}
          </div>
          <p style={{ fontSize: 12, marginTop: 18 }}>
            Additional experience includes human services client support, university IT
            administration and occupational therapy consulting.
          </p>
        </div>
      </section>

      <section className="section container" id="recognition">
        <div className="sectionhead">
          <div>
            <div className="eyebrow">Recognition</div>
            <h2>Fellowships, awards &amp; affiliations.</h2>
          </div>
          <p>Selected recognition and membership reported in the professional CV.</p>
        </div>
        <div className="awards">
          {awards.map(([year, title]) => (
            <div className="award" key={title}>
              <small>{year}</small>
              <strong>{title}</strong>
            </div>
          ))}
        </div>
        <div className="listgrid" style={{ marginTop: 25 }}>
          <div className="panel">
            <div className="kicker">Education</div>
            <h3>MSc, Information Technology (Data Management)</h3>
            <p>Washington University of Science and Technology · September 2025</p>
            <h3>BSc, Occupational Therapy</h3>
            <p>Manipal University · August 2012</p>
            <h3>Associate of Science, Occupational Therapy</h3>
            <p>Federal Neuropsychiatric Hospital, Nigeria · July 2005</p>
          </div>
          <div className="panel">
            <div className="kicker">Credentials &amp; associations</div>
            <h3>Project Management Professional (PMP)</h3>
            <p>
              November 2025. Training also includes Universal Prevention Curriculum and Universal
              Treatment Curriculum.
            </p>
            <div className="pillbox">
              {["OTAN", "MRTB", "ISSUP", "ISTAART", "CASSON"].map((p) => (
                <span className="pill" key={p}>
                  {p}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
