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
      className={`absolute inset-x-0 top-0 z-50 section-padding ${
        isHero ? "pt-5 text-white" : "py-5 text-text-dark"
      }`}
    >
      <div className="flex items-start justify-between gap-8">
        <Link href="#hero" className="group flex flex-col gap-1">
          <Image
            src="/images/logo.svg"
            alt="Studio Chitkala"
            width={190}
            height={64}
            priority
            className={`h-14 w-auto ${isHero ? "brightness-0 invert" : ""}`}
          />
          <span
            className={`text-center font-[family-name:var(--font-cabinet)] text-base font-medium ${
              isHero ? "text-white" : "text-text-dark"
            }`}
          >
            Where Thought Finds Form
          </span>
        </Link>

        <nav className="hidden items-center gap-10 pt-2 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="font-[family-name:var(--font-cabinet)] text-lg font-medium transition-opacity hover:opacity-80"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
