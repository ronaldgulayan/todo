import { createContext, useContext, useEffect, useState } from "react";
import Item from "./components/Item";
import Popup from "./components/Popup";

export const PopupContext = createContext(null);

function App() {
  const [popup, setPopup] = useState(false);
  const [data, setData] = useState(() => {
    return JSON.parse(localStorage.getItem("ITEMS"));
  });

  useEffect(() => {
    setData((current) => {
      return current.map((data) => {
        return { ...data, isCheck: false };
      });
    });
  }, []);

  useEffect(() => {
    localStorage.setItem("ITEMS", JSON.stringify(data));
  }, [data]);

  return (
    <main className='w-full h-screen bg-[#222] flex items-center justify-center'>
      <PopupContext.Provider
        value={{
          value: popup,
          setValue: setPopup,
        }}
      >
        <Popup setDataEvent={setData} />
        <div className='h-[70vh] w-[90%] md:w-[30rem] rounded-md shadow-md bg-white'>
          <header className='flex shadow-md items-center justify-between h-12 px-5'>
            <h1 className='text-slate-700 font-bold text-2xl'>TODO LIST</h1>
            <span className='flex items-center gap-x-2'>
              <button
                onClick={() => {
                  setData((current) => {
                    return current.filter((value) => {
                      return !value.isCheck;
                    });
                  });
                }}
                className='py-1 px-2 border-2 border-slate-400 text-slate-500 text-sm'
              >
                Delete selected data
              </button>
              <button
                onClick={() => {
                  setPopup(true);
                }}
                className='bg-blue-500 text-white hover:bg-blue-400 active:bg-blue-600 rounded-full w-8 h-8 flex items-center font-bold select-none justify-center text-lg'
              >
                +
              </button>
            </span>
          </header>
          <div className='w-full h-[calc(100%-3rem)] gap-y-1 flex flex-col px-5 py-3 overflow-y-scroll'>
            {data.length === 0 && (
              <div className='w-full h-20 flex items-center justify-center font-bold text-xl text-slate-500'>
                No Todos Found :(
              </div>
            )}
            {data.map((data) => {
              return (
                <Item
                  label={data.label}
                  key={data.id}
                  setDataEvent={setData}
                  checked={data.isCheck}
                  dataId={data.id}
                  open={data.open}
                  date={data.date}
                />
              );
            })}
          </div>
        </div>
      </PopupContext.Provider>
    </main>
  );
}

export default App;
