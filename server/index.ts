import express, { json } from 'express';
import cors from 'cors';
import { DataTypes, Sequelize } from 'sequelize'
import { User } from "./types/user";
import { LoginBody } from './types/login-body';


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
    website: {
        type: DataTypes.STRING
    },
    userID: {
        type: DataTypes.INTEGER,
        primaryKey: true
    }
}, { timestamps: false, tableName: 'Users'});

app.use(cors());
app.use(json());

app.get('/', (req, res)=> {
    res.send('Api is working');
});

app.post('/login', async (req, res) => {
    const { login, password } = req.body as LoginBody;
    try {
        const finded = await User.findOne({
            where: {
                login,
                password
            }
        });
        if(finded) { 
            res.send(finded);
        } else {
            throw new Error('Such user is not found');
        }    
    } catch {
        res.statusCode = 404;
        res.send('Nothing found');
    }
});

app.get('/users', async (req, res)=> {
    const users = await User.findAll();
    res.send(users);
});

app.listen(5000, () => {
    console.log('Backend api is running on port 5000');
});