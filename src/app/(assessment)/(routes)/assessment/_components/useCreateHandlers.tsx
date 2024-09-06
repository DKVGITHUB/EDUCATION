import { useCallback } from "react";
import { UseFormReturn, Path, PathValue } from "react-hook-form";

interface Option {
  value: string;
  label: string;
}

interface SelectedOptionsState {
  open: boolean;
  selected: Option[];
  options: string[];
  inputValue: string;
  inputRef: React.RefObject<HTMLInputElement>;
}

type GradeField =
  | "grades.businessManagement"
  | "grades.economics"
  | "grades.electiveMathematics"
  | "grades.physics"
  | "grades.chemistry"
  | "grades.electiveICT"
  | "grades.biology"
  | "grades.geography"
  | "grades.history"
  | "grades.government"
  | "grades.religiousStudies"
  | "grades.french"
  | "grades.financialAccounting"
  | "grades.costAccounting"
  | "grades.management"
  | "grades.foodAndNutrition"
  | "grades.arts"
  | "grades.textiles"
  | "grades.managementInLiving"
  | "grades.graphicDesign"
  | "grades.basketry"
  | "grades.leatherwork"
  | "grades.sculpture"
  | "grades.ceramics"
  | "grades.generalAgriculture"
  | "grades.animalHusbandry"
  | "grades.buildingConstruction"
  | "grades.engineering"
  | "grades.woodwork";

// Mapping of electives to their corresponding grade fields
const electiveToGradeField: Record<string, GradeField> = {
  "Business Management": "grades.businessManagement",
  Economics: "grades.economics",
  "Elective Mathematics": "grades.electiveMathematics",
  Physics: "grades.physics",
  Chemistry: "grades.chemistry",
  "Elective ICT": "grades.electiveICT",
  Biology: "grades.biology",
  Geography: "grades.geography",
  History: "grades.history",
  Government: "grades.government",
  "Religious Studies": "grades.religiousStudies",
  French: "grades.french",
  "Financial Accounting": "grades.financialAccounting",
  "Cost Accounting": "grades.costAccounting",
  Management: "grades.management",
  "Food and Nutrition": "grades.foodAndNutrition",
  Arts: "grades.arts",
  Textiles: "grades.textiles",
  "Management in Living": "grades.managementInLiving",
  "Graphic Design": "grades.graphicDesign",
  Basketry: "grades.basketry",
  Leatherwork: "grades.leatherwork",
  Sculpture: "grades.sculpture",
  Ceramics: "grades.ceramics",
  "General Agriculture": "grades.generalAgriculture",
  "Animal Husbandry": "grades.animalHusbandry",
  "Building Construction": "grades.buildingConstruction",
  Engineering: "grades.engineering",
  Woodwork: "grades.woodwork",
};

function useCreateHandlers<T extends Record<string, any>>(
  state: SelectedOptionsState,
  setState: React.Dispatch<React.SetStateAction<SelectedOptionsState>>,
  formField: Path<T>,
  form: UseFormReturn<T>
) {
  return {
    handleUnselect: useCallback(
      (option: Option) => {
        setState((prev) => ({
          ...prev,
          selected: prev.selected.filter((s) => s.value !== option.value),
          options: prev.options.filter((s) => s !== option.value),
        }));

        const currentValue = form.getValues(formField) as string[];
        const newValue = currentValue.filter((s) => s !== option.value);
        form.setValue(formField, newValue as PathValue<T, Path<T>>);
      },
      [setState, formField, form]
    ),

    handleKeyDown: useCallback(
      (e: React.KeyboardEvent<HTMLDivElement>) => {
        const input = state.inputRef.current;
        if (input) {
          if (
            (e.key === "Delete" || e.key === "Backspace") &&
            input.value === ""
          ) {
            setState((prev) => {
              const newSelected = prev.selected.slice(0, -1);
              return {
                ...prev,
                selected: newSelected,
                options: newSelected.map((option) => option.value),
              };
            });
          }
          if (e.key === "Escape") {
            input.blur();
          }
        }
      },
      [state.inputRef, setState]
    ),
  };
}

export default useCreateHandlers;
