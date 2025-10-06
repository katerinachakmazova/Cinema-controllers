const db = require('../../db');

class MovieController {
  async getMovies(req, res) {
    try {
      const movies = await db.query(`
        SELECT title, release_year, movie_id, poster
        FROM movies
        ORDER BY movie_id;`);
      res.json(movies.rows);
    } catch (error) {
      console.log(error);
    }
  }
  async getMovieById(req, res) {
    try {
      const {
        params: { id },
      } = req;
      const movie = await db.query(
        `
        SELECT
        movie_id, 
        movies.title, 
        release_year, 
        poster, 
        stu.title as studio,
        gen.title as genre
        FROM movies
        JOIN studios as stu
        USING(studio_id)
        JOIN genres as gen
        USING (genre_id)
        WHERE movie_id = $1;`,
        [id]
      );
      if (movie.rows.length > 0) {
        res.json(movie.rows[0]);
      } else {
        res.status(404);
        res.send('movie not found');
      }
    } catch (error) {
      console.log(error);
    }
  }
  async createMovie(req, res) {
    try {
      const { title, release_year, poster, studio, genre } = req.body;
      const newMovie = await db.query(
        `INSERT INTO
        movies ( title, release_year, poster, studio_id, genre_id )
        VALUES 
        ($1, $2, $3,
        (SELECT studio_id FROM studios WHERE title=$4), (SELECT genre_id FROM genres WHERE title=$5))
        RETURNING *`,
        [title, release_year, poster, studio, genre]
      );
      res.json(newMovie.rows[0]);
    } catch (error) {
      console.log(error);
    }
  }
  async updateMovie(req, res) {
    try {
      const { title, release_year, poster, studio, genre, movie_id } = req.body;
      const updatedMovie = await db.query(
        `
        UPDATE movies SET title=$1, release_year=$2, poster=$3, studio_id=(
        SELECT studio_id FROM studios WHERE title=$4), genre_id=(
        SELECT genre_id FROM genres WHERE title=$5)
        WHERE movie_id=$6
        RETURNING *`,
        [title, release_year, poster, studio, genre, movie_id]
      );
      if (updatedMovie.rows.length > 0) {
        res.json(updatedMovie.rows[0]);
      } else {
        res.status(404);
        res.send('movie not found');
      }
    } catch (error) {
      console.log(error);
    }
  }

  async deleteMovie(req, res) {
    try {
      const {
        params: { id },
      } = req;
      const delMovie = await db.query(
        `
        DELETE  FROM movies 
        WHERE movie_id=$1
        RETURNING *`,
        [id]
      );
      if (delMovie.rows.length > 0) {
        res.json(delMovie.rows[0]);
      } else {
        res.status(404);
        res.send('movie not found');
      }
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = new MovieController();
