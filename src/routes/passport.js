import passport from 'passport';
import bcrypt from 'bcrypt';
import {Strategy} from 'passport-local';
import JWTStrategy from 'passport-jwt';
// import users from "../../data/users";
import config from '../config';
import {User as UsersTable} from '../../models';

passport.use(new Strategy({
        usernameField: 'email'
    },
    async (email, password, cb) => {
        const user = await UsersTable.findOne({where: {email}});

        if (!user) {
            return cb({status: 404, message: 'User not found'}, null, {});
        }

        const compare = await bcrypt.compare(password, user.password);

        if (!compare) {
            return cb({status: 401, message: 'Authentication failed. Invalid password.'}, null, {});
        }

        return cb(null, user, {message: 'Logged In Successfully'});
    }
));

// passport.use(JWTStrategy.Strategy({
//     jwtFromRequest: JWTStrategy.ExtractJwt,
//     secretOrKey: config.secret
// }, (jwtPayload, cb) => {
//     console.log(jwtPayload);
// }));