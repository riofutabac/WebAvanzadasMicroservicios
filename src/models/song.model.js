import { Sequelize, DataTypes } from 'sequelize';
import dotenv from 'dotenv';
dotenv.config();

let sequelize;

// Conexión dinámica según entorno
if (process.env.DB_CLIENT === 'postgres') {
  sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
    dialectOptions: { 
      ssl: { 
        require: true, 
        rejectUnauthorized: false 
      } 
    },
    logging: false
  });
} else {
  sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: process.env.DB_FILE || 'database.sqlite',
    logging: false
  });
}

// Modelo Song basado en TBL_SONG del script SQL
export const Song = sequelize.define('Song', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: 'id'
  },
  name: {
    type: DataTypes.STRING(200),
    allowNull: false,
    field: 'name'
  },
  path: {
    type: DataTypes.STRING(500),
    allowNull: false,
    field: 'path'
  },
  plays: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    allowNull: false,
    field: 'plays'
  }
}, {
  tableName: 'TBL_SONG',
  timestamps: false
});

export default sequelize;