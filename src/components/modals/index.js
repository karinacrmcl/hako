import React, { Fragment } from "react";
import { useModal } from "../../context/modal-context";
import useAuthListener from "../../hooks/use-auth-listener";

import Settings from "../settings";
import AddPhotoModal from "../add-posts/photography";
import AddArticleModal from "../add-posts/article";
import AddNewsModal from "../add-posts/news";
import AddBookModal from "../add-posts/book";
import AddDiscussionModal from "../add-posts/discussion";
import UserProfileSettingsMobile from "../settings/mobile/user-profile";
import CustomizationSettingsMobile from "../settings/mobile/customization";
import CategoriesMobile from "../menu/categories-mobile";

export default function Modals() {
  const { openModal } = useModal();
  const { user } = useAuthListener();

  const modalList = [
    { key: "modalSettings", component: <Settings user={user} /> },
    { key: "modalAddArticle", component: <AddArticleModal user={user} /> },
    { key: "modalAddNews", component: <AddNewsModal user={user} /> },
    { key: "modalAddBook", component: <AddBookModal user={user} /> },
    { key: "modalAddPhoto", component: <AddPhotoModal user={user} /> },
    {
      key: "modalAddDiscussion",
      component: <AddDiscussionModal user={user} />,
    },
    {
      key: "categoriesMobile",
      component: <CategoriesMobile isOpen={true} />,
    },
    {
      key: "settingsUserProfileMobile",
      component: <UserProfileSettingsMobile />,
    },
    {
      key: "settingsCustomizationMobile",
      component: <CustomizationSettingsMobile />,
    },
  ];

  return (
    <div>
      {modalList.map(
        (item) =>
          openModal[item.key] && (
            <Fragment key={item.key}>{item.component}</Fragment>
          )
      )}
    </div>
  );
}
