// import { firebase, FieldValue, arrayUnion, arrayRemove } from "../lib/firebase";

// export async function doesUsernameExist(username) {
//   const result = await firebase.firestore
//     .collection("users")
//     .where("username", "==", username)
//     .get();

//   return result.docs.length > 0;
// }

// export async function getUserByUsername(username) {
//   const result = await firebase.firestore
//     .collection("users")
//     .where("username", "==", username)
//     .get();

//   return result.docs.map((item) => ({
//     ...item.data(),
//     docId: item.id,
//   }));
// }

// export async function getUserByUserId(userId) {
//   console.log("where", firebase.firestore.collection("users").where);
//   const result = await firebase.firestore
//     .collection("users")
//     .where("userId", "==", userId)
//     .get();

//   const user = result.docs.map((item) => ({
//     ...item.data(),
//     docId: item.id,
//   }));

//   return user;
// }

// export async function getSuggestedProfiles(userId, following) {
//   const result = await firebase.firestore.collection("users").limit(10).get();
//   return result.docs
//     .map((user) => ({
//       ...user.data(),
//       docId: user.id,
//     }))
//     .filter(
//       (profile) =>
//         profile.userId !== userId && !following.includes(profile.userId)
//     );
// }

// export async function updateLoggedInUserFollowing(
//   loggedInUserDocId,
//   profileId,
//   isFollowingProfile
// ) {
//   return firebase.firestore
//     .collection("users")
//     .doc(loggedInUserDocId)
//     .update({
//       following: isFollowingProfile
//         ? FieldValue.arrayRemove(profileId)
//         : FieldValue.arrayUnion(profileId),
//     });
// }

// export async function updateFollowedUserFollowers(
//   profileDocId,
//   loggedInUserDocId,
//   isFollowingProfile
// ) {
//   return firebase.firestore
//     .collection("users")
//     .doc(profileDocId)
//     .update({
//       followers: isFollowingProfile
//         ? FieldValue.arrayRemove(loggedInUserDocId)
//         : FieldValue.arrayUnion(loggedInUserDocId),
//     });
// }

// export async function isUserFollowingProfile(
//   loggedInUserUsername,
//   profileUserId
// ) {
//   const result = await firebase.firestore
//     .collection("users")
//     .where("username", "==", loggedInUserUsername) // karl (active logged in user)
//     .where("following", "array-contains", profileUserId)
//     .get();

//   const [response = {}] = result.docs.map((item) => ({
//     ...item.data(),
//     docId: item.id,
//   }));

//   return response.userId;
// }

// export async function toggleFollow(
//   isFollowingProfile,
//   activeUserDocId,
//   profileDocId,
//   profileUserId,
//   followingUserId
// ) {
//   await updateLoggedInUserFollowing(
//     activeUserDocId,
//     profileUserId,
//     isFollowingProfile
//   );
//   await updateFollowedUserFollowers(
//     profileDocId,
//     followingUserId,
//     isFollowingProfile
//   );
// }

// //add an object which contains post data to the general array
// export async function addPublication(post) {
//   return firebase.firestore.collection("publications").add(post);
// }

// export async function updateProfiledata(profileDocId, userData) {
//   await firebase.firestore.collection("users").doc(profileDocId).update({
//     username: userData.username,
//     fullName: userData.fullName,
//     emailAdress: userData.emailAdress,
//     avatarUrl: userData.avatarUrl,
//   });
// }

// export async function getAllUsers() {
//   console.log(firebase.firestore.collection);

//   const array = await firebase.firestore.collection("users").get();

//   const result = array.docs.map((user) => ({
//     ...user.data(),
//   }));

//   return result;
// }

// export async function addAnswerToDiscussion(docId, answerObj) {
//   let content = answerObj.content;
//   let downVotes = answerObj.downVotes;
//   let upVotes = answerObj.upVotes;
//   let userAuthor = answerObj.userAuthor;
//   let id = answerObj.id;
//   return firebase.firestore
//     .collection("publications")
//     .doc(docId)
//     .update({
//       answers: FieldValue.arrayUnion({
//         content,
//         downVotes,
//         upVotes,
//         userAuthor,
//         id,
//       }),
//     });
// }
// export async function getPublications(userId, following) {
//   const publicationsFrom = [...following, userId];

//   const result = await firebase.firestore
//     .collection("publications")
//     .where("userId", "in", publicationsFrom)
//     .get();

//   const userFollowedPublications = result.docs.map((publication) => ({
//     ...publication.data(),
//     docId: publication.id,
//   }));

//   const publicationsWithUserDetails = await Promise.all(
//     userFollowedPublications.map(async (publication) => {
//       let currentUser = await getUserByUserId(userId);
//       let userLikedPublication = false;
//       if (currentUser[0].likedPublications.includes(publication.docId)) {
//         userLikedPublication = true;
//       }
//       let userPinnedPublication = false;
//       if (currentUser[0].pinnedPublications.includes(publication.id)) {
//         userPinnedPublication = true;
//       }
//       const user = await getUserByUserId(publication.userId);
//       const { username } = user[0];
//       return {
//         username,
//         ...publication,
//         userLikedPublication,
//         userPinnedPublication,
//       };
//     })
//   );

//   return publicationsWithUserDetails;
// }

// export async function getUserPublicationsByUsername(username, userId) {
//   const [user] = await getUserByUsername(username);
//   const result = await firebase.firestore
//     .collection("publications")
//     .where("userId", "==", user?.userId)
//     .get();

//   const userProfilePublications = result.docs.map((publication) => ({
//     ...publication.data(),
//     docId: publication.id,
//   }));

//   const publicationsWithUserDetails = await Promise.all(
//     userProfilePublications.map(async (publication) => {
//       let currentUser = await getUserByUserId(userId);
//       let userLikedPublication = false;
//       if (currentUser[0].likedPublications.includes(publication.docId)) {
//         userLikedPublication = true;
//       }
//       let userPinnedPublication = false;
//       if (currentUser[0].pinnedPublications.includes(publication.id)) {
//         userPinnedPublication = true;
//       }
//       const user = await getUserByUserId(publication.userId);
//       const { username } = user[0];
//       return {
//         username,
//         ...publication,
//         userLikedPublication,
//         userPinnedPublication,
//       };
//     })
//   );

//   return publicationsWithUserDetails;
// }

// export async function getPinnedPublications(publicationDocId, userId) {
//   const result = await Promise.all(
//     publicationDocId.map(async (id) => {
//       const result = await firebase.firestore
//         .collection("publications")
//         .where("id", "==", id)
//         .get();
//       return result;
//     })
//   );

//   const userPinnedPublications = result.map((publication) => {
//     return publication.docs.map((publication) => {
//       return {
//         ...publication.data(),
//         docId: publication.id,
//       };
//     });
//   });

//   const publicationsWithUserDetails = await Promise.all(
//     userPinnedPublications.map(async (publication) => {
//       let currentUser = await getUserByUserId(userId);
//       let userLikedPublication = false;
//       if (currentUser[0].likedPublications.includes(publication[0].docId)) {
//         userLikedPublication = true;
//       }
//       let userPinnedPublication = false;
//       if (currentUser[0].pinnedPublications.includes(publication[0].id)) {
//         userPinnedPublication = true;
//       }
//       return {
//         ...publication[0],
//         userLikedPublication,
//         userPinnedPublication,
//       };
//     })
//   );

//   return publicationsWithUserDetails;
// }

// export async function toggleVote(
//   object,
//   item,
//   answerId,
//   voteValue,
//   currentUserId
// ) {
//   const result = await firebase.firestore
//     .collection("publications")
//     .doc(object.docId)

//     .update({
//       answers: FieldValue.arrayRemove(item),
//     })
//     .get();
//   return result;
// }

import { firebase, FieldValue, arrayUnion, arrayRemove } from "../lib/firebase";

export async function doesUsernameExist(username) {
  const result = await firebase
    .firestore()
    .collection("users")
    .where("username", "==", username)
    .get();

  return result.docs.length > 0;
}

export async function getUserByUsername(username) {
  const result = await firebase
    .firestore()
    .collection("users")
    .where("username", "==", username)
    .get();

  return result.docs.map((item) => ({
    ...item.data(),
    docId: item.id,
  }));
}

export async function getUserByUserId(userId) {
  const result = await firebase
    .firestore()
    .collection("users")
    .where("userId", "==", userId)
    .get();

  const user = result.docs.map((item) => ({
    ...item.data(),
    docId: item.id,
  }));

  return user;
}

export async function getSuggestedProfiles(userId, following) {
  const result = await firebase.firestore().collection("users").limit(10).get();
  return result.docs
    .map((user) => ({
      ...user.data(),
      docId: user.id,
    }))
    .filter(
      (profile) =>
        profile.userId !== userId && !following.includes(profile.userId)
    );
}

export async function updateLoggedInUserFollowing(
  loggedInUserDocId,
  profileId,
  isFollowingProfile
) {
  return firebase
    .firestore()
    .collection("users")
    .doc(loggedInUserDocId)
    .update({
      following: isFollowingProfile
        ? FieldValue.arrayRemove(profileId)
        : FieldValue.arrayUnion(profileId),
    });
}

export async function updateFollowedUserFollowers(
  profileDocId,
  loggedInUserDocId,
  isFollowingProfile
) {
  return firebase
    .firestore()
    .collection("users")
    .doc(profileDocId)
    .update({
      followers: isFollowingProfile
        ? FieldValue.arrayRemove(loggedInUserDocId)
        : FieldValue.arrayUnion(loggedInUserDocId),
    });
}

export async function isUserFollowingProfile(
  loggedInUserUsername,
  profileUserId
) {
  const result = await firebase
    .firestore()
    .collection("users")
    .where("username", "==", loggedInUserUsername) // karl (active logged in user)
    .where("following", "array-contains", profileUserId)
    .get();

  const [response = {}] = result.docs.map((item) => ({
    ...item.data(),
    docId: item.id,
  }));

  return response.userId;
}

export async function toggleFollow(
  isFollowingProfile,
  activeUserDocId,
  profileDocId,
  profileUserId,
  followingUserId
) {
  await updateLoggedInUserFollowing(
    activeUserDocId,
    profileUserId,
    isFollowingProfile
  );
  await updateFollowedUserFollowers(
    profileDocId,
    followingUserId,
    isFollowingProfile
  );
}

//add an object which contains post data to the general array
export async function addPublication(post) {
  return firebase.firestore().collection("publications").add(post);
}

export async function getUserPublicationsByUsername(username, userId) {
  const [user] = await getUserByUsername(username);
  const result = await firebase
    .firestore()
    .collection("publications")
    .where("userId", "==", user?.userId)
    .get();

  const userProfilePublications = result.docs.map((publication) => ({
    ...publication.data(),
    docId: publication.id,
  }));

  const publicationsWithUserDetails = await Promise.all(
    userProfilePublications.map(async (publication) => {
      let currentUser = await getUserByUserId(userId);
      let userLikedPublication = false;
      if (currentUser[0].likedPublications.includes(publication.docId)) {
        userLikedPublication = true;
      }
      let userPinnedPublication = false;
      if (currentUser[0].pinnedPublications.includes(publication.id)) {
        userPinnedPublication = true;
      }
      const user = await getUserByUserId(publication.userId);
      const { username } = user[0];
      return {
        username,
        ...publication,
        userLikedPublication,
        userPinnedPublication,
      };
    })
  );

  return publicationsWithUserDetails;
}

// //get all the publications with the user details (profile, id, full name)
export async function getPublications(userId, following) {
  const visibleFor = [...following, userId];

  const result = await firebase
    .firestore()
    .collection("publications")
    .where("userId", "in", visibleFor)
    .get();

  const userFollowedPublications = result.docs.map((publication) => ({
    ...publication.data(),
    docId: publication.id,
  }));

  const publicationsWithUserDetails = await Promise.all(
    userFollowedPublications.map(async (publication) => {
      let currentUser = await getUserByUserId(userId);
      let userLikedPublication = false;
      if (currentUser[0].likedPublications.includes(publication.docId)) {
        userLikedPublication = true;
      }
      let userPinnedPublication = false;
      if (currentUser[0].pinnedPublications.includes(publication.id)) {
        userPinnedPublication = true;
      }
      const user = await getUserByUserId(publication.userId);
      const { username } = user[0];
      return {
        username,
        ...publication,
        userLikedPublication,
        userPinnedPublication,
      };
    })
  );

  return publicationsWithUserDetails;
}

export async function updateProfiledata(profileDocId, userData) {
  await firebase.firestore().collection("users").doc(profileDocId).update({
    username: userData.username,
    fullName: userData.fullName,
    emailAdress: userData.emailAdress,
    avatarUrl: userData.avatarUrl,
  });
}

export async function getAllUsers() {
  const array = await firebase.firestore().collection("users").get();

  const result = array.docs.map((user) => ({
    ...user.data(),
  }));

  return result;
}

export async function addAnswerToDiscussion(docId, answerObj) {
  let content = answerObj.content;
  let downVotes = answerObj.downVotes;
  let upVotes = answerObj.upVotes;
  let userAuthor = answerObj.userAuthor;
  let id = answerObj.id;
  return firebase
    .firestore()
    .collection("publications")
    .doc(docId)
    .update({
      answers: FieldValue.arrayUnion({
        content,
        downVotes,
        upVotes,
        userAuthor,
        id,
      }),
    });
}

export async function getPinnedPublications(publicationDocId, userId) {
  const result = await Promise.all(
    publicationDocId.map(async (id) => {
      const result = await firebase
        .firestore()
        .collection("publications")
        .where("id", "==", id)
        .get();
      return result;
    })
  );

  const userPinnedPublications = result.map((publication) => {
    return publication.docs.map((publication) => {
      return {
        ...publication.data(),
        docId: publication.id,
      };
    });
  });

  const publicationsWithUserDetails = await Promise.all(
    userPinnedPublications.map(async (publication) => {
      let currentUser = await getUserByUserId(userId);
      let userLikedPublication = false;
      if (currentUser[0].likedPublications.includes(publication[0].docId)) {
        userLikedPublication = true;
      }
      let userPinnedPublication = false;
      if (currentUser[0].pinnedPublications.includes(publication[0].id)) {
        userPinnedPublication = true;
      }
      return {
        ...publication[0],
        userLikedPublication,
        userPinnedPublication,
      };
    })
  );

  return publicationsWithUserDetails;
}
