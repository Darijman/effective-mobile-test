import { app } from "./app";

const PORT = 9000;

app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});
