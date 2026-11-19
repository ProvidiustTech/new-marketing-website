import { Reveal, Words } from "./motion";

/* eslint-disable @next/next/no-img-element */

type Quote = { text: string; name?: string; role: string; avatar?: string };

const QUOTES: Quote[] = [
  {
    text: "The AI did not just respond. I'm also able to get notified when someone needs personal attention.",
    role: "Business owner, delivery operations",
  },
  {
    text: "We used to spend so much time answering the same questions about product availability, pricing and delivery. Now, customers can get answers without waiting for someone on our team to become available. It's made managing enquiries much easier.",
    name: "Bola Martins",
    role: "Founder & CEO, Shopora",
    avatar: "review-bola",
  },
  {
    text: "It has been very, very helpful, honestly.",
    role: "Business owner, delivery operations",
  },
];

/** Quote tile: avatar on top, the quote in the middle, who said it at the foot. */
function QuoteCard({ text, name, role, avatar = "review-avatar" }: Quote) {
  return (
    <figure className="flex h-[380px] w-[300px] shrink-0 flex-col items-center justify-between rounded-[20px] bg-white px-8 py-6 shadow-[0_4px_24px_-8px_rgba(15,23,42,0.10)] transition-transform duration-500 ease-out hover:-translate-y-1.5 md:h-[418px] md:w-[384px] md:px-[72px]">
      <img alt="" src={`/img/${avatar}.webp`} className="size-11 rounded-full object-cover" />
      <blockquote className="w-full text-[15px] leading-[21px] text-[#27272a] md:text-[16px] md:leading-[22px]">“{text}”</blockquote>
      <figcaption className="flex flex-col items-center gap-[3px] text-center text-[12px] leading-4">
        {name && <span className="font-bold text-[#27272a]">{name}</span>}
        <span className="font-medium text-[#a1a1aa]">{role}</span>
      </figcaption>
    </figure>
  );
}

function Photo({ src }: { src: string }) {
  return (
    <div className="group relative h-[380px] w-[270px] shrink-0 overflow-hidden rounded-[20px] md:h-[418px] md:w-[346px]">
      <img
        alt=""
        src={`/img/${src}.webp`}
        className="absolute inset-0 size-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.05]"
      />
    </div>
  );
}

/** One repeat of the bento row: quote, photo, quote, photo, quote. */
function Set({ hidden }: { hidden?: boolean }) {
  return (
    <div className="flex shrink-0 items-center gap-4 pr-4" aria-hidden={hidden}>
      <QuoteCard {...QUOTES[0]} />
      <Photo src="review-woman" />
      <QuoteCard {...QUOTES[1]} />
      <Photo src="review-man" />
      <QuoteCard {...QUOTES[2]} />
    </div>
  );
}

export default function Reviews() {
  return (
    <section id="reviews" className="relative mx-auto mt-20 w-full max-w-[1400px] font-jakarta md:mt-[100px] md:px-5">
      <div className="overflow-x-clip bg-white pb-2 pt-12 md:pt-[65px]">
        <div className="mx-auto w-full max-w-[1152px] px-5 md:px-0">
          <h2 className="text-[26px] font-bold leading-[36px] text-[#18181b] md:text-[30px]">
            <Words segments={[{ text: "What Our Customers Are Saying" }]} />
          </h2>
        </div>
        <Reveal
          y={50}
          duration={1.1}
          className="marquee-paused mt-10 pb-2 md:mt-[59px]"
        >
          <div className="reviews-track flex w-max animate-marquee">
            <Set />
            <Set hidden />
            <Set hidden />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
