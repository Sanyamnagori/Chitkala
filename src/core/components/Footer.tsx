import Image from "next/image";

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-vermillion pb-8 pt-0">
      <div className="mx-auto w-[92%] border-t border-white mb-6 mt-4 opacity-80" />
      <div className="pointer-events-none flex justify-center pb-2">
        <Image
          src="/images/logo-footer.svg"
          alt=""
          width={280}
          height={93}
          className="h-auto w-full max-w-[280px]"
          aria-hidden
        />
      </div>
      <p className="absolute bottom-4 right-8 text-right font-[family-name:var(--font-inter)] text-[12px] text-white/90">
        © 2026 Studio Chitkala All rights reserved
      </p>
    </footer>
  );
}
