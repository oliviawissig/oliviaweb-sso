import Link from "next/link";
import '@/app/globals.css';
import OWLink from "./components/OWLink";

export default function Home() {
  return (
    <>
      <div>
        <h1 className="text-center">OliviaWeb</h1>
        <p>
          Hello World! This is a site that is meant to showcase an OpenWeb SSO
          experience.
        </p>
      </div>
      <OWLink href="/articles">Articles</OWLink>
    </>
  );
}
