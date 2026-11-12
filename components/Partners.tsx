/* eslint-disable @next/next/no-img-element */

const marks = [1, 2, 3, 4, 5, 6, 6, 6];

function Set({ hidden }: { hidden?: boolean }) {
  return (
    <div className="flex shrink-0 items-center" aria-hidden={hidden}>
      {marks.map((m, i) => (
        <div key={i} className="flex w-[181px] shrink-0 items-center gap-[7px] opacity-90 transition-opacity duration-300 hover:opacity-100">
          <img alt="" src={`/img/partner-${m}.png`} className="size-[26px]" />
          <span className="text-[16px] font-bold leading-[18.4px] text-[#a3a5a8]">Logoipsum</span>
        </div>
      ))}
    </div>
  );
}

/** Trusted-partner logo strip, looping as a marquee. */
export default function Partners() {
  return (
    <section
      aria-label="Trusted partners"
      className="relative h-[80px] w-full overflow-clip [mask-image:linear-gradient(to_right,transparent,#000_6%,#000_94%,transparent)]"
    >
      <div
        className="absolute left-[56px] top-[25px] flex animate-marquee"
        style={{ "--marquee-distance": "1448px", "--marquee-duration": "36s" } as React.CSSProperties}
      >
        <Set />
        <Set hidden />
        <Set hidden />
      </div>
    </section>
  );
}
