"use client"; // Indicates that this is a client-side module in Next.js

// Import necessary hooks and functions from various libraries
import { useUser } from "@clerk/nextjs"; // Hook to get the current user's information from Clerk
import { redirect, useRouter } from "next/navigation"; // Functions for navigation and redirection in Next.js
import { camelCase, debounce } from "lodash"; // Utility functions from lodash: camelCase and debounce
import { HashLoader } from "react-spinners"; // HashLoader component from react-spinners for loading animations
import axios from "axios"; // Axios library for making HTTP requests

import * as z from "zod"; // Zod library for schema validation
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormMessage,
  FormLabel,
} from "@/components/ui/form"; // Importing form components from a custom UI library
import { Command as CommandPrimitive } from "cmdk"; // Command component from cmdk for command palette-like UI
import { useEffect, useCallback } from "react"; // React hooks for side effects and memoized callbacks
import { Button } from "@/components/ui/button"; // Button component from a custom UI library

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"; // Dialog components from a custom UI library
import toast from "react-hot-toast"; // Toast notifications library
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command"; // Command components from a custom UI library
import { Badge } from "@/components/ui/badge"; // Badge component from a custom UI library
import { X } from "lucide-react"; // X icon from lucide-react
import { Combobox } from "@/components/ui/combobox"; // Combobox component from a custom UI library
import { formSchema } from "./_components/formSchema"; // Import form schema from a local module
import useFormWithEducationSchema from "./_components/ufwes"; // Custom hook for using form with education schema
import useEducationForm from "./_components/hooks"; // Custom hook for education form logic
import { ethnic, month, programs } from "./_components/dataset"; // Importing datasets from local module
import { options } from "./_components/options"; // Importing options from local module
import {
  isCyclic,
  localStorageUtil,
  preprocessGrades,
  isAggregatePassing,
} from "@/lib/utils"; // Import utility functions from a custom library

// Define types for the form options
type Option = Record<"value" | "label", string>; // Defines an Option type with value and label properties as strings

// Define types for form values
interface FormValues {
  skill: string[]; // Array of strings representing skills
  interest: string[]; // Array of strings representing interests
  regionOfSchool: string; // String representing the region of school
  typeOfUni: string; // String representing the type of university
}

// Define the structure of API response
interface ApiResponse {
  careers: any[]; // Array of any type representing careers
  majors: any[]; // Array of any type representing majors
  unis: any[]; // Array of any type representing universities
  skills: any[]; // Array of any type representing skills
  interests: any[]; // Array of any type representing interests
}

const Assessment = () => {
  // Destructure isSignedIn and user from useUser hook to get user authentication status and user information
  const { isSignedIn, user } = useUser();

  // Get the router object for navigation
  const router = useRouter();

  // Initialize the form with a custom hook that uses a specific education schema
  const form = useFormWithEducationSchema();

  // Destructure various states and functions from the custom useEducationForm hook
  const { formState, subjectsAndElectives, skills, interests, refs } =
    useEducationForm();

  // Function to handle the status of grades
  const handleStatus = (updatedGrades: any) => {
    // Preprocess the grades
    const gradeProcessed = preprocessGrades(updatedGrades);

    // Check if the aggregate passing condition is met
    const aggregatePassing = isAggregatePassing(gradeProcessed);

    // Update the form state status based on the aggregate passing condition
    formState.setStatus(aggregatePassing);
  };

  // Create a debounced version of the handleStatus function to delay its execution by 10000ms (10 seconds)
  const debouncedFetch = useCallback(
    debounce((updatedGrades: any) => handleStatus(updatedGrades), 5000),
    [] // Dependencies array, empty means it will be created only once
  );

  // Function to handle changes in grades
  const handleGradeChange = (value: string, name: string) => {
    // Update the grades state with the new value
    const updatedGrades = { ...formState.grades, [name]: value };
    formState.setGrades(updatedGrades);

    // handle the status of grades
    debouncedFetch(updatedGrades);
  };

  // Function to handle changes in attendance status
  const handleAttendanceChange = (value: string) => {
    // Update form state based on the attendance status
    formState.setIsNotAttending(value === "not attending school");
    formState.setIsHS(value === "high school");
    formState.setIs4Y(value === "4 year college");

    // If the value is "4 year college", return early
    if (value === "4 year college") {
      return;
    }

    // Otherwise, reset various form states and fields
    formState.setIs4Y(false);
    formState.setIsAlternative(false);
    formState.setIsModal(false);
    form.resetField("programs");
    form.resetField("alprograms");
    form.resetField("hsprograms");
  };

  const programFilter = (value: string) => {
    const [program] = programs.filter((pg) => pg.name === value);

    // Update subjects and electives based on the selected program
    subjectsAndElectives.setSubjects(program.subjects);
    subjectsAndElectives.setElectives(program.electives);
  };

  // Function to handle changes in selected programs
  const handlePrograms = (value: string) => {
    // If the form state indicates a 4-year college, update modal state based on program options
    if (formState.is4Y) {
      const programsOptions = programs.map((p) => p.name);
      const isAlternative = programsOptions.includes(value);
      formState.setIsModal(isAlternative);
    } else {
      programFilter(value);
    }
  };

  // Function to handle changes in selected programs
  const handleOptionalPrograms = (value: string) => {
    // If the form state indicates a 4-year college, update modal state based on program options
  };

  // Function to handle the "Yes" button click
  const onClickYes = () => {
    // Update form state to indicate an alternative program and close the modal
    formState.setIsAlternative(true);
    formState.setIsModal(false);
  };

  // Use effect to handle modal visibility based on form state
  useEffect(() => {
    if (formState.isModal) {
      refs.buttonRef.current?.click(); // Open the modal if isModal is true
    } else {
      refs.closeRef.current?.click(); // Close the modal if isModal is false
    }
  }, [formState.isModal]);

  // Use effect to handle informational modal visibility based on form state status
  useEffect(() => {
    if (!formState.status) {
      refs.infoRef.current?.click(); // Open the informational modal if status is false
    }
  }, [formState.status]);

  // Function to create event handlers for skill and interest selection
  const createHandlers = (
    // State containing a reference to the input element
    state: { inputRef: { current: any } },
    // Function to update the state
    setState: (arg0: {
      (prev: { selected: any[]; options: any[] }): {
        selected: any[];
        options: any[];
      };
      (prev: any): any;
    }) => void,
    // Form field name to be updated
    formField: any
  ) => ({
    // Event handler for unselecting an option
    handleUnselect: useCallback((option: Option) => {
      // Update the state by filtering out the unselected option from selected and options arrays
      setState((prev: { selected: any[]; options: any[] }) => ({
        ...prev,
        selected: prev.selected.filter((s) => s.value !== option.value),
        options: prev.options.filter((s) => s !== option.value),
      }));
      // Update the form field by removing the unselected option from its value
      form.setValue(
        formField,
        form.getValues(formField).filter((s: string) => s !== option.value)
      );
    }, []),

    // Event handler for key down events
    handleKeyDown: useCallback((e: React.KeyboardEvent<HTMLDivElement>) => {
      const input = state.inputRef.current;
      if (input) {
        // If Delete or Backspace is pressed and input is empty, remove the last selected item
        if (
          (e.key === "Delete" || e.key === "Backspace") &&
          input.value === ""
        ) {
          setState((prev) => ({
            ...prev,
            selected: prev.selected.slice(0, -1),
          }));
        }
        // If Escape is pressed, blur the input
        if (e.key === "Escape") {
          input.blur();
        }
      }
    }, []),
  });

  // Create event handlers for skills selection
  const skillHandlers = createHandlers(skills, skills.setSelected, "skill");

  // Create event handlers for interests selection
  const interestHandlers = createHandlers(
    interests,
    interests.setSelected,
    "interest"
  );

  // Filter options for selectable skills, excluding already selected skills
  const selectablesSkills = options.collegeSkills.filter(
    (option: { value: string }) =>
      !skills.selected.some((selected) => selected.value === option.value)
  );

  // Filter options for selectable interests, excluding already selected interests
  const selectablesInterests = options.interestingCareers.filter(
    (option: { value: string }) =>
      !interests.selected.some((selected) => selected.value === option.value)
  );

  // Function to post recommendation data to the server
  const postRecommendation = async (data: FormValues): Promise<ApiResponse> => {
    // Send a POST request to the server with the recommendation data
    const response = await axios.post(
      "api/recommendation", // Endpoint for the recommendation API
      JSON.stringify(data), // Data to be sent in the request body, converted to JSON string
      {
        headers: { "Content-Type": "application/json" }, // Set the request headers
      }
    );
    // Return the response data from the server
    return response.data;
  };

  // Function to handle form submission
  const onSubmit = async (values: FormValues) => {
    try {
      // Set the loading state to true
      formState.setLoading(true);

      // Post the recommendation data and destructure the response
      const { careers, majors, unis, skills, interests } =
        await postRecommendation(values);

      // Check for cyclic references in the data
      if (!isCyclic(careers) && !isCyclic(majors) && !isCyclic(unis)) {
        // Save the data to local storage if no cyclic references are found
        localStorageUtil.save("CAREERS", careers);
        localStorageUtil.save("MAJORS", majors);
        localStorageUtil.save("UNIS", unis);
        localStorageUtil.save("SKILLS", skills);
        localStorageUtil.save("INTERESTS", interests);

        // If careers, majors, and unis data exist, navigate to the result page
        if (careers && majors && unis) {
          router.replace("/result");
        }
      } else {
        // Log an error if cyclic references are detected
        console.error(
          "Cyclic references detected in data, cannot save to localStorage."
        );
      }
    } catch (error) {
      // Log any errors that occur during form submission
      console.error("Error submitting form:", error);
      // Show a toast notification to the user
      toast.error("Something went wrong");
    } finally {
      // Set the loading state to false
      formState.setLoading(false);
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
                            name="dateOfBirth.day"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Day</FormLabel>
                                <FormControl>
                                  <Combobox
                                    options={options.daysOfMonth}
                                    {...field}
                                  />
                                </FormControl>

                                <FormMessage className="text-sm" />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="dateOfBirth.month"
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
                            name="dateOfBirth.year"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Year</FormLabel>
                                <FormControl>
                                  <Combobox
                                    options={options.years}
                                    {...field}
                                  />
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

                        <div
                          className={`p-2 grid gap-4 transition ${
                            formState.isHS
                              ? "grid-cols-4"
                              : formState.isNotAttending
                              ? "grid-cols-3"
                              : formState.isAlternative
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
                                    options={options.graduationYears}
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
                                    options={options.currentlyAttending}
                                    {...field}
                                    onChange={(value) => {
                                      field.onChange(value);
                                      handleAttendanceChange(value);
                                    }}
                                  />
                                </FormControl>

                                <FormMessage className="text-sm" />
                              </FormItem>
                            )}
                          />
                          {formState.isHS && (
                            <FormField
                              control={form.control}
                              name="hsprograms"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>High School Programs</FormLabel>
                                  <FormControl>
                                    <Combobox
                                      options={options.HSPrograms}
                                      {...field}
                                    />
                                  </FormControl>

                                  <FormMessage className="text-sm" />
                                </FormItem>
                              )}
                            />
                          )}

                          <Dialog>
                            <DialogTrigger asChild ref={refs.buttonRef}>
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
                                <DialogTitle>CONFIRMATION</DialogTitle>
                              </DialogHeader>
                              <DialogDescription>
                                Thank you for providing your information. Based
                                on what you've shared, we think you might also
                                be interested in some of our other excellent
                                programs that could be a great match for your
                                profile. Would you like to explore these
                                alternative options? We're here to help you find
                                the best fit for your goals and qualifications.
                              </DialogDescription>
                              <DialogFooter>
                                <DialogClose asChild ref={refs.closeRef}>
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

                          <Dialog>
                            <DialogTrigger asChild ref={refs.infoRef}>
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
                                <DialogTitle>INFORMATION</DialogTitle>
                              </DialogHeader>
                              <DialogDescription>
                                Thank you for providing your information. We've
                                reviewed the grades you submitted, and it
                                appears they may not meet the current
                                requirements for your chosen program. We
                                encourage you to double-check your entries for
                                any unintended errors. If the grades are
                                correct, please consider exploring our other
                                program options that might be a great fit for
                                your qualifications. We're here to help you find
                                the best path forward.
                              </DialogDescription>
                              <DialogFooter>
                                <DialogClose asChild>
                                  <Button
                                    type="button"
                                    variant="secondary"
                                    onClick={() => formState.setStatus(true)}
                                  >
                                    CLOSE
                                  </Button>
                                </DialogClose>
                                <DialogClose asChild>
                                  <Button type="button">REVIEW</Button>
                                </DialogClose>
                              </DialogFooter>
                            </DialogContent>
                          </Dialog>

                          <FormField
                            control={form.control}
                            name="programs"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Programs</FormLabel>
                                <FormControl>
                                  <Combobox
                                    options={options.programs}
                                    {...field}
                                    onChange={(value) => {
                                      field.onChange(value);
                                      handlePrograms(value);
                                    }}
                                  />
                                </FormControl>

                                <FormMessage className="text-sm" />
                              </FormItem>
                            )}
                          />

                          {formState.isAlternative && (
                            <FormField
                              control={form.control}
                              name="alprograms"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Optional Programs</FormLabel>
                                  <FormControl>
                                    <Combobox
                                      options={options.optionalPrograms}
                                      {...field}
                                      onChange={(value) => {
                                        field.onChange(value);
                                        programFilter(value);
                                      }}
                                    />
                                  </FormControl>

                                  <FormMessage className="text-sm" />
                                </FormItem>
                              )}
                            />
                          )}
                        </div>

                        {subjectsAndElectives.subjects.length > 0 && (
                          <div className={`p-2 grid grid-cols-4 gap-4`}>
                            {subjectsAndElectives.subjects.map((subject) => (
                              <FormField
                                key={subject}
                                control={form.control}
                                name={
                                  camelCase(subject) as
                                    | "grades.english"
                                    | "grades.mathematics"
                                    | "grades.integratedScience"
                                    | "grades.socialStudies"
                                }
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>{subject} Grade</FormLabel>
                                    <FormControl>
                                      <Combobox
                                        options={options.grades}
                                        value={field.value as string}
                                        onChange={(value: string) => {
                                          field.onChange(value);
                                          handleGradeChange(value, field.name);
                                        }}
                                      />
                                    </FormControl>
                                    <FormMessage className="text-sm" />
                                  </FormItem>
                                )}
                              />
                            ))}
                          </div>
                        )}

                        {subjectsAndElectives.electives.length > 0 && (
                          <div
                            className={`p-2 grid grid-cols-${subjectsAndElectives.electives?.length} gap-4`}
                          >
                            {subjectsAndElectives.electives.map((elective) => (
                              <FormField
                                key={elective}
                                control={form.control}
                                name={
                                  camelCase(elective) as
                                    | "grades.economics"
                                    | "grades.electiveMathematics"
                                    | "grades.literatureInEnglish"
                                    | "grades.government"
                                    | "grades.history"
                                    | "grades.computerStudies"
                                    | "grades.physics"
                                    | "grades.chemistry"
                                    | "grades.businessManagement"
                                    | "grades.fineArts"
                                }
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>{elective} Grade</FormLabel>
                                    <FormControl>
                                      <Combobox
                                        options={options.grades}
                                        value={field.value as string}
                                        onChange={(value: string) => {
                                          field.onChange(value);
                                          handleGradeChange(value, field.name);
                                        }}
                                      />
                                    </FormControl>
                                    <FormMessage className="text-sm" />
                                  </FormItem>
                                )}
                              />
                            ))}
                          </div>
                        )}
                      </div>
                      <div>
                        <div className=" grid grid-cols-4 gap-4 p-2">
                          <FormField
                            control={form.control}
                            name="regionOfSchool"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Region to school</FormLabel>
                                <FormControl>
                                  <Combobox
                                    options={options.ghanaRegions}
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
                                  <Combobox
                                    options={options.typeUnis}
                                    {...field}
                                  />
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
                                    onKeyDown={skillHandlers.handleKeyDown}
                                    className="overflow-visible bg-transparent"
                                  >
                                    <div className="group rounded-md border border-input px-3 py-3 text-sm ring-offset-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2">
                                      <div className="flex flex-wrap gap-1">
                                        {skills.selected.map((option) => {
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
                                                    skillHandlers.handleUnselect(
                                                      option
                                                    );
                                                  }
                                                }}
                                                onMouseDown={(e) => {
                                                  e.preventDefault();
                                                  e.stopPropagation();
                                                }}
                                                onClick={() =>
                                                  skillHandlers.handleUnselect(
                                                    option
                                                  )
                                                }
                                              >
                                                <X className="h-3 w-3 text-muted-foreground hover:text-foreground" />
                                              </button>
                                            </Badge>
                                          );
                                        })}
                                        {/* Avoid having the "Search" Icon */}
                                        <CommandPrimitive.Input
                                          ref={skills.inputRef}
                                          value={skills.inputValue}
                                          onValueChange={(value) => {
                                            skills.setInputValue(value);
                                            field.onChange(value); // Integrate form control onChange
                                          }}
                                          onBlur={() => skills.setOpen(false)}
                                          onFocus={() => skills.setOpen(true)}
                                          placeholder={"Select skills..."}
                                          className="ml-2 flex-1 bg-transparent outline-none placeholder:text-muted-foreground"
                                        />
                                      </div>
                                    </div>
                                    <div className="relative mt-2">
                                      <CommandList>
                                        {skills.open &&
                                        selectablesSkills.length > 0 ? (
                                          <div className="relative bottom-0 z-10 w-full rounded-md border bg-popover text-popover-foreground shadow-md outline-none animate-in max-h-30 overflow-y-auto">
                                            <CommandGroup className="h-full overflow-auto">
                                              {selectablesSkills.map(
                                                (option: {
                                                  value: any;
                                                  label: any;
                                                }) => {
                                                  return (
                                                    <CommandItem
                                                      key={option.value}
                                                      onMouseDown={(e) => {
                                                        e.preventDefault();
                                                        e.stopPropagation();
                                                      }}
                                                      onSelect={(value) => {
                                                        skills.setInputValue(
                                                          ""
                                                        );
                                                        skills.setSelected(
                                                          (prev) => [
                                                            ...prev,
                                                            option,
                                                          ]
                                                        );
                                                        skills.setOptions(
                                                          (prev) => [
                                                            ...prev,
                                                            option.value,
                                                          ]
                                                        );
                                                        field.onChange([
                                                          ...skills.options,
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
                                    onKeyDown={interestHandlers.handleKeyDown}
                                    className="overflow-visible bg-transparent "
                                  >
                                    <div className="group rounded-md border border-input px-3 py-3 text-sm ring-offset-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2">
                                      <div className="flex flex-wrap gap-1">
                                        {interests.selected.map((option) => {
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
                                                    interestHandlers.handleUnselect(
                                                      option
                                                    );
                                                  }
                                                }}
                                                onMouseDown={(e) => {
                                                  e.preventDefault();
                                                  e.stopPropagation();
                                                }}
                                                onClick={() =>
                                                  interestHandlers.handleUnselect(
                                                    option
                                                  )
                                                }
                                              >
                                                <X className="h-3 w-3 text-muted-foreground hover:text-foreground" />
                                              </button>
                                            </Badge>
                                          );
                                        })}
                                        {/* Avoid having the "Search" Icon */}
                                        <CommandPrimitive.Input
                                          ref={interests.inputRef}
                                          value={interests.inputValue}
                                          onValueChange={(value) => {
                                            interests.setInputValue(value);
                                            field.onChange(value); // Integrate form control onChange
                                          }}
                                          onBlur={() =>
                                            interests.setOpen(false)
                                          }
                                          onFocus={() =>
                                            interests.setOpen(true)
                                          }
                                          placeholder={"Select Interests..."}
                                          className="ml-2 flex-1 bg-transparent outline-none placeholder:text-muted-foreground"
                                        />
                                      </div>
                                    </div>
                                    <div className="relative mt-2">
                                      <CommandList>
                                        {interests.open &&
                                        selectablesInterests.length > 0 ? (
                                          <div className="relative bottom-0 z-10 w-full rounded-md border bg-popover text-popover-foreground shadow-md outline-none animate-in max-h-30 overflow-y-auto">
                                            <CommandGroup>
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
                                                        interests.setInputValue(
                                                          ""
                                                        );
                                                        interests.setSelected(
                                                          (prev) => [
                                                            ...prev,
                                                            option,
                                                          ]
                                                        );
                                                        interests.setOptions(
                                                          (prev) => [
                                                            ...prev,
                                                            option.value,
                                                          ]
                                                        );
                                                        field.onChange([
                                                          ...interests.options,
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
                      {formState.loading ? (
                        <HashLoader color="#000" size={40} />
                      ) : (
                        <>
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button
                                type="button"
                                disabled={formState.status ? false : true}
                              >
                                Begin the assessment
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-md">
                              <DialogHeader>
                                <DialogTitle>CONFIRMATION</DialogTitle>
                              </DialogHeader>
                              <DialogDescription>
                                Thank you for providing your information! Are
                                you satisfied with the details you've entered so
                                far? If everything looks good, can we proceed
                                with the assessment?
                              </DialogDescription>
                              <DialogFooter>
                                <DialogClose asChild>
                                  <Button type="button" variant="secondary">
                                    Edit Information
                                  </Button>
                                </DialogClose>
                                <DialogClose asChild>
                                  <Button
                                    type="button"
                                    onClick={() =>
                                      refs.submitRef.current?.click()
                                    }
                                  >
                                    Proceed to Assessment
                                  </Button>
                                </DialogClose>
                              </DialogFooter>
                            </DialogContent>
                          </Dialog>
                          <Button
                            type="submit"
                            className="hidden"
                            ref={refs.submitRef}
                          >
                            Begin the assessment
                          </Button>
                        </>
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
