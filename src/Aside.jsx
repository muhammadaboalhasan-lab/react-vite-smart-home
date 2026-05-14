import { NavLink } from "react-router-dom";
import { WebLogo, RoomIcon, DevicesNavLogo } from "./components/data/Logos";
function Aside({ sidebarState: [sidebarOpen, setSidebarOpen], dispatch, state }) {
  return (
    <aside className={`sidebar ${sidebarOpen? 'active' : ''}`}>
      <WebLogo />
      <nav className="nav">
        <NavLink to="/Rooms" className="nav-item" onClick={()=> setSidebarOpen(prev => !prev)}>
          <RoomIcon />
          <span>Rooms</span>
        </NavLink>
        <NavLink to="/Devices" className="nav-item" onClick={()=> setSidebarOpen(prev => !prev)}>
          <DevicesNavLogo />
          <span>Devices</span>
        </NavLink>
      </nav>
      <SideBarUser dispatch={dispatch} state={state} />
    </aside>
  );
}

function SideBarUser({ dispatch, state }) {
  return (
    <div className="sidebar-footer">
      <div className="user-card">
        <div className="user-avatar">{state.account.firstName[0]}</div>
        <div className="user-info">
          <div className="user-name">{state.account.firstName}</div>
          <div className="user-role">Owner</div>
        </div>
        {/* <a href="login.html" class="logout-btn" title="Signout"> */}
          <button
            className="logout-btn"
            title="Signout"
            onClick={() => dispatch({ type: "signout" })}
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
              <polyline points="16 17 21 12 16 7"></polyline>
              <line x1="21" y1="12" x2="9" y2="12"></line>
            </svg>
          </button>
        {/* </a> */}
      </div>
    </div>
  );
}
export default Aside;
