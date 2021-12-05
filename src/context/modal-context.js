import { createContext } from "react";

export const ModalContext = createContext({
  setOpenModal: () => null,
  openModal: {
    modalSettings: false,
    settingsUserProfileMobile: false,
    settingsCustomizationMobile: true,
    settingsPrivacyMobile: false,
    settingsHelpMobile: false,
    settingsAboutMobile: false,
    modalAddArticle: false,
    modalAddNews: false,
    modalAddPhoto: false,
    modalAddDiscussion: false,
    modalAddBook: false,
    modalPinned: false,
    categoriesMobile: false,
  },
});
