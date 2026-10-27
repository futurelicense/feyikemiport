export const CONTACT_EMAIL = "feyiowos2023@gmail.com";
export const LINKEDIN_URL = "https://www.linkedin.com/in/feyikemi-akinyelure";
export const DORACARE_URL = "https://doracare.africa/";
export const SCHOLAR_URL = "https://scholar.google.com/citations?hl=en&user=LzwwAe4AAAAJ";
export const AMAZON_URL =
  "https://www.amazon.com/s?k=Mental+Health+First+Aid+Handbook+for+Children+and+Teenagers+Feyikemi+Akinyelure";
export const PRESS_URL =
  "https://docs.google.com/document/d/1gLujZY7vmnrTlALeqfT95j0c8JyOB93AXaGyLA0FQ8w/edit?usp=sharing";

export const mailto = (subject: string) => `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}`;

export const pages = ["home", "experience", "publications", "free-template"] as const;
export type PageId = (typeof pages)[number];

export const downloads = {
  "handbook-sample": {
    file: "/downloads/Mental_Health_First_Aid_Free_Sample.pdf",
    filename: "Feyikemi_Akinyelure_Mental_Health_First_Aid_Sample.pdf",
  },
} as const;
export type DownloadId = keyof typeof downloads;
export const downloadIds = Object.keys(downloads) as DownloadId[];

/** Items whose opens/click-throughs are counted as views. Keep in sync with supabase/bootstrap.sql. */
export const viewIds: readonly string[] = [
  "handbook-preview",
  "handbook-amazon",
  "google-scholar",
  "press-references",
];

export const handbookPages = [
  "Cover",
  "Understanding Mental Health",
  "Feeling Thermometer",
  "LOOK",
  "LISTEN",
  "LINK",
].map((label, i) => ({ label, src: `/assets/handbook_${i + 1}.png` }));
