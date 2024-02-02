import app from "./app.js"
import dotenv from "dotenv";

//dot env confog
dotenv.config();

//environment varable
const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
    console.log(`server running at port ${PORT}...`);
})