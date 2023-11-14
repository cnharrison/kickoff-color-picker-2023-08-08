const labelStyle = { marginRight: 5, fontWeight: 500 };

function ColorPicker({
  RGBcolor,
  setRGBValue,
  isEmpty,
  isEmptyAndBlurred,
  setIsEmptyAndBlurred,
  index,
}) {
  const getSliderLabelsStyle = (RGBkey, RGBvalue) => ({
    display: "flex",
    alignItems: "center",
    color: `rgb(
                ${RGBkey === "r" ? RGBvalue : 0}, 
                ${RGBkey === "g" ? RGBvalue : 0}, 
                ${RGBkey === "b" ? RGBvalue : 0}
            )`,
  });

  const RGBcolorToUse = isEmpty ? { r: 0, g: 0, b: 0 } : RGBcolor;

  return (
    <>
      <div
        style={{
          position: "relative",
          display: "flex",
          border: "1px solid black",
          borderRadius: 3,
          width: "max-content",
          padding: 5,
          backgroundColor: "#D3D3D3",
          filter: isEmpty && isEmptyAndBlurred ? "blur(6px)" : "none",
        }}
        onClick={
          isEmptyAndBlurred ? () => setIsEmptyAndBlurred(false) : () => {}
        }
      >
        <div
          style={{
            backgroundColor: `rgb(${RGBcolorToUse.r ?? 0}, 
                                  ${RGBcolorToUse.g ?? 0}, 
                                  ${RGBcolorToUse.b ?? 0})
                             `,
            width: 140,
            height: 140,
            border: "1px dotted black",
            borderRadius: "50%",
            alignSelf: "center",
            marginRight: 20,
          }}
        ></div>
        <div>
          <div style={getSliderLabelsStyle("r", RGBcolorToUse.r)}>
            <label style={labelStyle}>R</label>
            <input
              type="range"
              min="0"
              max="255"
              value={RGBcolorToUse.r}
              onChange={(e) => setRGBValue("r", e.target.value, index)}
            />
            <p>{RGBcolorToUse.r} </p>
          </div>
          <div style={getSliderLabelsStyle("g", RGBcolorToUse.g)}>
            <label style={labelStyle}>G</label>
            <input
              type="range"
              min="0"
              max="255"
              value={RGBcolorToUse.g}
              onChange={(e) => setRGBValue("g", e.target.value, index)}
            />
            <p>{RGBcolorToUse.g}</p>
          </div>
          <div style={getSliderLabelsStyle("b", RGBcolorToUse.b)}>
            <label style={labelStyle}>B</label>
            <input
              type="range"
              min="0"
              max="255"
              value={RGBcolorToUse.b}
              onChange={(e) => setRGBValue("b", e.target.value, index)}
            />
            <p>{RGBcolorToUse.b}</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default ColorPicker;
