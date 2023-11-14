import axios from "axios";
import { useCallback, useEffect, useMemo, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import ColorPicker from "../components/colorPicker/colorPicker";

const defaultEmptyRGBColorsState = [{}, {}, {}, {}, {}];

const Home = () => {
  const [RGBcolors, setRGBColors] = useState(defaultEmptyRGBColorsState);
  const [isEmptyAndBlurred, setIsEmptyAndBlurred] = useState(true);
  const [paletteIds, setPaletteIds] = useState([]);
  const [selectedPaletteId, setSelectedPaletteId] = useState();
  const [isModified, setIsModified] = useState(false);

  const setRGBValue = useCallback(
    (RGBkey, RGBvalue, index) => {
      setRGBColors((prevState) =>
        prevState.map((color, innerIndex) =>
          innerIndex === index ? { ...color, [RGBkey]: RGBvalue } : color,
        ),
      );
      setIsModified(true);
    },
    [setRGBColors],
  );

  const saveRGBValues = async () => {
    const { status } = await axios.post("/api/palette", {
      uuid: uuidv4(),
      colors: RGBcolors,
    });
    if (status === 200) {
      setSelectedPaletteId(uuid);
      setIsModified(false);
    } else {
      throw new Error("Error connecting to server");
    }
  };

  const handleSavePalette = async () => {
    const { status, data } = await axios.put("/api/palette", {
      uuid: selectedPaletteId ?? uuidv4(),
      colors: RGBcolors,
    });
    if (status === 200) {
      setSelectedPaletteId(selectedPaletteId ?? data[0].palette_id);
      setIsModified(false);
    }
  };

  useEffect(() => {
    const fetchPalette = async () => {
      const { status, data } = await axios.get(
        `/api/palette?palette_id=${selectedPaletteId}`,
      );
      if (status === 200) {
        setRGBColors(data.map(({ uuid, ...rest }) => rest));
      } else {
        throw new Error("Error connecting to server");
      }
    };
    if (selectedPaletteId) {
      fetchPalette();
      setIsModified(false);
    } else {
      setRGBColors(defaultEmptyRGBColorsState);
    }
  }, [axios, selectedPaletteId, setRGBColors, setIsModified]);

  useEffect(() => {
    const fetchPalettes = async () => {
      const { status, data } = await axios.get("/api/palette");
      if (status === 200) {
        setPaletteIds([...new Set(data.map((palette) => palette.palette_id))]);
      } else {
        throw new Error("Error connecting to server");
      }
    };
    fetchPalettes();
  }, [axios, setRGBValue, selectedPaletteId]);

  const isEmpty = useMemo(
    () =>
      RGBcolors.map((color) => Object.keys(color).length === 0).every(Boolean),
    [RGBcolors],
  );

  const handlePaletteIdChange = (event) => {
    setSelectedPaletteId(
      event.target.value === "" ? undefined : event.target.value,
    );
  };

  return (
    <>
      {paletteIds.length > 0 && (
        <select onChange={handlePaletteIdChange} value={selectedPaletteId}>
          <option value="">Select a Palette</option>
          {paletteIds.map((id) => (
            <option key={id} value={id}>
              {id}
            </option>
          ))}
        </select>
      )}

      {isEmpty && isEmptyAndBlurred && paletteIds.length === 0 && (
        <p>No saved palletes found. Click anywhere below to add one.</p>
      )}

      {RGBcolors.map((color, index) => (
        <ColorPicker
          RGBcolor={color}
          setRGBValue={setRGBValue}
          saveRGBValues={saveRGBValues}
          isEmpty={isEmpty}
          isEmptyAndBlurred={isEmptyAndBlurred}
          setIsEmptyAndBlurred={setIsEmptyAndBlurred}
          index={index}
          key={index}
        />
      ))}
      {!isEmpty && (
        <button onClick={isModified ? () => handleSavePalette() : () => {}}>
          {isModified
            ? "Palette not saved ❌"
            : `Palette saved as ${selectedPaletteId} ✔️`}
        </button>
      )}
    </>
  );
};

export default Home;
