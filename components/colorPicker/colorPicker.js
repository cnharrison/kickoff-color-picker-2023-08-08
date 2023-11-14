const labelStyle = { marginRight: 5, fontWeight: 500 };

function ColorPicker({
  rgbColor,
  setRgbValue,
  isEmpty,
  isEmptyAndBlurred,
  setIsEmptyAndBlurred,
  index,
}) {
  const getSliderLabelsStyle = (rgbKey, rgbValue) => ({
    display: "flex",
    alignItems: "center",
    color: `rgb(
                ${rgbKey === "r" ? rgbValue : 0}, 
                ${rgbKey === "g" ? rgbValue : 0}, 
                ${rgbKey === "b" ? rgbValue : 0}
            )`,
  });

  const rgbColorToUse = isEmpty ? { r: 0, g: 0, b: 0 } : rgbColor;

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
            backgroundColor: `rgb(${rgbColorToUse.r ?? 0}, 
                                  ${rgbColorToUse.g ?? 0}, 
                                  ${rgbColorToUse.b ?? 0})
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
          <div style={getSliderLabelsStyle("r", rgbColorToUse.r)}>
            <label style={labelStyle}>R</label>
            <input
              type="range"
              min="0"
              max="255"
              value={rgbColorToUse.r}
              onChange={(e) => setRgbValue("r", e.target.value, index)}
            />
            <p>{rgbColorToUse.r} </p>
          </div>
          <div style={getSliderLabelsStyle("g", rgbColorToUse.g)}>
            <label style={labelStyle}>G</label>
            <input
              type="range"
              min="0"
              max="255"
              value={rgbColorToUse.g}
              onChange={(e) => setRgbValue("g", e.target.value, index)}
            />
            <p>{rgbColorToUse.g}</p>
          </div>
          <div style={getSliderLabelsStyle("b", rgbColorToUse.b)}>
            <label style={labelStyle}>B</label>
            <input
              type="range"
              min="0"
              max="255"
              value={rgbColorToUse.b}
              onChange={(e) => setRgbValue("b", e.target.value, index)}
            />
            <p>{rgbColorToUse.b}</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default ColorPicker;
