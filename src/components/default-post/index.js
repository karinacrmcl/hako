import PostPhotography from "../post-types/post-photography";
import PostArticle from "../post-types/post-article";
import PostNews from "../post-types/post-news";
import PostBook from "../post-types/post-book";
import PostDiscussion from "../post-types/post-discussion";
import { getPostArticlesCollection } from "../../services/firebase";
import Skeleton from "react-loading-skeleton";

export default function PostExamples() {
  return (
    <div className="flex flex-col items-center">
      {/* <PostPhotography src="https://cdn.discordapp.com/attachments/846133419539955722/885626907520016485/image0.jpg" />
      <PostPhotography src="https://cdn.discordapp.com/attachments/846133419539955722/885626907935256586/image1.jpg" />
      <PostPhotography src="https://cdn.discordapp.com/attachments/846133419539955722/885626908535054416/image2.jpg" />
      <PostPhotography src="https://cdn.discordapp.com/attachments/846133419539955722/884834547865374780/image0.jpg" />
      <PostPhotography src="https://cdn.discordapp.com/attachments/846133419539955722/885626909315178496/image3.jpg" />
      <PostPhotography src="https://cdn.discordapp.com/attachments/846133419539955722/885625019198242837/image1.jpg" />
      <PostPhotography src="https://cdn.discordapp.com/attachments/846133419539955722/885610473553289226/image0.jpg" />
      <PostPhotography src="https://cdn.discordapp.com/attachments/846133419539955722/885625577623670814/image0.jpg" />
      <PostPhotography src="https://cdn.discordapp.com/attachments/846133419539955722/885625479032348702/image0.jpg" />
      <PostPhotography src="https://cdn.discordapp.com/attachments/846133419539955722/885625312241668135/image0.jpg" />
      <PostPhotography src="https://cdn.discordapp.com/attachments/846133419539955722/885625132083736636/image0.jpg" />
      <PostPhotography src="https://cdn.discordapp.com/attachments/846133419539955722/885625019558944798/image2.jpg" /> */}
      {/* {postArticles.length > 0 ? (
        postArticles.map((post) => {
          return <PostArticle object={post} />;
        })
      ) : (
        <Skeleton width={50} height={50} />
      )} */}

      {/* {postArticles === undefined ? (
        <>
          <Skeleton count={4} width={640} height={500} className="mb-5" />
        </>
      ) : postArticles ? (
        postArticles.map((post) => <PostArticle object={post} />)
      ) : (
        <p className="text-center text-2xl">
          Follow people to see at least something bastard
        </p>
      )} */}

      <PostNews />
      <PostBook />
      <PostDiscussion />
    </div>
  );
}
