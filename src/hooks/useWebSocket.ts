/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";
import { useAppStore } from "../store/useAppStore";
import { SOCKET_URL } from "../config/env";

export function useWebSocket() {
  const [socket, setSocket] = useState<Socket | null>(null);
  const { accessToken } = useAppStore.getState();
  const listenersRef = useRef<{ [event: string]: (data: any) => void }>({});

  useEffect(() => {
    if (!accessToken) return;

    const newSocket = io(SOCKET_URL, {
      transports: ["websocket"],
      auth: { token: accessToken },
      reconnectionAttempts: 10,
      reconnectionDelay: 5000,
    });

    setSocket(newSocket);

    newSocket.on("connect", () => {
      console.log("Connected to WebSocket server");
      Object.entries(listenersRef.current).forEach(([event, handler]) => {
        // Remove any existing listener before adding a new one
        newSocket.off(event);
        newSocket.on(event, handler);
      });
    });

    newSocket.on("disconnect", (reason) => {
      console.log("Disconnected from WebSocket:", reason);
    });

    newSocket.on("error", (error) => {
      console.error("WebSocket error:", error);
    });

    return () => {
      newSocket.disconnect();
    };
  }, [accessToken]);

  const listen = (event: string, callback: (data: any) => void) => {
    if (socket) {
      // Remove any existing listener before adding a new one
      socket.off(event);
      socket.on(event, callback);
    }
    listenersRef.current[event] = callback;
  };

  const unlisten = (event: string) => {
    if (socket) {
      socket.off(event);
    }
    delete listenersRef.current[event];
  };

  return { listen, unlisten, socket };
}
