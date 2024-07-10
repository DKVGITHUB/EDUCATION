"use client";

import { useUser } from "@clerk/nextjs";
import { redirect, useRouter } from "next/navigation";

import { HashLoader } from "react-spinners";
import axios from "axios";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormMessage,
  FormLabel,
} from "@/components/ui/form";
import { Command as CommandPrimitive } from "cmdk";

import { MultiCombobox } from "@/components/ui/multi-combobox";
import {
  daysOfMonth,
  month,
  years,
  ethnic,
  graduationYears,
  currentlyAttending,
  Programmes,
  grades,
  HSProgrammes,
  ghanaRegions,
  typeUnis,
  collegeSkills,
  interestingCareers,
} from "./_components/dataset";

import { useRef, useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { useGlobalContext } from "@/app/context/store";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { skillsToVector } from "@/lib/utils";
import toast from "react-hot-toast";
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";
import { Combobox } from "@/components/ui/combobox";
import { Field } from "@/components/field";

const optional = <T extends z.ZodTypeAny>(schema: T) => {
  return z
    .union([schema, z.literal("")])
    .transform((value) => (value === "" ? undefined : value))
    .optional();
};

type Option = Record<"value" | "label", string>;

const formSchema = z.object({
  day: z.string().min(1),
  month: z.string().min(1),
  year: z.string().min(1),
  ethnic: z.string().min(1),
  gender: z.string().min(1),
  hsgradYear: z.string().min(1),
  currAttending: z.string().min(1),
  programmes: z.string().min(1),
  alprogrammes: optional(z.string().min(1)),
  hsprogrammes: optional(z.string().min(1)),
  engLangGrade: z.string().min(1),
  socStuGrade: z.string().min(1),
  mathGrade: z.string().min(1),
  interScienceGrade: z.string().min(1),
  regionOfSchool: z.string().min(1),
  typeOfUni: z.string().min(1),
  skill: z.array(z.string().min(1)),
  interest: z.array(z.string().min(1)),
});

const Assessment = () => {
  const { isSignedIn, user, isLoaded } = useUser();
  const router = useRouter();
  const { setCareerRecommendation, setMajorRecommendation, setUnis } =
    useGlobalContext();
  const [isNotAttending, setIsNotAttending] = useState(false);
  const [isHS, setIsHS] = useState(false);
  const [is4Y, setIs4Y] = useState(false);
  const [isIsAlternative, setIsAlternative] = useState(false);
  const [isModal, setIsModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const skillInputRef = useRef<HTMLInputElement>(null);
  const [skillOpen, setSkillOpen] = useState(false);
  const [selectedSkills, setSelectedSkills] = useState<Option[]>([]);
  const [skills, setSkills] = useState<(string | undefined)[]>([]);
  const [skillInputValue, setSkillInputValue] = useState("");

  const interestInputRef = useRef<HTMLInputElement>(null);
  const [interestOpen, setInterestOpen] = useState(false);
  const [selectedInterests, setSelectedInterests] = useState<Option[]>([]);
  const [interests, setInterests] = useState<(string | undefined)[]>([]);
  const [interestInputValue, setInterestInputValue] = useState("");

  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const closeRef = useRef<HTMLButtonElement | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      day: "",
      month: "",
      year: "",
      ethnic: "",
      gender: "",
      hsgradYear: "",
      currAttending: "",
      programmes: "",
      hsprogrammes: "",
      alprogrammes: "",
      engLangGrade: "",
      socStuGrade: "",
      mathGrade: "",
      interScienceGrade: "",
      regionOfSchool: "",
      typeOfUni: "",
      skill: [],
      interest: [],
    },
  });

  const daysOfMonthOptions = daysOfMonth.map((day) => ({
    label: day.toString(),
    value: day.toString(),
  }));

  const yearOptions = years.map((year) => ({
    label: year.toString(),
    value: year.toString(),
  }));

  const gradYearOptions = graduationYears.map((year) => ({
    label: year.toString(),
    value: year.toString(),
  }));

  const currentlyAttendingOptions = currentlyAttending.map((curr) => ({
    label: curr.label,
    value: curr.value,
  }));

  const programmesOptions = Programmes.map((p) => ({
    label: p.program,
    value: p.program,
  }));

  const optionalProgrammesOptions = Programmes.map((p) => ({
    label: p.program,
    value: p.program,
  }));

  const hsprogrammesOptions = HSProgrammes.map((hsprogram) => ({
    label: hsprogram.program,
    value: hsprogram.program,
  }));

  const gradeOptions = grades.map((grade) => ({
    label: grade,
    value: grade,
  }));

  const regionOptions = ghanaRegions.map((region) => ({
    label: region.label,
    value: region.value,
  }));

  const unisType = typeUnis.map((type) => ({
    label: type.label,
    value: type.value,
  }));

  const skill = collegeSkills.map((skill) => ({
    label: skill.label,
    value: skill.value,
  }));

  const interest = interestingCareers.map((interest) => ({
    label: interest.toString(),
    value: interest.toString(),
  }));

  const handleAttendingChange = (value: string) => {
    setIsNotAttending(value === "not attending school" ? true : false);
    setIsHS(value === "high school" ? true : false);
    setIs4Y(value === "4 year college");
    if (value !== "4 year college") {
      setIs4Y(false);
      setIsAlternative(false);
      setIsModal(false);
    }
    form.resetField("programmes");
    form.resetField("alprogrammes");
    form.resetField("hsprogrammes");
  };

  const handleProgrammes = (value: string) => {
    if (is4Y) {
      const programsOptions = Programmes.map((p) => p.program);
      const isAlternative = programsOptions.includes(value);
      setTimeout(() => {
        setIsModal(isAlternative);
      }, 1000);
    }
  };

  const onClickYes = () => {
    setIsAlternative(true);
    setIsModal(false);
  };

  useEffect(() => {
    if (isModal && buttonRef.current) {
      buttonRef.current.click();
    }
  }, [isModal]);

  useEffect(() => {
    if (!isModal && closeRef.current) {
      closeRef.current.click();
    }
  }, [isModal]);

  const handleSkillUnselect = useCallback((option: Option) => {
    setSelectedSkills((prev) => prev.filter((s) => s.value !== option.value));
    setSkills((prev) => prev.filter((s) => s !== option.value));
    form.setValue(
      "skill",
      form.getValues("skill").filter((s) => s !== option.value)
    ); // Update form value
  }, []);

  const handleSkillKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      const input = skillInputRef.current;
      if (input) {
        if (e.key === "Delete" || e.key === "Backspace") {
          if (input.value === "") {
            setSelectedSkills((prev) => {
              const newSelected = [...prev];
              newSelected.pop();
              return newSelected;
            });
          }
        }
        // This is not a default behaviour of the <input /> field
        if (e.key === "Escape") {
          input.blur();
        }
      }
    },
    []
  );

  const selectablesSkills = skill.filter(
    (option) =>
      !selectedSkills.some((selected) => selected.value === option.value)
  );

  const handleInterestUnselect = useCallback((option: Option) => {
    setSelectedInterests((prev) =>
      prev.filter((s) => s.value !== option.value)
    );
    setInterests((prev) => prev.filter((s) => s !== option.value));
    form.setValue(
      "interest",
      form.getValues("interest").filter((s) => s !== option.value)
    ); // Update form value
  }, []);

  const handleInterestKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      const input = interestInputRef.current;
      if (input) {
        if (e.key === "Delete" || e.key === "Backspace") {
          if (input.value === "") {
            setSelectedInterests((prev) => {
              const newSelected = [...prev];
              newSelected.pop();
              return newSelected;
            });
          }
        }
        // This is not a default behaviour of the <input /> field
        if (e.key === "Escape") {
          input.blur();
        }
      }
    },
    []
  );

  const selectablesInterests = interest.filter(
    (option) =>
      !selectedInterests.some((selected) => selected.value === option.value)
  );

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const skill = values.skill;
    const interest = values.interest;
    const school = values.regionOfSchool;
    const type = values.typeOfUni;
    try {
      setLoading(true);

      const response = await axios.post(
        "api/recommendation",
        JSON.stringify({ skill, interest, school, type }),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const { careers, majors, unis, skills, interests } = response.data;

      const saveArrayToLocalStorage = (key: string, array: any) => {
        try {
          if (array === undefined || array === null) {
            console.error(
              `Cannot save ${key} to localStorage because it is undefined or null.`
            );
            return;
          }

          const json = JSON.stringify(array);
          localStorage.setItem(key, json);
        } catch (error) {
          console.error(`Error saving ${key} to localStorage:`, error);
        }
      };

      const isCyclic = (obj: any, seen = new Set()) => {
        if (obj && typeof obj === "object") {
          if (seen.has(obj)) {
            return true;
          }
          seen.add(obj);
          for (let key in obj) {
            if (obj.hasOwnProperty(key) && isCyclic(obj[key], seen)) {
              return true;
            }
          }
          seen.delete(obj);
        }
        return false;
      };

      // Check if the variables are defined and not null
      if (!isCyclic(careers) && !isCyclic(majors) && !isCyclic(unis)) {
        saveArrayToLocalStorage(
          "CareerRecommendationWithSimilarityAboveZero",
          careers
        );
        saveArrayToLocalStorage(
          "MajorRecommendationWithSimilarityAboveZero",
          majors
        );
        saveArrayToLocalStorage("UnisWithTypeWithRegion", unis);
        saveArrayToLocalStorage("SkillsUserChoice", skills);
        saveArrayToLocalStorage("InterestsUserChoice", interests);

        const getArrayFromLocalStorage = (key: string) => {
          try {
            const json = localStorage.getItem(key);
            if (json) {
              return JSON.parse(json);
            } else {
              console.warn(`${key} not found in localStorage.`);
              return null;
            }
          } catch (error) {
            console.error(`Error retrieving ${key} from localStorage:`, error);
            return null;
          }
        };

        const storedCareer = getArrayFromLocalStorage(
          "CareerRecommendationWithSimilarityAboveZero"
        );
        const storedMajor = getArrayFromLocalStorage(
          "MajorRecommendationWithSimilarityAboveZero"
        );
        const storedUnis = getArrayFromLocalStorage("UnisWithTypeWithRegion");
      } else {
        console.error(
          "One or more of the data arrays contain cyclic references and cannot be saved to localStorage."
        );
      }

      if (careers && majors && unis) {
        router.replace("/result");
      }

      setTimeout(() => {
        setLoading(false);
      }, 2000);
    } catch (error) {
      setLoading(false);
      toast.error("Something went wrong"); // Showing an error toast notification
    }
  };

  return (
    <>
      {isSignedIn ? (
        <>
          <div className="text-2xl">{`Howdy, ${user?.fullName}`}</div>

          <div className="border-solid border-2 border-[#00aeef] mt-4">
            {/* Header Section */}
            <div className="bg-[#00aeef] border-[#00aeef] px-[15px] py-2.5 border-b-transparent border-b border-solid">
              <h1 className="text-white font-semibold">
                {`What path is right for you?`}
              </h1>
            </div>
            <div className="p-5">
              {/* Introduction Text */}
              <div className="text-sm p-2">
                After taking this assessment, you will be recommended the top
                majors, colleges, and careers based on your academic
                achievements, interests, and personality.
              </div>

              <div className="p-2">
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-4 mt-4"
                  >
                    <div>
                      <div>
                        <div className="p-2">
                          <h1 className="font-bold text-2xl ">Profile Info</h1>
                        </div>
                        <div className="p-1">
                          Date Of Birth & Ethnicity & Gender
                        </div>
                        <div className="p-2 grid grid-cols-5 gap-4">
                          <FormField
                            control={form.control}
                            name="day"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Day</FormLabel>
                                <FormControl>
                                  <Combobox
                                    options={daysOfMonthOptions}
                                    {...field}
                                  />
                                </FormControl>

                                <FormMessage className="text-sm" />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="month"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Month</FormLabel>
                                <FormControl>
                                  <Combobox options={month} {...field} />
                                </FormControl>

                                <FormMessage className="text-sm" />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="year"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Year</FormLabel>
                                <FormControl>
                                  <Combobox options={yearOptions} {...field} />
                                </FormControl>

                                <FormMessage className="text-sm" />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="ethnic"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Ethnic</FormLabel>
                                <FormControl>
                                  <Combobox options={ethnic} {...field} />
                                </FormControl>

                                <FormMessage className="text-sm" />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="gender"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Gender</FormLabel>
                                <FormControl>
                                  <Combobox
                                    options={[
                                      { label: "Male", value: "male" },
                                      { label: "Female", value: "female" },
                                    ]}
                                    {...field}
                                  />
                                </FormControl>

                                <FormMessage className="text-sm" />
                              </FormItem>
                            )}
                          />
                        </div>
                      </div>

                      <div>
                        <div className="p-2">
                          <h1 className="font-bold text-2xl ">School Info</h1>
                        </div>
                        <div className="p-1">Graduation year & Other</div>
                        <div
                          className={`p-2 grid gap-4 transition ${
                            isHS
                              ? "grid-cols-4"
                              : isNotAttending
                              ? "grid-cols-3"
                              : isIsAlternative
                              ? "grid-cols-4"
                              : "grid-cols-3"
                          }`}
                        >
                          <FormField
                            control={form.control}
                            name="hsgradYear"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>HS Graduation year</FormLabel>
                                <FormControl>
                                  <Combobox
                                    options={gradYearOptions}
                                    {...field}
                                  />
                                </FormControl>

                                <FormMessage className="text-sm" />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="currAttending"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Currently Attending</FormLabel>
                                <FormControl>
                                  <Combobox
                                    options={currentlyAttendingOptions}
                                    {...field}
                                    onChange={(value) => {
                                      field.onChange(value);
                                      handleAttendingChange(value);
                                    }}
                                  />
                                </FormControl>

                                <FormMessage className="text-sm" />
                              </FormItem>
                            )}
                          />
                          {isHS && (
                            <FormField
                              control={form.control}
                              name="hsprogrammes"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>High School Programmes</FormLabel>
                                  <FormControl>
                                    <Combobox
                                      options={hsprogrammesOptions}
                                      {...field}
                                    />
                                  </FormControl>

                                  <FormMessage className="text-sm" />
                                </FormItem>
                              )}
                            />
                          )}

                          <Dialog>
                            <DialogTrigger asChild ref={buttonRef}>
                              <Button
                                type="button"
                                variant="outline"
                                className="hidden"
                              >
                                Share
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-md">
                              <DialogHeader>
                                <DialogTitle>
                                  Would you like to add an optional program?
                                </DialogTitle>
                              </DialogHeader>
                              <DialogFooter>
                                <DialogClose asChild ref={closeRef}>
                                  <Button type="button" variant="secondary">
                                    NO
                                  </Button>
                                </DialogClose>
                                <Button type="button" onClick={onClickYes}>
                                  YES
                                </Button>
                              </DialogFooter>
                            </DialogContent>
                          </Dialog>

                          <FormField
                            control={form.control}
                            name="programmes"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Programmes</FormLabel>
                                <FormControl>
                                  <Combobox
                                    options={programmesOptions}
                                    {...field}
                                    onChange={(value) => {
                                      field.onChange(value);
                                      handleProgrammes(value);
                                    }}
                                  />
                                </FormControl>

                                <FormMessage className="text-sm" />
                              </FormItem>
                            )}
                          />

                          {isIsAlternative && (
                            <FormField
                              control={form.control}
                              name="alprogrammes"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Optional Programmes</FormLabel>
                                  <FormControl>
                                    <Combobox
                                      options={optionalProgrammesOptions}
                                      {...field}
                                    />
                                  </FormControl>

                                  <FormMessage className="text-sm" />
                                </FormItem>
                              )}
                            />
                          )}
                        </div>

                        <div className="p-2 grid grid-cols-4 gap-4">
                          <FormField
                            control={form.control}
                            name="engLangGrade"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>English Language Grade</FormLabel>
                                <FormControl>
                                  <Combobox options={gradeOptions} {...field} />
                                </FormControl>

                                <FormMessage className="text-sm" />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="socStuGrade"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Social Studies Grade</FormLabel>
                                <FormControl>
                                  <Combobox options={gradeOptions} {...field} />
                                </FormControl>

                                <FormMessage className="text-sm" />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="mathGrade"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Mathematics Grade</FormLabel>
                                <FormControl>
                                  <Combobox options={gradeOptions} {...field} />
                                </FormControl>

                                <FormMessage className="text-sm" />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="interScienceGrade"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Intergrated Science Grade</FormLabel>
                                <FormControl>
                                  <Combobox options={gradeOptions} {...field} />
                                </FormControl>

                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      </div>
                      <div>
                        <div className="p-2">
                          <h1 className="font-bold text-2xl ">Other Info</h1>
                        </div>
                        <div className="p-1">Graduation year & Other</div>
                        <h1 className="font-semibold text-sm my-5 p-2 ">
                          To find majors offered by colleges that you are more
                          likely to attend, answer the following questions:
                        </h1>
                        <div className=" grid grid-cols-4 gap-4 p-2">
                          <FormField
                            control={form.control}
                            name="regionOfSchool"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Region to school</FormLabel>
                                <FormControl>
                                  <Combobox
                                    options={regionOptions}
                                    {...field}
                                  />
                                </FormControl>

                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="typeOfUni"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Type of university</FormLabel>
                                <FormControl>
                                  <Combobox options={unisType} {...field} />
                                </FormControl>

                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="skill"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Skill</FormLabel>
                                <FormControl>
                                  <Command
                                    onKeyDown={handleSkillKeyDown}
                                    className="overflow-visible bg-transparent"
                                  >
                                    <div className="group rounded-md border border-input px-3 py-3 text-sm ring-offset-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2">
                                      <div className="flex flex-wrap gap-1">
                                        {selectedSkills.map((option) => {
                                          return (
                                            <Badge
                                              key={option.value}
                                              variant="secondary"
                                            >
                                              {option.label}
                                              <button
                                                className="ml-1 rounded-full outline-none ring-offset-background focus:ring-2 focus:ring-ring focus:ring-offset-2"
                                                onKeyDown={(e) => {
                                                  if (e.key === "Enter") {
                                                    handleSkillUnselect(option);
                                                  }
                                                }}
                                                onMouseDown={(e) => {
                                                  e.preventDefault();
                                                  e.stopPropagation();
                                                }}
                                                onClick={() =>
                                                  handleSkillUnselect(option)
                                                }
                                              >
                                                <X className="h-3 w-3 text-muted-foreground hover:text-foreground" />
                                              </button>
                                            </Badge>
                                          );
                                        })}
                                        {/* Avoid having the "Search" Icon */}
                                        <CommandPrimitive.Input
                                          ref={skillInputRef}
                                          value={skillInputValue}
                                          onValueChange={(value) => {
                                            setSkillInputValue(value);
                                            field.onChange(value); // Integrate form control onChange
                                          }}
                                          onBlur={() => setSkillOpen(false)}
                                          onFocus={() => setSkillOpen(true)}
                                          placeholder={"Select skills..."}
                                          className="ml-2 flex-1 bg-transparent outline-none placeholder:text-muted-foreground"
                                        />
                                      </div>
                                    </div>
                                    <div className="relative mt-2">
                                      <CommandList>
                                        {skillOpen &&
                                        selectablesSkills.length > 0 ? (
                                          <div className="absolute top-0 z-10 w-full rounded-md border bg-popover text-popover-foreground shadow-md outline-none animate-in">
                                            <CommandGroup className="h-full overflow-auto">
                                              {selectablesSkills.map(
                                                (option) => {
                                                  return (
                                                    <CommandItem
                                                      key={option.value}
                                                      onMouseDown={(e) => {
                                                        e.preventDefault();
                                                        e.stopPropagation();
                                                      }}
                                                      onSelect={(value) => {
                                                        setSkillInputValue("");
                                                        setSelectedSkills(
                                                          (prev) => [
                                                            ...prev,
                                                            option,
                                                          ]
                                                        );
                                                        setSkills((prev) => [
                                                          ...prev,
                                                          option.value,
                                                        ]);
                                                        field.onChange([
                                                          ...skills,
                                                          option.value,
                                                        ]);
                                                      }}
                                                      className={
                                                        "cursor-pointer"
                                                      }
                                                    >
                                                      {option.label}
                                                    </CommandItem>
                                                  );
                                                }
                                              )}
                                            </CommandGroup>
                                          </div>
                                        ) : null}
                                      </CommandList>
                                    </div>
                                  </Command>
                                </FormControl>

                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="interest"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Interest</FormLabel>
                                <FormControl>
                                  <Command
                                    onKeyDown={handleInterestKeyDown}
                                    className="overflow-visible bg-transparent "
                                  >
                                    <div className="group rounded-md border border-input px-3 py-3 text-sm ring-offset-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2">
                                      <div className="flex flex-wrap gap-1">
                                        {selectedInterests.map((option) => {
                                          return (
                                            <Badge
                                              key={option.value}
                                              variant="secondary"
                                            >
                                              {option.label}
                                              <button
                                                className="ml-1 rounded-full outline-none ring-offset-background focus:ring-2 focus:ring-ring focus:ring-offset-2"
                                                onKeyDown={(e) => {
                                                  if (e.key === "Enter") {
                                                    handleInterestUnselect(
                                                      option
                                                    );
                                                  }
                                                }}
                                                onMouseDown={(e) => {
                                                  e.preventDefault();
                                                  e.stopPropagation();
                                                }}
                                                onClick={() =>
                                                  handleInterestUnselect(option)
                                                }
                                              >
                                                <X className="h-3 w-3 text-muted-foreground hover:text-foreground" />
                                              </button>
                                            </Badge>
                                          );
                                        })}
                                        {/* Avoid having the "Search" Icon */}
                                        <CommandPrimitive.Input
                                          ref={interestInputRef}
                                          value={interestInputValue}
                                          onValueChange={(value) => {
                                            setSkillInputValue(value);
                                            field.onChange(value); // Integrate form control onChange
                                          }}
                                          onBlur={() => setInterestOpen(false)}
                                          onFocus={() => setInterestOpen(true)}
                                          placeholder={"Select Interests..."}
                                          className="ml-2 flex-1 bg-transparent outline-none placeholder:text-muted-foreground"
                                        />
                                      </div>
                                    </div>
                                    <div className="relative mt-2">
                                      <CommandList>
                                        {interestOpen &&
                                        selectablesInterests.length > 0 ? (
                                          <div className="absolute top-0 z-10 w-full rounded-md border bg-popover text-popover-foreground shadow-md outline-none animate-in">
                                            <CommandGroup className="h-full overflow-auto">
                                              {selectablesInterests.map(
                                                (option) => {
                                                  return (
                                                    <CommandItem
                                                      key={option.value}
                                                      onMouseDown={(e) => {
                                                        e.preventDefault();
                                                        e.stopPropagation();
                                                      }}
                                                      onSelect={(value) => {
                                                        setInterestInputValue(
                                                          ""
                                                        );
                                                        setSelectedInterests(
                                                          (prev) => [
                                                            ...prev,
                                                            option,
                                                          ]
                                                        );
                                                        setInterests((prev) => [
                                                          ...prev,
                                                          option.value,
                                                        ]);
                                                        field.onChange([
                                                          ...interests,
                                                          option.value,
                                                        ]);
                                                      }}
                                                      className={
                                                        "cursor-pointer"
                                                      }
                                                    >
                                                      {option.label}
                                                    </CommandItem>
                                                  );
                                                }
                                              )}
                                            </CommandGroup>
                                          </div>
                                        ) : null}
                                      </CommandList>
                                    </div>
                                  </Command>
                                </FormControl>

                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-center p-5">
                      {loading ? (
                        <HashLoader color="#000" size={40} />
                      ) : (
                        <Button type="submit">Begin the assessment</Button>
                      )}
                    </div>
                  </form>
                </Form>
              </div>
            </div>
          </div>
        </>
      ) : (
        redirect("https://comic-marmoset-93.accounts.dev/sign-in")
      )}
    </>
  );
};

export default Assessment;
