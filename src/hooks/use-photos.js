import { useState, useEffect, useContext } from "react";
import UserContext from "../context/user";
import { getPublications, getUserByUserId } from "../services/firebase";
export default function usePhotos() {
  const [publications, setPublications] = useState(null);
  const {
    user: { uid: userId = "" },
  } = useContext(UserContext);

  useEffect(() => {
    async function getTimelinePublications() {
      if (userId) {
        const [{ following }] = await getUserByUserId(userId);
        let followedUserPublications = [];

        followedUserPublications = await getPublications(userId, following);

        followedUserPublications.sort((a, b) => b.dateCreated - a.dateCreated);
        setPublications(followedUserPublications);
      }
    }
    getTimelinePublications();
  }, [userId]);

  return { publications };
}
