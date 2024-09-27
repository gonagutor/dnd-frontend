import { AxiosError } from 'axios';
import { User } from 'common/models/user.model';
import { request } from 'common/utils/axios';
import constants from 'common/utils/constants';

export class UserService {
  static async getMany(page: number, key?: string, sortOrder?: string) {
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

  static async getOne(id: string) {
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

  static async deleteUser(id: string) {
    // TODO: Implement
  }
}
