import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const CustomSelectField = ({
  form,
  name,
  label,
  placeholder = "Select an option",
  options = [],
  required = false,
}) => {
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
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <SelectTrigger className="h-[40px] rounded-[10px] border-none bg-white px-4 text-[14px]! leading-6 font-normal text-[#000000] placeholder:text-[#7F7F7F] w-full">
                <SelectValue  placeholder={placeholder} />
              </SelectTrigger>

              <SelectContent className="rounded-[10px] z-[999] border-none bg-white px-4 text-[14px]! leading-6 font-normal text-[#000000] placeholder:text-[#7F7F7F]">
                {options.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormControl>

          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default CustomSelectField;
