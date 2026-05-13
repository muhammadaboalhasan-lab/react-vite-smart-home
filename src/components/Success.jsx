import NotificationTemplate from "./NotificationTemplate";

function Success({ dispatch, statusKey }) {
  return (
    <>
      <NotificationTemplate dispatch={dispatch} statusKey={statusKey} />
    </>
  );
}

export default Success;
