import { useState, useRef } from "react";

// Define types
type Option = { label: string; value: string };
type Subjects = string[];
type SubjectsGrade = Lowercase<Subjects[number]>;
type Electives = string[];
type ElectiveGrade = Lowercase<Electives[number]>;

// Custom hook for managing selected options
const useSelectedOptions = () => {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<Option[]>([]);
  const [options, setOptions] = useState<(string | undefined)[]>([]);
  const [inputValue, setInputValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  return {
    open,
    setOpen,
    selected,
    setSelected,
    options,
    setOptions,
    inputValue,
    setInputValue,
    inputRef,
  };
};

const useEducationForm = () => {
  // Form state
  const [isNotAttending, setIsNotAttending] = useState(false);
  const [isHS, setIsHS] = useState(false);
  const [is4Y, setIs4Y] = useState(false);
  const [isAlternative, setIsAlternative] = useState(false);
  const [isModal, setIsModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isAssessment, setIsAssessment] = useState(false);
  const [grades, setGrades] = useState([]);
  const [status, setStatus] = useState<boolean>();

  // Subjects and electives
  const [subjects, setSubjects] = useState<Subjects>([]);
  const [electives, setElectives] = useState<Electives>([]);

  // Skills and interests
  const skillsState = useSelectedOptions();
  const interestsState = useSelectedOptions();

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
    subjectsAndElectives: {
      subjects,
      setSubjects,
      electives,
      setElectives,
    },
    skills: skillsState,
    interests: interestsState,
    refs: {
      buttonRef,
      closeRef,
      submitRef,
      infoRef,
    },
  };
};

export default useEducationForm;
