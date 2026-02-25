import { ApiEndPoints } from "@/constants/ApiEndPoints";
import APIClient from "@/services/api-client";

const apiClient = new APIClient();

const useMadrashaList = () => {
    const endpoint = `${ApiEndPoints.Madrasha.LIST}`;
    return apiClient.getQuery(endpoint);
};

export default useMadrashaList;