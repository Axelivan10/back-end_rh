import {Model, DataTypes} from 'sequelize';
import {DatabaseConfig} from '../config/database.js';

export class ColaboradorModel extends Model {}

ColaboradorModel.init({
    id:{
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
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
    img:{
        type: DataTypes.STRING (250),
        allowNull: true
    },
    puesto:{
        type: DataTypes.STRING (60),
        allowNull: true
    },
    numberMsp:{
        type: DataTypes.STRING (10),
        allowNull: true
    },
    rfc:{
        type: DataTypes.STRING (15),
        allowNull: true
    },
    curp:{
        type: DataTypes.STRING (20),
        allowNull: true
    },
    place:{
        type: DataTypes.STRING (40),
        allowNull: true
    },
    salary:{
        type: DataTypes.STRING (20),
        allowNull: true
    },
    hired:{
        type: DataTypes.DATEONLY,
        allowNull: true
    },
    birth:{
        type: DataTypes.DATEONLY,
        allowNull: true
    },
    tel:{
        type: DataTypes.STRING (20),
        allowNull: true
    },
    lastname:{
        type: DataTypes.STRING (40),
        allowNull: true
    },
    country:{
        type: DataTypes.STRING (50),
        allowNull: true
    },
    direction:{
        type: DataTypes.STRING (100),
        allowNull: true
    },
},  {
    sequelize: DatabaseConfig,
    tableName: 'colaboradores',
    timestamps: false
}

);