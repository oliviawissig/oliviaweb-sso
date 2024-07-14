"use client";
import { Article } from "@/app/api/articles/route";
import OWButton from "@/app/components/OWButton";
import OWProgress from "@/app/components/OWProgress";
import handleBEDCallback from "@/app/components/SSOhandler";
import { auth } from "@/app/firebase/config";
import { Box } from "@mui/material";
import { Conversation, OpenWebProvider } from "@open-web/react-sdk";
import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import OWLink from "@/app/components/OWLink";
import { Parser } from "html-to-react";

export default function ArticlePost({ params }: { params: { slug: string } }) {
  const [article, setArticle] = useState<Article>({
    id: "",
    content: "",
    author: "",
    published: "",
    title: "",
  });
  const [count, setCount] = useState("");
  const [allLoading, setLoading] = useState(true);
  const router = useRouter();
  const [owReady, setOwReady] = useState(true);
  const htmlParser = Parser();

  const handleLogin = () => {
    router.push("/signin");
  };

  const handleSignUp = () => {
    router.push("/register");
  };

  const handleAnchor = () => {
    var element = document.getElementById("olivias-convo");
    element!.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const foo = async () => {
      setLoading(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/articles/${params.slug}`
      );

      if (response.ok) {
        const tempArticle = await response.json();
        setArticle(tempArticle);
      }
      setLoading(false);
    };
    foo();

    fetch(
      "https://open-api.spot.im/v1/messages-count?spot_id=sp_BWykFJiw&posts_ids=index"
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setCount(data.messages_count.index);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  if (allLoading) {
    return (
      <div className="loading-component">
        <OWProgress />
      </div>
    );
  }

  return (
    <OpenWebProvider
      spotId="sp_BWykFJiw"
      authentication={{
        userId: auth.currentUser?.uid,
        performBEDHandshakeCallback: async (codeA: string) => {
          setOwReady(false);
          const userId = auth.currentUser?.uid || "";
          const BEDcallback = await handleBEDCallback(codeA, userId);
          setOwReady(true);
          return BEDcallback;
        },
      }}
      tracking={{
        ["spot-im-login-start"]: (event) => {
          handleLogin();
        },
        ["spot-im-signup-start"]: (event) => {
          handleSignUp();
        },
        ["spot-im-user-logout"]: (event) => {
          signOut(auth);
          sessionStorage.removeItem("user");
        },
      }}
    >
      <div className="mb-5">
        <OWLink href="/articles">
          <ArrowBackIcon /> Back to articles list
        </OWLink>
      </div>
      <h1>{article.title}</h1>
      <Box
        display={"flex"}
        flexDirection={"row"}
        width={"100%"}
        justifyContent={"space-between"}
        marginBottom={2}
        alignItems={"baseline"}
      >
        <h2 className="italic">by {article.author}</h2>
        <OWButton onClick={() => handleAnchor()}>{count} Comments</OWButton>
        {/* {count} Comments */}
      </Box>
      {htmlParser.parse(article.content)}

      <div id="olivias-convo" className="pb-28">
        <Conversation
          postId={`${article.id}`}
          postUrl={`http://oliviaweb.oliviawissig.com/articles/${article.id}`}
        />
      </div>
    </OpenWebProvider>
  );
}
