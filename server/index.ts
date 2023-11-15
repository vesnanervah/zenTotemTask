import express, { json } from 'express';
import cors from 'cors';
import crypto from 'crypto';
import { DataTypes, Sequelize } from 'sequelize'
import { User } from "./types/user";
import { LoginBody } from './types/login-body';
import { RegisterBody } from './types/register-body';
import { AuthBody } from './types/auth-body';


const app = express();
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './sqlite.db'
});
const User = sequelize.define('User', {
    login: {
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
        type: DataTypes.NUMBER,
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
        primaryKey: true
    }
}, { timestamps: false, tableName: 'Users'});
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
            login: data.login
        }
    });    
    if (authTokens.get(data.login) === data.token && finded) {
        res.send(finded.toJSON());
    } else {
        res.statusCode = 401;
        res.send('Unkown user. Token doesnt exist/expired or user not found.');
    }
});

app.post('/login', async (req, res) => {
    const { login, password } = req.body as LoginBody;
    try {
        const finded = await User.findOne({
            where: {
                login,
                password: makeHashPass(password)
            }
        });
        if(finded) { 
            const token = createToken();
            authTokens.set(login, token);
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
        const { login, password } = req.body as RegisterBody;
        const newUser = await User.create({
            login,
            password: makeHashPass(password),
            firstName: 'Анонимный',
            lastName: 'Пользователь',
            phone: 9999999999,
            website: null,
            role: 'base'
        });
        const token = createToken(); 
        authTokens.set(login, token); // TODO: Delete password from answer
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