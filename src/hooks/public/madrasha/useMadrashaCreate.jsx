import { ApiEndPoints } from "@/constants/ApiEndPoints";
import APIClient from "@/services/api-client";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";


const useMadrashaCreate = () => {
//   const queryClient = useQueryClient();
  const apiClient = new APIClient();

  const endPoint = `${ApiEndPoints.Madrasha.CREATE_UPDATE}`;
  return useMutation({
    mutationFn: (data) => {
      return apiClient.post(endPoint, data);
    },

    onSuccess: (data) => {
        toast.success("Madrasha created successfully!");
    //   queryClient.invalidateQueries({
    //     queryKey: ["/customer/host-chat/chat_list_new"],
    //     exact: false,
    //   });

    
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

export default useMadrashaCreate;
