import { useRef } from "react";
import PropTypes from "prop-types";
import Header from "./header";
import Image from "./image";
import Actions from "./actions";
import Footer from "./footer";
import Comments from "./comments";

export default function Post({ content }) {
  const commentInput = useRef(null);
  const handleFocus = () => commentInput.current.focus();
  return (
    <div
      className="font-fontbasic relative bg-white w-post lptpXS:mb-8 lptpXL:w-postMd lptpXS:w-postSm rounded-lg shadow-xl mb-14 mobileXL:shadow-none mobileXL:w-full "
      key={object.key}
    >
      <Header object={object} />
      {isHot ? <Hot /> : null}

      <Image src={content.imageSrc} caption={content.caption} />
      <Actions
        object={object}
        publicationDocId={object.docId}
        likedPublication={object.userLikedPublication}
        pinnedPublication={object.userPinnedPublication}
      />
    </div>
  );
}

Post.propTypes = {
  content: PropTypes.shape({
    username: PropTypes.string.isRequired,
    imageSrc: PropTypes.string.isRequired,
    caption: PropTypes.string.isRequired,
    docId: PropTypes.string.isRequired,
    userLikedPhoto: PropTypes.bool.isRequired,
    likes: PropTypes.array.isRequired,
    comments: PropTypes.array.isRequired,
    dateCreated: PropTypes.number.isRequired,
  }),
};
