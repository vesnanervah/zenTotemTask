import express, { json } from 'express';
import cors from 'cors';
import crypto from 'crypto';
import { DataTypes, Sequelize, where } from 'sequelize'
import { User } from "./types/user";
import { LoginBody } from './types/login-body';
import { RegisterBody } from './types/register-body';
import { AuthBody } from './types/auth-body';
import { UpdateBody } from './types/update-body';

const app = express();
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './sqlite.db'
});
const User = sequelize.define('User', {
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    firstName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: false
    },
    role: {
        type: DataTypes.STRING,
        allowNull: false
    },
    website: {
        type: DataTypes.STRING
    },
    userID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    }
}, { timestamps: false, tableName: 'User'});
const authTokens: Map<string, string> = new Map ();

app.use(cors());
app.use(json());

app.get('/', (req, res)=> {
    res.send('Api is working');
});

app.post('/auth', async(req, res) => {
    const data = req.body as AuthBody;
    const finded = await User.findOne({
        where: {
            email: data.email
        }
    });    
    if (authTokens.get(data.email) === data.token && finded) {
        res.send(finded.toJSON());
    } else {
        res.statusCode = 404;
        res.send('Unkown user. Token doesnt exist/expired or user not found.');
    }
});

app.post('/login', async (req, res) => {
    const { email, password } = req.body as LoginBody;
    try {
        const finded = await User.findOne({
            where: {
                email,
                password: makeHashPass(password)
            }
        });
        if(finded) { 
            const token = createToken();
            authTokens.set(email, token);
            res.send({
                user: finded,
                token
            }); // TODO: Delete password from answer
        } else {
            throw new Error('Such user is not found');
        }    
    } catch {
        res.statusCode = 404;
        res.send('Nothing found');
    }
});

app.post('/new-user', async (req, res) => {
    try {
        const { email, password } = req.body as RegisterBody;
        const finded = await User.findOne({ where: {email}});
        if (finded) {
            res.statusCode = 409;
            res.send('The email is already taken!');
            return;
        }
        const newUser = await User.create({
            email,
            password: makeHashPass(password),
            firstName: 'Анонимный',
            lastName: 'Пользователь',
            phone: '+79999999999',
            website: null,
            role: 'base'
        });
        const token = createToken(); 
        authTokens.set(email, token); // TODO: Delete password from answer
        console.log(newUser.toJSON())
        res.send({
            user: newUser.toJSON(),
            token
        });
    } catch {
        res.statusCode = 404
        res.send('Incorrect data provided')
    }

});

app.get('/users', async (req, res)=> {
    const users = await User.findAll();
    res.send(users);
});

app.post('/update-user', async(req, res) => {
    try {
        const { userID, name, value } = req.body as UpdateBody;
        await User.update({ [name]:  value }, { where: {userID} });
        const updated = await User.findOne({where: {userID}});
        res.send(updated?.toJSON());
    } catch {
        res.statusCode = 404;
        res.send('Cant update provided user.');
    }
})

app.listen(5000, () => {
    console.log('Backend api is running on port 5000');
});


function makeHashPass(password: string) {
    const sha = crypto.createHash('sha256');
    return sha.update(password).digest('base64');
}

function createToken() {
    return crypto.randomBytes(30).toString('hex');
}