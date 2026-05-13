import { useState } from "react";
import Header from "./Header";
import { AddLogo } from "./data/Logos";
// import ModalAddRoom from "./ModalAddRoom";

function MainPageHeader({ ModalContent, rooms, editIdState:[editId, setEditId], dispatch, children }) {
  const [isOpenModal, setIsOpenModal] = useState(false);

  function onHandleOpenModal()
  {
    setIsOpenModal(true);
  }

  function onHandleCloseModal() {
    setIsOpenModal(false);
    setEditId("");
  }

  const isActiveModal = editId.length > 0 || isOpenModal
  return (
    <>
      <header className="topbar">
        <Header
          title={"Room Management"}
          description={
            "Create rooms in your home and organize appliances within them with ease."
          }
          className={"greeting"}
        />
        <div className="topbar-actions">
          <button className="btn-primary-lg" onClick={onHandleOpenModal}>
            <AddLogo />
            {children}
          </button>
        </div>
      </header>
      {isActiveModal && (
        <ModalContent
          isOpenModal={isActiveModal}
          onHandleCloseModal={onHandleCloseModal}
          rooms={rooms}
          editId={editId}
          dispatch={dispatch}
        />
      )}
    </>
  );
}

export default MainPageHeader;
