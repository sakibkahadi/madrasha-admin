import { useState, useEffect } from "react";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";

const CustomImageField = ({
  form,
  name,
  label,
  required = false,
}) => {
  const [preview, setPreview] = useState(null);

  // Watch form value directly
  const value = form.watch(name);

  useEffect(() => {
    if (!value) {
      setPreview(null);
      return;
    }

    // If new uploaded file
    if (value instanceof File) {
      const objectUrl = URL.createObjectURL(value);
      setPreview(objectUrl);

      return () => URL.revokeObjectURL(objectUrl);
    }

    // If API string URL
    if (typeof value === "string") {
      setPreview(value);
    }
  }, [value]);

  console.log(preview,'checking preview')

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel className="flex gap-0 text-[18px] font-medium text-[#303132]">
            {label} {required && <span className="text-red-500">*</span>}
          </FormLabel>

          <FormControl>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => field.onChange(e.target.files?.[0])}
              className="block w-full text-sm"
            />
          </FormControl>

          {preview && (
            <img
              src={preview}
              alt="Preview"
              className="mt-3 h-32 w-32 rounded-md border object-cover"
            />
          )}

          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default CustomImageField;