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
  { when: "September 2026–present · Chicago, Illinois / Remote", title: "Data Analyst", organization: "Dexterous Solutions", body: "Analyze and validate data using statistical methods, SQL, Excel, Power BI and Tableau. Develop dashboards, KPI reports, analytical recommendations and forecasts for cross-functional planning and decision-making." },
  { when: "November 2025–present · Lagos, Nigeria", title: "Founder & Chief Executive Officer", organization: "HomeCircle Africa Limited", body: "Lead executive direction, product vision and stakeholder engagement for a digital caregiving venture. The platform roadmap covers caregiver verification, needs-based matching, booking, documentation and payments, with phased plans for training, quality oversight, analytics and regional expansion." },
  { when: "November 2025–present · Annandale, Virginia", title: "IT Support Specialist", organization: "Ascend Polywellness Center", body: "Troubleshoot hardware, software, connectivity and user access to support clinical operations. Assist with electronic health records, intake, scheduling, care coordination, insurance verification and billing records while maintaining confidentiality." },
  { when: "November 2024–January 2025 · Virginia", title: "Human Services Client Associate", organization: "Temporary Solutions, Inc.", body: "Conducted client intake and needs assessments for individuals and families facing social, financial and health challenges. Coordinated referrals, emergency-support requests and follow-up across providers, maintaining confidential case records and service outcomes." },
  { when: "August–October 2024 · Virginia", title: "IT Administrative Assistant", organization: "Washington University of Science and Technology", body: "Managed academic and administrative records for accuracy, completeness and confidentiality. Coordinated scheduling, correspondence and document retrieval, and supported technology-related administrative requests and reporting workflows." },
  { when: "April 2022–present · Lagos, Nigeria", title: "Advisory Board Member", organization: "Sound Mind Initiative", body: "Provide strategic guidance on mental health priorities, accessibility, partnerships and evidence-informed programming. Support outreach planning, community participation, program review and recommendations for sustainable use of resources." },
  { when: "October 2019–present · Lagos, Nigeria", title: "Founder", organization: "Dora-Care Behavioral Foundation", body: "Founded the organization and guided its restructuring in 2023. Lead early intervention, mental health literacy and psychosocial support for underserved children, families and communities, including government-authorized school programs, educator training and partnerships with education stakeholders, community organizations and the Nigerian Red Cross. Led development and dissemination of the Mental Health First Aid Handbook." },
  { when: "January 2016–May 2023 · Lagos, Nigeria", title: "Head of Occupational Therapy Department", organization: "Federal Neuropsychiatric Hospital, Yaba", body: "Led clinical quality, evidence-based assessment, individualized treatment planning and multidisciplinary psychiatric and neurological rehabilitation. Supervised 12 occupational therapists and oversaw services for more than 1,000 patients. Introduced sensory integration therapy and mentored clinical staff." },
  { when: "February 2015–March 2017 · Lagos, Nigeria", title: "Occupational Therapy Consultant", organization: "Mayfield Medical Clinic", body: "Assessed functional needs and developed individualized rehabilitation plans. Collaborated with physicians and allied health professionals, educated patients and families on home-based strategies, and mentored junior personnel in assessment, documentation and clinical practice." },
] as const;

const awards = [
  ["2026", "WILD Network Fellow"],
  ["2025", "Skills Builder Global Impact Fellowship, Level 3"],
  ["2024", "International Best Research Award in Mental Health–Occupational Therapy"],
  ["2022", "100 Iconic Personalities of the Year"],
  ["2017", "Exquisite Lady of the Year (ELOY)"],
  ["Summer 2024 & Winter 2025", "WUST Presidential Honor Award Certificates"],
  ["Leadership & community recognition", "Mountaintop"],
] as const;

const affiliations = [
  ["OTAN", "Occupational Therapists Association of Nigeria"],
  ["MRTB", "Medical Rehabilitation Therapists Board of Nigeria"],
  ["ISSUP", "International Society of Substance Use Professionals"],
  ["ISTAART", "Alzheimer’s Association International Society to Advance Alzheimer’s Research and Treatment"],
  ["CASSON", "Counseling Association of Nigeria"],
  ["ForbesBLK", "Community member · 2026"],
] as const;

function ExperiencePage() {
  usePageView("experience");
  return <>
    <ImpactBand />
    <PageTopline label="EXPERIENCE" />
    <section className="section pale" id="experience"><div className="container">
      <div className="sectionhead"><div><div className="eyebrow">Professional experience</div><h2>Leadership across health, technology and social impact.</h2></div><p>Clinical practice, community leadership and technical expertise, brought together in service of more accessible care.</p></div>
      <div className="listgrid career-role-grid">{roles.map(role => <article className="panel" key={role.title+role.organization}><span className="date">{role.when}</span><h3>{role.title}</h3><p className="role-organization">{role.organization}</p><p>{role.body}</p></article>)}</div>
    </div></section>

    <section className="section container" id="clinical-leadership" aria-labelledby="clinical-title">
      <div className="sectionhead"><div><div className="eyebrow">Clinical leadership in practice</div><h2 id="clinical-title">Building capability.<br /><em>Broadening rehabilitation.</em></h2></div><p>Selected contributions from the Head of Occupational Therapy role at Federal Neuropsychiatric Hospital, Yaba, January 2016–May 2023.</p></div>
      <div className="clinical-results"><div><strong>40%</strong><span>Reported increase in referrals</span></div><div><strong>25%</strong><span>Reported increase in therapy outcomes</span></div><p>Figures reported in the professional CV in connection with sensory integration therapy, strengthened clinical practice and staff mentoring.</p></div>
      <div className="listgrid" style={{marginTop:24}}><article className="panel"><span className="kicker">Creative arts & rehabilitation</span><h3>Yaba Hospital Coordinator, Art in Medicine</h3><p>Coordinated projects implemented by Kunle Adewale, a Mandela Washington Fellow, bringing therapeutic music, dance and visual arts into multidisciplinary rehabilitation for psychiatric inpatients and outpatients.</p></article><article className="panel"><span className="kicker">Training & therapeutic innovation</span><h3>Connecting clinical teams with new approaches</h3><p>Coordinated interdisciplinary training for healthcare professionals in creative arts, digital therapeutic methods and virtual reality applications to support technology-enabled occupational therapy and mental healthcare practice.</p></article></div>
    </section>

    <section className="section pale" id="recognition"><div className="container">
      <div className="sectionhead"><div><div className="eyebrow">Recognition</div><h2>Fellowships, awards<br /><em>& community recognition.</em></h2></div><p>Selected recognition listed in the professional CV.</p></div>
      <div className="awards">{awards.map(([year,title]) => <article className="award" key={title}><small>{year}</small><strong>{title}</strong></article>)}</div>
    </div></section>

    <section className="section container" id="education"><div className="sectionhead"><div><div className="eyebrow">Education & professional development</div><h2>Clinical foundations.<br /><em>Technical perspective.</em></h2></div></div>
      <div className="listgrid"><article className="panel"><span className="kicker">Education</span><h3>MSc, Information Technology (Data Management)</h3><p>Washington University of Science and Technology, Virginia, USA · September 2025</p><h3>BSc, Occupational Therapy</h3><p>Manipal University, India · August 2012</p><h3>Associate of Science, Occupational Therapy</h3><p>Federal Neuropsychiatric Hospital, Nigeria · July 2005</p></article><article className="panel"><span className="kicker">Credentials & training</span><h3>Project Management Professional (PMP)</h3><p>November 2025</p><h3>Prevention, treatment & leadership</h3><p>Universal Prevention Curriculum (UPC), including School Track; Universal Treatment Curriculum (UTC); leadership and health-management training.</p><h3>Applied expertise</h3><div className="pillbox">{["Psychiatric rehabilitation","Program evaluation","Data management","SQL & Excel","Power BI & Tableau","Care coordination"].map(skill=><span className="pill" key={skill}>{skill}</span>)}</div></article></div>
      <div className="affiliations-block"><div className="eyebrow">Professional affiliations & community</div><div className="affiliation-grid">{affiliations.map(([short,name])=><div key={short}><strong>{short}</strong><span>{name}</span></div>)}</div></div>
    </section>
    <details className="container engagement-disclosure"><summary>Portfolio activity <span>Views, visits &amp; downloads +</span></summary><Engagement /></details>
  </>;
}
