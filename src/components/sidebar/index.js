import React, { memo } from "react";
import { useMediaQuery } from "react-responsive";
import useUser from "../../hooks/use-user";
import Suggestions from "./suggestions";

export default function Sidebar() {
  const {
    user: { userId, following, docId },
  } = useUser();

  const isMobile = useMediaQuery({ maxWidth: "934px" });

  return (
    <div className="font-fontbasic z-0">
      {/* <User username={username} fullName={fullName} /> */}
      {isMobile ? null : (
        <Suggestions
          userId={userId}
          following={following}
          loggedInUserDocId={docId}
        />
      )}
    </div>
  );
}
