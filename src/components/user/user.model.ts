import { Optional } from 'sequelize';
import { Table, Model, Column, DataType } from 'sequelize-typescript';
import UserInterface from './interfaces/user';

interface UserAttributes extends Optional<UserInterface, 'id'> {}

@Table({ timestamps: true })
class User extends Model<UserInterface, UserAttributes> {
  @Column({ primaryKey: true })
  id!: string;
  @Column
  email!: string;
  @Column
  name!: string;
  @Column
  countryCode!: string;
  @Column
  mobileNumber!: number;
  @Column({ type: DataType.DATEONLY })
  dob!: Date;
}

export default User;
