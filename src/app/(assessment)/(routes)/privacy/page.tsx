import React from "react";

const privacyPolicyData = {
  title: "PRIVACY POLICY",
  intro:
    "At EDUALL, we are committed to protecting your privacy. This Privacy Policy outlines how we collect, use, disclose, and safeguard your personal information when you use our platform.",
  sections: [
    {
      title: "INFORMATION WE COLLECT",
      content: "",
      list: [
        {
          title: "Personal Information:",
          description:
            "We may collect personal information such as your name, email address, date of birth, educational background, and other details necessary to provide personalized recommendations.",
        },
        {
          title: "Usage Data:",
          description:
            "We may collect information about how you use our platform, including your IP address, browser type, device information, and pages visited. This helps us improve our services and user experience.",
        },
        {
          title: "Cookies and Tracking Technologies:",
          description:
            "We use cookies and similar technologies to collect data about your interactions with our website, helping us remember your preferences and track site usage.",
        },
      ],
    },
    {
      title: "HOW WE USE YOUR INFORMATION",
      content: "",
      list: [
        {
          title: "Service Provision:",
          description:
            "We use your information to provide and personalize our services, including tailored educational and career recommendations.",
        },
        {
          title: "Communication:",
          description:
            "We may use your information to communicate with you about your account, updates, and relevant content.",
        },
        {
          title: "Platform Improvement:",
          description:
            "We analyze usage patterns to enhance our services and develop new features.",
        },
        {
          title: "Legal Compliance:",
          description:
            "We may use your information to comply with legal obligations and protect our rights and interests.",
        },
      ],
    },
    {
      title: "HOW WE SHARE YOUR INFORMATION",
      content:
        "We do not sell or rent your personal information to third parties. However, we may share your information in the following situations:",
      list: [
        {
          title: "Service Providers:",
          description:
            "We may share your information with trusted third-party service providers who assist us in operating our platform, conducting business, or providing services to you.",
        },
        {
          title: "Legal Requirements:",
          description:
            "We may disclose your information if required by law, court order, or government request, or if we believe such action is necessary to comply with legal obligations or protect our rights, property, or safety.",
        },
        {
          title: "Business Transfers:",
          description:
            "In the event of a merger, acquisition, or sale of all or a portion of our assets, your information may be transferred to the new owner.",
        },
      ],
    },
    {
      title: "DATA SECURITY",
      content:
        "We implement appropriate technical and organizational measures to protect your personal information from unauthorized access, disclosure, alteration, or destruction. However, no internet-based service can be 100% secure, and we cannot guarantee absolute security.",
    },
    {
      title: "YOUR RIGHTS AND CHOICES",
      content: "",
      list: [
        {
          title: "Access and Correction:",
          description:
            "You may access and update your personal information through your account settings. If you need assistance, please contact us.",
        },
        {
          title: "Data Deletion:",
          description:
            "You can request the deletion of your personal information by contacting us. We will take reasonable steps to delete your data, except where we are required to retain it for legal or operational reasons.",
        },
        {
          title: "Opt-Out:",
          description:
            "You can opt out of receiving promotional emails from us by following the unsubscribe instructions in the emails or by contacting us directly.",
        },
      ],
    },
    {
      title: "CHILDREN'S PRIVACY",
      content:
        "EDUALL is not intended for use by children under the age of 13, and we do not knowingly collect personal information from children under 13. If we become aware that we have inadvertently collected information from a child under 13, we will take steps to delete it.",
    },
    {
      title: "CHANGES TO THIS PRIVACY POLICY",
      content:
        "We may update this Privacy Policy from time to time to reflect changes in our practices or legal requirements. Any updates will be posted on this page, and the revised policy will take effect immediately upon posting. We encourage you to review this page periodically.",
    },
    {
      title: "CONTACT US",
      content:
        "If you have any questions or concerns about this Privacy Policy or how we handle your personal information, please contact us at support@edu-all.com.",
    },
  ],
};

const PrivacyPolicy = () => {
  return (
    <div>
      <h1 className="font-bold">{privacyPolicyData.title}</h1>
      <h4 className="mt-4">{privacyPolicyData.intro}</h4>
      {privacyPolicyData.sections.map((section, index) => (
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

export default PrivacyPolicy;
