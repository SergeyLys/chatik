import bcrypt from 'bcrypt';
import {Message as MessagesTable, Dialog as DialogsTable} from '../../models';
import passport from "passport";
import jwt from "jsonwebtoken";
import config from "../config";

export default class MessageController {
    constructor(io) {
        this.io = io;
    }

    find = async (req, res, next) => {
        try {
            const messages = await MessagesTable.findAll({
                where: {
                    dialog: req.query.dialogId
                }
            });

            res.status(200).json({
                status: 200,
                messages
            });
        } catch (e) {
            res.status(e.status).json({
                message: e.message
            });
        }
    };

    create = async (req, res, next) => {
        try {
            const message = await MessagesTable.create({
                author: req.token.id,
                dialog: req.body.dialogId,
                text: req.body.text,
                readed: false
            });
            
            this.io.emit('broadcast_message', {
                message
            });

            res.status(200).json({
                status: 200,
                message
            });
        } catch (e) {
            res.status(e.status).json({
                message: e.message
            });
        }
    };
}