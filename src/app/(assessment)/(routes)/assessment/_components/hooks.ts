import { useState, useRef, useCallback } from "react";

// Define types
type Option = { label: string; value: string };
type Subjects = string[];
type SubjectsGrade = Lowercase<Subjects[number]>;
type Electives = string[];
type ElectiveGrade = Lowercase<Electives[number]>;

interface SelectedOptionsState {
  open: boolean;
  selected: Option[];
  options: string[];
  inputValue: string;
  inputRef: React.RefObject<HTMLInputElement>;
}

// Custom hook for managing selected options
const useSelectedOptions = () => {
  const [state, setState] = useState<SelectedOptionsState>({
    open: false,
    selected: [],
    options: [],
    inputValue: "",
    inputRef: useRef<HTMLInputElement>(null),
  });

  const setSelected = useCallback((newSelected: Option[]) => {
    setState((prev) => ({ ...prev, selected: newSelected }));
  }, []);

  const setOptions = useCallback((newOptions: string[]) => {
    setState((prev) => ({ ...prev, options: newOptions }));
  }, []);

  const setInputValue = (value: string) => {
    setState((prevState) => ({
      ...prevState,
      inputValue: value,
    }));
  };

  const setOpen = (value: boolean) => {
    setState((prevState) => ({
      ...prevState,
      open: value,
    }));
  };

  return {
    state,
    setState,
    setSelected,
    setOptions,
    setInputValue,
    setOpen,
  };
};

const useEducationForm = () => {
  // Form state
  const [isNotAttending, setIsNotAttending] = useState<boolean>(false);
  const [isHS, setIsHS] = useState<boolean>(false);
  const [is4Y, setIs4Y] = useState<boolean>(false);
  const [isAlternative, setIsAlternative] = useState<boolean>(false);
  const [isModal, setIsModal] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [isAssessment, setIsAssessment] = useState<boolean>(false);
  const [grades, setGrades] = useState([]);
  const [status, setStatus] = useState<boolean>(true);

  // Subjects and electives
  const [subjects, setSubjects] = useState<Subjects>([]);
  const [electives, setElectives] = useState<Electives>([]);

  const [data, setData] = useState<{
    HSPrograms: Option[];
    OPPrograms: Option[];
    Programs: Option[];
    electives: Option[];
    collegeSkills: Option[];
    interestingCareers: Option[];
  }>({
    HSPrograms: [],
    OPPrograms: [],
    Programs: [],
    electives: [],
    collegeSkills: [],
    interestingCareers: [],
  });

  // Skills and interests
  const skillsState = useSelectedOptions();
  const interestsState = useSelectedOptions();
  const electivesState = useSelectedOptions();

  // Refs
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const closeRef = useRef<HTMLButtonElement | null>(null);
  const submitRef = useRef<HTMLButtonElement | null>(null);
  const infoRef = useRef<HTMLButtonElement | null>(null);

  return {
    formState: {
      isNotAttending,
      setIsNotAttending,
      isHS,
      setIsHS,
      is4Y,
      setIs4Y,
      isAlternative,
      setIsAlternative,
      isModal,
      setIsModal,
      loading,
      setLoading,
      isAssessment,
      setIsAssessment,
      grades,
      setGrades,
      status,
      setStatus,
    },
    dataState: {
      data,
      setData,
    },
    subjectsAndElectives: {
      subjects,
      setSubjects,
      electives,
      setElectives,
    },
    skills: skillsState,
    interests: interestsState,
    elective: electivesState,
    refs: {
      buttonRef,
      closeRef,
      submitRef,
      infoRef,
    },
  };
};

export default useEducationForm;
