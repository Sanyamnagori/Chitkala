import Image from "next/image";

export function ShowreelSection() {
  return (
    <section
      id="showreel"
      className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-section-gray"
    >
      {/* 
        Full Screen Video Setup
        Replace the 'src' below with the actual video file once available.
        Place the video file in the 'public/videos' folder.
      */}
      <video
        className="absolute inset-0 h-full w-full object-cover"
        autoPlay
        loop
        muted
        playsInline
        poster="/images/video-placeholder-bg.jpg"
      >
        <source src="/videos/showreel.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Optional: Add an overlay or centered text/play button if needed later */}
      <div className="relative z-10 flex flex-col items-center justify-center text-white mix-blend-difference">
        {/* <h2 className="text-4xl font-bold">Showreel</h2> */}
      </div>
    </section>
  );
}
