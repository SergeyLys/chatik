import path from 'path';
import express from 'express';
import {createServer} from 'http';
import io from 'socket.io';
import Sequelize from "sequelize";
import config from "./config";
import checkToken from "./middlewares/checkToken";
import createRoutes from './routes';
import {User as UsersTable} from '../models';
import jwt from "jsonwebtoken";

export default function startServer() {
    const app = express();
    const http = createServer(app);
    const sio = io(http);

    const sequelize = new Sequelize('postgres://postgres:nimda@127.0.0.1:5432/testdb');

    sequelize
        .authenticate()
        .then(() => {
            console.log('Connection has been established successfully.');
        })
        .catch(err => {
            console.error('Unable to connect to the database:', err);
        });

    sequelize.sync();

    createRoutes(app, sio);

    if (process.env.NODE_ENV !== 'production') {
        app.get('/*', (req, res) => {
            res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
        });
    }

    sio.on('connect', async (socket) => {
        console.log('user connected');
        const token = socket.handshake.query.token;

        if (token) {
            const sockets = sio.sockets.clients().sockets;

            const currentTokenObject = await jwt.verify(
                token,
                config.secret
            );

            const mapUsers = Object.keys(sockets)
                .map((clientToken) => {
                    const currentToken = sio.sockets.clients().sockets[clientToken].handshake.query.token;
                    return currentToken && currentToken;
                })
                .filter((token) => {
                    return token && token;
                })
                .map(async (currentToken) => {
                    const tokenObject =  await jwt.verify(currentToken, config.secret);
                    return await UsersTable.findOne({where: {id: tokenObject.id}});
                });

            Promise.all(mapUsers).then((users) => {
                const parsedUsers = users.map((user) => {
                    return {
                        id: user.id,
                        email: user.email,
                        image: user.image,
                        firstName: user.firstName,
                        lastName: user.lastName,
                        createdAt: user.createdAt,
                        updatedAt: user.updatedAt
                    }
                });

                socket.emit('connected', {
                    parsedUsers: parsedUsers.filter((user) => {return user.id !== currentTokenObject.id})
                });
                socket.broadcast.emit('user_connected', {
                    parsedUsers: parsedUsers.filter((user) => {return user.id === currentTokenObject.id})
                });
            });

            socket.on('user_disconnected', (data) => {
                socket.broadcast.emit('user_disconnected', data);
            });
        }
    });

    http.listen(config.port || 3000, () => {
        console.log(`Server started up on port ${config.port || 3000}`);
    });
}