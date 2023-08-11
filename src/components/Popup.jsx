import React, { useContext, useEffect, useId, useRef } from "react";
import { PopupContext } from "../App";

function Popup({ setDataEvent }) {
  const id = useId();
  const popupContext = useContext(PopupContext);
  const textbox = useRef();
  const conRef = useRef();

  const addTodoEvent = (e) => {
    e.preventDefault();
    if (!textbox.current.value) return;
    let value = textbox.current.value;
    setDataEvent((current) => {
      const currentDate = new Date();
      const option = { year: "numeric", month: "long", day: "numeric" };
      return [
        ...current,
        {
          id: crypto.randomUUID(),
          label: value,
          isCheck: false,
          date: currentDate.toLocaleDateString("en-US", option),
          open: false,
        },
      ];
    });
    textbox.current.value = "";
  };

  useEffect(() => {
    const clickOutsideEvent = (e) => {
      if (conRef.current && conRef.current === e.target) {
        if (popupContext.value) {
          popupContext.setValue(false);
        }
      }
    };
    document.addEventListener("click", clickOutsideEvent);
    return () => document.removeEventListener("click", clickOutsideEvent);
  }, [popupContext.value]);

  return (
    <div
      ref={conRef}
      data-show={popupContext.value}
      className='fixed duration-200 z-10 w-full data-[show=true]:pointer-events-auto  data-[show=true]:opacity-100 pointer-events-none opacity-0 h-full flex justify-center bg-[#000000aa] backdrop-blur-[2px]'
    >
      <form
        onSubmit={addTodoEvent}
        data-show={popupContext.value}
        className='w-96 h-fit duration-200 data-[show=true]:top-4  data-[show=true]:opacity-100 bg-white flex flex-col rounded-md shadow-md relative -top-5 opacity-0'
      >
        <header className='w-full py-2 px-4 flex justify-between items-center'>
          <h1 className='font-bold'>ADD TODO</h1>
          <button
            type='button'
            onClick={() => {
              popupContext.setValue(false);
            }}
            className='font-bold text-slate-600 select-none'
          >
            &#10005;
          </button>
        </header>
        <div className='w-full p-3'>
          <label htmlFor={id}></label>
          <input
            ref={textbox}
            id={id}
            type='text'
            autoComplete='off'
            className='w-full py-2 rounded-md px-3 text-sm font-sans font-bold text-slate-500 border-slate-500 border-2'
          />
        </div>
        <div className='flex w-full items-center justify-end gap-x-1 pb-3 pr-3'>
          <button
            type='reset'
            className='px-6 py-2 outline select-none rounded-md outline-2 outline-slate-500 text-sm duration-150 hover:bg-slate-200 font-sans text-slate-500'
          >
            RESET
          </button>
          <button
            type='submit'
            className='px-3 py-2 active:bg-[#333] hover:bg-[#1a1a1a] text-sm select-none rounded-md font-sans text-slate-200 duration-100 bg-[#111]'
          >
            ADD TODO
          </button>
        </div>
      </form>
    </div>
  );
}

export default Popup;
