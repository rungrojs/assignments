const express = require('express');
import DbInitializer from './src/models/db-initializer';
import toDoListRoutes from './src/routes/todolist';

const app = express();
const port = 3000;

// Initalize model in In-memory DB
DbInitializer.Initial();

app.use(express.json());

// Routes
app.use('/api/todolist', toDoListRoutes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});