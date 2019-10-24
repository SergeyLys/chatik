import io from "socket.io-client";
import {getCookie} from "../helpers/getCookie";

// const socket = io(':5000', {
//     query: {
//         token: getCookie('usertoken', document.cookie)
//     }
// });

class ClientSocket {
    public socket: any;

    constructor() {
        this.socket = null;
    }

    connect() {
        this.socket = io(':5000', {
            query: {
                token: getCookie('usertoken', document.cookie)
            }
        });
    }
}

export const socketInstance = new ClientSocket();