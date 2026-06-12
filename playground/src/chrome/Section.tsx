import type { ReactNode } from "react";

/** One numbered component section: `01  Title    note`. Mirrors the wireframe's
 *  `<section class="sec">` scaffold. */
export function Section({
  num,
  title,
  note,
  children,
}: {
  num: string;
  title: string;
  note?: string;
  children: ReactNode;
}) {
  return (
    <section className="sec">
      <div className="sec-head">
        <span className="sec-num">{num}</span>
        <h2 className="sec-title">{title}</h2>
        {note ? <span className="sec-note">{note}</span> : null}
      </div>
      {children}
    </section>
  );
}

/** A labelled group inside a section. */
export function Grp({ label, children }: { label?: string; children: ReactNode }) {
  return (
    <div className="grp">
      {label ? <div className="grp-label">{label}</div> : null}
      {children}
    </div>
  );
}

/** Horizontal flex row of demos. */
export function Row({ children }: { children: ReactNode }) {
  return <div className="row">{children}</div>;
}

/** Vertical flex column of demos. */
export function Col({ children }: { children: ReactNode }) {
  return <div className="col">{children}</div>;
}
