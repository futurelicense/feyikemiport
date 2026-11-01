import { Link, createFileRoute } from "@tanstack/react-router";
import { useRef, useState } from "react";
import { Engagement } from "@/components/Engagement";
import { ImpactBand } from "@/components/ImpactBand";
import { pageHead } from "@/lib/page-head";
import { CONTACT_EMAIL, DORACARE_URL, LINKEDIN_URL, SCHOLAR_URL, mailto } from "@/lib/site-data";
import { usePageView } from "@/lib/use-stats";

export const Route = createFileRoute("/")({ head: pageHead("Home", "Behavioral Health Innovation"), component: HomePage });

type Filter = "all" | "digital" | "community" | "clinical";
const filters: { id: Filter; label: string }[] = [
  { id: "all", label: "All work" }, { id: "digital", label: "Digital health" },
  { id: "community", label: "Community" }, { id: "clinical", label: "Clinical practice" },
];
const chapters = [
  { year: "2005", label: "The foundation", title: "Helping people return to everyday life.", body: "Occupational therapy and rehabilitation shaped my approach to care: understand the person, support their independence, and work alongside their family.", detail: "2005–2015 · Occupational therapy & rehabilitation", symbol: "◎" },
  { year: "2016", label: "Clinical leadership", title: "Building the teams behind better care.", body: "As Head of Occupational Therapy at the Federal Neuropsychiatric Hospital, Yaba, I led a 12-person team and supported rehabilitation services for more than 1,000 patients.", detail: "2016–2023 · Federal Neuropsychiatric Hospital, Yaba", symbol: "✳" },
  { year: "2019", label: "Community action", title: "Taking the conversation beyond the clinic.", body: "I founded Dora-Care Behavioral Foundation in October 2019 and guided its restructuring in 2023, expanding mental health literacy, psychosocial support and school-based early intervention through community partnerships.", detail: "2019–present · Dora-Care Behavioral Foundation", symbol: "◈" },
  { year: "2025", label: "New possibilities", title: "Connecting care with technology.", body: "Work in information technology, data and care operations informs CareEquity Navigator and HomeCircle Africa, initiatives exploring more accessible pathways to support.", detail: "2025–present · Digital health & care innovation", symbol: "↗" },
] as const;
const projects = [
  { id: "navigator", type: "digital", category: "Digital health", year: "2026–present", title: "CareEquity Navigator", short: "Making the path to mental health resources easier to find.", body: "A web-based resource navigation platform developed to help underserved and vulnerable populations discover mental health resources and identify pathways to relevant support.", focus: "Resource discovery · Equitable access · Early intervention", action: "Discuss the project", href: mailto("CareEquity Navigator Inquiry"), symbol: "↗" },
  { id: "schools", type: "community", category: "Community impact", year: "2024–present", title: "School mental health transformation", short: "Starting meaningful conversations with the next generation.", body: "School-based mental health literacy and early-support programming, including government-authorized outreach to public primary and secondary schools in Lagos State.", focus: "School outreach · Mental health literacy · Prevention", action: "Explore Dora-Care", href: DORACARE_URL, symbol: "◈", image: "/assets/community-outreach-640.webp" },
  { id: "homecircle", type: "digital", category: "Caregiving technology", year: "2025–present", title: "HomeCircle Africa", short: "Exploring a more connected caregiving experience.", body: "A digital caregiving venture with a planned platform for caregiver verification, needs-based matching, booking, session documentation and secure payment workflows.", focus: "Product direction · Care coordination · Planned platform", action: "Discuss the venture", href: mailto("HomeCircle Africa Inquiry"), symbol: "⌂" },
  { id: "clinical", type: "clinical", category: "Clinical innovation", year: "2016–2023", title: "Creative pathways to rehabilitation", short: "Bringing sensory integration and the arts into care.", body: "Introduced sensory integration therapy, helped coordinate art-in-medicine projects and supported staff training on creative arts and technology-enabled rehabilitation approaches.", focus: "Sensory integration · Creative arts · Team development", action: "Explore clinical leadership", href: "/experience", symbol: "✳" },
  { id: "outreach", type: "community", category: "Community initiatives", year: "Ongoing initiatives", title: "Early support, wider communities", short: "Meeting people in the places where life happens.", body: "Initiatives include Catch Them Young School Outreach, Voices on the Street, Mental Health Awareness Walk, School Mentorship Program, Mental Health Club, Elderly Alzheimer’s and Dementia Program, and substance-use rehabilitation and vocational skills initiatives.", focus: "Awareness · Mentorship · Community partnerships", action: "Explore the foundation", href: DORACARE_URL, symbol: "♡", image: "/assets/school-participation-640.webp" },
] as const;
const photos = [
  { src: "/assets/community-outreach-1280.webp", small: "/assets/community-outreach-640.webp", title: "In conversation", caption: "A school outreach session with Dora-Care Behavioral Foundation.", alt: "A facilitator in yellow speaks with students seated outdoors during a Dora-Care school outreach session." },
  { src: "/assets/school-participation-1280.webp", small: "/assets/school-participation-640.webp", title: "Learning together", caption: "Students taking part in a school community session.", alt: "Students seated in a school hall listen and write notes during a community session." },
] as const;

function HomePage() {
  usePageView("home");
  const [chapter, setChapter] = useState(0);
  const activeChapter = chapters[chapter] ?? chapters[0];
  const [filter, setFilter] = useState<Filter>("all");
  const [openProject, setOpenProject] = useState<string | null>("navigator");
  const [photoIndex, setPhotoIndex] = useState(0);
  const photo = photos[photoIndex] ?? photos[0];
  const photoDialog = useRef<HTMLDialogElement>(null);
  const visibleProjects = projects.filter(project => filter === "all" || filter === project.type);
  const openPhoto = (index: number) => { setPhotoIndex(index); photoDialog.current?.showModal(); };

  return <>
    <section className="profile-hero container" id="home" aria-labelledby="hero-title">
      <div className="hero-copy">
        <div className="hero-intro"><span className="status-dot" /> A life’s work in human possibility</div>
        <h1 id="hero-title">Care with<br /><em>purpose.</em><br />Change that lasts<span className="title-period">.</span></h1>
        <div className="hero-description"><span className="tiny-cross" aria-hidden="true">✳</span><p>I’m <strong>Feyikemi Akinyelure.</strong> Behavioral health innovator, occupational therapy professional and founder. Connecting people, programs and ideas to make mental health support more accessible.</p></div>
        <div className="hero-actions"><a className="btn" href="#work">Discover my work <span>↗</span></a><a className="underlined-link" href="#about">The person behind the purpose <span>↓</span></a></div>
      </div>
      <div className="portrait-composition">
        <span className="portrait-coordinate">SPRINGFIELD, VIRGINIA / CONNECTED TO COMMUNITY</span>
        <div className="portrait-frame"><img src="/assets/feyikemi-portrait.webp" width="335" height="597" alt="Feyikemi Akinyelure" fetchPriority="high" /><span className="portrait-frame-label">Feyikemi Akinyelure <small>MSc · PMP</small></span></div>
        <div className="purpose-seal"><span aria-hidden="true">✳</span><span>People first.<br />Always.</span></div>
        <a className="hero-community-card" href="#community"><img src="/assets/community-outreach-640.webp" width="640" height="427" alt="Dora-Care school outreach" /><span>From purpose<br /><strong>to people.</strong><i aria-hidden="true">↗</i></span></a>
        <div className="portrait-side-note">CLINICAL KNOWLEDGE. COMMUNITY ACTION.</div>
      </div>
    </section>
    <div className="container hero-bottom"><span>Care. Connection. Possibility.</span><nav aria-label="Page chapters"><a href="#about">01 / The story</a><a href="#work">02 / The work</a><a href="#handbook">03 / The resource</a></nav><a href="#about" className="scroll-circle" aria-label="Scroll to the story">↓</a></div>
    <ImpactBand />

    <section className="section container purpose-story" id="about" aria-labelledby="story-title">
      <div className="section-index"><span>01 / THE STORY</span><span>A career shaped by care</span></div>
      <div className="story-opening"><h2 id="story-title">One purpose.<br /><em>Many ways forward.</em></h2><div><p className="lede">The setting changes.<br />The commitment to people stays.</p><p>From psychiatric rehabilitation to school outreach and digital health, my work begins with a simple question: how can more people get the support they need?</p><a href={LINKEDIN_URL} target="_blank" rel="noopener" className="underlined-link">Connect on LinkedIn ↗</a></div></div>
      <div className="career-explorer">
        <div className="career-tabs" role="group" aria-label="Explore career chapters">{chapters.map((item,index) => <button type="button" key={item.year} aria-pressed={chapter === index} aria-controls="career-chapter" onClick={()=>setChapter(index)}><span>{item.year}</span><small>{item.label}</small><i aria-hidden="true">↗</i></button>)}</div>
        <div className="career-chapter" id="career-chapter" aria-live="polite" aria-atomic="true"><div key={chapter} className="chapter-copy"><span className="eyebrow">{activeChapter.detail}</span><h3>{activeChapter.title}</h3><p>{activeChapter.body}</p><Link className="underlined-link" to="/experience">View full experience ↗</Link></div><span className="chapter-symbol" aria-hidden="true">{activeChapter.symbol}</span><span className="chapter-counter">0{chapter+1} / 04</span></div>
      </div>
    </section>

    <section className="community-scene" id="community" aria-labelledby="community-title">
      <div className="container"><div className="section-index"><span>IN THE COMMUNITY</span><span>Real people. Shared possibility.</span></div><div className="community-heading"><h2 id="community-title">This is where<br /><em>purpose comes alive.</em></h2><p>Through Dora-Care Behavioral Foundation, mental health conversations reach schools and communities, one connection at a time.</p></div>
      <div className="fieldwork-gallery">{photos.map((item,index)=><figure key={item.src} className={`fieldwork-photo fieldwork-photo-${index}`}><button type="button" onClick={()=>openPhoto(index)} aria-label={`Enlarge photo: ${item.title}`}><img src={item.src} srcSet={`${item.small} 640w, ${item.src} 1280w`} sizes="(max-width: 760px) 90vw, 65vw" width="1280" height="853" alt={item.alt} loading="lazy" decoding="async" /><span className="photo-expand" aria-hidden="true">↗</span></button><figcaption><span>0{index+1} / {item.title}</span><span>{index === 0 ? "Dora-Care school outreach" : "Community participation"}</span></figcaption></figure>)}</div>
      <div className="community-endnote"><span>Listening opens a door.<br /><em>Connection helps us walk through it.</em></span><a className="btn outline light" href={DORACARE_URL} target="_blank" rel="noopener">Meet Dora-Care <span>↗</span></a></div></div>
    </section>

    <section className="section container selected-work" id="work" aria-labelledby="work-title"><div className="section-index"><span>02 / SELECTED WORK</span><span>Ideas with people at their heart</span></div><div className="work-heading"><h2 id="work-title">Different approaches.<br /><em>A shared intention.</em></h2><p>Explore the programs, platforms and clinical work creating more pathways to support.</p></div>
      <div className="work-toolbar"><div className="filterbar" aria-label="Project filters">{filters.map(item=><button type="button" key={item.id} className={`filter${filter===item.id ? " active" : ""}`} aria-pressed={filter===item.id} onClick={()=>{setFilter(item.id);setOpenProject(null);}}>{item.label}</button>)}</div><span className="filter-results" role="status">{visibleProjects.length} {visibleProjects.length===1 ? "project" : "projects"}</span></div>
      <div className="project-stories">{visibleProjects.map(project=><details key={project.id} className="project-story" open={openProject===project.id} onToggle={event=>{if(event.currentTarget.open)setOpenProject(project.id);else setOpenProject(previous=>previous===project.id ? null : previous);}}><summary><span className="project-number">0{projects.indexOf(project)+1}</span><span className="project-title"><small>{project.category} / {project.year}</small><strong>{project.title}</strong></span><span className="project-toggle" aria-hidden="true">+</span></summary><div className="project-story-body"><div className={`project-visual project-visual-${project.type}`}>{"image" in project ? <img src={project.image} width="640" height="427" alt={project.id==="schools" ? photos[0].alt : photos[1].alt} loading="lazy" /> : <><span className="project-symbol" aria-hidden="true">{project.symbol}</span><span>{project.category}</span><div className="visual-orbit" aria-hidden="true" /></>}</div><div className="project-description"><h3>{project.short}</h3><p>{project.body}</p><span className="project-focus">{project.focus}</span>{project.href==="/experience" ? <Link className="underlined-link" to="/experience">{project.action} ↗</Link> : <a className="underlined-link" href={project.href} target={project.href.startsWith("https") ? "_blank" : undefined} rel={project.href.startsWith("https") ? "noopener" : undefined}>{project.action} ↗</a>}</div></div></details>)}</div>
    </section>

    <section className="handbook-feature" id="handbook" aria-labelledby="handbook-title"><div className="container"><div className="section-index"><span>03 / THE RESOURCE</span><span>Knowledge made practical</span></div><div className="handbook-layout"><Link to="/free-template" className="handbook-display" aria-label="Preview the Mental Health First Aid handbook"><span className="handbook-orbit" aria-hidden="true"/><span className="handbook-stamp">For the<br />next generation <span>↗</span></span><img src="/assets/handbook_1.png" alt="Mental Health First Aid Handbook for Children and Teenagers" loading="lazy" width="340" height="480"/><span className="handbook-preview-label">A little knowledge. A meaningful difference. <span>↗</span></span></Link><div className="handbook-copy"><span className="eyebrow">Mental Health First Aid · 2026</span><h2 id="handbook-title">For the people<br />supporting<br /><em>young minds.</em></h2><p>Practical guidance to recognize emotional and behavioral concerns, respond with understanding, and connect children and teenagers with appropriate help.</p><div className="resource-steps"><span><b>01</b> Look</span><span><b>02</b> Listen</span><span><b>03</b> Link</span></div><Link className="btn" to="/free-template">Explore the free sample <span>↗</span></Link><Link className="resource-secondary" to="/publications">Research & publications ↗</Link></div></div></div></section>

    <section className="container invitation-section" id="contact" aria-labelledby="contact-title"><div className="invitation-note"><span className="eyebrow">THE NEXT CHAPTER</span><p>Good things begin<br />with a conversation.</p><span className="invitation-flower" aria-hidden="true">✳</span></div><div className="invitation-content"><h2 id="contact-title">Let’s make<br /><em>a difference.</em></h2><p>Let’s explore partnerships, research, community initiatives and speaking opportunities together.</p><a className="btn" href={mailto("Professional Collaboration Inquiry")}>Start a conversation <span>↗</span></a><a className="contact-address" href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a><span className="contact-location">Springfield, Virginia · Connected across communities</span></div></section>
    <details className="container engagement-disclosure"><summary>Portfolio activity <span>Views, visits & downloads +</span></summary><Engagement /></details>

    <dialog className="photo-dialog" ref={photoDialog} aria-label="Community photo viewer" onClick={event=>{if(event.target===event.currentTarget)photoDialog.current?.close();}} onKeyDown={event=>{if(event.key==="ArrowRight"||event.key==="ArrowLeft"){event.preventDefault();setPhotoIndex(index=>(index+1)%photos.length);}}}><div className="photo-dialog-toolbar"><span>COMMUNITY FIELDNOTES / 0{photoIndex+1}</span><button type="button" autoFocus onClick={()=>photoDialog.current?.close()} aria-label="Close photo viewer">Close ✕</button></div><img src={photo.src} alt={photo.alt}/><div className="photo-dialog-footer"><div><h3>{photo.title}</h3><p>{photo.caption}</p></div><div className="photo-dialog-arrows"><button type="button" aria-label="Previous photo" onClick={()=>setPhotoIndex(index=>(index+photos.length-1)%photos.length)}>←</button><button type="button" aria-label="Next photo" onClick={()=>setPhotoIndex(index=>(index+1)%photos.length)}>→</button></div></div></dialog>
  </>;
}
