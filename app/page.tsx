import Header from "@/components/site/header";
import Hero from "@/components/site/hero";
import Winners from "@/components/site/winners";
import About from "@/components/site/about";
import Prizes from "@/components/site/prizes";
import Rounds from "@/components/site/rounds";
import Workshop from "@/components/site/workshop";
import Speakers from "@/components/site/speakers";
import Testimonials from "@/components/site/testimonials";
import Sponsors from "@/components/site/sponsors";
import Footer, { RegisterCTA } from "@/components/site/footer";
import { Experience } from "@/components/site/motion";
import Ambient from "@/components/site/ambient";
import { RegistrationProvider } from "@/components/site/registration";

export default function Home() {
  return <Experience><RegistrationProvider><Ambient /><a className="skip-link" href="#main">Skip to content</a><Header /><main id="main"><Hero /><Winners /><About /><Prizes /><Rounds /><Workshop /><Speakers /><Testimonials /><Sponsors /><RegisterCTA /></main><Footer /></RegistrationProvider></Experience>;
}
