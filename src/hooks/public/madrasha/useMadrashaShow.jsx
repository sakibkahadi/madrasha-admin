import { ApiEndPoints } from "@/constants/ApiEndPoints";
import APIClient from "@/services/api-client";
import { useQuery } from "@tanstack/react-query";

const useMadrashaShow = (data) => {
    const apiClient = new APIClient();

    return useQuery({
        queryKey: [`${ApiEndPoints.Madrasha.SHOW}`, data],
        enabled: !!data,
        queryFn: () =>
            apiClient.getAll(`${ApiEndPoints.Madrasha.SHOW}?uuid=${data}`),
        onError: (err) => {
            console.error(err);
            toast.error(
                err.response?.data?.message ||
                err.response?.data?.error ||
                "Something went wrong",
            );
        },
    });
};

export default useMadrashaShow;