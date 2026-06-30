import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/database';

export class Testimonial extends Model {
  declare id: number;
  declare quoteEn: string;
  declare quoteAr: string;
  declare authorEn: string;
  declare authorAr: string;
  declare roleEn: string;
  declare roleAr: string;
  declare companyEn: string;
  declare companyAr: string;
  declare rating: number;
  declare displayOrder: number;
  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;
}

Testimonial.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    quoteEn: {
      type: DataTypes.TEXT,
      allowNull: false,
      field: 'quote_en',
    },
    quoteAr: {
      type: DataTypes.TEXT,
      allowNull: false,
      field: 'quote_ar',
    },
    authorEn: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'author_en',
    },
    authorAr: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'author_ar',
    },
    roleEn: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'role_en',
    },
    roleAr: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'role_ar',
    },
    companyEn: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'company_en',
    },
    companyAr: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'company_ar',
    },
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 5,
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
    tableName: 'testimonials',
  }
);
