import Head from "next/head";
import utilStyles from "../styles/utils.module.css";
import Toolbar from "../components/toolbar/toolbar";
import React, { useState, useRef } from "react";

export default function Test() {
  const dragItem = useRef();
  const dragOverItem = useRef();
  const [list, setList] = useState([
    "Item 1",
    "Item 2",
    "Item 3",
    "Item 4",
    "Item 5",
    "Item 6",
  ]);

  const dragStart = (e, position) => {
    dragItem.current = position;
    // console.log(e.target.innerHTML);
  };

  const dragEnter = (e, position) => {
    dragOverItem.current = position;
    // console.log(e.target.innerHTML);
  };

  const drop = (e) => {
    const copyListItems = [...list];
    const dragItemContent = copyListItems[dragItem.current];
    // First remove the moved item from the original array
    copyListItems.splice(dragItem.current, 1);
    // Then add the moved item back into the array at its new index location
    copyListItems.splice(dragOverItem.current, 0, dragItemContent);
    dragItem.current = null;
    dragOverItem.current = null;
    setList(copyListItems);
  };

  return (
    <>
      <Head>
        <title>VHC</title>
      </Head>

      <div className={utilStyles.container}>
        <Toolbar></Toolbar>
        <div className={utilStyles.navbarSpacer}></div>
        <div>
          {list &&
            list.map((item, index) => (
              <div
                className={utilStyles.testItem}
                onDragStart={(e) => dragStart(e, index)}
                onDragEnter={(e) => dragEnter(e, index)}
                onDragEnd={drop}
                key={index}
                draggable
              >
                {item}
              </div>
            ))}
        </div>
      </div>
    </>
  );
}
