const app = require("./server");
const port = 3000;

app.listen(port, "0.0.0.0", () => {
  console.log(`app listening on port ${port}`);
});
