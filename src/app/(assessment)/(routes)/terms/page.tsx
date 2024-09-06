import React from "react";

const termsData = {
  title: "TERMS OF SERVICE",
  intro:
    "Welcome to EDUALL. These Terms of Service govern your access to and use of our platform, website, and services. By using EDUALL, you agree to comply with these terms.",
  sections: [
    {
      title: "ACCEPTANCE OF TERMS",
      content:
        "By accessing or using EDUALL, you agree to be bound by these Terms of Service and our Privacy Policy. If you do not agree to these terms, please do not use our services.",
    },
    {
      title: "SERVICES PROVIDED",
      content:
        "EDUALL offers a platform for educational and career guidance, including personalized recommendations based on user inputs. Our services include major selection advice, career path recommendations, and access to various educational resources.",
    },
    {
      title: "USER RESPONSIBILITIES",
      content: "",
      list: [
        {
          title: "Account Creation:",
          description:
            "You may need to create an account to use certain features of EDUALL. You agree to provide accurate and current information during the registration process.",
        },
        {
          title: "Account Security:",
          description:
            "You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account.",
        },
        {
          title: "Use of Services:",
          description:
            "You agree to use EDUALL for lawful purposes only and must not use our services in a way that could harm our platform, other users, or third parties.",
        },
      ],
    },
    {
      title: "PRIVACY",
      content:
        "Your use of EDUALL is also governed by our Privacy Policy, which explains how we collect, use, and protect your personal information. By using our services, you consent to the practices outlined in our Privacy Policy.",
    },
    {
      title: "INTELLECTUAL PROPERTY",
      content:
        "All content, features, and functionality on EDUALL, including text, graphics, logos, and software, are the intellectual property of EDUALL or its licensors. You may not use, reproduce, or distribute any content from EDUALL without our explicit permission.",
    },
    {
      title: "LIMITATION OF LIABILITY",
      content:
        "EDUALL is an educational and career guidance platform. While we strive to provide accurate information, we do not guarantee its completeness or reliability. Your use of our services is at your own risk. EDUALL shall not be liable for any damages arising from your use of our services.",
    },
    {
      title: "TERMINATION",
      content:
        "We reserve the right to terminate or suspend your access to EDUALL at our discretion, without notice, for conduct that we believe violates these terms or is harmful to others.",
    },
    {
      title: "CHANGES TO TERMS",
      content:
        "EDUALL may modify these Terms of Service from time to time. Any changes will be posted on this page, and by continuing to use our services after changes are made, you accept the revised terms.",
    },
    {
      title: "GOVERNING LAW",
      content:
        "These Terms of Service are governed by the laws of [Your Country/State], without regard to its conflict of law principles.",
    },
    {
      title: "CONTACT INFORMATION",
      content:
        "If you have any questions or concerns about these Terms of Service, please contact us at support@edu-all.com.",
    },
  ],
};

const TermsOfService = () => {
  return (
    <div>
      <h1 className="font-bold">{termsData.title}</h1>
      <h4 className="mt-4">{termsData.intro}</h4>
      {termsData.sections.map((section, index) => (
        <div key={index}>
          <h3 className="font-semibold mt-3 uppercase">{section.title}</h3>
          {section.content && <h4 className="mt-3">{section.content}</h4>}
          {section.list && (
            <ul className="mt-3 list-disc ml-6">
              {section.list.map((item, itemIndex) => (
                <li key={itemIndex} className="text-base">
                  <strong>{item.title}</strong> {item.description}
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  );
};

export default TermsOfService;
