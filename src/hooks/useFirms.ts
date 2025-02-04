import { useQuery, useMutation, useQueryClient, UseMutationResult } from '@tanstack/react-query';
import { User, UserFilters, CreateUserDTO, UpdateUserStatusDTO, PaginatedResponse } from '../types/user';
import { getUsers, createUser, updateUserStatus, deleteUser } from '@/app/api/users';
import { AxiosResponse } from 'axios';
import { toast } from 'sonner'
import { LawFirm } from '@/types/lawFirms';
import { getAllLawFirms, getLawFirmDetails } from '@/app/api/lawFirms';
export const useLawFirms = (page: number = 1) => {
    return useQuery<LawFirm[], Error>({
      queryKey: ['users', page],
      queryFn: () => getAllLawFirms({
        
      
        token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3MzBkNmVlOWRiMDFkOTUyN2IzZjU3MyIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTczODIxNTQ1Mn0.3Yhcg8KLLQgX1f2ypCHQI1hGmA_mcU6wkkvh1nC_Whk'
      })
    });
  };

  export const useSingleLawFirm = (firmId: string) => {
    return useQuery<LawFirm, Error>({
      queryKey: ['lawFirm', firmId],
      queryFn: async () => {
        if (!firmId) {
          throw new Error('Firm ID is required');
        }
        return getLawFirmDetails({
          firmId,
          token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3MzBkNmVlOWRiMDFkOTUyN2IzZjU3MyIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTczODIxNTQ1Mn0.3Yhcg8KLLQgX1f2ypCHQI1hGmA_mcU6wkkvh1nC_Whk'
     
        });
      },
      enabled: Boolean(firmId),
      staleTime: 1000 * 60 * 5, // 5 minutes
     
      retry: 2,
      refetchOnWindowFocus: false
    });
  };