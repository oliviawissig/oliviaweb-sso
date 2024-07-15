import Link from "next/link";
import "@/app/globals.css";
import OWLink from "./components/OWLink";

export default function Home() {
  return (
    <>
      <h1 className="text-center">OliviaWeb</h1>
      <div className="pb-8">
        <p>
          Hello World! This is a site that is meant to showcase an OpenWeb SSO
          experience.
        </p>
        <OWLink href="/articles">Articles</OWLink>
      </div>

      {/* <div>
        <p>
          You can also check out a nonSSO version of this site below. 
        </p>
        <OWLink href="https://www.spotim.name/Olivia/OliviaWeb/index.html">OliviaWeb nonSSO</OWLink>
      </div> */}
    </>
  );
}
