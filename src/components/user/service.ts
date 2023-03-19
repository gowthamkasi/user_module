import User from './user.model';
import UserInterface from './interfaces/user';

export const createUserService = async (payload: UserInterface) => {
  console.log('Inside create User service');
  try {
    const user = await User.create(payload);
    return user;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getUserService = async (filter: Partial<UserInterface>) => {
  console.log('Inside Get User Service');
  try {
    const user = await User.findOne({ where: filter });
    if (!user) return null;

    return user;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const updateUserService = async (
  payload: Partial<UserInterface>,
  id: string
) => {
  console.log('Inside update User service');
  try {
    await User.update(payload, {
      where: {
        id,
      },
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const deleteUserService = async (id: string) => {
  console.log('Inside delete User service');
  try {
    await User.destroy({
      where: {
        id,
      },
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
};
