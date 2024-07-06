import {
  FormField,
  FormItem,
  FormControl,
  FormMessage,
  FormLabel,
} from "@/components/ui/form";
import { ControllerRenderProps } from "react-hook-form";
import { Combobox } from "./ui/combobox";

interface FieldProps {
  field: ControllerRenderProps;
  label: string;
  options: {
    label: string;
    value: string;
  }[];
}

export const Field = ({ label, options, field }: FieldProps) => {
  return (
    <FormItem>
      <FormLabel>{label}</FormLabel>
      <FormControl>
        <Combobox options={options} {...field} />
      </FormControl>

      <FormMessage className="text-sm" />
    </FormItem>
  );
};
