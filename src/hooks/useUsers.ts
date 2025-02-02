import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { User, UserFilters, CreateUserDTO, UpdateUserStatusDTO, PaginatedResponse } from '../types/user';
import { getUsers, createUser, updateUserStatus, deleteUser } from '@/app/api/users';
import { AxiosResponse } from 'axios';

export const useUsers = (page: number = 1, filters: UserFilters = {}) => {
  return useQuery<PaginatedResponse<User>, Error>({
    queryKey: ['users', page, filters],
    queryFn: () => getUsers({
      page,
      filters,
      token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3MzBkNmVlOWRiMDFkOTUyN2IzZjU3MyIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTczODIxNTQ1Mn0.3Yhcg8KLLQgX1f2ypCHQI1hGmA_mcU6wkkvh1nC_Whk'
    })
  });
};

export const useCreateUser = () => {
  const queryClient = useQueryClient();
  
  return useMutation<AxiosResponse<User>, Error, CreateUserDTO>({
    mutationFn: (userData) => createUser({
      userData,
      token: localStorage.getItem('token') || ''
    }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
    }
  });
};

export const useUpdateUserStatus = () => {
  const queryClient = useQueryClient();
  
  return useMutation<
    AxiosResponse<User>,
    Error,
    { userId: string; statusData: UpdateUserStatusDTO }
  >({
    mutationFn: ({ userId, statusData }) => updateUserStatus({
      userId,
      statusData,
      token: localStorage.getItem('token') || ''
    }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
    }
  });
};

export const useDeleteUser = () => {
  const queryClient = useQueryClient();
  
  return useMutation<AxiosResponse<void>, Error, string>({
    mutationFn: (userId) => deleteUser({
      userId,
      token: localStorage.getItem('token') || ''
    }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
    }
  });
};
