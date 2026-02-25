import APIClient from "@/services/api-client";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";


const useMadrashaAdminCreate = () => {
//   const queryClient = useQueryClient();
  const apiClient = new APIClient();

  const endPoint = "/public/madrasah-admin/adminCreateUpdate";
  return useMutation({
    mutationFn: (data) => {
      return apiClient.post(endPoint, data);
    },

    onSuccess: (data) => {
        toast.success("Madrasha admin created successfully");
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

export default useMadrashaAdminCreate;
