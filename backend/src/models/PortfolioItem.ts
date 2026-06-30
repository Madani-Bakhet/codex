import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/database';

export class PortfolioItem extends Model {
  declare id: number;
  declare titleEn: string;
  declare titleAr: string;
  declare categoryEn: string;
  declare categoryAr: string;
  declare descriptionEn: string;
  declare descriptionAr: string;
  declare imageUrl: string;
  declare projectUrl: string;
  declare displayOrder: number;
  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;
}

PortfolioItem.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    titleEn: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'title_en',
    },
    titleAr: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'title_ar',
    },
    categoryEn: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'category_en',
    },
    categoryAr: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'category_ar',
    },
    descriptionEn: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: 'description_en',
    },
    descriptionAr: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: 'description_ar',
    },
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'image_url',
    },
    projectUrl: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'project_url',
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
    tableName: 'portfolio_items',
  }
);
