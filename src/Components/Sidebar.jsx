import React from "react";
import { useRef, useState } from "react";
import { useDrop, useDrag } from "react-dnd";
import { NativeTypes } from "react-dnd-html5-backend";
import { useCanvasContext } from "../hooks/useCanvasContext";

const DragableImage = ({ id, type = "image", src, didDrop }) => {
  const [collected, drag, dragPreview] = useDrag(() => ({
    type: type,
    item: { id, type, src },
  }));

  return (
    <div ref={drag} className="cursor-move border hover:border-red-400">
      <img
        className="md:h-[87px] h-[150px] max-w-full object-cover w-full"
        src={src}
      />
    </div>
  );
};

const DragableImageContainer = () => {
  const inputRef = useRef();
  const {
    state: { defaultImages },
    actions,
  } = useCanvasContext();

  const handleFileSelect = (event) => {
    const files = Array.from(event?.target?.files ?? event?.files);

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onloadend = () => {
        actions.addImage(reader.result);
      };

      reader.readAsDataURL(file);
    });
  };

  const [, drop] = useDrop(() => ({
    accept: [NativeTypes.FILE],
    drop(item) {
      console.log(item);
      handleFileSelect(item);
    },
  }));

  return (
    <div className="">
      <div className="md:h-[80vh] overflow-y-auto">
        <div className="grid grid-cols-2 gap-4  items-start">
          {defaultImages.map((src, index) => (
            <DragableImage key={index} src={src} id={index} />
          ))}
        </div>
      </div>
      <div
        ref={drop}
        onClick={() => inputRef.current.click()}
        className="flex items-center justify-center border border-dashed border-[#4D4747] h-[120px] p-4 text-center md:mt-0 mt-3"
      >
        <input
          type="file"
          ref={inputRef}
          className="hidden"
          multiple={true}
          onChange={handleFileSelect}
        />
        <p>Drop your image or Click here to upload</p>
      </div>
    </div>
  );
};

const DragableText = ({ id, text }) => {
  const [collected, drag, dragPreview] = useDrag(() => ({
    type: "text",
    item: { id, text: "SimpleText" },
  }));

  return (
    <div ref={drag} className="p-4">
      <h1 className="text-2xl font-bold cursor-move">Sample Text</h1>
    </div>
  );
};

const DragableTextContainer = () => {
  return (
    <div className="p-4">
      <DragableText text={"Simple Text"} id="text" />
    </div>
  );
};

const Sidebar = () => {
  const [selected, setSelected] = useState("image");

  const handleSelectedMenu = (name) => {
    setSelected(name);
  };

  return (
    <>
      <div className="md:h-screen md:w-[75px] sm:w-full bg-[#D9D9D9]">
        <ul className="mt-10 p-0 mx-auto">
          <li
            className={`px-4 py-2 cursor-pointer ${
              selected === "image" ? "bg-[#4D4747] text-white" : ""
            }`}
            onClick={() => handleSelectedMenu("image")}
          >
            Image
          </li>
          <li
            className={`px-4 py-2 cursor-pointer ${
              selected === "text" ? "bg-[#4D4747] text-white" : ""
            }`}
            onClick={() => handleSelectedMenu("text")}
          >
            Text
          </li>
        </ul>
      </div>
      <div className="md:h-screen md:w-[250px] sm:w-full bg-[#D9D9D9] p-4">
        {selected === "image" ? (
          <DragableImageContainer />
        ) : (
          <DragableTextContainer />
        )}
      </div>
    </>
  );
};

export default Sidebar;
