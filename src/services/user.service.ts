import { AxiosError } from 'axios';
import { request } from 'utils/axios';
import constants from 'utils/constants';
import { getAccessToken } from 'utils/credentials';

export class User {
  id: string;
  email: string;
  name: string;
  surname: string;
  role: string;
  profilePicture?: string;
  isActive: boolean;
  deletedAt?: string;
  createdAt?: string;
  updatedAt?: string;

  constructor(user: any) {
    this.id = user.id;
    this.email = user.email;
    this.name = user.name;
    this.surname = user.surname;
    this.role = user.role;
    this.profilePicture = user.profilePicture;
    this.isActive = user.isActive;
    this.deletedAt = user.deletedAt;
    this.createdAt = user.createdAt;
    this.updatedAt = user.updatedAt;
  }

  static async getUsers(page: number, key?: string, sortOrder?: string) {
    try {
      const response = await request.get(constants.ENDPOINTS.users, {
        params: {
          page,
          key,
          sortOrder,
        },
      });

      const data = response.data;
      return {
        users: data.data.map((user: any) => new User(user)),
        pagination: data.pagination,
      };
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        throw new Error(error.response?.data.message);
      }

      throw new Error('An error occurred');
    }
  }

  static async deleteUser(id: string) {
    try {
      const response = await request.delete(
        `${constants.ENDPOINTS.users}/${id}`,
      );
      return response.data;
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        throw new Error(error.response?.data.message);
      }

      throw new Error('An error occurred');
    }
  }

  static async updateUserState(id: string, isActive: boolean) {
    try {
      const response = await request.put(`${constants.ENDPOINTS.users}/${id}`, {
        IsActive: isActive,
      });
      return response.data;
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        throw new Error(error.response?.data.message);
      }

      throw new Error('An error occurred');
    }
  }
}
