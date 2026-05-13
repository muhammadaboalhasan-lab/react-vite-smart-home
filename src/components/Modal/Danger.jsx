import status from "../data/Status";

function Danger({ dispatch, statusKey }) {
  const { id, key, type } = statusKey;
  const dangerMessage = status.get(key)[1].split(";");

  function onHandleDelete() {
    dispatch({ type: type, payload: id });
    dispatch({
      type: "notification",
      payload: type === "removeRoom" ? 397 : 396,
    });
  }
  return (
    <div className={`modal-overlay`}>
      <div className="modal-box modal-sm">
        <div className="modal-body text-center">
          <div className="warning-icon">
            <svg
              className="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
              <line x1="12" y1="9" x2="12" y2="13"></line>
              <line x1="12" y1="17" x2="12.01" y2="17"></line>
            </svg>
          </div>
          <h2>{dangerMessage[0]}</h2>
          <p>{dangerMessage[1]}</p>
          <div className="modal-footer center">
            <button
              className="btn-secondary"
              onClick={() => dispatch({ type: "clearNotification" })}
            >
              Cancel
            </button>
            <button className="btn-danger" onClick={onHandleDelete}>
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Danger;
