const items = [
  "სერტიფიცირებული დიეტოლოგები და მწვრთნელები",
  "თქვენი მონაცემები დაცულია და არასდროს გადაეცემა მესამე მხარეს",
  "გამჭვირვალე ფასი ლარში — დამალული გადასახადების გარეშე",
];

export function TrustStrip() {
  return (
    <section className="border-y border-border bg-surface">
      <div className="mx-auto flex max-w-5xl flex-col gap-3 px-4 py-6 text-sm font-medium text-foreground-muted sm:flex-row sm:justify-between">
        {items.map((item) => (
          <p key={item}>{item}</p>
        ))}
      </div>
    </section>
  );
}
