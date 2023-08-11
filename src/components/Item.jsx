import React, { useId } from "react";
import { BiChevronUp } from "react-icons/bi";

function Item({
  label = "Label",
  checked = false,
  setDataEvent,
  dataId,
  open,
  date,
}) {
  const id = useId();

  return (
    <div className='w-full select-none h-fit relative duration-200 text-slate-200 font-bold'>
      <div className='z-[5] flex justify-between relative rounded-md items-center h-12 min-h-[3rem] px-3 w-full bg-zinc-800 hover:bg-zinc-900'>
        <span className='flex text-sm text-slate-300 w-full items-center gap-x-2'>
          <input
            id={id}
            type='checkbox'
            className='cursor-pointer'
            checked={checked}
            onChange={(e) => {
              setDataEvent((current) => {
                return current.map((data) => {
                  if (dataId === data.id) {
                    return { ...data, isCheck: !data.isCheck };
                  }
                  return data;
                });
              });
            }}
          />
          <label
            htmlFor={id}
            className={"whitespace-nowrap " + (checked && "line-through")}
          >
            {label.length > 30 ? label.substring(0, 30) + "..." : label}
          </label>
        </span>
        <span className='flex gap-x-1'>
          <button
            onClick={() => {
              setDataEvent((current) => {
                return current.map((data) => {
                  if (data.id === dataId) {
                    return { ...data, open: !data.open };
                  }
                  return { ...data, open: false };
                });
              });
            }}
            className='text-sm select-none active:bg-green-700 px-2 shadow-md py-1 bg-green-500 rounded-sm hover:bg-green-600 duration-100'
          >
            More
          </button>
          <button
            onClick={() => {
              setDataEvent((current, i) => {
                const newarray = current.filter((value) => value.id !== dataId);
                return newarray;
              });
            }}
            className='text-sm select-none active:bg-red-700 px-2 shadow-md py-1 bg-red-500 rounded-sm hover:bg-red-600 duration-100'
          >
            Delete
          </button>
        </span>
      </div>
      <div
        className={
          "select-auto px-3 text-slate-600 text-sm -top-3 rounded-md bg-slate-300 -translate-x-1/2 left-1/2 w-[95%] relative overflow-hidden duration-500 transition-all grid " +
          (open ? "grid-rows-[1fr] pt-5 pb-3" : "grid-rows-[0fr] pt-0 pb-0")
        }
      >
        <div className='flex w-full duration-500 transition-all items-end overflow-hidden h-fit gap-x-2'>
          <span className='w-full leading-4'>{label}</span>
          <span className='whitespace-nowrap text-[0.65rem] font-sans'>
            {date}
          </span>
          <div className='h-full flex items-end'>
            <BiChevronUp
              onClick={() => {
                setDataEvent((current) => {
                  return current.map((data) => {
                    if (data.id === dataId) {
                      return { ...data, open: !data.open };
                    }
                    return { ...data, open: false };
                  });
                });
              }}
              className='w-5 h-5 text-slate-500 cursor-pointer select-none'
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Item;
