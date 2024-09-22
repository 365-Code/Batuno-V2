export type messageType = {
  avatar: string;
  sender: string;
  text: string;
  files: Array<fileType>;
};

export type messagesType = {
  id: string;
  name: string;
  isGroup: boolean;
  messages: Array<messageType>;
};

export type UserType = {
  username: string;
  uid: string;
  email: string;
  avatar: string;
  logged: boolean;
  phone?: number;
  favourites: Array<string>;
  onCall: boolean;
  callMode?: "audio" | "video" | string;
  call: {
    roomId: string;
    requestTo: string;
    requestFrom: string;
  } | null;
};

export type chatUserType = {
  uid: string;
  username: string;
  avatar: string;
};

export type groupType = {
  id: string;
  name: string;
  avatar: string;
};

export type detailType = {
  uid: string;
  username: string;
  avatar: string;
  email: string;
  fav?: boolean;
};

export type fileType = {
  name: string;
  type: string;
  url: string;
};

export const avatars = [
  "https://img.freepik.com/free-photo/view-3d-confident-businessman_23-2150709932.jpg?t=st=1705210759~exp=1705214359~hmac=fd5a10a8cb94fb6f8c6c19553a52d1d2c2ebc4856ca83543da774e896ed6fb67&w=740",
  "https://img.freepik.com/free-photo/3d-rendering-boy-wearing-cap-with-letter-r_1142-40523.jpg?size=626&ext=jpg&ga=GA1.1.2058463804.1704785941&semt=sph",
  "https://img.freepik.com/free-photo/view-3d-happy-woman-with-mouth-wide-open_23-2150709950.jpg?size=626&ext=jpg&ga=GA1.1.2058463804.1704785941&semt=sph",
];

export type requestType = {
  roomId: string;
  sender: string;
  receiver: string;
  callerName: string;
  status: "waiting" | "rejected" | "accepted" | "oncall" | "hangup";
};
