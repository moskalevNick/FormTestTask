import express from 'express';
import cors from 'cors';
const PORT = process.env.PORT || 5000;
const app = express();
app.use(express.json());
app.use(
  cors({
    origin: ['http://localhost:3001', 'http://localhost:3000'],
  })
);

app.post('/submitForm', (req, res) => {
  console.log(req.body);
  const { username, email, phone, birthday, message } = req.body;

  if (
    username !== '' &&
    email !== '' &&
    phone !== '' &&
    birthday !== '' &&
    message !== ''
  ) {
    return res.status(200).json({ message: 'success' });
  } else {
    const emptySlot = [username, email, phone, birthday, message].find(
      (el) => el === ''
    );

    return res.status(400).json({ message: `error`, errorField: emptySlot });
  }
});

app.listen(PORT, () => {
  console.log(`Server has been started on port ${PORT}...`);
});
