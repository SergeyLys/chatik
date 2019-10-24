import bcrypt from 'bcrypt';
import {User as UsersTable} from '../../models';
import passport from "passport";
import jwt from "jsonwebtoken";
import config from "../config";

export default class UserController {
    constructor(io) {
        this.io = io;
    }

    signup = async (req, res, next) => {
        if (!req.body.email || !req.body.password) {
            return res.status(401).json({
                message: !req.body.email ? 'Email is required' : 'Password is required'
            });
        }

        try {
            const hash = await bcrypt.hash(req.body.password, 10);
            const [user, created] = await UsersTable.findOrCreate({
                where: {email: req.body.email},
                defaults: {
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    email: req.body.email,
                    password: hash,
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString()
                }
            });

            if (!created) {
                throw {
                    status: 409,
                    message: 'User with this email already exist'
                };
            }

            return res.json({
                status: 201,
                message: 'User created',
                data: {
                    user
                },
                token: jwt.sign({id: user.id}, config.secret, {expiresIn: config.tokenExpiration})
            });
        } catch (e) {
            return res.status(e.status).json({
                message: e.message
            });
        }
    }

    signin = async (req, res) => {
        passport.authenticate('local', {session: false}, (err, user, info) => {
            if (err) {
                return res.status(err.status).json({
                    message: err.message
                });
            }
            req.login(user, {session: false}, (err) => {
                if (err) {
                    res.status(err.status).json({
                        message: err.message
                    });
                }
                return res.status(200).json({
                    message: 'OK',
                    user: {
                        id: user.id,
                        createdAt: user.createdAt,
                        updatedAt: user.updatedAt,
                        email: user.email,
                        image: user.image
                    },
                    token: jwt.sign({id: user.id}, config.secret, {expiresIn: config.tokenExpiration})
                });
            });
        })(req, res);
    };

    getCurrentUser = async (req, res, next) => {
        try {
            const {token} = req;
            const user = await UsersTable.findOne({where: {id: token.id}});

            if (!user) throw {status: 404, message: 'User not found'};

            return res.status(200).json({
                id: user.id,
                email: user.email,
                createdAt: user.createdAt,
                updatedAt: user.updatedAt,
                image: user.image
            });
        } catch (e) {
            return res.status(e.status).json({
                message: e.message
            });
        }
    };

    updateUserImage = async (req, res, next) => {
        try {
            const {token, file: {filename}} = req;
            const [rowUpdate, [user]] = await UsersTable.update(
                {image: `http://localhost:${config.port}/uploads/${filename}`},
                {returning: true, where: {id: token.id}}
            );

            if (!user) throw {status: 404, message: 'User not found'};

            return res.status(200).json({
                email: user.email,
                createdAt: user.createdAt,
                updatedAt: user.updatedAt,
                image: user.image
            });
        } catch (e) {
            return res.status(e.status).json({
                message: e.message
            });
        }
    };
}