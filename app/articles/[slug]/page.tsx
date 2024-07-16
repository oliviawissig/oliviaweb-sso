"use client";
import { Article } from "@/app/api/articles/route";
import OWButton from "@/app/components/OWButton";
import OWProgress from "@/app/components/OWProgress";
import handleBEDCallback from "@/app/components/SSOhandler";
import { auth } from "@/app/firebase/config";
import { Box, Chip } from "@mui/material";
import { Conversation, OpenWebProvider } from "@open-web/react-sdk";
import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import OWLink from "@/app/components/OWLink";
import { Parser } from "html-to-react";
import { useAuthState } from "react-firebase-hooks/auth";
import { AutoAwesome } from "@mui/icons-material";

type Props = {
  params: { slug: string };
};

export default function ArticlePost({ params }: Props) {
  const [article, setArticle] = useState<Article>({
    id: "",
    content: "",
    author: "",
    published: "",
    title: "",
    keywords: [],
    image_url: "",
  });
  const [count, setCount] = useState("");
  const [allLoading, setLoading] = useState(true);
  const router = useRouter();
  const [owReady, setOwReady] = useState(true);
  const htmlParser = Parser();
  const [user] = useAuthState(auth);

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
  }, []);

  useEffect(() => {
    const foo2 = async () => {
      const post_id = article.id;
      fetch(
        `https://open-api.spot.im/v1/messages-count?spot_id=sp_BWykFJiw&posts_ids=${post_id}`,
        {
          cache: "no-store",
        }
      )
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          setCount(data.messages_count[post_id]);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    foo2();
  }, [article.id]);

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
        userId: user?.uid,
        performBEDHandshakeCallback: async (codeA: string) => {
          setOwReady(false);
          const userId = user?.uid || "";
          const BEDcallback = await handleBEDCallback(codeA, userId);
          setOwReady(true);
          return BEDcallback;
        },
      }}
      tracking={{
        ["spot-im-login-start"]: () => {
          handleLogin();
        },
        ["spot-im-signup-start"]: () => {
          handleSignUp();
        },
        ["spot-im-user-logout"]: () => {
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
      </Box>
      {htmlParser.parse(article.content)}

      <Chip
        icon={<AutoAwesome />}
        label='This article title & body were generated with ChatGPT. Based on the author that is inspired by the show "The X Files".'
        variant="outlined"
        color="primary"
      />

      {user &&
        (owReady ? (
          <div id="olivias-convo" className="pb-28">
            <Conversation
              postId={`${article.id}`}
              postUrl={`http://oliviaweb.oliviawissig.com/articles/${article.id}`}
            />
          </div>
        ) : (
          <div className="flex flex row justify-center">
            <OWProgress />
          </div>
        ))}
      {!user &&
        (owReady ? (
          <div id="olivias-convo" className="pb-28">
            <Conversation
              postId={`${article.id}`}
              postUrl={`http://oliviaweb.oliviawissig.com/articles/${article.id}`}
            />
          </div>
        ) : (
          <div className="flex flex row justify-center">
            <OWProgress />
          </div>
        ))}
    </OpenWebProvider>
  );
}
