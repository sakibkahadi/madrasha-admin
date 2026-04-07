import { ApiEndPoints } from "@/constants/ApiEndPoints";
import APIClient from "@/services/api-client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";


const useMadrashaDelete = () => {
  const queryClient = useQueryClient();
  const apiClient = new APIClient();

  const endPoint = `${ApiEndPoints.MADRASHA.DELETE}`;
  return useMutation({
    mutationFn: (data) => {
      return apiClient.post(endPoint, data);
    },

    onSuccess: (data) => {
        toast.success("Madrasha deleted successfully!");
      queryClient.invalidateQueries({
        queryKey: [ApiEndPoints.MADRASHA.LIST],
        exact: false,
      });

    
    },

    onError: (err) => {
      console.log(err);
      toast.error(
        err.response?.data?.message ||
          err.response?.data?.error ||
          "Something went wrong",
      );
    },
  });
};

export default useMadrashaDelete;
