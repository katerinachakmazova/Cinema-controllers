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


// class ActorController {
//   getActors(req, res) {
//     res.status(200).send(actors);
//   }
//   getActorById(req, res) {
//     const {
//       params: { id },
//     } = req;
//     const [actor] = actors.filter((actor) => actor.id === Number(id));
//     if (actor) {
//       res.status(200).send(actor);
//     } else {
//       res.status(404).send('Actor not found');
//     }
//   }
//   createActor(req, res) {
//     const { body } = req;
//     console.log(body);
//     const newActor = { ...body };
//     actors.push(newActor);
//     res.status(201).send(newActor);
//   }
//   updateActor(req, res) {
//     const {
//       params: { id },
//     } = req;
//     const { body } = req;
//     const newActors = actors.map((actor) =>
//       actor.id === Number(id) ? body : actor
//     );
//     console.log(newActors);
//     actors = newActors;
//     res.status(201).send(body);
//   }
//   deleteActor(req, res) {
//     const {
//       params: { id },
//     } = req;
//     actors = actors.filter((actor) => actor.id !== Number(id));
//     res.status(200).send('Okay');
//   }
// }

// module.exports = new ActorController();
