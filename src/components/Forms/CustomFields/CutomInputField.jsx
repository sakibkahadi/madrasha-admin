import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";


const CutomInputField = ({
  form,
  name,
  label,
  required,
  placeholder,
  disabled,
  isPassword, type
}) => {
  return (
    <FormField 
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className="mb-4">
          <FormLabel className="flex gap-0 text-[18px] font-medium text-[#303132]">
            {label} {required && <span className="text-[#E94949]">*</span>}
          </FormLabel>
          <FormControl>
            <Input type={isPassword ? "password" : type}
              className="h-10 rounded-[10px] border-none bg-white px-4 text-[14px]! leading-6 font-normal text-[#000000] placeholder:text-[#7F7F7F]"
              placeholder={placeholder}
              disabled={disabled}
              {...field}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
export default CutomInputField;
