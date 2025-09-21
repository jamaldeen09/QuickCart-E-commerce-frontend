"use client"
import React, { useEffect } from "react";
import { socket } from "../config/socketConfig";
import { useAppDispatch } from "../redux/reduxTypes";
import { setTrigger } from "../redux/triggers/triggers";
import { WebSocketClient } from "../api/webSocket";
import { ConfiguredProfilePayload, getProfile, setFetching } from "../redux/data/profileSlice";


const SocketProvider = ({
    children
}: { children: React.ReactNode }): React.ReactNode => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        // Move functions inside useEffect to avoid dependency issues
        const extractProfile = (data: ConfiguredProfilePayload) => {
            dispatch(getProfile(data));
            dispatch(setFetching(false));
        }

        const fetching = (state: boolean) => {
            dispatch(setFetching(state));
        }

        if (!socket.connected) {
            console.log("Attempting to connect to websocket");
            socket.connect();
        } else {
            console.log("Websocket connected");
        }

        const handleDisconnect = () => {
            console.log("Websocket connection disconnected");
            dispatch(setTrigger({ key: "connectionToast", value: true }));
            dispatch(setFetching(false));
        }

        socket.on("connect_error", (err) => {
            console.error("Socket connect_error", err.message) 
            dispatch(setFetching(false));
        });
        socket.on("disconnect", handleDisconnect);
        const cleanupProfile = WebSocketClient.receiveProfileInformation(extractProfile, fetching);

        return () => {
            socket.off("connect_error", (err) => console.error("Socket connect_error", err.message));
            socket.off("disconnect", handleDisconnect);
            cleanupProfile();
        }
    }, [dispatch]); // Only dispatch is needed as dependency now
    
    return children;
};

export default SocketProvider;