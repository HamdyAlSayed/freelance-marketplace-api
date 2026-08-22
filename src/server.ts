import app from "./app";
import { config } from "./config/env";
import { connectDB } from "./config/db";

const startServer = async () => {
  await connectDB();

  app.listen(config.port, () => {
    console.log(`Server is running on port ${config.port}`);
  });
};

startServer();

export default app;