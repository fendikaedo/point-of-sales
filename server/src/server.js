import Hapi from "@hapi/hapi";
import dotenv from "dotenv";
import routes from "./routes/index.js";

dotenv.config();

const init = async () => {
  const server = Hapi.server({
    port: process.env.PORT || 5000,
    host: "localhost",
    routes: {
      cors: {
        headers: ["Accept", "Content-Type", "Authorization"],
        origin: ["*"], // agar frontend React bisa akses API
      },
    },
  });

  server.route(routes);

  await server.start();
  console.log(`🚀 Server berjalan di ${server.info.uri}`);
};

process.on("unhandledRejection", (err) => {
  console.log(err);
  process.exit(1);
});

init();
