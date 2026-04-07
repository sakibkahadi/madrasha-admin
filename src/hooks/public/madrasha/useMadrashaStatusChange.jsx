import { ApiEndPoints } from "@/constants/ApiEndPoints";
import APIClient from "@/services/api-client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";


const useMadrashaStatusChange = () => {
 const queryClient = useQueryClient();
  const apiClient = new APIClient();

  const endPoint = `${ApiEndPoints.MADRASHA.STATUS_CHANGE}`;
  return useMutation({
    mutationFn: (data) => {
      return apiClient.post(endPoint, data);
    },

    onSuccess: (data) => {
        toast.success("Madrasha Status updated successfully!");
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

export default useMadrashaStatusChange;
