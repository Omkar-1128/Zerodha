import React, { useState } from "react";
import { Tooltip, Grow } from "@mui/material";
import { watchlist } from "../data/data";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import ListIcon from '@mui/icons-material/List';
import BarChartIcon from '@mui/icons-material/BarChart';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import MoreVertIcon from '@mui/icons-material/MoreVert';

const WatchList = () => {
  return (
    <div className="watchlist-container">
      <div className="search-container">
        <input
          type="text"
          name="search"
          id="search"
          placeholder="Search eg:infy, bse, nifty fut weekly, gold mcx"
          className="search"
        />
        <span className="counts"> {watchlist.length} / 50</span>
      </div>

      <ul className="list">
        {watchlist.map((stock, idx) => {
          return <WatchListItem stock={stock} key={idx} />;
        })}
      </ul>
    </div>
  );
};

export default WatchList;

const WatchListItem = ({ stock }) => {
  let [showWatchListActions, setShowWatchListActions] = useState(false);

  function handleMouseEnter() {
    setShowWatchListActions(true);
  }

  function handleMouseExit() {
    setShowWatchListActions(false);
  }

  return (
    <li onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseExit}>
      <div className="item">
        <p className={stock.isDown ? "down" : "up"}>{stock.name}</p>
        <div className="itemInfo">
          <span className="percent">{stock.percent}</span>
          {stock.isDown ? (
            <KeyboardArrowDownIcon className="down" />
          ) : (
            <KeyboardArrowUpIcon className="up" />
          )}
          <span>{stock.price}</span>
        </div>
        {showWatchListActions && <WatchListActions />}
      </div>
    </li>
  );
};

const WatchListActions = () => {
  return (
    <>
      <span className="actions">
        <span>
          <Tooltip
            title="Buy"
            placement="top"
            arrow
            TransitionComponent={Grow}
          >
            <button className="buy">B</button>
          </Tooltip>
          
        </span>

        <span>
          <Tooltip
            title="Sell"
            placement="top"
            arrow
            TransitionComponent={Grow}
          >
            <button className="sell">S</button>
          </Tooltip>
          
        </span>

        <span>
          <Tooltip
            title="Menu"
            placement="top"
            arrow
            TransitionComponent={Grow}
          >
            <button className="action"><ListIcon /></button>
          </Tooltip>
          
        </span>

        <span>
          <Tooltip
            title="Analytics"
            placement="top"
            arrow
            TransitionComponent={Grow}
          >
            <button className="action"><BarChartIcon className="icon"/></button>
          </Tooltip>
          
        </span>

        <span>
          <Tooltip
            title="Delete"
            placement="top"
            arrow
            TransitionComponent={Grow}
          >
            <button className="action"><DeleteForeverIcon /></button>
          </Tooltip>
          
        </span>

        <span>
          <Tooltip
            title="More"
            placement="top"
            arrow
            TransitionComponent={Grow}
          >
            <button className="action"><MoreVertIcon /></button>
          </Tooltip>
  
        </span>

        <span>
        </span>
      </span>
    </>
  );
};
