import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const careerRecommendationFAQ = [
  {
    question: "What is Educational Recommendation?",
    description:
      "Educational Recommendation is a process of suggesting suitable professions or career paths based on an individual's skills, interests, education, and personal preferences.",
  },
  {
    question: "How do Educational Recommendation systems work?",
    description:
      "Educational Recommendation systems analyze various factors such as skills, personality traits, academic background, and job market trends to provide personalized career suggestions.",
  },
  {
    question:
      "What are the benefits of using Educational Recommendation tools?",
    description:
      "Educational Recommendation tools can help individuals make informed decisions about their professional future, aligning their skills and interests with suitable career options.",
  },
  {
    question:
      "Are Educational Recommendations based on personality tests accurate?",
    description:
      "The accuracy of Educational Recommendations depends on the quality of the underlying algorithms and the data used. Personality tests can provide valuable insights but should be considered alongside other factors.",
  },
  {
    question: "Can Educational Recommendations change over time?",
    description:
      "Yes, Educational Recommendations can change as individuals gain new skills, experiences, and preferences. Regularly updating assessments can provide more accurate and relevant recommendations.",
  },
  {
    question: "How can I find the right career for my skills and interests?",
    description:
      "Start by assessing your skills, interests, values, and goals. Seek guidance from career counselors, take aptitude tests, explore internship opportunities, and stay informed about industry trends.",
  },
  {
    question:
      "Are there online platforms that offer Educational Recommendations?",
    description:
      "Yes, there are several online platforms and tools that offer Educational Recommendations. These platforms often use algorithms and assessments to analyze user profiles and provide personalized suggestions.",
  },
  {
    question:
      "What role do education and certifications play in Educational Recommendations?",
    description:
      "Education and certifications are essential factors in Educational Recommendations. Recommendations may consider the level of education required for certain professions and suggest additional certifications to enhance qualifications.",
  },
  {
    question: "Can Educational Recommendations help with career transitions?",
    description:
      "Yes, Educational Recommendations can be valuable for individuals considering a career change. They can highlight transferable skills and suggest industries or roles that align with the individual's background and aspirations.",
  },
  {
    question:
      "Are there any limitations to Educational Recommendation systems?",
    description:
      "Educational Recommendation systems may have limitations, such as relying on self-reported data, cultural biases, or limited industry-specific information. It's important to use recommendations as one source of guidance and not the sole factor in decision-making.",
  },
];

export default function FAQ() {
  return (
    <div>
      <Accordion type="single" collapsible>
        {careerRecommendationFAQ.map((item, i) => (
          <AccordionItem key={i} value={item.question}>
            <AccordionTrigger>{item.question}</AccordionTrigger>
            <AccordionContent>{item.description}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
