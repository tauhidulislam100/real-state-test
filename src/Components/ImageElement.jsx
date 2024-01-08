import React, { useContext, useRef } from "react";
import { CanvasContext } from "../context/CanvasProvider";

const ImageElement = (props) => {
  const { content, id } = props;
  const { actions } = useContext(CanvasContext);
  const uploadRef = useRef(null);

  const getBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
      reader.readAsDataURL(file);
    });
  };

  const imageUpload = async (e) => {
    const file = e?.target?.files?.[0];
    if (file) {
      const base64 = await getBase64(file);
      const imageDimensions = await actions.getImageDimensions(base64);
      const { calcWidth, calcHeight } = actions.getAdjustedDimenstions(
        imageDimensions?.nw,
        imageDimensions?.nh,
        150
      );
      actions?.updateCanvasData({
        id,
        content: base64 || "",
        dimension: {
          width: `${calcWidth || 0}`,
          height: `${calcHeight || 0}`,
        },
      });
    }
  };

  const triggerUpload = () => {
    const element = uploadRef?.current;
    if (element) {
      element.click();
    }
  };

  const renderUploadContent = () => {
    return (
      <>
        <div className="image-upload-container" onClick={triggerUpload}>
          <div>Upload Image</div>
        </div>
        <input
          ref={uploadRef}
          type="file"
          id="imageFile"
          name="imageFile"
          accept=".jpg, .png, .jpeg"
          onChange={imageUpload}
        />
      </>
    );
  };

  const renderImage = () => {
    return (
      <div
        style={{
          backgroundImage: `url(${content})`,
          backgroundSize: "contain",
          width: "100%",
          height: "100%",
          backgroundRepeat: "no-repeat",
        }}
      />
    );
  };

  return <>{!content ? renderUploadContent() : renderImage()}</>;
};

export default ImageElement;
