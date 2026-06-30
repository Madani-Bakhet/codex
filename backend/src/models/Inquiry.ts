import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/database';

export class Inquiry extends Model {
  declare id: number;
  declare name: string;
  declare email: string;
  declare projectDescription: string;
  declare status: 'new' | 'read' | 'resolved';
  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;
}

Inquiry.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true,
      },
    },
    projectDescription: {
      type: DataTypes.TEXT,
      allowNull: false,
      field: 'project_description',
    },
    status: {
      type: DataTypes.ENUM('new', 'read', 'resolved'),
      allowNull: false,
      defaultValue: 'new',
    },
  },
  {
    sequelize,
    tableName: 'inquiries',
  }
);
