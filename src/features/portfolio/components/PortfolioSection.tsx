import Image from "next/image";
import Link from "next/link";

type InlineIllustrationSlotProps = {
  src?: string;
  alt?: string;
};

function InlineIllustrationSlot({ src, alt = "" }: InlineIllustrationSlotProps) {
  return (
    <span
      className="relative mx-1 inline-block h-[1.15em] w-[1.65em] translate-y-[0.06em] overflow-hidden rounded-lg bg-vermillion align-middle"
      aria-hidden={!src}
    >
      {src && (
        <Image
          src={src}
          alt={alt}
          fill
          unoptimized
          className="object-cover"
          sizes="10vw"
        />
      )}
    </span>
  );
}

export function PortfolioSection() {
  return (
    <section
      id="about"
      className="relative flex min-h-screen flex-col justify-center bg-white py-24 section-padding"
    >
      <div className="mx-auto flex w-full max-w-[1454px] flex-col gap-20 text-center">
        <p className="font-[family-name:var(--font-cabinet)] text-[clamp(1.75rem,3.33vw,4rem)] leading-[1.35] text-text-dark">
          From logos
          <InlineIllustrationSlot src="/images/inline-gif-1.gif" alt="Logos illustration" />
          & brand identities to brochures, packaging, social media creatives, &
          motion graphics, every project begins with a strong idea.
          <InlineIllustrationSlot src="/images/inline-gif-2.gif" alt="Idea illustration" /> Explore{" "}
          <Link href="#" className="relative inline-block font-bold text-deep-red transition-opacity hover:opacity-80">
            <span className="relative z-10">our Portfolio</span>
            <Image
              src="/images/underline-portfolio.svg"
              alt=""
              width={382}
              height={13}
              className="absolute -bottom-2 left-0 w-full min-w-[6rem]"
              aria-hidden
            />
          </Link>
          , crafted for brands, businesses, & individuals across diverse
          industries.
        </p>

        <p className="font-[family-name:var(--font-cabinet)] text-[clamp(1.75rem,3.33vw,4rem)] leading-[1.35] text-text-dark">
          From{" "}
          <Link href="#" className="relative inline-block font-bold text-deep-red transition-opacity hover:opacity-80">
            <span className="relative z-10">our Art Studio</span>
            <Image
              src="/images/underline-artstudio.svg"
              alt=""
              width={382}
              height={13}
              className="absolute -bottom-2 left-0 w-full min-w-[6rem]"
              aria-hidden
            />
          </Link>
          <InlineIllustrationSlot src="/images/inline-gif-3.gif" alt="Art Studio illustration" />
          a curated collection of original artworks & prints inspired by
          <InlineIllustrationSlot src="/images/inline-gif-4.gif" alt="Nature illustration" /> mythology, culture, nature, & the quiet
          moments in between. Bring home a piece that resonates with your story.
        </p>
      </div>
    </section>
  );
}
