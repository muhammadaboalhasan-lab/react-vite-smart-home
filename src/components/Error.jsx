import NotificationTemplate from "./NotificationTemplate";

function Error({ dispatch, statusKey }) {
  return (
    <>
      <NotificationTemplate dispatch={dispatch} statusKey={statusKey} />
    </>
  );
}

export default Error;
