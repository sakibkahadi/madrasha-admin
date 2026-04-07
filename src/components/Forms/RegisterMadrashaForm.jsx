import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Form } from "../ui/form";

import z from "zod";
import PrimaryButton from "../Buttons/PrimaryButton";
import CutomInputField from "./CustomFields/CutomInputField";
import CustomSelectField from "./CustomFields/CustomSelectField";
import CustomImageField from "./CustomFields/CustomImageField";
import useMadrashaCreate from "@/hooks/public/madrasha/useMadrashaCreate";
import { useMadrashaStore } from "@/store/madrashaStore";
import useMadrashaShow from "@/hooks/public/madrasha/useMadrashaShow";
import { useEffect } from "react";

export const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  domain_name: z.string().min(1, "Domain name is required"),
  description: z.string().min(1, "Description is required"),
  address: z.string().min(1, "Address is required"),
  post_office: z.string().min(1, "Post office is required"),
  police_station: z.string().min(1, "Police station is required"),
  district: z.string().min(1, "District is required"),
  comment: z.string().optional(),
  status: z.enum(["Approved", "Not Approved", "Pending", "Rejected"]),
  file: z.any().optional(), // allow string OR File
  file_id: z.number().nullable().optional(),
});

const RegisterMadrashaForm = ({ onNext, uuid }) => {
  const { mutate } = useMadrashaCreate();

  const { data } = useMadrashaShow(uuid);
  
  const setMadrashaId = useMadrashaStore((state) => state.setMadrashaId);
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      domain_name: "",
      description: "",
      address: "",
      post_office: "",
      police_station: "",
      district: "",
      comment: "",
      status: "Pending",
      file: null,
      file_id:null
    },
  });

useEffect(() => {
  const showData = data?.data;

  if (uuid && showData) {
    form.reset({
      name: showData?.name || "",
      domain_name: showData?.domain_name || "",
      description: showData?.description || "",
      address: showData?.address || "",
      post_office: showData?.post_office || "",
      police_station: showData?.police_station || "",
      district: showData?.district || "",
      comment: showData?.comment || "",
      status: showData?.status || "Pending",
      file: showData?.upload_files?.[0]?.file_url || null,
      file_id: showData?.upload_files?.[0]?.id || null,
    });
  }
}, [uuid, data]);

  const handleSignUpSubmit = async (data) => {
    
    try {
      console.log(data,'checkign datae before api call ')
      const formData = new FormData();

      // append all fields dynamically
      Object.keys(data).forEach((key) => {
        formData.append(key, data[key]);
      });

      if (uuid) {
        formData.append("madrasah_uuid",uuid);
      }
      if (data.file_id) {
        formData.append("file_id",data.file_id);
      }
      mutate(formData, {
        onSuccess: (data) => {
          console.log(data?.data?.id)
          setMadrashaId(data?.data?.id);
          onNext();
        },
      });
      
    } catch (error) {
      console.error("Sign up error:", error);
    } finally {
    }
  };
  return (
    <div>
      <h1 className="text-2xl font-bold text-center mb-6  text-[#303132]">
        Register New Madrasah
      </h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSignUpSubmit)}>
          <div className="grid grid-cols-3 gap-x-6 gap-y-4">
            <CutomInputField form={form} label="Name" name="name" required />
            <CutomInputField
              form={form}
              label="Domain Name"
              name="domain_name"
              required
            />
            <CutomInputField
              form={form}
              label="Description"
              name="description"
              required
            />
            <CutomInputField
              form={form}
              label="Address"
              name="address"
              required
            />
            <CutomInputField
              form={form}
              label="Post Office"
              name="post_office"
              required
            />
            <CutomInputField
              form={form}
              label="Police Station"
              name="police_station"
              required
            />
            <CutomInputField
              form={form}
              label="District"
              name="district"
              required
            />
            {/* <CustomSelectField
              form={form}
              name="status"
              label="Status"
              required
              placeholder="Select status"
              options={[
                { label: "Approved", value: "Approved" },   
                { label: "Not Approved", value: "Not Approved" },
                { label: "Pending", value: "Pending" },
                { label: "Rejected", value: "Rejected" },
              ]}
            /> */}
            <CutomInputField form={form} label="Comment" name="comment" />
            <div className="pb-5">
              <CustomImageField
                form={form}
                name="file"
                label="Upload Image"
                required
              />
            </div>
          </div>
          <PrimaryButton type="submit" buttonText="Next" />
        </form>
      </Form>
    </div>
  );
};
export default RegisterMadrashaForm;
