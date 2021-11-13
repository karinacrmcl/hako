import React, { memo } from "react";
import useUser from "../../hooks/use-user";
import Suggestions from "./suggestions";

export default function Sidebar() {
  const {
    user: { userId, following, docId },
  } = useUser();

  return (
    <div className=" font-fontbasic fixed right-64 top-32 z-0">
      {/* <User username={username} fullName={fullName} /> */}
      <Suggestions
        userId={userId}
        following={following}
        loggedInUserDocId={docId}
      />
    </div>
  );
}
