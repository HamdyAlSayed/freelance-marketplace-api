import app from "./app";
import { config } from "./config/env";
import { connectDB } from "./config/db";

connectDB().catch((err) => console.error("Database connection error:", err));

app.listen(config.port, () => {
  console.log(`Server running on http://localhost:${config.port}`);
  console.log(`Swagger docs: http://localhost:${config.port}/api-docs`);
});

export default app;