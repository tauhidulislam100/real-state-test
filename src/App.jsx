import { useRef, useState } from "react";
import { useDrop, useDrag } from "react-dnd";
import { Rnd } from "react-rnd";
import { NativeTypes } from "react-dnd-html5-backend";

const DragableImage = ({ id, type = "image", src, didDrop }) => {
  const [collected, drag, dragPreview] = useDrag(() => ({
    type: type,
    item: { id, type, src },
  }));

  return (
    <div ref={drag} className="">
      <img className="h-[87px] max-w-full object-cover" src={src} />
    </div>
  );
};

const DragableImageContainer = () => {
  const inputRef = useRef();
  const [images, setImages] = useState(
    Array(6).fill(
      "https://dfstudio-d420.kxcdn.com/wordpress/wp-content/uploads/2019/06/digital_camera_photo-1080x675.jpg"
    )
  );

  const handleFileSelect = (event) => {
    const files = Array.from(event?.target?.files ?? event?.files);

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onloadend = () => {
        setImages((prevImages) => [...prevImages, reader.result]);
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
      <div className="h-[80vh] overflow-y-auto">
        <div className="grid grid-cols-2 gap-4  items-start">
          {images.map((src, index) => (
            <DragableImage key={index} src={src} id={index} />
          ))}
        </div>
      </div>
      <div
        ref={drop}
        onClick={() => inputRef.current.click()}
        className="flex items-center justify-center border border-dashed border-[#4D4747] h-[120px] p-4 text-center"
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

const RndElement = ({ children, bounds }) => {
  const [state, setState] = useState({
    width: 200,
    height: 200,
    x: 0,
    y: 0,
  });

  return (
    <Rnd
      bounds={bounds}
      size={{
        width: state.width,
        height: state.height,
      }}
      position={{
        x: state.x,
        y: state.y,
      }}
      onDragStop={(e, d) => {
        setState({ ...state, x: d.x, y: d.y });
      }}
      onResize={(e, direction, ref, delta, position) => {
        setState({
          width: ref.offsetWidth,
          height: ref.offsetHeight,
          ...position,
        });
      }}
    >
      {children}
    </Rnd>
  );
};

const DragableTextContainer = () => {
  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold">Heading 1</h1>
      <h2 className="text-2xl font-bold">Subheading 2</h2>
      <h3 className="text-xl font-bold">Subheading 3</h3>
      <h4 className="text-lg font-bold">Subheading 4</h4>
      <h5 className="text-base font-bold">Subheading 5</h5>
      <h6 className="text-sm font-bold">Subheading 6</h6>
    </div>
  );
};
function App() {
  const [selected, setSelected] = useState("image");
  const [boundaryElm, setBoundaryElm] = useState();
  const [, drop] = useDrop({
    accept: ["image", "text"],
    drop: handleDrop,
  });

  const [dropedImages, setDropedImages] = useState([]);

  const handleSelectedMenu = (name) => {
    setSelected(name);
  };

  function handleDrop(item) {
    if (item.type === "image") {
      dropedImages.push(item);
      setDropedImages([...dropedImages]);
    }
  }

  return (
    <div className="min-h-screen flex  gap-4">
      <div className="h-screen w-[75px] bg-[#D9D9D9]">
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
      <div className="h-screen w-[250px] bg-[#D9D9D9] p-4">
        {selected === "image" ? (
          <DragableImageContainer />
        ) : (
          <DragableTextContainer />
        )}
      </div>
      <div className="h-screen flex-1" ref={drop}>
        <div className="h-screen w-full" ref={(elm) => setBoundaryElm(elm)}>
          {dropedImages.map((item, index) => (
            <RndElement key={index} bounds={boundaryElm}>
              <img
                src={item.src}
                className="max-w-full object-cover w-full"
                style={{
                  userDrag: "none",
                  userSelect: "none",
                  MozUserSelect: "none",
                  WebkitUserDrag: "none",
                  WebkitUserSelect: "none",
                  MsUserSelect: "none",
                }}
              />
            </RndElement>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
