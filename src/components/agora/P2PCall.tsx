"use client";
import { useAuth } from "@/context/AuthState";
import { requestType, UserType } from "@/utils";
import { db } from "@/utils/firebase";
import AgoraRTC, {
  AgoraRTCProvider,
  LocalUser,
  LocalVideoTrack,
  RemoteUser,
  useJoin,
  useLocalCameraTrack,
  useLocalMicrophoneTrack,
  usePublish,
  useRTCClient,
  useRemoteAudioTracks,
  useRemoteUsers,
} from "agora-rtc-react";
import { doc, onSnapshot, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";

function P2PCall(props: { appId: string; channelName: string }) {
  const client = useRTCClient(
    AgoraRTC.createClient({ codec: "vp8", mode: "rtc" })
  );

  const [cameraOn, setCameraOn] = useState(true);
  const [micOn, setMicOn] = useState(true);

  const { currentUser, setCurrentUser } = useAuth();
  const handleHangUp = async () => {
    if (!currentUser || !currentUser.call) return;
    const senderId = currentUser.call.requestFrom!;
    const recvId = currentUser.call.requestTo!;
    const senderRef = doc(db, "users", senderId);
    const recvRef = doc(db, "users", recvId);

    try {
      updateDoc(recvRef, {
        request: null,
      });
      updateDoc(senderRef, {
        request: {
          status: "hangup",
        },
      });
    } catch (error) {
      throw error;
    } finally {
      setCameraOn(false);
      setMicOn(false);
      client.leave();
      client.stopProxyServer();
      setCurrentUser((prev: UserType) => ({
        ...prev,
        onCall: false,
        call: null,
      }));
    }
  };

  const unsub = async () => {
    const chatRef = doc(db, "users", currentUser.uid);
    try {
      onSnapshot(doc(db, "users", currentUser.uid), (doc) => {
        if (doc.exists()) {
          const request = doc.data().request as requestType;
          if (request && request.status == "hangup") {
            client.leave();
            updateDoc(chatRef, {
              request: null,
            });
            setCurrentUser((prev: UserType) => ({
              ...prev,
              onCall: false,
              call: null,
            }));
          }
        }
      });
    } catch (error) {
      return error;
    }
  };

  useEffect(() => {
    unsub();
  }, [currentUser.onCall]);

  return (
    <AgoraRTCProvider client={client}>
      <div className="w-[320px] lg:w-[350px] h-[500px] max-w-full rounded-lg relative overflow-hidden">
        <Videos
          channelName={props.channelName}
          AppID={props.appId}
          camera={cameraOn}
          mic={micOn}
        />
        <div className="absolute z-10 bottom-0 left-0 right-0 items-center flex gap-x-1 justify-start pl-4 pb-4">
          {/* <a
            className="px-5 py-3 text-base font-medium text-center text-white bg-red-400 rounded-lg hover:bg-red-500 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900 w-40"
            href="/"
          >
            End Call
          </a> */}
          <button
            className={`w-[32px] h-[32px] p-2 rounded-full border border-white ${
              cameraOn ? "bg-white text-black" : "bg-black text-white"
            }`}
            onClick={() => setCameraOn((a) => !a)}
          >
            <i className="fi fi-sr-camera" />
          </button>
          <button
            className={`w-[32px] h-[32px] rounded-full border border-black ${
              micOn ? "bg-white text-black" : "bg-black text-white"
            }`}
            onClick={() => setMicOn((a) => !a)}
          >
            <i className="fi fi-sr-microphone" />
          </button>
          <button
            onClick={handleHangUp}
            className="w-[32px] h-[32px] text-base font-medium text-center text-white bg-red-400 rounded-lg hover:bg-red-500 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900"
          >
            <i className="fi fi-sr-phone-call" />
          </button>
        </div>
      </div>
    </AgoraRTCProvider>
  );
}

function Videos(props: {
  channelName: string;
  AppID: string;
  camera: boolean;
  mic: boolean;
}) {
  const { AppID, channelName } = props;
  const { isLoading: isLoadingMic, localMicrophoneTrack } =
    useLocalMicrophoneTrack();
  const { isLoading: isLoadingCam, localCameraTrack } = useLocalCameraTrack();
  const remoteUsers = useRemoteUsers();
  const { audioTracks } = useRemoteAudioTracks(remoteUsers);

  usePublish([localMicrophoneTrack, localCameraTrack]);
  useJoin({
    appid: AppID,
    channel: channelName,
    token: null,
  });

  audioTracks.map((track) => track.play());
  const deviceLoading = isLoadingMic || isLoadingCam;
  if (deviceLoading)
    return (
      <div className="flex flex-col items-center pt-40">Loading devices...</div>
    );
  const unit = "minmax(0, 1fr) ";

  return (
    // <div className="flex flex-col justify-between w-full h-screen p-1">
    <div
      className={`w-full h-full relative`}
      // style={{
      //   gridTemplateColumns:
      //     remoteUsers.length > 9
      //       ? unit.repeat(4)
      //       : remoteUsers.length > 4
      //       ? unit.repeat(3)
      //       : remoteUsers.length > 1
      //       ? unit.repeat(2)
      //       : unit,
      // }}
    >
      <div className="w-[100px] h-[100px] absolute bottom-4 right-4 z-50">
        {/* <LocalVideoTrack
          track={localCameraTrack}
          play={true}
          className="w-full h-full"
        /> */}
        <LocalUser
          audioTrack={localMicrophoneTrack}
          videoTrack={localCameraTrack}
          cameraOn={props.camera}
          micOn={props.mic}
          playVideo={props.camera}
          playAudio={props.mic}
          className="w-full h-full"
        />
      </div>
      {remoteUsers.map((user) => (
        <RemoteUser key={user.uid} user={user} />
      ))}
    </div>
    // {/* </div> */}
  );
}

export default P2PCall;
