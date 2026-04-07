"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Form } from "../ui/form";

import z from "zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import CustomSelectField from "../Forms/CustomFields/CustomSelectField";
import PrimaryButton from "../Buttons/PrimaryButton";
import useMadrashaStatusChange from "@/hooks/public/madrasha/useMadrashaStatusChange";

export const formSchema = z.object({
  status: z.enum(["Approved", "Not Approved", "Pending", "Rejected"]),
});

const StatusChangeDialog = ({ open, onOpenChange, uuid }) => {
  const { mutate: StatusUpdate } = useMadrashaStatusChange();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      status: "Pending",
    },
  });

  const handleSignUpSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append("uuid", uuid);
      formData.append("status", data.status);
      // mutate(formData, {
      //   onSuccess: (data) => {
      //     console.log(data?.data?.id)
      //     setMadrashaId(data?.data?.id);
      //     onNext();
      //   },
      // });
      StatusUpdate(formData, {
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
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="">
        <DialogHeader>
          <DialogTitle></DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>

        <div className="mt-4 text-sm text-muted-foreground ">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSignUpSubmit)}
              className=" "
            >
              <div className="  w-full grid content-center mb-6">
                <CustomSelectField
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
                />
              </div>{" "}
              <PrimaryButton
                height="h-12"
                type="submit"
                buttonText="Update Status"
              />
            </form>{" "}
          </Form>{" "}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default StatusChangeDialog;
