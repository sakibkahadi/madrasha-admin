import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Form } from "../ui/form";

import z from "zod";
import PrimaryButton from "../Buttons/PrimaryButton";

import useMadrashaAdminCreate from "@/hooks/public/madrasha/useMadrashaAdminCreate";
import { useMadrashaStore } from "@/store/madrashaStore";
import CutomInputField from "./CustomFields/CutomInputField";
import CustomSelectField from "./CustomFields/CustomSelectField";
import CustomImageField from "./CustomFields/CustomImageField";
export const formSchema = z.object({
  name: z.string().min(1, "Name is required"),

  gender: z.enum(["Male", "Female", "Other"], {
    required_error: "Gender is required",
  }),

  nid_no: z
    .string()
    .regex(/^\d+$/, "NID must contain only numbers")
    .min(10, "NID number is too short"),

  email: z.string().email("Invalid email address"),

  phone: z.string().regex(/^\d+$/, "Phone must contain only numbers"),

  blood_group: z.enum(["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"], {
    required_error: "Blood group is required",
  }),

  description: z.string().optional(),

  password: z.string().min(6, "Password must be at least 6 characters"),

  address: z.string().min(1, "Address is required"),
  post_office: z.string().min(1, "Post office is required"),
  police_station: z.string().min(1, "Police station is required"),
  district: z.string().min(1, "District is required"),

  comment: z.string().optional(),

  status: z.enum(["Approved", "Not Approved", "Pending", "Rejected"]),

  file: z.any().refine((file) => file instanceof File, "Image is required"),
});

const RegisterMadrashaAdminForm = ({ onOpenChange }) => {
  const { mutate } = useMadrashaAdminCreate();
  const madrashaId = useMadrashaStore((state) => state.madrashaId);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",

      gender: "",
      nid_no: "",
      email: "",
      phone: "",
      blood_group: "",
      description: "",
      password: "",
      address: "",
      post_office: "",
      police_station: "",
      district: "",
      comment: "",
      status: "Pending",
      file: null,
    },
  });
  const handleSignUpSubmit = async (data) => {
    console.log("hi");
    try {
      const formData = new FormData();

      // append all fields dynamically
      Object.keys(data).forEach((key) => {
        formData.append(key, data[key]);
      });
      const today = new Date().toISOString().split("T")[0];

      formData.append("madrasha_id", madrashaId);
      formData.append("request_date", today);
      // for (let [key, value] of formData.entries()) {
      //   console.log(key, value);
      // }
      mutate(formData, {
        onSuccess: (data) => {
          onOpenChange(false);
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
        Create Madrasha Admin
      </h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSignUpSubmit)}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-4">
            <CutomInputField form={form} label="Name" name="name" required />

            {/* <CutomInputField
              form={form}
              label="Request Date"
              name="request_date"
              type="date"
              required
            /> */}

            <CustomSelectField
              form={form}
              name="gender"
              label="Gender"
              required
              options={[
                { label: "Male", value: "Male" },
                { label: "Female", value: "Female" },
                { label: "Other", value: "Other" },
              ]}
            />

            <CutomInputField
              form={form}
              label="NID No"
              name="nid_no"
              required
              inputMode="numeric"
              pattern="[0-9]*"
            />

            <CutomInputField form={form} label="Email" name="email" required />

            <CutomInputField
              form={form}
              label="Phone"
              name="phone"
              required
              inputMode="numeric"
              pattern="[0-9]*"
            />

            <CustomSelectField
              form={form}
              name="blood_group"
              label="Blood Group"
              required
              options={[
                { label: "A+", value: "A+" },
                { label: "A-", value: "A-" },
                { label: "B+", value: "B+" },
                { label: "B-", value: "B-" },
                { label: "AB+", value: "AB+" },
                { label: "AB-", value: "AB-" },
                { label: "O+", value: "O+" },
                { label: "O-", value: "O-" },
              ]}
            />

            <CutomInputField
              form={form}
              label="Description"
              name="description"
            />

            <CutomInputField
              form={form}
              label="Password"
              name="password"
              type="password"
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

            {/* STATUS (still selectable, default Pending) */}
            {/* <CustomSelectField
              form={form}
              name="status"
              label="Status"
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

          <PrimaryButton type="submit" buttonText="Submit" />
        </form>
      </Form>
    </div>
  );
};

export default RegisterMadrashaAdminForm;
