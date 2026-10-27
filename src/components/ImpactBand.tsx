const impact = [
  ["1,000+", "Patients served in rehabilitation leadership role"],
  ["12", "Occupational therapists supervised"],
  ["2019", "Dora-Care Behavioral Foundation founded"],
  ["2026", "Mental Health First Aid handbook launched"],
] as const;

export function ImpactBand() {
  return (
    <div className="band">
      <div className="container impact">
        {impact.map(([value, label]) => (
          <div key={label}>
            <b>{value}</b>
            <span>{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function PageTopline({ label }: { label: string }) {
  return <div className="page-topline container">PORTFOLIO &nbsp;/&nbsp; {label}</div>;
}
