import Image from "next/image";

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-vermillion pb-8 pt-16 section-padding">
      <div className="pointer-events-none flex justify-center opacity-30">
        <Image
          src="/images/logo-footer.svg"
          alt=""
          width={458}
          height={152}
          className="h-auto w-full max-w-3xl"
          aria-hidden
        />
      </div>
      <p className="mt-8 text-right font-[family-name:var(--font-inter)] text-xl text-white">
        © 2026 Studio Chitkala All rights reserved
      </p>
    </footer>
  );
}
