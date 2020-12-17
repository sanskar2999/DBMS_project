import React from "react";
import tw from "twin.macro";
import { css } from "styled-components/macro"; //eslint-disable-line
import { SectionHeading, Subheading as SubheadingBase } from "src/components/misc/Headings.js";
import { Container as ContainerBase, ContentWithPaddingXl } from "src/components/misc/Layouts";
import { SectionDescription } from "src/components/misc/Typography";

const Container = tw(ContainerBase)`my-8 lg:my-10 text-gray-100 -mx-8 px-8`;
const HeadingContainer = tw.div``;
const Heading = tw(SectionHeading)`sm:text-3xl md:text-4xl lg:text-5xl`;
const Subheading = tw(SubheadingBase)`text-gray-100 text-center`;
const Description = tw(SectionDescription)`text-gray-100 text-center mx-auto max-w-screen-md`;

const StatsContainer = tw.div`mt-8 flex flex-col sm:flex-row items-center justify-center flex-wrap max-w-screen-md justify-between mx-auto`
const Stat = tw.div`flex flex-col text-center p-4 tracking-wide`
const StatKey = tw.div`text-xl font-medium`
const StatValue = tw.div`text-4xl sm:text-3xl md:text-4xl lg:text-5xl font-black`

export default ({
  subheading = "",
  heading = "Over 800 Certificates Generated",
  description = " The journey of the certificate starts when you create an account for your organization. Then you just need to create an event page and upload the list of recipients along with the certificate template. That's it. We will send the verifiable e-certificates to each recipient. Also if there's any issue, you can call us or mail us.",
  stats = [
    {
      key: "Users",
      value: "99+",
    },
    {
      key: "Free of cost",
      value: "100%",
    },
    {
      key: "Organisations",
      value: "25+",
    },
  ]
}) => {
  return (
    <Container style={{backgroundColor:"#1e91b3"}}>
      <ContentWithPaddingXl>
        <HeadingContainer>
          {subheading && <Subheading>{subheading}</Subheading>}
          <Heading style={{color:"black"}}>{heading}</Heading>
          {description && <Description >{description}</Description>}
        </HeadingContainer>
        <StatsContainer style={{color:"black"}}>
          {stats.map((stat, index) => (
            <Stat key={index}>
              <StatValue>{stat.value}</StatValue>
              <StatKey>{stat.key}</StatKey>
            </Stat>
          ))}
        </StatsContainer>
      </ContentWithPaddingXl>
    </Container>
  );
};
