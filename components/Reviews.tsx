import { Reveal, Words } from "./motion";

/* eslint-disable @next/next/no-img-element */

const QUOTES = [
  {
    text: "It has been very, very helpful, honestly.",
    role: "Business owner, delivery operations",
  },
  {
    text: "The AI did not just respond. I'm also able to get notified when someone needs personal attention.",
    role: "Business owner, delivery operations",
  },
  {
    text: "It has really helped me. It's really helped me.",
    role: "Business owner, delivery operations",
  },
];

function Quote({ text, role }: { text: string; role: string }) {
  return (
    <figure className="flex h-[400px] w-[340px] shrink-0 flex-col items-center justify-between rounded-[20px] bg-white p-7 shadow-[0_10px_30px_-10px_rgba(15,23,42,0.12)] transition-transform duration-500 ease-out hover:-translate-y-1.5 md:h-[418px] md:w-[384px]">
      <img alt="" src="/img/review-avatar.webp" className="size-11 rounded-full object-cover" />
      <blockquote className="text-[17px] font-medium leading-[1.45] text-[#27272a]">“{text}”</blockquote>
      <figcaption className="text-[12px] font-bold text-[#a1a1aa]">{role}</figcaption>
    </figure>
  );
}

function Photo({ src, w, tint }: { src: string; w: number; tint: string }) {
  return (
    <div className="group relative h-[400px] shrink-0 overflow-hidden rounded-[20px] md:h-[418px]" style={{ width: w }}>
      <img
        alt=""
        src={`/img/${src}.webp`}
        className="absolute inset-0 size-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.06]"
      />
      <div className="absolute inset-0" style={{ backgroundImage: tint }} />
    </div>
  );
}

function Set({ hidden }: { hidden?: boolean }) {
  return (
    <div className="flex shrink-0 items-center gap-4 pr-4" aria-hidden={hidden}>
      <div
        className="h-[400px] w-[340px] shrink-0 rounded-[20px] opacity-80 md:h-[418px] md:w-[381px]"
        style={{ backgroundImage: "linear-gradient(132deg, #fde68a 0%, #fbbf24 100%)" }}
      />
      <Photo src="review-1" w={346} tint="linear-gradient(to top, rgba(30,58,138,0.4), rgba(30,58,138,0))" />
      <Quote {...QUOTES[0]} />
      <Photo src="review-2" w={272} tint="linear-gradient(to top, rgba(19,78,74,0.3), rgba(19,78,74,0))" />
      <Quote {...QUOTES[1]} />
      <Quote {...QUOTES[2]} />
    </div>
  );
}

export default function Reviews() {
  return (
    <section id="reviews" className="relative mt-20 w-full overflow-x-clip font-jakarta md:mt-28">
      <div className="mx-auto w-full max-w-[1240px] px-5 md:px-10">
        <Reveal y={12} className="text-[12px] font-bold tracking-[1.5px] text-[#a1a1aa]">
          REVIEWS
        </Reveal>
        <h2 className="mt-2 text-[28px] font-bold leading-[1.15] text-[#18181b] sm:text-[34px] md:text-[40px]">
          <Words segments={[{ text: "What Our Customers Are Saying" }]} />
        </h2>
      </div>
      <Reveal
        y={50}
        duration={1.1}
        className="marquee-paused mt-10 pb-2 [mask-image:linear-gradient(to_right,transparent,#000_5%,#000_95%,transparent)]"
      >
        <div className="reviews-track flex w-max animate-marquee">
          <Set />
          <Set hidden />
          <Set hidden />
        </div>
      </Reveal>
    </section>
  );
}
