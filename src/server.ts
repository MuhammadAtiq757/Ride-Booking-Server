import { Server } from "http";
import mongoose from "mongoose";
import app from "./app";

let server: Server;



const startServer = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://muhammadatiq757:vcm5WBVx5dyg8JNs@cluster0.pfpfkus.mongodb.net/Ride-Booking?retryWrites=true&w=majority&appName=Cluster0"
    );

    console.log("Connected to DB!!");
    server = app.listen(5000, () => {
      console.log("Server is listening to port 5000");
    });
  } catch (error) {
    console.log(error);
  }
};

startServer();


// 1. unhandled rejection error
process.on("unhandledRejection", (err) => {
  console.log("unhandled Rejection detected... server sutting down..", err)
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }

  process.exit(1);
});


// 2. uncaught rejection error
process.on("uncaughtException", (err) => {
  console.log("uncaught exceptional error detected... server sutting down..", err)
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }

  process.exit(1);
});


// 3. signal termination (sigterm) error
process.on("SIGTERM", () => {
  console.log("SIGTERM Signal Rechived... server sutting down..")
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }

  process.exit(1);
});


