import { useEffect, useReducer, useState } from "react";
import Register from "./components/Register";
import SwitchModal from "./components/SwitchModal";
import Login from "./components/Login";
import Main from "./components/Main";
import Error from "./components/Error";
import Success from "./components/Success";
import Danger from "./components/Modal/Danger";
import { GetAccounts, GetActiveAccount } from "./tools/tools";

function setData(data) {
  const accounts = GetAccounts();
  const newUpdated = accounts.map((account) =>
    account.isActive === true ? { ...account, ...data } : account,
  );

  localStorage.setItem("accounts", JSON.stringify(newUpdated));
}

// function getData(key = "account") {
//   return JSON.parse(localStorage.getItem(key));
// }

// function clearData(key = "account") {
//   localStorage.removeItem(key);
// }

const initinal = GetActiveAccount() || {
  id: "",
  createdDate: "",
  account: {},
  isActive: false,
  rooms: [],
  tempRooms: [],
  notification: false,
  statusKey: null,
};

function reducer(state, action) {
  switch (action.type) {
    case "createAccount":
      return { ...state, ...action.payload, isActive: true };
    case "login":
      return { ...state, ...action.payload, isActive: true };
    case "signout":
      return { ...state, isActive: false };
    case "addRoom":
      return { ...state, rooms: [...state.rooms, action.payload] };
    case "updateRoom":
      return {
        ...state,
        rooms: state.rooms.map((room) =>
          room.id === action.payload.editId
            ? {
                ...room,
                roomNickName: action.payload.newRoom.roomNickName,
                roomType: action.payload.newRoom.roomType,
                roomFloorType: action.payload.newRoom.roomFloorType,
                colorID: action.payload.newRoom.colorID,
              }
            : room,
        ),
      };
    case "addDevice":
      return {
        ...state,
        rooms: state.rooms.map((room) =>
          room.id === action.payload.roomId
            ? { ...room, devices: [...room.devices, action.payload.newDevice] }
            : room,
        ),
      };
    case "updateDevice":
      return {
        ...state,
        rooms: state.rooms.map((room) =>
          room.id === action.payload.roomId
            ? {
                ...room,
                devices: room.devices.map((device) =>
                  device.id === action.payload.deviceId
                    ? {
                        ...device,
                        deviceNikenName:
                          action.payload.deviceData.deviceNikenName,
                        deviceType: action.payload.deviceData.deviceType,
                        floorType: action.payload.deviceData.floorType,
                        status: action.payload.deviceData.status,
                      }
                    : device,
                ),
              }
            : room,
        ),
      };
    case "switch":
      return {
        ...state,
        rooms: state.rooms.map((room) =>
          room.id === action.payload.roomId
            ? {
                ...room,
                devices: room.devices.map((device) =>
                  device.id === action.payload.deviceId
                    ? {
                        ...device,
                        status: device.status === "on" ? "off" : "on",
                      }
                    : device,
                ),
              }
            : room,
        ),
      };

    case "searchByRoomName":
      if (action.payload.length <= 0) return { ...state, tempRooms: [] };

      return {
        ...state,
        tempRooms: state.rooms.filter((room) =>
          room.roomNickName
            .toLowerCase()
            .startsWith(action.payload.trim().toLowerCase()),
        ),
      };
    case "searchByFloorType":
      if (action.payload.trim().toLowerCase() === "all")
        return { ...state, tempRooms: [] };

      return {
        ...state,
        tempRooms: state.rooms.filter(
          (room) =>
            room.roomFloorType.trim().toLowerCase() ===
            action.payload.trim().toLowerCase(),
        ),
      };

    case "removeRoom":
      return {
        ...state,
        rooms: state.rooms.filter((room) => room.id !== action.payload),
        notification: false,
        statusKey: null,
      };
    case "removeDevice":
      return {
        ...state,
        rooms: state.rooms.map((room) =>
          // الوصول الصحيح بناءً على الـ Dispatch الخاص بك
          room.id === action.payload.roomId
            ? {
                ...room,
                // الوصول الصحيح للـ deviceId داخل كائن id
                devices: room.devices.filter(
                  (device) => device.id !== action.payload.deviceId,
                ),
              }
            : room,
        ),
        notification: false,
        statusKey: null,
      };
    case "notification":
      return { ...state, notification: true, statusKey: action.payload };
    case "clearNotification":
      return { ...state, notification: false, statusKey: null };
    default:
      throw new Error("Action Unknown!");
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, initinal);
  const { account, isActive, notification, statusKey } = state;
  const [loginOpen, setLoginOpen] = useState(true);

  // console.log(GetActiveAccount(),initinal);

  function onClickHandle(e) {
    e.preventDefault();
    setLoginOpen(!loginOpen);
  }

  useEffect(
    function () {
      setData(state);
    },
    [state],
  );

  // function onHandleSearch(e) {
  //   dispatch({type : "search", payload : e.target.value});
  // }

  return (
    <>
      {/* !isHaveAccount && !loginOpen && */}
      {!isActive && !loginOpen && (
        <Register dispatch={dispatch}>
          <SwitchModal
            text={"Already have an account? "}
            onClickHandle={onClickHandle}
          >
            Login
          </SwitchModal>
        </Register>
      )}
      {loginOpen && !isActive && (
        <Login account={account} dispatch={dispatch}>
          <SwitchModal
            text={"Don't have an account? "}
            onClickHandle={onClickHandle}
          >
            Create one
          </SwitchModal>
        </Login>
      )}
      {isActive && (
        <div className="app">
          <Main dispatch={dispatch} state={state} />
        </div>
      )}
      <div className="toast-container">
        {notification && statusKey < 300 && (
          <Error dispatch={dispatch} statusKey={statusKey} />
        )}
        {notification && statusKey < 400 && (
          <Success dispatch={dispatch} statusKey={statusKey} />
        )}
      </div>

      {notification && statusKey?.key < 500 && (
        <Danger dispatch={dispatch} statusKey={statusKey} />
      )}
    </>
  );
}

export default App;
