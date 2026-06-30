import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/database';

export class FAQ extends Model {
  declare id: number;
  declare questionEn: string;
  declare questionAr: string;
  declare answerEn: string;
  declare answerAr: string;
  declare displayOrder: number;
  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;
}

FAQ.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    questionEn: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'question_en',
    },
    questionAr: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'question_ar',
    },
    answerEn: {
      type: DataTypes.TEXT,
      allowNull: false,
      field: 'answer_en',
    },
    answerAr: {
      type: DataTypes.TEXT,
      allowNull: false,
      field: 'answer_ar',
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
    tableName: 'faqs',
  }
);
