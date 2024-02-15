export function BgLight() {
  return (
    <div
      className={`pointer-events-none absolute inset-x-0 -z-10 min-h-screen w-full transform-gpu overflow-hidden blur-[128px]`}
    >
      <div
        className="absolute -left-[5%] aspect-square h-[42rem] bg-gradient-to-b from-rose-950 to-rose-400 opacity-80 transition-opacity duration-300"
        style={{
          clipPath:
            "polygon(91% 0, 100% 12%, 70% 18%, 26% 46%, 18% 89%, 0 72%, 18% 18%)",
        }}
      ></div>
      <div
        className="absolute -bottom-[5%] left-[80%] aspect-square h-[42rem] bg-gradient-to-b from-rose-950 to-rose-900 opacity-40 transition-opacity duration-300"
        style={{
          clipPath:
            "polygon(0 14%, 33% 0, 21% 26%, 43% 68%, 26% 100%, 5% 73%, 15% 59%)",
        }}
      ></div>
    </div>
  );
}
