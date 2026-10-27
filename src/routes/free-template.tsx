import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";

import { Engagement } from "@/components/Engagement";
import { ImpactBand, PageTopline } from "@/components/ImpactBand";
import { DownloadLink, ViewLink } from "@/components/Tracked";
import { pageHead } from "@/lib/page-head";
import { AMAZON_URL, handbookPages } from "@/lib/site-data";
import { usePageView, useSiteStats, useTrack } from "@/lib/use-stats";

export const Route = createFileRoute("/free-template")({
  head: pageHead("Free Template", "Mental Health First Aid Handbook Preview"),
  component: FreeTemplatePage,
});

const plural = (n = 0, word: string) => `${n.toLocaleString("en-US")} ${word}${n === 1 ? "" : "s"}`;

function FreeTemplatePage() {
  usePageView("free-template");
  const track = useTrack();
  const { downloads, views } = useSiteStats();
  const [readerOpen, setReaderOpen] = useState(false);
  const [page, setPage] = useState(0);
  const [turn, setTurn] = useState(0);
  const readerRef = useRef<HTMLDivElement>(null);
  const previewButtonRef = useRef<HTMLButtonElement>(null);
  const current = handbookPages[page] ?? handbookPages[0]!;
  const total = handbookPages.length;

  const showPage = (i: number) => {
    if (i < 0 || i >= total) return;
    setPage(i);
    setTurn((t) => t + 1);
  };

  const openReader = () => {
    setReaderOpen(true);
    showPage(0);
    track({ kind: "view", id: "handbook-preview" });
  };

  const closeReader = () => {
    setReaderOpen(false);
    previewButtonRef.current?.focus();
  };

  useEffect(() => {
    if (readerOpen) readerRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  }, [readerOpen]);

  useEffect(() => {
    if (!readerOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") setPage((p) => Math.min(p + 1, total - 1));
      if (e.key === "ArrowLeft") setPage((p) => Math.max(p - 1, 0));
      if (e.key === "ArrowRight" || e.key === "ArrowLeft") setTurn((t) => t + 1);
      if (e.key === "Escape") setReaderOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [readerOpen, total]);

  return (
    <>
      <ImpactBand />
      <PageTopline label="FREE TEMPLATE" />
      <Engagement />

      <section className="section container" id="free-template">
        <div className="sectionhead">
          <div>
            <div className="eyebrow">Free handbook sample · Official 2026 edition</div>
            <h2>Explore the guide. Learn to look, listen and link.</h2>
          </div>
          <p>
            A genuine, illustrated preview of Feyikemi Akinyelure's Mental Health First Aid Handbook
            for children and teenagers.
          </p>
        </div>

        <div className="resource-panel">
          <div className="resource-visual">
            <div className="glow-orbit" />
            <div className="preview-float left">
              <img alt="Interior handbook page preview" loading="lazy" src="/assets/handbook_2.png" />
            </div>
            <div
              aria-label="Official handbook cover with animated 3D depth"
              className="book3d book-image"
              tabIndex={0}
            >
              <div className="book-spine" />
              <img alt="Official handbook cover" loading="lazy" src="/assets/handbook_1.png" />
            </div>
            <div className="preview-float right">
              <img alt="About the author page preview" loading="lazy" src="/assets/handbook_7.png" />
            </div>
            <div className="concept-tag">
              <strong>Official illustrated cover</strong> · First edition, 2026
            </div>
            <div className="hero-book-note">
              Presented with the real cover plus supporting preview cards from the handbook itself.
            </div>
          </div>

          <div className="resource-content">
            <span className="kicker">Free preview · Selected pages</span>
            <h3>A little knowledge can make a big difference.</h3>
            <p>
              Meet the handbook's illustrated introduction to mental health, explore the feelings
              thermometer, and follow its practical <strong>Look, Listen, Link</strong> framework.
            </p>
            <div className="preview-prompts">
              <div>
                <span>01</span> Understanding mental health
              </div>
              <div>
                <span>02</span> Recognizing feelings with the thermometer
              </div>
              <div>
                <span>03</span> Look · Listen · Link to trusted support
              </div>
            </div>
            <p className="preview-note">
              The free sample contains six selected, original pages from the 37-page handbook. It is
              educational, not a diagnostic or medical tool.
            </p>
            <div className="resource-actions">
              <button className="btn" ref={previewButtonRef} type="button" onClick={openReader}>
                Flip through sample ↗
              </button>
              <DownloadLink id="handbook-sample" className="btn outline">
                Download free sample ↓
              </DownloadLink>
            </div>
            <span className="count-note">
              {plural(views["handbook-preview"], "preview")} · {plural(downloads["handbook-sample"], "download")}
            </span>
            <p className="release-label" style={{ marginTop: 18 }}>
              Interested in the complete publication?{" "}
              <ViewLink id="handbook-amazon" href={AMAZON_URL}>
                Find the book on Amazon ↗
              </ViewLink>
            </p>
          </div>
        </div>

        <div className="reader-shell" hidden={!readerOpen} ref={readerRef}>
          <div className="reader-heading">
            <div>
              <span className="kicker">Interactive page viewer</span>
              <h3>Preview actual handbook pages</h3>
            </div>
            <button
              aria-label="Close preview"
              className="reader-close"
              type="button"
              onClick={closeReader}
            >
              ✕
            </button>
          </div>
          <div className="flip-stage">
            <button
              aria-label="Previous page"
              className="flip-arrow"
              type="button"
              disabled={page === 0}
              onClick={() => showPage(page - 1)}
            >
              ‹
            </button>
            <div className="flip-paper page-turn" key={turn}>
              <img alt={`Handbook sample: ${current.label}`} src={current.src} />
            </div>
            <button
              aria-label="Next page"
              className="flip-arrow"
              type="button"
              disabled={page === total - 1}
              onClick={() => showPage(page + 1)}
            >
              ›
            </button>
          </div>
          <div className="reader-controls">
            <span>
              Page {page + 1} of {total} · {current.label}
            </span>
            <div className="thumb-strip">
              {handbookPages.map((p, i) => (
                <button
                  key={p.src}
                  type="button"
                  title={p.label}
                  aria-label={`Preview ${p.label}`}
                  className={i === page ? "selected" : undefined}
                  onClick={() => showPage(i)}
                >
                  <img loading="lazy" src={p.src} alt="" />
                </button>
              ))}
            </div>
          </div>
          <p className="preview-note">
            Selected pages only. The book provides general educational guidance and does not replace
            professional mental health care.
          </p>
        </div>
      </section>
    </>
  );
}
