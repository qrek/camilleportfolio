import Image from "next/image";

export function Hero() {
  return (
    <section className="relative w-full overflow-hidden px-5 sm:px-8 lg:px-20">
      {/* Blob 3D bleu (CAMLOGO 1) — flux diagonal débordant à droite, comme le design. */}
      <Image
        src="/hero-blob.png"
        alt=""
        aria-hidden
        priority
        width={1526}
        height={916}
        className="pointer-events-none absolute left-[32%] top-[-3%] h-auto w-[83%] max-w-none rotate-[15deg] select-none"
      />

      <div className="relative z-10 max-w-xl pt-[46vh]">
        <h1 className="font-serif text-[28px] font-normal italic leading-[0.88] text-black sm:text-[34px]">
          Camille Ameline
          <br />
          de Cadeville
        </h1>
        <p className="mt-6 max-w-md text-[16px] font-[450] leading-[1.3] text-black">
          Directrice artistique et motion designer, basée à Paris, spécialisée
          dans le développement d&apos;identités de marque et dans la création de
          contenus visuels et digitaux.
        </p>
      </div>
    </section>
  );
}
