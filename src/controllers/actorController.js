const db = require('../../db');

// let actors = [
//   {
//     id: 1,
//     fullName: 'Meryl Streep',
//     birthYear: 1949,
//     nationality: 'American',
//   },
//   {
//     id: 2,
//     fullName: 'Idris Elba',
//     birthYear: 1972,
//     nationality: 'British',
//   },
//   {
//     id: 3,
//     fullName: 'Penélope Cruz',
//     birthYear: 1974,
//     nationality: 'Spanish',
//   },
//   {
//     id: 4,
//     fullName: 'Ken Watanabe',
//     birthYear: 1959,
//     nationality: 'Japanese',
//   },
// ];

// res.status(200).send(actors);
class ActorController {
  async getActors(req, res) {
    try {
      const actors = await db.query(`
        SELECT full_name, birth_year, actor_id
        FROM actors
        ORDER BY actor_id;`);
      res.json(actors.rows);
    } catch (error) {
      console.log(error);
    }
  }
  async getActorById(req, res) {
    try {
      const {
        params: { id },
      } = req;
      const actor = await db.query(
        `
        SELECT
        actor_id, 
        full_name, 
        birth_year, 
        death_year, 
        foto, 
        nat.description as country 
        FROM actors
        JOIN nationalities as nat 
        USING(nationality_id)
        WHERE actor_id = $1`,
        [id]
      );
      console.log(actor.rows[0]);
      res.json(actor.rows[0]);
    } catch (error) {
      console.log(error);
    }
    // const [actor] = actors.filter((actor) => actor.id === Number(id));
    // if (actor) {
    //   res.status(200).send(actor);
    // } else {
    //   res.status(404).send('Actor not found');
    // }
  }
  async createActor(req, res) {
    try {
      const { full_name, birth_year, death_year, foto, nationality } = req.body;
      const newActor = await db.query(
        `INSERT INTO
        actors (full_name, birth_year, death_year, foto, nationality_id)
        VALUES 
        ($1, $2, $3, $4, (SELECT nationality_id FROM nationalities WHERE title=$5))
        RETURNING *`,
        [full_name, birth_year, death_year, foto, nationality]
      );
      res.json(newActor.rows[0]);
    } catch (error) {
      console.log(error);
    }
    // const newActor = { ...body };
    // actors.push(newActor);
    // res.status(201).send(newActor);
  }
  async updateActor(req, res) {
    try {
      // const {
      //   params: { id },
      // } = req;
      const { full_name, birth_year, death_year, foto, nationality, actor_id } =
        req.body;
      const updatedActor = await db.query(
        `
        UPDATE actors SET full_name=$1, birth_year=$2, death_year=$3, foto=$4, nationality_id=(
        SELECT nationality_id FROM nationalities WHERE title=$5) 
        WHERE actor_id=$6
        RETURNING *`,
        [full_name, birth_year, death_year, foto, nationality, actor_id]
      );
      res.json(updatedActor.rows[0]);
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

  async deleteActor(req, res) {
    try {
      const {
        params: { id },
      } = req;
      const delActor = await db.query(
        `
        DELETE  FROM actors 
        WHERE actor_id=$1
        RETURNING actor_id`,
        [id]
      );
      if (delActor.rows.length > 0) {
        res.json(delActor.rows[0]);
      }
      else{
        res.status(404);
        res.send('actor not found')
      }
    } catch (error) {
      console.log(error);
    }
    // actors = actors.filter((actor) => actor.id !== Number(id));
    // res.status(200).send('Okay');
  }
}

module.exports = new ActorController();
