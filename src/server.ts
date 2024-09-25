import express from "express";

import { AddressInfo } from "net";
import { Server } from "http";

import config from "./config";

import mongoDBConnect from "./loaders/mongoose";
import defineAPIRoutes from "./loaders/routes";

import { generalLogger } from "./utils/logger";
import { HandleError } from "./utils/exception";

// import WebSocket from 'ws';
// import { nanoid } from "nanoid/non-secure";

let connection: Server;

export default async function startApplicationServer(): Promise<AddressInfo> {
  const expressApp = express();
  // const server = http.createServer(expressApp);
  // const wss = new WebSocket.Server({ server });

  // wss.on("connection", (ws: WebSocket) => {
  //   ws.send(nanoid());

  //   ws.on("message", (message: any) => {
  //     ws.send(message);
  //   });
  // });

  defineAPIRoutes(expressApp);

  const APIAddress = await setupConnections(expressApp);
  return APIAddress;
}

const setupConnections = async (
  expressApp: express.Application
): Promise<AddressInfo> => {
  return new Promise((resolve, reject) => {
    connection = expressApp.listen(config.PORT, async () => {
      try {
        await mongoDBConnect();
        generalLogger.info("Mongodb connected");
        resolve(connection.address() as AddressInfo);
      } catch (error) {
        reject(HandleError(error));
      }
    });
  });
};
