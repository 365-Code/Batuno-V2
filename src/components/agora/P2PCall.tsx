"use client";
import { useAuth } from "@/context/AuthState";
import { requestType, UserType } from "@/utils";
import { db } from "@/utils/firebase";
import avatar from "@/assets/avatar.png";
import AgoraRTC, {
  AgoraRTCProvider,
  LocalUser,
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

  const { currentUser, setCurrentUser } = useAuth();

  const unsub = async () => {
    const chatRef = doc(db, "users", currentUser.uid);
    try {
      onSnapshot(doc(db, "users", currentUser.uid), async (doc) => {
        if (doc.exists()) {
          const request = doc.data().request as requestType;
          if (request && request.status == "hangup") {
            await client.leave();
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

  const handleHangUp = async () => {
    if (!currentUser || !currentUser.call) return;
    const senderId = currentUser.call.requestFrom!;
    const recvId = currentUser.call.requestTo!;
    const senderRef = doc(db, "users", senderId);
    const recvRef = doc(db, "users", recvId);

    try {
      updateDoc(senderRef, {
        request: {
          status: "hangup",
        },
      });
      updateDoc(recvRef, {
        request: {
          status: "hangup",
        },
      });
    } catch (error) {
      throw error;
    } finally {
      await client.leave();
      setCurrentUser((prev: UserType) => ({
        ...prev,
        onCall: false,
        call: null,
      }));
    }
  };

  return (
    <AgoraRTCProvider client={client}>
      <div className="w-[320px] lg:w-[350px] h-[500px] max-w-full rounded-lg relative overflow-hidden">
        <Videos
          channelName={props.channelName}
          AppID={props.appId}
          hangup={handleHangUp}
        />
      </div>
    </AgoraRTCProvider>
  );
}

function Videos({
  hangup,
  ...props
}: {
  channelName: string;
  AppID: string;
  hangup: () => void;
}) {
  const { currentUser, setCurrentUser } = useAuth();

  const [cameraOn, setCameraOn] = useState(
    currentUser.callMode == "video" ? true : false
  );
  const [micOn, setMicOn] = useState(true);

  const { AppID, channelName } = props;
  const { isLoading: isLoadingMic, localMicrophoneTrack } =
    useLocalMicrophoneTrack(micOn);
  const { isLoading: isLoadingCam, localCameraTrack } =
    useLocalCameraTrack(cameraOn);

  const remoteUsers = useRemoteUsers();
  const { audioTracks } = useRemoteAudioTracks(remoteUsers);

  usePublish([localMicrophoneTrack, localCameraTrack]);
  useJoin({
    appid: AppID,
    channel: channelName,
    token: null,
  });

  audioTracks.map((track) => track.play());

  const handleHangUp = async () => {
    // Stop local tracks
    localMicrophoneTrack?.stop();
    localCameraTrack?.stop();

    // Close local tracks
    localMicrophoneTrack?.close();
    localCameraTrack?.close();
    hangup();
    setCameraOn(false);
    setMicOn(false);
  };

  const unsub = async () => {
    const chatRef = doc(db, "users", currentUser.uid);
    try {
      onSnapshot(doc(db, "users", currentUser.uid), async (doc) => {
        if (doc.exists()) {
          const request = doc.data().request as requestType;
          if (request && request.status == "hangup") {
            // Stop local tracks
            localMicrophoneTrack?.stop();
            localCameraTrack?.stop();

            // Close local tracks
            localMicrophoneTrack?.close();
            localCameraTrack?.close();
            setCameraOn(false);
            setMicOn(false);
            await updateDoc(chatRef, {
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

  const deviceLoading = isLoadingMic || isLoadingCam;
  if (deviceLoading)
    return (
      <div className="flex flex-col items-center pt-40">Loading devices...</div>
    );

  return (
    <div className={`w-full h-full relative`}>
      <div className="w-[100px] h-[100px] absolute top-4 right-4 z-50 rounded-xl">
        {/* <LocalVideoTrack
          track={localCameraTrack}
          play={true}
          className="w-full h-full"
        /> */}
        <LocalUser
          audioTrack={localMicrophoneTrack}
          videoTrack={localCameraTrack}
          cameraOn={cameraOn}
          micOn={micOn}
          className="w-full h-full"
          cover={"/avatar.png"}
        />
      </div>

      {remoteUsers.map((user) => (
        <RemoteUser cover="/avatar.png" key={user.uid} user={user} />
      ))}

      {/* <div className="absolute z-10 bottom-0 left-0 right-0"> */}
      <div className="absolute z-10 bottom-0 left-0 right-0">
        {/* <a
            className="px-5 py-3 text-base font-medium text-center text-white bg-red-400 rounded-lg hover:bg-red-500 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900 w-40"
            href="/"
          >
            End Call
          </a> */}
        <div className="flex items-center p-4 bg-[#151b28]/30 gap-x-2 justify-center w-full h-full">
          <button
            className={`w-[40px] h-[40px] text-lg p-2 border border-white rounded-full ${
              cameraOn ? "bg-white text-slate-950" : "bg-transparent"
            }`}
            onClick={() => setCameraOn((a) => !a)}
          >
            <i className="fi fi-sr-camera" />
          </button>
          <button
            onClick={handleHangUp}
            className="w-[48px] h-[48px] 
            text-base font-medium text-center text-white 
            bg-red-400 rounded-full hover:bg-red-500 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900"
          >
            <i className="fi fi-sr-phone-call text-xl" />
          </button>
          <button
            className={`w-[40px] h-[40px] text-lg p-2 border border-white rounded-full ${
              micOn ? "bg-white text-slate-950" : "bg-transparent"
            }`}
            onClick={() => setMicOn((a) => !a)}
          >
            <i className="fi fi-sr-microphone" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default P2PCall;
