import { Router } from 'express';

const router = Router();

// Mock users data
let users = [
  { id: 1, name: 'TestUser1' },
  { id: 2, name: 'TestUser2' },
];

router.get('/', (req, res) => {
  res.json(users);
});

router.post('/', (req, res) => {
  const newUser = {
    id: users.length + 1,
    name: req.body.name,
  };
  users.push(newUser);
  res.status(201).send(newUser);
});

router.get('/:id', (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.id));
  if (!user) { res.status(404).send('User not found'); }
  else res.send(user);
});

router.put('/:id', (req, res) => {
  let user = users.find(u => u.id === parseInt(req.params.id));
  if (!user) {
    res.status(404).send('User not found');
  } else {
    user.name = req.body.name;
    res.send(user);
  }
});

router.delete('/:id', (req, res) => {
  const index = users.findIndex(u => u.id === parseInt(req.params.id));
  if (index > -1) {
    users = users.filter(u => u.id !== parseInt(req.params.id));
    res.send(`User with id ${req.params.id} deleted`);
  } else {
    res.status(404).send('User not found');
  }
});

export default router;
