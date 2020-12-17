import React, { useState } from "react";
import { motion } from "framer-motion";
import styled from "styled-components";
import tw from "twin.macro";
import { css } from "styled-components/macro"; //eslint-disable-line
import { SectionHeading, Subheading as SubheadingBase } from "src/components/misc/Headings.js";
import { SectionDescription } from "src/components/misc/Typography.js";
import { Container, ContentWithPaddingXl } from "src/components/misc/Layouts.js";
import { ReactComponent as ChevronDownIcon } from "feather-icons/dist/icons/chevron-down.svg";
import { ReactComponent as SvgDecoratorBlob1 } from "src/images/svg-decorator-blob-7.svg";
import { ReactComponent as SvgDecoratorBlob2 } from "src/images/svg-decorator-blob-8.svg";

const Subheading = tw(SubheadingBase)`mb-4 text-center text-gray-800`;
const Heading = tw(SectionHeading)`w-full`;
const Description = tw(SectionDescription)`w-full text-center text-gray-200`;

const Column = tw.div`flex flex-col items-center`;

const HeaderContent = tw.div``;
const FAQSContainer = tw.dl`mt-12 max-w-4xl relative `;
const FAQ = tw.div`cursor-pointer select-none mt-5 px-8 sm:px-10 py-5 sm:py-4 rounded-lg text-gray-800 hover:text-gray-900 bg-gray-200 hover:bg-gray-300 transition duration-300`;
const Question = tw.dt`flex justify-between items-center`;
const QuestionText = tw.span`text-lg lg:text-xl font-semibold`;
const QuestionToggleIcon = motion.custom(styled.span`
  ${tw`ml-2 transition duration-300`}
  svg {
    ${tw`w-6 h-6`}
  }
`);
const Answer = motion.custom(tw.dd`pointer-events-none text-sm sm:text-base leading-relaxed`);

const DecoratorBlob1 = styled(SvgDecoratorBlob1)`
  ${tw`pointer-events-none -z-20 absolute right-0 top-0 h-56 w-56 opacity-15 transform translate-x-2/3 -translate-y-12 text-teal-400`}
`;
const DecoratorBlob2 = styled(SvgDecoratorBlob2)`
  ${tw`pointer-events-none -z-20 absolute left-0 bottom-0 h-64 w-64 opacity-15 transform -translate-x-2/3 text-primary-500`}
`;



export default ({
  subheading = "FAQS",
  heading = "You have Questions ?",
  description = "If you don't see an answer to your question, you can send us an email or call us",
  faqs = [
    {
      question: "What kind of Certificates can I send ? ",
      answer:
        "Any kind of Certificate like participation, mentorship, ambassadorship, volenteering, honorary certificates for judges, speakers, Internship letter etc can be sent through our service."
    },
    {
      question: "Can I send Certificates for any kind of event?      ",
      answer:  "  Yes, you can send Certificates of any kind of event or competition like race, charity work, tech events, cultural events, etc."
    },
    {
      question: "What format of image do I have to upload for the certificate template ?      ",
      answer:
        "Curretly, we are having small number of templates, will be coming soon with best templates."
    },
    {
      question: "What format of file do I have to upload for submitting the details for generating certificates ",
      answer:
        "It must be CSV file having ',' as delimitor"
    },
    {
      question: "Do I have to design my own Certificate or do I have to use your design?      ",
      answer:
        "You can design yourself and send us the Certificate template. If you have a designer on your team, it would be awesome otherwise you can design on canva.com which has many certificate templates."
    }
  ]
}) => {
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(null);

  const toggleQuestion = questionIndex => {
    if (activeQuestionIndex === questionIndex) setActiveQuestionIndex(null);
    else setActiveQuestionIndex(questionIndex);
  };

  return (
    <Container style={{backgroundColor:"#1e91b3"}} >
      <ContentWithPaddingXl>
        <Column>
          <HeaderContent>
            {/* {subheading && <Subheading>{subheading}</Subheading>} */}
            <Heading>{heading}</Heading>
            {description && <Description>{description}</Description>}
          </HeaderContent>
          <FAQSContainer>
            {faqs.map((faq, index) => (
              <FAQ
                key={index}
                onClick={() => {
                  toggleQuestion(index);
                }}
                className="group"
              >
                <Question>
                  <QuestionText>{faq.question}</QuestionText>
                  <QuestionToggleIcon
                    variants={{
                      collapsed: { rotate: 0 },
                      open: { rotate: -180 }
                    }}
                    initial="collapsed"
                    animate={activeQuestionIndex === index ? "open" : "collapsed"}
                    transition={{ duration: 0.02, ease: [0.04, 0.62, 0.23, 0.98] }}
                  >
                    <ChevronDownIcon />
                  </QuestionToggleIcon>
                </Question>
                <Answer
                  variants={{
                    open: { opacity: 1, height: "auto", marginTop: "16px" },
                    collapsed: { opacity: 0, height: 0, marginTop: "0px" }
                  }}
                  initial="collapsed"
                  animate={activeQuestionIndex === index ? "open" : "collapsed"}
                  transition={{ duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] }}
                >
                  {faq.answer}
                </Answer>
              </FAQ>
            ))}
          </FAQSContainer>
        </Column>
      </ContentWithPaddingXl>
      <DecoratorBlob1/>
      <DecoratorBlob2 />
    </Container>
  );
};
