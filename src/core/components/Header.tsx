"use client";

import Image from "next/image";
import Link from "next/link";

const navLinks = [
  { href: "#hero", label: "What is Studio Chitkala?" },
  { href: "#about", label: "About Us" },
  { href: "#contact", label: "Contact Us" },
];

export function Header({ variant = "hero" }: { variant?: "hero" | "default" }) {
  const isHero = variant === "hero";

  return (
    <header
      className={`absolute inset-x-0 top-0 z-50 px-8 pt-8 md:px-[6%] lg:px-[8%] xl:px-[10%] xl:pt-10 ${
        isHero ? "text-white" : "text-text-dark"
      }`}
    >
      <div className="flex items-center justify-between">
        <Link href="#hero" className="group flex flex-col items-start gap-1">
          <Image
            src="/images/logo.svg"
            alt="Studio Chitkala"
            width={190}
            height={64}
            priority
            className={`w-[160px] md:w-[180px] h-auto ${isHero ? "brightness-0 invert" : ""}`}
          />
          <span
            className={`text-left font-[family-name:var(--font-cabinet)] text-[11px] md:text-[12px] font-normal tracking-wide pl-0.5 ${
              isHero ? "text-white" : "text-text-dark"
            }`}
          >
            Where Thought Finds Form
          </span>
        </Link>

        <nav className="hidden items-center gap-10 lg:gap-14 xl:gap-16 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="font-[family-name:var(--font-cabinet)] text-[15px] font-normal transition-opacity hover:opacity-80"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
