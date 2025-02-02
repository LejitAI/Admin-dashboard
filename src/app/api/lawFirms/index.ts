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
): Promise<AxiosResponse<LawFirm>> => {
  return axios.get(`${BASE_URL}/law-firms/${firmId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  });
};