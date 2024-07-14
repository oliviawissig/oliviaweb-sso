import Link from "next/link";
import { ReactNode } from "react";
import { Url } from "url";

interface OWLinkProps {
  href: string;
  children: ReactNode;
  className?: string;
  
}
export default function OWLink({ href, children, className }: OWLinkProps) {
  return (
    <Link href={href} className={`underline text-[#9671AE] ${className}`} color="secondary">
      {children}
    </Link>
  );
}
