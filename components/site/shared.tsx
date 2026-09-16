import { RegistrationTrigger } from "./registration";

export function RegisterLink({ className = "", label = "Register now" }: { className?: string; label?: string; }) {
  return <RegistrationTrigger className={className} label={label} />;
}

export function SectionLabel({ children }: { children: React.ReactNode; }) {
  return <p className="section-label"><span className="label-line" aria-hidden="true" />{children}</p>;
}
