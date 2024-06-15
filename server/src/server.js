const express = require('express');
const { faker } = require('@faker-js/faker');
const app = express();
const PORT = 3000;

app.get('/messages/unread', (req, res) => {
    const messages = Array.from({ length: Math.floor(Math.random() * 5) + 1 }, () => ({
        id: faker.datatype.uuid(),
        from: faker.internet.email(),
        subject: faker.lorem.sentence(),
        body: faker.lorem.paragraphs(),
        received: Math.floor(Date.now() / 1000) - Math.floor(Math.random() * 10000)
    }));

    res.json({
        status: 'ok',
        timestamp: Math.floor(Date.now() / 1000),
        messages
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
