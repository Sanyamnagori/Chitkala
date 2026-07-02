import { PostcardWizard } from "./PostcardWizard";

export function ContactSection() {
  return (
    <section
      id="contact"
      className="flex min-h-screen flex-col justify-center bg-vermillion py-20 section-padding"
    >
      <h2 className="mb-12 text-center font-[family-name:var(--font-cabinet)] text-[clamp(2rem,3.33vw,4rem)] font-medium text-white">
        This postcard is finding its way to us…
      </h2>
      <PostcardWizard />
    </section>
  );
}
