const SUFFIX = "Feyikemi Akinyelure, MSc, PMP";

export const pageHead = (name: string, description: string) => () => ({
  meta: [
    { title: `${name} | ${SUFFIX}` },
    { name: "description", content: `${description} | ${SUFFIX}` },
  ],
});
