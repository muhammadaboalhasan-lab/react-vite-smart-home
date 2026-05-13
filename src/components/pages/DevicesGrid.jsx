// import { useParams } from "react-router-dom";
import MainPageHeader from "../MainPageHeader";
import MainFilterHeader from "../MainFilterHeader";
import ModalAddDevice from "../ModalAddDevice";
import { DeleteLogo, EditLogo } from "../data/Logos";

import { devicesData } from "../data/devicesData";
import { roomsData } from "../data/roomsData";

import { useState } from "react";
function DevicesGrid({ rooms, dispatch }) {
    const [editId, setEditId] = useState("");
  return (
    <>
      <MainPageHeader
         ModalContent={ModalAddDevice} rooms={rooms} editIdState={[editId, setEditId]} dispatch={dispatch}
      >
        Add Device
      </MainPageHeader>
      <MainFilterHeader dispatch={dispatch} />
      <section className="devices-grid">
        {rooms.map((room) =>
          room.devices.map((device) => (
            <div className={`device device-${device.status}`} key={device.id}>
              <DeviceCardAction roomId={room.id} deviceId={device.id} setEditId={setEditId} dispatch={dispatch} />
              <DeviceCardHeader
                deviceType={device.deviceType}
                deviceStatus={device.status}
                roomId={room.id}
                deviceId={device.id}
                dispatch={dispatch}
              />
              <DeviceBody device={device} room={room} />
              <DeviceFooter deviceType={device.deviceType} />
            </div>
          )),
        )}
      </section>
    </>
  );
}

function DeviceCardAction({ roomId, deviceId, setEditId, dispatch }) {
  function onHandleDeleteClick() {
    dispatch({ type: "notification", payload: { id : {roomId, deviceId}, key: 498, type : "removeDevice" } });
  }

  return (
    <div className="device-menu">
      <button className="device-action-btn" title="Edit" onClick={()=> setEditId([roomId,deviceId])}>
        <EditLogo />
      </button>
      <button
        className="device-action-btn danger"
        title="Delete"
        onClick={onHandleDeleteClick}
      >
        <DeleteLogo />
      </button>
    </div>
  );
}

function DeviceCardHeader({
  deviceType,
  deviceStatus,
  roomId,
  deviceId,
  dispatch,
}) {
  return (
    <div className="device-top">
      <DeviceIcon deviceType={deviceType} />
      <DeviceAcionSwitch
        deviceStatus={deviceStatus}
        roomId={roomId}
        deviceId={deviceId}
        dispatch={dispatch}
      />
    </div>
  );
}

function DeviceIcon({ deviceType }) {
  const { emoji: Emoji } = devicesData[deviceType - 1];
  return (
    <div className="device-icon temp">
      <Emoji />
    </div>
  );
}

function DeviceAcionSwitch({ deviceStatus, roomId, deviceId, dispatch }) {
  function onHandleSwitch() {
    console.log("click", roomId, deviceId);
    dispatch({ type: "switch", payload: { roomId, deviceId } });
  }
  return (
    <button className={`toggle ${deviceStatus}`} onClick={onHandleSwitch}>
      <span className="toggle-dot"></span>
    </button>
  );
}

function DeviceBody({ device, room }) {
  const { deviceType, deviceNikenName } = device;
  return (
    <>
      <div className="device-name">{devicesData[deviceType - 1]?.name}</div>
      <div className="device-room">{deviceNikenName}</div>
      <div className="device-room">
        <span className="room-type-badge">
          {roomsData[room?.roomType - 1].name}
        </span>
        <span className="room-type-badge">{room?.roomNickName}</span>
        <span className="room-type-badge">{room?.roomFloorType}</span>
      </div>
    </>
  );
}

function DeviceFooter({deviceType}) {
  const {action, featur} =  devicesData[deviceType - 1];
  return (
    <div className="device-value">
      <span className="big">{action}</span>
      <span className="muted">{featur}</span>
    </div>
  );
}

export default DevicesGrid;
