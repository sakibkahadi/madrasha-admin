import { ApiEndPoints } from "@/constants/ApiEndPoints";
import APIClient from "@/services/api-client";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

const useMadrashaShow = (data) => {
    const apiClient = new APIClient();

    return useQuery({
        queryKey: [`${ApiEndPoints.MADRASHA.SHOW}`, data],
        enabled: !!data,
        queryFn: () =>
            apiClient.getAll(`${ApiEndPoints.MADRASHA.SHOW}?uuid=${data}`),
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