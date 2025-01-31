import {AppServer} from "./server/appServer";

const port = 3301;

const server = new AppServer();
server.start(port);
