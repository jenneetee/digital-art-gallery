const express = require('express');
const path = require('path');
const userRoutes = require('./routes/user');

const app = express();
const port = 3000;

app.use(express.json());

app.use('/api', userRoutes);
app.use(express.static(path.join(__dirname, 'public')));


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});