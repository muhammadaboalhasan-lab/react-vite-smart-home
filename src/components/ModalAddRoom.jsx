// import { useEffect, useRef } from "react";
import { useState, useRef, useEffect } from "react";
import {
  roomsData,
  floorsData as floors,
  colorsData as colors,
} from "./data/roomsData";
import FormGroup from "./FormGroup";
function ModalAddRoom({ isOpenModal, onHandleCloseModal, rooms, editId, dispatch }) {
  const [roomNickName, setRoomNickName] = useState(rooms.find(room => room.id === editId )?.roomNickName ?? "");
  const [roomType, setRoomType] = useState(rooms.find(room => room.id === editId )?.roomType ?? roomsData[0].id);
  const [roomFloorType, setRoomFloorType] = useState(rooms.find(room => room.id === editId )?.roomFloorType ?? floors[0].name);
  const [colorID, setColorID] = useState(rooms.find(room => room.id === editId )?.colorID ?? colors[0].id);
  const overlayRef = useRef(null);

  let selectedFloor = [];
  if (roomsData.slice(0, 7).some((room) => room.id === roomType))
    selectedFloor = floors.slice(0, 3);

  if (roomsData.slice(7, 9).some((room) => room.id === roomType))
    selectedFloor = floors.slice(-1);

  if (roomsData.slice(-1).some((room) => room.id === roomType))
    selectedFloor = floors.slice(-2, -1);

  function onSubmit(e) {
    e.preventDefault();
    if (roomNickName.length < 3)
      return dispatch({ type: "notification", payload: 301 });

    const newRoom = {
      id: crypto.randomUUID().slice(0, 6),
      roomNickName,
      roomType,
      roomFloorType,
      colorID,
      devices: [],
    };

    if(editId && editId.length > 0)
    {
      dispatch({ type: "updateRoom", payload: {editId, newRoom} });
      onHandleCloseModal();
      dispatch({ type: "notification", payload: 350 });
      return;
    }

    dispatch({ type: "addRoom", payload: newRoom });
    dispatch({ type: "notification", payload: 399 });
    onHandleCloseModal();
  }

  function onRoomTypeChange(newTypeId) {
    setRoomType(newTypeId);

    let newSelectedFloor = [];
    if (roomsData.slice(0, 7).some((room) => room.id === newTypeId))
      newSelectedFloor = floors.slice(0, 3);
    else if (roomsData.slice(7, 9).some((room) => room.id === newTypeId))
      newSelectedFloor = floors.slice(-1);
    else if (roomsData.slice(-1).some((room) => room.id === newTypeId))
      newSelectedFloor = floors.slice(-2, -1);

    if (newSelectedFloor.length > 0) {
      setRoomFloorType(newSelectedFloor[0].name);
    }
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
    <>
      <div
        ref={overlayRef}
        className={`modal-overlay ${isOpenModal ? "" : "hidden"}`}
      >
        <div className="modal-box">
          <ModalHead onHandleCloseModal={onHandleCloseModal} />
          <ModalBody onSubmit={onSubmit}>
            <FormGroup
              placeholder={"Example: Living Room"}
              value={roomNickName}
              setValue={(e) => setRoomNickName(e.target.value)}
            >
              Room Name
            </FormGroup>
            <RoomType
              roomTypeState={[roomType, setRoomType]}
              onRoomTypeChange={onRoomTypeChange}
            />
            <FloorType
              roomFloorTypeState={[roomFloorType, setRoomFloorType]}
              colorIDState={[colorID, setColorID]}
              roomType={roomType}
              selectedFloor={selectedFloor}
            />
            <ModalFooter onHandleCloseModal={onHandleCloseModal} />
          </ModalBody>
        </div>
      </div>
    </>
  );
}

function ModalHead({ onHandleCloseModal }) {
  return (
    <div className="modal-header">
      <h2>Add New Room</h2>
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

function RoomType({
  roomTypeState: [roomType, setRoomType],
  onRoomTypeChange,
}) {
  return (
    <div className="form-group">
      <label>Room Type</label>
      <div className="type-grid">
        {roomsData.map((room) => (
          <Option
            key={room.id}
            room={room}
            roomType={roomType}
            setRoomType={setRoomType}
            onRoomTypeChange={onRoomTypeChange}
          />
        ))}
      </div>
    </div>
  );
}

function Option({ room, roomType, setRoomType, onRoomTypeChange }) {
  const { id, name, emoji } = room;
  function onChangeRoomType(e) {
    const value = +e.target.value;
    onRoomTypeChange(value);
    setRoomType(value);
  }
  return (
    <>
      <label className="type-option">
        <input
          type="radio"
          name="room-type"
          value={id}
          checked={id === roomType}
          onChange={onChangeRoomType}
        />
        <div className="type-card">
          <span className="type-emoji">{emoji}</span>
          <span>{name}</span>
        </div>
      </label>
    </>
  );
}

function FloorType({
  roomFloorTypeState: [roomFloorType, setRoomFloorType],
  colorIDState,
  selectedFloor,
}) {
  // let selectedFloor = [];
  // if (roomsData.slice(0, 7).some((room) => room.id === roomType))
  //   selectedFloor = floors.slice(0, 3);

  // if (roomsData.slice(7, 9).some((room) => room.id === roomType))
  //   selectedFloor = floors.slice(-1);

  // if (roomsData.slice(-1).some((room) => room.id === roomType))
  //   selectedFloor = floors.slice(-2, -1);
  // console.log(selectedFloor);

  // });
  return (
    <div className="form-row">
      <div className="form-group">
        <label>Floor</label>
        <select
          value={roomFloorType}
          onChange={(e) => setRoomFloorType(e.target.value)}
        >
          {selectedFloor.map(({ id, name }) => (
            <option key={id} value={selectedFloor[id - 1]?.name}>
              {name}
            </option>
          ))}
        </select>
      </div>
      <div className="form-group">
        <label>Color</label>
        <div className="color-picker">
          {colors.map(({ id, fGradientColor, sGradientColor }) => (
            <ColorPicker
              key={id}
              gradientColor={[id, fGradientColor, sGradientColor]}
              colorIDState={colorIDState}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function ColorPicker({ gradientColor, colorIDState }) {
  const [id, firstColor, secondColor] = gradientColor;
  const [colorID, setColorID] = colorIDState;
  return (
    <label
      htmlFor={`color-id-${id}`}
      className={`color-swatch ${colorID === id ? "active" : ""}`}
      style={{
        background: `linear-gradient(135deg, ${firstColor}, ${secondColor})`,
        backgroundClip: "padding-box",
        WebkitBackgroundClip: "padding-box",
      }}
    >
      <input
        id={`color-id-${id}`}
        type="radio"
        name="color"
        value={id}
        onChange={(e) => setColorID(+e.target.value)}
      />
    </label>
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

export default ModalAddRoom;
