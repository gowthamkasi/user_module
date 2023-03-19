import {
  createUserService,
  deleteUserService,
  getUserService,
  updateUserService,
} from './service';
import { Request, Response } from 'express';
import { createUserValidation, updateUserValidation } from './validator';
import { v4 as uuid } from 'uuid';

export const getUser = async (req: Request, res: Response) => {
  try {
    console.log('inside get user controller');
    const { id } = req.params;

    const user = await getUserService({
      id,
    });

    if (!user)
      return res.status(400).send({
        msg: 'User not found',
      });

    return res.status(200).send({
      data: user,
      msg: 'User data fetched successfully',
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      msg: 'Internal server error please try again',
    });
  }
};

export const createUser = async (req: Request, res: Response) => {
  try {
    console.log('inside create user controller');
    const payload = req.body;

    const validator = await createUserValidation(payload);
    if (validator.error) {
      return res.status(400).send({
        msg: validator.message,
      });
    }

    const newUser = await createUserService({
      ...payload,
      id: uuid(),
    });

    return res.status(200).send({
      data: newUser,
      msg: 'User created successfully',
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      msg: 'Internal server error please try again',
    });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    console.log('inside update user controller');
    const { id } = req.params;
    const payload = req.body;

    const validator = await updateUserValidation(payload);
    if (validator.error) {
      return res.status(400).send({
        msg: validator.message,
      });
    }

    const user = await getUserService({
      id,
    });
    if (!user)
      return res.status(400).send({
        msg: 'User not found',
      });

    await updateUserService(payload, id);

    return res.status(200).send({
      msg: 'User updated successfully',
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      msg: 'Internal server error please try again',
    });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    console.log('inside delete user controller');
    const { id } = req.params;

    const user = await getUserService({
      id,
    });

    if (!user)
      return res.status(400).send({
        msg: 'User not found',
      });

    await deleteUserService(id);

    return res.status(200).send({
      msg: 'User deleted successfully',
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      msg: 'Internal server error please try again',
    });
  }
};
