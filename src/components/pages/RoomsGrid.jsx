import { Link } from "react-router-dom";
import { EditLogo, DeleteLogo, RightArrow } from "../data/Logos";
import { colorsData, roomsData } from "../data/roomsData";
import MainPageHeader from "../MainPageHeader";
import MainFilterHeader from "../MainFilterHeader";
import ModalAddRoom from "../ModalAddRoom";
import { useState } from "react";
function RoomsGrid({ setSidebarOpen, rooms, dispatch }) {
  const [editId, setEditId] = useState("");
  //   const { id, roomNickName, roomType, roomFloorType, colorID } = rooms;


  return (
    <>
      <MainPageHeader ModalContent={ModalAddRoom} setSidebarOpen={setSidebarOpen} rooms={rooms} editIdState={[editId, setEditId]} dispatch={dispatch}>
        Add Room
      </MainPageHeader>
      <MainFilterHeader dispatch={dispatch} />
      <div className="rooms-grid">
        {rooms.map((room) => (
          <RoomCard key={room.id}>
            <RoomHeader
              colorID={room.colorID}
              roomType={room.roomType}
              roomId={room.id}
              setEditId={setEditId}
              dispatch={dispatch}
            />
            <RoomBody room={room} />
          </RoomCard>
        ))}
      </div>
    </>
  );
}

function RoomCard({ children }) {
  return <div className="room-card">{children}</div>;
}

function RoomHeader({ colorID, roomType, roomId, setEditId, dispatch }) {
  const { fGradientColor, sGradientColor } = colorsData[colorID - 1];
  const { emoji } = roomsData[roomType - 1];


  function onHandleDeleteClick() {
    dispatch({type: "notification", payload : {id : roomId, key : 499, type : "removeRoom"} });
  }



  return (
    <>
      <div
        className="room-card-header"
        style={{
          background: `linear-gradient(135deg, ${fGradientColor}, ${sGradientColor}`,
        }}
      >
        <span className="room-card-emoji">{emoji}</span>
        <div className="room-actions">
          <button className="room-action-btn" title="edit" onClick={()=> setEditId(roomId)}>
            <EditLogo />
          </button>
          <button
            className="room-action-btn danger"
            title="delete"
            onClick={onHandleDeleteClick}
          >
            <DeleteLogo />
          </button>
        </div>
      </div>
    </>
  );
}

function RoomBody({ room }) {
  const { roomNickName, roomType, roomFloorType, roomID } = room;
  const { name } = roomsData[roomType - 1];
  const numDevices = room.devices.length;
  const numActiveDevices = room.devices.filter(
    (device) => device.status === "on",
  ).length;
  const temperature = room.devices.some(
    (device) => device.deviceType === 2 && device.status === "on",
  )
    ? "22°"
    : "0°";
  return (
    <div className="room-card-body">
      <h3>{roomNickName}</h3>
      <span className="room-type-badge">{name}</span>
      <span className="room-type-badge">{roomFloorType}</span>
      <RoomStats>
        <Stat value={numDevices} label={"Devices"} />
        <Stat value={temperature} label={"Temperature"} />
        <Stat value={numActiveDevices} label={"Active"} />
      </RoomStats>
      <Button roomID={roomID} />
    </div>
  );
}

function RoomStats({ children }) {
  return <div className="room-stats">{children}</div>;
}

function Stat({ value, label }) {
  return (
    <div className="room-stat">
      <span className="room-stat-num">{value}</span>
      <span className="room-stat-label">{label}</span>
    </div>
  );
}

function Button({ roomID }) {
  return (
    <Link to={`/Devices/${roomID}`} className="room-view-btn">
      Show Devices
      <RightArrow />
    </Link>
  );
}

export default RoomsGrid;
