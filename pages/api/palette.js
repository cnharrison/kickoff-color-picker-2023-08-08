import knex from "../../clients/knex";

export default async (req, res) => {
  if (req.method === "PUT" && req.body.uuid) {
    const uuid = req.body.uuid;
    const newColors = req.body.colors;
    const existingPalette = await knex("palettes").where({ palette_id: uuid });

    try {
      if (existingPalette.length) {
        await Promise.all(
          existingPalette.map(({ id }, index) =>
            knex("palettes")
              .where({ id })
              .update({
                r: newColors[index].r ?? 0,
                g: newColors[index].g ?? 0,
                b: newColors[index].b ?? 0,
              }),
          ),
        );
      } else {
        await Promise.all(
          newColors.map((color) =>
            knex("palettes").insert({
              palette_id: uuid,
              r: color.r ?? 0,
              g: color.g ?? 0,
              b: color.b ?? 0,
            }),
          ),
        );
      }

      const updatedColors = await knex("palettes").where({ palette_id: uuid });
      res.status(200).json(updatedColors);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Error updating palette" });
    }
  } else if (req.method === "GET" && req.query.palette_id) {
    const palette_id = req.query.palette_id;
    const palette = await knex("palettes")
      .select("palette_id", "r", "g", "b")
      .where({ palette_id: palette_id });

    if (palette === null) {
      res
        .status(404)
        .json({ error: `palette with id ${req.query.palette_id} not found` });
      return;
    }

    res.status(200).json(palette);
  } else if (req.method === "GET") {
    const palette = await knex("palettes").select("palette_id", "r", "g", "b");
    res.status(200).json(palette);
  } else if (req.method === "POST") {
    const uuid = req.body.uuid;
    const colors = req.body.colors;

    await Promise.all(
      colors.map((color) =>
        knex("palettes").insert({
          palette_id: uuid,
          r: color.r ?? 0,
          g: color.g ?? 0,
          b: color.b ?? 0,
        }),
      ),
    );

    const insertedColors = await knex("palettes").where({ palette_id: uuid });

    res.status(200).json(insertedColors);
  } else {
    res.status(404).json({ error: `${req.method} endpoint does not exist` });
  }
};
