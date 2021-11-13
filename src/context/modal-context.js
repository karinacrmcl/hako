import { createContext } from "react";

export const ModalContext = createContext({
  setOpenModal: () => null,
  openModal: {
    modalSettings: false,
    modalAddArticle: false,
    modalAddNews: false,
    modalAddPhoto: false,
    modalAddDiscussion: false,
    modalAddBook: false,
    modalPinned: false,
  },
});
