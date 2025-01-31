import React from "react";
import io, { Socket } from 'socket.io-client';

export const socket = io();
export const SocketContext = React.createContext<Socket>(null);
