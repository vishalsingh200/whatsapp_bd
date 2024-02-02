import app from "./app.js"


//environment varable
const PORT = process.env.PORT || 8000;


app.listen(PORT, () => {
    console.log(`server running at port ${PORT}...`);
})