import express from "express";


//create react app

const app = express();

app.get('/', (req, res) => {
    res.send("hello from server");
});

export default app;