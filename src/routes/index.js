import checkToken from "../middlewares/checkToken";
import {UserCtrl, DialogCtrl, MessageCtrl} from "../controllers";
import express from "express";
import userImageUploader from "../middlewares/userImageUploader";

export default (app, io) => {
    const UserController = new UserCtrl(io);
    const DialogController = new DialogCtrl(io);
    const MessageController = new MessageCtrl(io);

    app.use(express.urlencoded({extended: true}));
    app.use(express.json());
    app.use('/uploads', express.static('uploads'));

    require('./passport.js');
    app.post('/api/signup', UserController.signup);
    app.post('/api/signin', UserController.signin);
    app.get('/api/current-user', checkToken, UserController.getCurrentUser);
    app.put('/api/update-image', checkToken, userImageUploader.single('image'), UserController.updateUserImage);
    app.get('/api/dialogs', checkToken, DialogController.getDialog);
    app.post('/api/message', checkToken, MessageController.create);
};