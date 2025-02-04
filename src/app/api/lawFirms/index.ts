import { LawFirm, AddUsersToLawFirmDTO } from '@/types/lawFirms';
import axios, { AxiosResponse } from 'axios';
const BASE_URL = 'http://backend.lejit.ai/backend/api/adminModule';

interface APIConfig {
  token: string;
}
export const addUsersToLawFirm = async (
  { firmId, userIds, token }: { firmId: string; userIds: string[] } & APIConfig
): Promise<AxiosResponse<LawFirm>> => {
  return axios.post(
    `${BASE_URL}/law-firms/${firmId}/users`,
    { userIds },
    {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    }
  );
};

export const getLawFirmDetails = async (
  { firmId, token }: { firmId: string } & APIConfig
): Promise<LawFirm> => {
  try {
    const response = await axios.get<LawFirm>(`${BASE_URL}/law-firms/${firmId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    return response.data;
  } catch (error) {
    throw new Error(
      error instanceof Error 
        ? error.message 
        : 'Failed to fetch law firm details'
    );
  }
};
export const getAllLawFirms = async ({ token }: APIConfig): Promise<LawFirm[]> => {
  const response = await axios.get(`http://backend.lejit.ai/backend/api/admin/get-all-law-firms`, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  });
  return response.data;
};