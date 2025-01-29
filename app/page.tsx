import { CardHoverEffectDemo } from "@/custom_components/features/CardHoverEffectDemo";
import { FloatingNavDemo } from "@/custom_components/landingpage/FloatingNavDemo";
import Footersection from "@/custom_components/footersection/Footersection";
import { HeroScrollDemo } from "@/custom_components/scroll/HeroScrollDemo";
import { MYspotlight } from "@/components/ui/Spotlight";
import { InfiniteMovingCardsDemo } from "@/custom_components/testimonials/InfiniteMovingCardsDemo";

export default function Home() {
  return (
    <>
      <section id="home" className="max-sm:h-[100vh] max-sm:overflow-hidden relative  w-full  overflow-hidden">
        <div className="w-full h-full  bg-neutral-900 dark:bg-dot-white/[0.2] bg-dot-black/[0.2] relative">
        <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
        <MYspotlight />
        <FloatingNavDemo />
        <HeroScrollDemo />
        </div>
      </section>
     <div>

      <div id="more" className="w-full h-auto flex justify-center items-center overflow-hidden">
        <h1 className="lg:text-[3.2rem] md:text-[2.3rem] sm:text-[2rem] max-sm:text-[1rem]">
          Features That Created To Enhace Your Learnign
        </h1>
      </div>

      <CardHoverEffectDemo />


      <div className="w-full h-auto flex-col dark:bg-grid-white/[0.2] bg-grid-black/[0.2] flex justify-center items-center overflow-hidden relative">
      <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_1%,black)]"></div>
        <h1 className="lg:text-[3.3rem] md:text-[2.3rem] max-sm:text-[1.3rem]">
          Loved by devlepors and Learners
        </h1>
        <span className="text-neutral-400">
          CodCrew empowers web developers
        </span>
        <span className="text-neutral-400">turning beginners into pros</span>
      </div>
     </div>
      <InfiniteMovingCardsDemo />

     
    <div id="contact">
    <Footersection />
    </div>
    </>
  );
}
