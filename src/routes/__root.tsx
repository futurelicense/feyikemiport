import { QueryClientProvider, type QueryClient } from "@tanstack/react-query";
import {
  HeadContent,
  Link,
  Outlet,
  Scripts,
  createRootRouteWithContext,
} from "@tanstack/react-router";
import { useEffect, useRef, type ReactNode } from "react";
import { useLocation } from "@tanstack/react-router";

import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { useRegisterVisit } from "@/lib/use-stats";
import appCss from "../styles.css?url";

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width,initial-scale=1" },
      { name: "theme-color", content: "#0A593D" },
      { title: "Feyikemi Akinyelure, MSc, PMP" },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Manrope:wght@400;500;600;700;800&family=Instrument+Serif:ital@0;1&display=swap",
      },
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/assets/handbook_1.png", type: "image/png" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFound,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <Layout />
    </QueryClientProvider>
  );
}

function Layout() {
  useRegisterVisit();
  const pathname = useLocation({ select: location => location.pathname });
  const progressRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const updateProgress = () => {
      const distance = document.documentElement.scrollHeight - window.innerHeight;
      if (progressRef.current) progressRef.current.style.transform = `scaleX(${distance > 0 ? Math.min(1, window.scrollY / distance) : 0})`;
    };
    const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const animations = new Set<Animation>();
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        observer.unobserve(entry.target);
        if (!motionPreference.matches) {
          const animation = entry.target.animate(
            [{ opacity: 0, transform: "translateY(22px)" }, { opacity: 1, transform: "none" }],
            { duration: 700, easing: "cubic-bezier(.2,.8,.2,1)" },
          );
          animations.add(animation);
          animation.onfinish = () => animations.delete(animation);
        }
      });
    }, { threshold: 0.08 });
    document.querySelectorAll(".sectionhead, .story-opening, .community-heading, .work-heading, .handbook-copy, .invitation-content, .publication > div, .panel, .award").forEach(element => observer.observe(element));
    const onMotionChange = () => {
      if (motionPreference.matches) {
        animations.forEach(animation => animation.cancel());
        animations.clear();
      }
    };
    motionPreference.addEventListener("change", onMotionChange);
    window.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress);
    const resizeObserver = new ResizeObserver(updateProgress);
    resizeObserver.observe(document.body);
    updateProgress();
    return () => {
      observer.disconnect(); resizeObserver.disconnect();
      motionPreference.removeEventListener("change", onMotionChange);
      window.removeEventListener("scroll", updateProgress); window.removeEventListener("resize", updateProgress);
      animations.forEach(animation => animation.cancel());
    };
  }, [pathname]);
  return (
    <>
      <a className="skip-link" href="#main-content">Skip to content</a>
      <div className="reading-progress" ref={progressRef} aria-hidden="true" />
      <SiteHeader />
      <main id="main-content" tabIndex={-1}>
        <Outlet />
      </main>
      <SiteFooter />
    </>
  );
}

function NotFound() {
  return (
    <section className="section container">
      <div className="eyebrow">404</div>
      <h1>Page not found.</h1>
      <p className="sub">The page you're looking for doesn't exist or has moved.</p>
      <Link className="btn" to="/">
        Back home ↗
      </Link>
    </section>
  );
}
