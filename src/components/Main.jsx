import { BrowserRouter, Routes, Route } from "react-router-dom";

import Aside from "../Aside";
import RoomsGrid from "./pages/RoomsGrid";
import DevicesGrid from "./pages/DevicesGrid";
import { useState } from "react";

function Main({ dispatch, state }) {
  const { rooms, tempRooms } = state;
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const setRooms = tempRooms.length > 0 ? tempRooms : rooms;
  return (
    <>
      <BrowserRouter>
        <Aside sidebarState ={[sidebarOpen, setSidebarOpen]} dispatch={dispatch} state={state}/>
        <main className="main">
          <Routes>
            <Route
              path="/"
              element={<RoomsGrid setSidebarOpen={setSidebarOpen} rooms={setRooms} dispatch={dispatch} />}
            />
            <Route
              path="/Rooms"
              element={<RoomsGrid setSidebarOpen={setSidebarOpen} rooms={setRooms} dispatch={dispatch} />}
            />
            <Route
              path="/Devices/:roomID?"
              element={<DevicesGrid setSidebarOpen={setSidebarOpen} rooms={setRooms} dispatch={dispatch} />}
            />
          </Routes>
        </main>
      </BrowserRouter>
    </>
  );
}

export default Main;
