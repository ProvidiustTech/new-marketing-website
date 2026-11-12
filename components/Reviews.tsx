import { Reveal, Words } from "./motion";

/* eslint-disable @next/next/no-img-element */

function Quote() {
  return (
    <figure className="flex h-[418px] w-[384px] shrink-0 flex-col items-center justify-between rounded-[16px] bg-white p-[24px] drop-shadow-[0px_10px_15px_rgba(15,23,42,0.08)] transition-transform duration-500 ease-out hover:-translate-y-[6px]">
      <img alt="" src="/img/review-avatar.webp" className="size-[44px] rounded-full object-cover" />
      <blockquote className="w-[238.667px] text-[16px] font-medium leading-[21.333px] text-[#27272a] whitespace-nowrap">
        “We&apos;re handling 3× more
        <br />
        customer conversations with the
        <br />
        same team. ProvidiusTech&apos;s AI
        <br />
        agents are a game changer.”
      </blockquote>
      <figcaption className="text-[12px] font-bold leading-[16px] text-[#a1a1aa] whitespace-nowrap">
        Operations Lead, retail logistics
      </figcaption>
    </figure>
  );
}

function Photo({ src, w, tint }: { src: string; w: number; tint: string }) {
  return (
    <div className="group relative h-[418px] shrink-0 overflow-clip rounded-[16px]" style={{ width: w }}>
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
    <div className="flex shrink-0 items-center gap-[16px] pr-[16px]" aria-hidden={hidden}>
      <div
        className="h-[418px] w-[381px] shrink-0 rounded-[16px] opacity-70"
        style={{
          backgroundImage: "linear-gradient(132.35deg, rgb(253, 230, 138) 0%, rgb(251, 191, 36) 100%)",
        }}
      />
      <Photo
        src="review-1"
        w={346}
        tint="linear-gradient(to top, rgba(30,58,138,0.4), rgba(30,58,138,0))"
      />
      <Quote />
      <Photo
        src="review-2"
        w={272}
        tint="linear-gradient(to top, rgba(19,78,74,0.3), rgba(19,78,74,0))"
      />
      <Quote />
    </div>
  );
}

export default function Reviews() {
  return (
    <section
      id="reviews"
      className="relative mt-[49px] h-[586px] w-full overflow-x-clip font-jakarta max-md:mt-[36px] max-md:h-[500px]"
    >
      <div className="absolute left-[144px] top-[40px] max-md:left-[20px] max-md:top-[20px]">
        <Reveal y={12} className="text-[11px] font-bold leading-[14.667px] text-[#a1a1aa]">
          REVIEWS
        </Reveal>
        <h2 className="mt-[8.5px] text-[30px] font-bold leading-[36px] text-[#18181b] whitespace-nowrap max-md:text-[22px]">
          <Words segments={[{ text: "What Our Customers Are Saying" }]} />
        </h2>
      </div>
      <Reveal
        y={50}
        duration={1.1}
        className="marquee-paused absolute left-[-281px] top-[160px] pb-[8px] max-md:top-[104px] max-md:[zoom:0.86]"
      >
        <div
          className="flex animate-marquee"
          style={{ "--marquee-distance": "1847px", "--marquee-duration": "48s" } as React.CSSProperties}
        >
          <Set />
          <Set hidden />
          <Set hidden />
        </div>
      </Reveal>
    </section>
  );
}
