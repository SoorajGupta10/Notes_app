import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import {useDispatch, useSelector} from "react-redux"
import { addToPastes, updateToPastes } from "../redux/pasteSlice";

const Home = () => {
  const [title, setTitle] = useState("");
  const [value, setValue] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const pasteId = searchParams.get("pasteId");
  const dispatch = useDispatch();
  const allPastes = useSelector((state) => state.paste.pastes);
  useEffect(() => {
    if (pasteId){
      const paste = allPastes.find((p) => p._id === pasteId);
      setTitle(paste.title);
      setValue(paste.content);
    }
  },[pasteId])

  function createPaste() {
    const paste = {
      title:title,
      content: value,
      _id:pasteId || Date.now().toString(36),
      createdAt:new Date().toISOString(),
    }


    if(pasteId){
      // update
      dispatch(updateToPastes(paste));
    }
    else{
      // create
      dispatch(addToPastes(paste));
    }
    // after creation or updation
    setTitle('');
    setValue('');
    setSearchParams({});
  }
  return (
    <div>
      <div className="flex flex-row gap-7 place-content-between">
        <input
          className="p-1 m-2 rounded-2xl w-[66%] pl-5"
          type="text"
          placeholder="Enter title here"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <button onClick={createPaste} className="p-2 m-2 rounded-2xl">
          {pasteId ? "update My Paste" : "Create My Paste"}
        </button>
      </div>
      <div className="mt-8">
        <textarea
          className="rounded-2xl mt-4 min-w-[500px] p-4"
          value={value}
          placeholder="enter contect here"
          rows={20}
          onChange={(e) => setValue(e.target.value)}
        />
      </div>
    </div>
  );
};

export default Home;
