import React from "react";

import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export const sizeList = [
  "8px",
  "9px",
  "10px",
  "11px",
  "12px",
  "14px",
  "16px",
  "18px",
  "20px",
  "72px",
];

export const fontList = [
  "Arial",
  "Arial Black",
  "Arial Unicode MS",
  "Calibri",
  "Cambria",
  "Cambria Math",
  "Candara",
  `Segoe UI, wf_segoe-ui_normal, helvetica, arial, sans-serif`,
  "Comic Sans MS",
  "Consolas",
  "Constantia",
  "Corbel",
  "Courier New",
  "Georgia",
  "Lucida Sans Unicode",
  "Tahoma",
  "Times New Roman",
  "Trebuchet MS",
  "Verdana",
];

export default function Toolbar({ isEditEnable }) {
  const convertDivToPDF = () => {
    const div = document.getElementById("canvas"); // replace with your div ID
    html2canvas(div, {
      // scrollY: -window.scrollY,
      windowWidth: div.scrollWidth,
      windowHeight: div.scrollHeight,
    }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", [canvas.width, canvas.height]);
      pdf.addImage(imgData, "PNG", 0, 0, canvas.width, canvas.height);
      pdf.save("download.pdf");
    });
  };

  return (
    <div className="flex h-[60px]">
      <h3 className=" text-4xl font-bold mt-2">Work Canvas</h3>
      {isEditEnable && (
        <div id="toolbar" className="mx-auto">
          <select className="ql-font">
            {fontList.map((font) => (
              <option key={font} value={font}>
                {font}
              </option>
            ))}
          </select>
          <select className="ql-size">
            {sizeList.map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
          <button className="ql-bold" />
          <button className="ql-italic" />
          <button className="ql-underline" />
          <select className="ql-align" />
          <select className="ql-color" />
          <select className="ql-background" />
        </div>
      )}

      {/* <div className="toolbar-item" onClick={() => addElement("TEXT")}>
        T
      </div>
      <div className="toolbar-item" onClick={() => addElement("IMAGE")}>
        I
      </div> */}
      {/* <button onClick={convertDivToPDF}>Export</button> */}
    </div>
  );
}
