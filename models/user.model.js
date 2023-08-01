import {Model, DataTypes} from 'sequelize';
import {DatabaseConfig} from '../config/database.js';

export class UserModel extends Model {}

UserModel.init({
    id:{
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        comment: "null",
        autoIncrement: true
    },
    name:{
        type: DataTypes.STRING (60),
        allowNull: true
    },
    email:{
        type: DataTypes.STRING (25),
        allowNull: true
    },
    password:{
        type: DataTypes.STRING(100),
        allowNull: true
    },
},  {
    sequelize: DatabaseConfig,
    tableName: 'users',
    timestamps: false
}

);