import { useState } from "react";
import Header from "./Header";
import { AddLogo } from "./data/Logos";
// import ModalAddRoom from "./ModalAddRoom";

function MainPageHeader({
  ModalContent,
  setSidebarOpen,
  rooms,
  editIdState: [editId, setEditId],
  dispatch,
  children,
}) {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const titleType = children.split(" ").at(1);
  const title = `${titleType} Management`;
  const description =
    titleType === "Room"
      ? `Create ${titleType} in your home and organize appliances within them with ease.`
      : `Add ${titleType} to your rooms and organize your devices effortlessly.`;

  function onHandleOpenModal() {
    setIsOpenModal(true);
  }

  function onHandleCloseModal() {
    setIsOpenModal(false);
    setEditId("");
  }

  const isActiveModal = editId.length > 0 || isOpenModal;
  return (
    <>
      <header className="topbar">
        <button
          className="menu-toggle"
          onClick={() => setSidebarOpen((prev) => !prev)}
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
        </button>
        <Header
          title={title}
          description={description}
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
