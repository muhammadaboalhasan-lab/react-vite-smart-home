import { useRef, useEffect, useState } from "react";
import FormGroup from "./FormGroup";
import { devicesData } from "./data/devicesData";

function ModalAddDevice({ isOpenModal, onHandleCloseModal, rooms, editId, dispatch }) {
  const [roomId,deviceId] = editId;
  const [deviceNikenName, setDeviceNikenName] = useState(rooms.find(r => r.id === roomId)?.devices.find(d => d.id === deviceId)?.deviceNikenName ?? "");
  const [roomID, setRoomID] = useState( rooms.find(room => room.id === roomId)?.id ?? rooms[0]?.id);
  const [deviceType, setDeviceType] = useState( rooms.find(room => room.id === roomId)?.devices.find(device => device.id === deviceId)?.deviceType ?? devicesData[0]?.id);
  const [floorType, setFloorType] = useState(() =>
  {
    const defaultIndex = rooms.findIndex(r => r.id === roomId);
    return (defaultIndex !== -1)? defaultIndex : 0;
  });
  const [status, setStatus] = useState( rooms.find(room => room.id === roomId)?.devices.find(device => device.id === deviceId)?.status ?? "off");
  //   console.log(rooms, roomID, floorType);
  const overlayRef = useRef(null);

  function onSubmit(e) {
    e.preventDefault();
    if (deviceNikenName.length < 3)
      return dispatch({ type: "notification", payload: 301 });

    if (!(rooms.length > 0))
      return dispatch({ type: "notification", payload: 302 });

    const deviceData = {
      id: crypto.randomUUID().slice(0, 6),
      deviceNikenName,
      deviceType,
      floorType,
      status,
    };

    const targetRoom = rooms.find((room) => room.id === roomID);

    if(roomId && deviceId && deviceId.length > 0)
    {
      // console.log({ roomId : roomId, deviceId: deviceId, deviceData})
      dispatch({ type: "updateDevice", payload: { roomId : roomId, deviceId: deviceId, deviceData}});
      onHandleCloseModal();
      dispatch({ type: "notification", payload: 351 });
      return;
    }

    if (roomID === targetRoom?.id) {
      dispatch({
        type: "addDevice",
        payload: {
          roomId: roomID,
          newDevice: deviceData,
        },
      });
      onHandleCloseModal();
      dispatch({ type: "notification", payload: 398 });
    }

    // dispatch({ type: "addDevice", payload: newDevice });
  }

  useEffect(
    function () {
      const callBackFunction = function (e) {
        if (overlayRef.current === e.target) onHandleCloseModal();
      };
      overlayRef.current.addEventListener("click", callBackFunction);

      return () => removeEventListener("click", callBackFunction);
    },
    [overlayRef, onHandleCloseModal],
  );

  return (
    <div
      ref={overlayRef}
      className={`modal-overlay ${isOpenModal ? "" : "hidden"}`}
    >
      <div className="modal-box modal-lg">
        <ModalHead onHandleCloseModal={onHandleCloseModal} />
        <ModalBody onSubmit={onSubmit}>
          <FormGroup
            placeholder={"Example: Kitchen Light"}
            value={deviceNikenName}
            setValue={(e) => setDeviceNikenName(e.target.value)}
          >
            Room Name
          </FormGroup>
          <DeviceType deviceTypeState={[deviceType, setDeviceType]} />
          <FloorType
            rooms={rooms}
            setRoomID={setRoomID}
            floorTypeState={[floorType, setFloorType]}
            statusState={[status, setStatus]}
            currentIds ={editId}
          />
          <ModalFooter onHandleCloseModal={onHandleCloseModal} />
        </ModalBody>
      </div>
    </div>
  );
}

function ModalHead({ onHandleCloseModal }) {
  return (
    <div className="modal-header">
      <h2>Add New Device</h2>
      <button className="modal-close" onClick={onHandleCloseModal}>
        ×
      </button>
    </div>
  );
}

function ModalBody({ onSubmit, children }) {
  return (
    <form className="modal-body" onSubmit={onSubmit}>
      {children}
    </form>
  );
}

function DeviceType({ deviceTypeState }) {
  return (
    <div className="form-group">
      <label>Device Type</label>
      <div className="type-grid type-grid-devices">
        {devicesData.map((device) => (
          <Option
            key={device.id}
            deviceTypeState={deviceTypeState}
            device={device}
          />
        ))}
      </div>
    </div>
  );
}

function Option({ device, deviceTypeState }) {
  const { id, name, defaultColor, emoji: Emoji } = device;
  const [deviceType, setDeviceType] = deviceTypeState;

  return (
    <>
      <label className="type-option">
        <input
          type="radio"
          name="room-type"
          value={id}
          checked={deviceType === id}
          onChange={(e) => setDeviceType(+e.target.value)}
        />
        <div className="type-card">
          <span className="type-emoji">
            <div className={`type-svg ${defaultColor}`}>
              <Emoji />
            </div>
          </span>
          <span>{name}</span>
        </div>
      </label>
    </>
  );
}

function FloorType({ rooms, setRoomID, floorTypeState, statusState, currentIds }) {
  const [floorType, setFloorType] = floorTypeState;
  const [status, setStatus] = statusState;
  const floors = rooms.map((room) => [room.roomNickName, room.id, room.roomFloorType]);
  const selectedFloor = floors.map((floor) => floor[0]);
  const floorsID = floors.map((floor) => floor[1]);
  // const floorsType = floors.map((floor) => floor[2]);

  return (
    <div className="form-row">
      <div className="form-group">
        <label>Room Name</label>
        <select
          value={floorType}
          onChange={(e) => {
            setFloorType(+e.target.value);
            setRoomID(floorsID[+e.target.value]);
          }}
          disabled={currentIds.length > 0}
        >
          {selectedFloor.map((floor, index) => (
            <option key={index + 1} value={index}>
              {floor}
            </option>
          ))}
        </select>
      </div>
      <div className="form-group">
        <label>Defualt Status</label>
        <div className="radio-row">
          <label className="radio-pill">
            <input
              type="radio"
              name="status"
              value={"off"}
              checked={status === "off"}
              onChange={(e) => setStatus(e.target.value)}
            />
            <span>Off</span>
          </label>
          <label className="radio-pill">
            <input
              type="radio"
              name="status"
              value={"on"}
              checked={status === "on"}
              onChange={(e) => setStatus(e.target.value)}
            />
            <span>On</span>
          </label>
        </div>
      </div>
    </div>
  );
}

function ModalFooter({ onHandleCloseModal }) {
  return (
    <div className="modal-footer">
      <button
        type="button"
        className="btn-secondary"
        onClick={onHandleCloseModal}
      >
        Cancel
      </button>
      <button type="submit" className="btn-primary-solid">
        Save
      </button>
    </div>
  );
}

export default ModalAddDevice;
