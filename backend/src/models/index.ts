import { sequelize } from '../config/database';
import { User } from './User';
import { Inquiry } from './Inquiry';
import { PortfolioItem } from './PortfolioItem';
import { Stat } from './Stat';
import { Testimonial } from './Testimonial';
import { FAQ } from './FAQ';

export {
  sequelize,
  User,
  Inquiry,
  PortfolioItem,
  Stat,
  Testimonial,
  FAQ
};
