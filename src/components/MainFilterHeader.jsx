import { useState } from "react";
import { SearchLogo } from "./data/Logos";
function MainFilterHeader({ dispatch }) {
  return (
    <FilterBar>
      <Search dispatch={dispatch} />
      <Filter dispatch={dispatch} />
    </FilterBar>
  );
}

export default MainFilterHeader;

function FilterBar({ children }) {
  return <div className="filter-bar">{children}</div>;
}

function Search({ dispatch }) {
  const [onSearch, setOnSearch] = useState("");

  function onHandleSearch(e) {
    const value = e.target.value;
    console.log(value)
    setOnSearch(value);
    dispatch({ type: "searchByRoomName", payload: value });
  }

  return (
    <div className="filter-search">
      <SearchLogo />
      <input
        type="text"
        placeholder="Search for room"
        value={onSearch}
        onChange={onHandleSearch}
      />
    </div>
  );
}

function Filter({dispatch}) {
  const [onClickBtn , setOnClickBtn] = useState("All");

  const btnStatus = ["All","First Floor","Second Floor","Thired Floor","Basement","other"]

  function onHandleClick(e)
  {
    const value = +e.target.value;
    setOnClickBtn(btnStatus[value]);
    dispatch({type: "searchByFloorType", payload : btnStatus[value]});
  }
  return (
    <div className="filter-tabs">
      <button className={`filter-tab ${btnStatus[0] === onClickBtn && "active"}`} value={0}  onClick={onHandleClick} >All</button>
      <button className={`filter-tab ${btnStatus[1] === onClickBtn && "active"}`} value={1}  onClick={onHandleClick} >First Floor</button>
      <button className={`filter-tab ${btnStatus[2] === onClickBtn && "active"}`} value={2}  onClick={onHandleClick} >Second Floor</button>
      <button className={`filter-tab ${btnStatus[3] === onClickBtn && "active"}`} value={3}  onClick={onHandleClick} >Thired Floor</button>
      <button className={`filter-tab ${btnStatus[4] === onClickBtn && "active"}`} value={4}  onClick={onHandleClick} >Basement</button>
      <button className={`filter-tab ${btnStatus[5] === onClickBtn && "active"}`} value={5}  onClick={onHandleClick} >other</button>
    </div>
  );
}
