const db = require('../../db');

class DirectorController {
  async getDirectors(req, res) {
    try {
      const directors = await db.query(`
        SELECT full_name, birth_year, director_id
        FROM directors
        ORDER BY director_id;`);
      res.json(directors.rows);
    } catch (error) {
      console.log(error);
    }
  }
  async getDirectorById(req, res) {
    try {
      const {
        params: { id },
      } = req;
      const director = await db.query(
        `
        SELECT
        director_id, 
        full_name, 
        birth_year, 
        death_year, 
        foto, 
        nat.description as country 
        FROM directors
        JOIN nationalities as nat 
        USING(nationality_id)
        WHERE director_id = $1`,
        [id]
      );
      res.json(director.rows[0]);
    } catch (error) {
      console.log(error);
    }
  }
  async createDirector(req, res) {
    try {
      const { full_name, birth_year, death_year, foto, nationality } = req.body;
      const newDirector = await db.query(
        `INSERT INTO
        directors (full_name, birth_year, death_year, foto, nationality_id)
        VALUES 
        ($1, $2, $3, $4, (SELECT nationality_id FROM nationalities WHERE title=$5))
        RETURNING *`,
        [full_name, birth_year, death_year, foto, nationality]
      );
      res.json(newDirector.rows[0]);
    } catch (error) {
      console.log(error);
    }
  }
  async updateDirector(req, res) {
    try {
      const { full_name, birth_year, death_year, foto, nationality, director_id } =
        req.body;
      const updatedDirector = await db.query(
        `
        UPDATE directors SET full_name=$1, birth_year=$2, death_year=$3, foto=$4, nationality_id=(
        SELECT nationality_id FROM nationalities WHERE title=$5) 
        WHERE director_id=$6
        RETURNING *`,
        [full_name, birth_year, death_year, foto, nationality, director_id]
      );
      res.json(updatedDirector.rows[0]);
    } catch (error) {
      console.log(error);
    }
    // const newActors = actors.map((actor) =>
    //   actor.id === Number(id) ? body : actor
    // );
    // console.log(newActors);
    // actors = newActors;
    // res.status(201).send(body);
  }

  async deleteDirector(req, res) {
    try {
      const {
        params: { id },
      } = req;
      const delDirector = await db.query(
        `
        DELETE  FROM directors 
        WHERE director_id=$1
        RETURNING director_id`,
        [id]
      );
      if (delDirector.rows.length > 0) {
        res.json(delDirector.rows[0]);
      }
      else{
        res.status(404);
        res.send('actor not found')
      }
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = new DirectorController();
