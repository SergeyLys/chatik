import bcrypt from 'bcrypt';
import {Dialog as DialogsTable, Message as MessagesTable} from '../../models';
import {Sequelize} from "sequelize";

import passport from "passport";
import jwt from "jsonwebtoken";
import config from "../config";

export default class UserController {
    constructor(io) {
        this.io = io;
    }

    getDialog = async (req, res, next) => {
        try {
            const [dialog, created] = await DialogsTable.findOrCreate({
                where: {
                    [Sequelize.Op.or]: [
                        {
                            author: req.token.id,
                            partner: req.query.partnerId
                        },
                        {
                            partner: req.token.id,
                            author: req.query.partnerId
                        }
                    ]
                },
                defaults: {
                    author: req.token.id,
                    partner: req.query.partnerId,
                    messages: []
                }
            });

            const foundDialog = created || dialog;
            const messages = await MessagesTable.findAll({
                where: {
                    dialog: foundDialog.id
                }
            });

            res.status(200).json({
                status: 200,
                dialog: foundDialog,
                messages
            });
        } catch (e) {
            console.log(e);
            res.status(e.status).json({
                message: e.message
            });
        }
    };
}