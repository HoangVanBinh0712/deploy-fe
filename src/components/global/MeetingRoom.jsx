import React, { useEffect, useState } from "react";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
const MeetingRoom = ({ roomId, setShowMeetingRoom, setMeetingRoomId, sendMessage }) => {
  const [logout, setLogout] = useState(false);
  const [showButton, setShowButton] = useState(true);
  const appID = 431373082;
  const serverSecret = "6222f11d1d566ddb8a7dde729cc2218b";

  const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(appID, serverSecret, roomId, Date.now().toString(), " ");

  const zc = ZegoUIKitPrebuilt.create(kitToken);
  useEffect(() => {
    console.log(logout);
    if (logout && zc) {
      zc.destroy();
      setShowMeetingRoom(false);
      setMeetingRoomId(null);
    }
  }, [logout]);

  const myMeeting = async (element) => {
    zc.joinRoom({
      container: element,
      sharedLinks: [
        {
          name: "Copy Link",
          url: `${process.env.REACT_APP_API_FE}/room/${roomId}`,
        },
      ],
      scenario: {
        mode: ZegoUIKitPrebuilt.OneONoneCall,
      },
      showScreenSharingButton: true,
      onLeaveRoom: () => {
        setShowButton(true);
      },
      onJoinRoom: () => {
        setShowButton(false);
      },
    });
  };
  return (
    <>
      <div className="meeting-room-wrapper">
        {showButton && (
          <div
            className="button meeting-close-button"
            onClick={() => {
              setLogout(true);
            }}
          >
            Close
          </div>
        )}
        <div ref={myMeeting} className="meeting-room"></div>
      </div>
    </>
  );
};
export default MeetingRoom;
