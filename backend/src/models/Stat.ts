import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/database';

export class Stat extends Model {
  declare id: number;
  declare key: string;
  declare value: number;
  declare suffix: string;
  declare labelEn: string;
  declare labelAr: string;
  declare displayOrder: number;
  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;
}

Stat.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    key: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    value: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    suffix: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    labelEn: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'label_en',
    },
    labelAr: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'label_ar',
    },
    displayOrder: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      field: 'display_order',
    },
  },
  {
    sequelize,
    tableName: 'stats',
  }
);
