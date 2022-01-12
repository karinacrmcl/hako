import ArticleContent from "../components/posts-content/article";
import BookContent from "../components/posts-content/book";
import DiscussionContent from "../components/posts-content/discussion";
import NewsContent from "../components/posts-content/news";
import PhotographyContent from "../components/posts-content/photography";

export function getContent(content) {
  switch (content.type) {
    case "article":
      return <ArticleContent object={content} key={content.id} />;
    case "book":
      return <BookContent object={content} key={content.id} />;
    case "news":
      return <NewsContent object={content} key={content.id} />;
    case "discussion":
      return <DiscussionContent object={content} key={content.id} />;
    case "photography":
      return <PhotographyContent object={content} key={content.id} />;
    default:
      return null;
  }
}
