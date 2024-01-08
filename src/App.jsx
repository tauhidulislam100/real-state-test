import { useDrop } from "react-dnd";
import CanvasContainer from "./CanvasContainer";
import { useCanvasContext } from "./hooks/useCanvasContext";
import Sidebar from "./Components/Sidebar";

function App() {
  const { actions } = useCanvasContext();
  const [, drop] = useDrop({
    accept: ["image", "text"],
    drop: handleDrop,
  });

  async function handleDrop(item) {
    if (item.type === "image") {
      const imageDimensions = await actions.getImageDimensions(item.src);
      const { calcWidth, calcHeight } = actions.getAdjustedDimenstions(
        imageDimensions?.nw,
        imageDimensions?.nh,
        150
      );
      actions?.addElement("IMAGE", item.src, {
        dimension: {
          width: `${calcWidth || 0}`,
          height: `${calcHeight || 0}`,
        },
      });
    } else {
      actions?.addElement();
    }
  }

  return (
    <div className="min-h-screen flex md:flex-row flex-col gap-4">
      <Sidebar />
      <div className="h-screen flex-1 pr-4" ref={drop}>
        <CanvasContainer />
      </div>
    </div>
  );
}

export default App;
