import { useEffect, useState } from "react";
import { getRandomNumber } from "../../util";

const labelStyle = { marginRight: 5, fontWeight: 500 };

function ColorPicker() {
  const [RGBcolor, setRGBColor] = useState({ r: 0, g: 0, b: 0 });

  const setRGBValue = (key, value) => {
    setRGBColor({ ...RGBcolor, [key]: value });
  };

  useEffect(() => {
    setRGBColor({
      r: getRandomNumber(255),
      g: getRandomNumber(255),
      b: getRandomNumber(255),
    });
  }, []);

  const getSliderLabelsStyle = (key, value) => ({
    display: "flex",
    alignItems: "center",
    color: `rgb(
                ${key === "r" ? value : 0}, 
                ${key === "g" ? value : 0}, 
                ${key === "b" ? value : 0}
            )`,
  });

  return (
    <div
      style={{
        display: "flex",
        border: "1px solid black",
        borderRadius: 3,
        width: "fit-content",
        padding: 5,
        backgroundColor: "#D3D3D3",
      }}
    >
      <div>
        <div style={getSliderLabelsStyle("r", RGBcolor.r)}>
          <label style={labelStyle}>R</label>
          <input
            type="range"
            min="0"
            max="255"
            value={RGBcolor.r}
            onChange={(e) => setRGBValue("r", e.target.value)}
          />
          <p>{RGBcolor.r}</p>
        </div>
        <div style={getSliderLabelsStyle("g", RGBcolor.g)}>
          <label style={labelStyle}>G</label>
          <input
            type="range"
            min="0"
            max="255"
            value={RGBcolor.g}
            onChange={(e) => setRGBValue("g", e.target.value)}
          />
          <p>{RGBcolor.g}</p>
        </div>
        <div style={getSliderLabelsStyle("b", RGBcolor.b)}>
          <label style={labelStyle}>B</label>
          <input
            type="range"
            min="0"
            max="255"
            value={RGBcolor.b}
            onChange={(e) => setRGBValue("b", e.target.value)}
          />
          <p>{RGBcolor.b}</p>
        </div>
      </div>
      <div
        style={{
          backgroundColor: `rgb(${RGBcolor.r}, ${RGBcolor.g}, ${RGBcolor.b})`,
          width: 140,
          height: 140,
          border: "1px dotted black",
          borderRadius: "50%",
          marginLeft: 20,
          alignSelf: "center",
        }}
      ></div>
    </div>
  );
}

export default ColorPicker;
