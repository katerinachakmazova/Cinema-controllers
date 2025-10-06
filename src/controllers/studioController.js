const db = require('../../db');

class StudioController {
  async getStudios(req, res) {
    try {
      const studios = await db.query(`
        SELECT title, found_year, logo, studio_id
        FROM studios
        ORDER BY studio_id;`);
      res.json(studios.rows);
    } catch (error) {
      console.log(error);
    }
  }
  async getStudioById(req, res) {
    try {
      const {
        params: { id },
      } = req;
      const studio = await db.query(
        `
        SELECT
        studio_id, 
        studios.title, 
        found_year, 
        logo, 
        loc.title as location,
        FROM studios
        JOIN locations as loc
        USING(location_id)
        WHERE studio_id = $1;`,
        [id]
      );
      res.json(studio.rows[0]);
    } catch (error) {
      console.log(error);
    }
  }
  async createStudio(req, res) {
    try {
      const { title, found_year, logo, location } = req.body;
      const newStudio = await db.query(
        `INSERT INTO
        studios(title, found_year, logo, location_id )
        VALUES 
        ($1, $2, $3, (SELECT location_id FROM locations WHERE title=$4))
        RETURNING *;`,
        [title, found_year, logo, location]
      );
      res.json(newStudio.rows[0]);
    } catch (error) {
      console.log(error);
    }
  }
  async updateStudio(req, res) {
    try {
      const { title, found_year, logo, location, studio_id } = req.body;
      const updatedStudio = await db.query(
        `
        UPDATE studios SET title=$1, found_year=$2, logo=$3, location_id=(
        SELECT location_id FROM locations WHERE title=$4)
        WHERE studio_id=$5
        RETURNING *;`,
        [title, found_year, logo, location, studio_id]
      );
      if (updatedStudio.rows.length > 0) {
        res.json(updatedStudio.rows[0]);
      } else {
        res.status(404);
        res.send('studio not found');
      }
    } catch (error) {
      console.log(error);
    }
  }

  async deleteStudio(req, res) {
    try {
      const {
        params: { id },
      } = req;
      const delStudio = await db.query(
        `
        DELETE  FROM studios
        WHERE studio_id=$1
        RETURNING *;`,
        [id]
      );
      if (delStudio.rows.length > 0) {
        res.json(delStudio.rows[0]);
      } else {
        res.status(404);
        res.send('Studio not found');
      }
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = new StudioController();
