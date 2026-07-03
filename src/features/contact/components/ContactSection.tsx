import { PostcardWizard } from "./PostcardWizard";

export function ContactSection() {
  return (
    <section
      id="contact"
      className="flex flex-col justify-center bg-vermillion pt-6 pb-0 section-padding min-h-[calc(100vh-142px)]"
    >
      <h2 className="mb-4 text-center font-[family-name:var(--font-cabinet)] text-3xl md:text-4xl lg:text-[42px] font-medium text-white">
        This postcard is finding its way to us...
      </h2>
      <PostcardWizard />
    </section>
  );
}
