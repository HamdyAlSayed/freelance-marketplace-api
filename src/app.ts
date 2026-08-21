import express from "express";

const app = express();

app.get("/", (req, res) => {
    res.send("Gig Board API is running");
});

export default app;