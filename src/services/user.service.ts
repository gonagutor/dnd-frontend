import { AxiosError } from 'axios';
import { request } from 'utils/axios';
import { API_ROUTES } from 'utils/constants';
import { getAccessToken, getRefreshToken } from 'utils/credentials';

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

  static async getUsers(page: number) {
    const accessToken = getAccessToken();
    if (!accessToken) {
      throw new Error('No access token found');
    }

    try {
      const response = await request.get(API_ROUTES.USERS, {
        params: {
          page,
        },
        headers: {
          Authorization: `Bearer ${accessToken}`,
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
    const accessToken = getAccessToken();
    if (!accessToken) {
      throw new Error('No access token found');
    }

    try {
      const response = await request.delete(`${API_ROUTES.USERS}/${id}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      return response.data;
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        throw new Error(error.response?.data.message);
      }

      throw new Error('An error occurred');
    }
  }

  static async updateUserState(id: string, isActive: boolean) {
    const accessToken = getAccessToken();
    if (!accessToken) {
      throw new Error('No access token found');
    }

    try {
      const response = await request.put(
        `${API_ROUTES.USERS}/${id}`,
        {
          IsActive: isActive,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );
      return response.data;
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        throw new Error(error.response?.data.message);
      }

      throw new Error('An error occurred');
    }
  }
}
