"use client";
import { useEffect, useState } from "react";
import OWLink from "../components/OWLink";
import { Article } from "../api/articles/route";

export default function Articles() {
  const [articles, setArticles] = useState<Article[]>([]);

  useEffect(() => {
    const foo = async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/articles`
      );

      if (response.ok) {
        const tempArticles = await response.json();
        setArticles(tempArticles);
      }
    };
    foo();
  }, []);

  return (
    <>
      {articles.map((a) => {
        return (
          <div>
            <OWLink className="capitalize" href={`/articles/${a.id}`}>
              {a.id}
            </OWLink>
            <h2 className="italic">by {a.author}</h2>
          </div>
        );
      })}
    </>
  );
}
