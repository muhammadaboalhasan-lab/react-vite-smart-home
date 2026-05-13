import { BrowserRouter, Routes, Route } from "react-router-dom";

import Aside from "../Aside";
import RoomsGrid from "./pages/RoomsGrid";
import DevicesGrid from "./pages/DevicesGrid";
import Login from "./Login";

function Main({ dispatch, state }) {
  const { rooms, tempRooms } = state;
  const setRooms = tempRooms.length > 0 ? tempRooms : rooms;
  return (
    <>
      <BrowserRouter>
        <Aside dispatch={dispatch} state={state}/>
        <main className="main">
          <Routes>
            <Route
              path="/"
              element={<DevicesGrid rooms={setRooms} dispatch={dispatch} />}
            />
            <Route
              path="/Login"
              element={<Login />}
            />
            <Route
              path="/Rooms"
              element={<RoomsGrid rooms={setRooms} dispatch={dispatch} />}
            />
            <Route
              path="/Devices/:roomID?"
              element={<DevicesGrid rooms={setRooms} dispatch={dispatch} />}
            />
          </Routes>
        </main>
      </BrowserRouter>
    </>
  );
}

export default Main;
