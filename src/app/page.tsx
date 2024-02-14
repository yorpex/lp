import { BgLight } from "@/components/bg-light";
import { Contact } from "@/components/contact";
import MaxWidthWrapper from "@/components/max-width-wrapper";

export default async function Home() {
  return (
    <>
      <BgLight />
      <MaxWidthWrapper className="flex min-h-screen flex-col items-center justify-center">
        <header className="absolute left-0 top-6 flex w-full items-center justify-center md:left-12 md:top-6 md:w-auto">
          <h1 className="text-2xl font-bold">yorpex.</h1>
        </header>
        <main className="flex flex-col items-center justify-center space-y-12">
          <h1 className="text-center text-6xl font-bold sm:text-left sm:text-8xl">
            re
            <span className="bg-gradient-to-r from-rose-500 to-rose-200 bg-clip-text text-transparent">
              think
            </span>{" "}
            your
            <br />
            business
          </h1>
          <div className="relative flex flex-col items-center justify-center">
            <Contact />
          </div>
        </main>
      </MaxWidthWrapper>
    </>
  );
}
