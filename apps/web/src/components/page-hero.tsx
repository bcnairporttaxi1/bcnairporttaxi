export function PageHero({
  title,
  intro,
}: {
  title: string;
  intro?: string;
}) {
  return (
    <div className="bg-void">
      <div className="mx-auto max-w-6xl px-4 pb-14 pt-12">
        <h1 className="max-w-3xl font-display text-3xl font-extrabold leading-tight text-ice sm:text-5xl">
          {title}
        </h1>
        {intro && (
          <p className="mt-5 max-w-2xl leading-relaxed text-porcelain/75">{intro}</p>
        )}
      </div>
    </div>
  );
}

/** Long-form body wrapper used by the legal and informational pages. */
export function Prose({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto max-w-3xl px-4 py-14 [&_h2]:mt-9 [&_h2]:font-display [&_h2]:text-2xl [&_h2]:font-extrabold [&_li]:mt-1.5 [&_p]:mt-3 [&_p]:leading-relaxed [&_ul]:mt-3 [&_ul]:list-disc [&_ul]:pl-5">
      {children}
    </div>
  );
}
