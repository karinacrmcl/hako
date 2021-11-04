import { useRef } from "react";
import PropTypes from "prop-types";
import Header from "./header";
import Actions from "./actions";
import Hot from "./is-hot";

export default function PostLayout({ children, isHot, object }) {
  return (
    <div
      className="font-fontbasic relative bg-white w-post lptpXS:mb-8 lptpXL:w-postMd lptpXS:w-postSm rounded-lg shadow-xl mb-14 mobileXL:shadow-none mobileXL:w-full "
      key={object.key}
    >
      <Header object={object} />
      {isHot && <Hot />}
      {children}
      <Actions
        object={object}
        publicationDocId={object.docId}
        likedPublication={object.userLikedPublication}
        pinnedPublication={object.userPinnedPublication}
      />
    </div>
  );
}
