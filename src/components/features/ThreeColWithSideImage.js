import React from "react";
import styled from "styled-components";
import tw from "twin.macro";
//eslint-disable-next-line
import { css } from "styled-components/macro";
import { SectionHeading, Subheading as SubheadingBase } from "src/components/misc/Headings.js";
import { SectionDescription } from "src/components/misc/Typography.js";

import defaultCardImage from "src/images/shield-icon.svg";

import { ReactComponent as SvgDecoratorBlob3 } from "src/images/svg-decorator-blob-3.svg";

import SupportIconImage from "src/images/support-icon.svg";
import ShieldIconImage from "src/images/shield-icon.svg";
import CustomizeIconImage from "src/images/customize-icon.svg";
import FastIconImage from "src/images/fast-icon.svg";
import ReliableIconImage from "src/images/reliable-icon.svg";
import SimpleIconImage from "src/images/simple-icon.svg";

const Container = tw.div`relative`;

const ThreeColumnContainer = styled.div`
  ${tw`flex flex-col items-center md:items-stretch md:flex-row flex-wrap md:justify-center max-w-screen-lg mx-auto py-20 md:py-24`}
`;
const Subheading = tw(SubheadingBase)`mb-4`;
const Heading = tw(SectionHeading)`w-full`;
const Description = tw(SectionDescription)`w-full text-center`;

const VerticalSpacer = tw.div`mt-10 w-full`

const Column = styled.div`
  ${tw`md:w-1/2 lg:w-1/3 max-w-sm`}
`;

const Card = styled.div`
  ${tw`flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left h-full mx-4 px-2 py-8`}
  .imageContainer {
    ${tw`border text-center rounded-full p-5 flex-shrink-0`}
    img {
      ${tw`w-40 h-40`}
    }
  }

  .textContainer {
    ${tw`sm:ml-4 mt-4 sm:mt-2`}
  }

  .title {
    ${tw`mt-4 tracking-wide font-bold text-2xl leading-none`}
  }

  .description {
    ${tw`mt-1 sm:mt-4 font-medium text-secondary-100 leading-loose`}
  }
`;

const DecoratorBlob = styled(SvgDecoratorBlob3)`
  ${tw`pointer-events-none absolute right-0 bottom-0 w-64 opacity-25 transform translate-x-32 translate-y-48 `}
`;

export default ({ cards = null, heading = "Amazing Features", subheading = "Features", description = "Features are must without which nothing can be bought or can be sold off in this world" }) => {
  /*
   * This componets has an array of object denoting the cards defined below. Each object in the cards array can have the key (Change it according to your need, you can also add more objects to have more cards in this feature component) or you can directly pass this using the cards prop:
   *  1) imageSrc - the image shown at the top of the card
   *  2) title - the title of the card
   *  3) description - the description of the card
   *  If a key for a particular card is not provided, a default value is used
   */

  const defaultCards = [
    {
      imageSrc: ShieldIconImage,
      title: "Secure",
      description: "Security is must, We assure you for that."
    },
    { imageSrc: SupportIconImage, 
      title: "24/7 Support",
      description: "We are available for 24*7, whenever in need we are there for you" 
  },
    { imageSrc: CustomizeIconImage, 
      title: "Customizable" ,
      description: "Templates and Signatures can be customized according to the needs"
    },
    { imageSrc: ReliableIconImage, 
      title: "Reliable" ,
      description: "Your certificates are safe with us, we won't compromise in reliability of the user"
    },
    { imageSrc: FastIconImage, 
      title: "Fast" ,
      description: "Fast issueing of certificates and sending over the mail to every customers  "
     },
    { imageSrc: SimpleIconImage, 
      title: "Easy",
      description: "Easy to operate and one click download thorugh Email"
    }
  ];

  if (!cards) cards = defaultCards;

  return (
    <Container id="features">
      <ThreeColumnContainer>
        {subheading && <Subheading>{subheading}</Subheading>}
        <Heading>{heading}</Heading>
        {description && <Description>{description}</Description>}
        <VerticalSpacer />
        {cards.map((card, i) => (
          <Column key={i} style={{marginTop:"25px"}}>
            <Card style={{border:"1px solid #000",borderRadius:"25px" ,backgroundColor:"#a8e5f0" ,boxShadow:"inset 5px 5px 20px #fff, 4px 4px 15px #000" }}>
              <span className="imageContainer">
                <img src={card.imageSrc || defaultCardImage} alt="" style={{width:"50px",color:"white"}}/>
              </span>
              <span className="textContainer">
                <span className="title">{card.title || "Fully Secure"}</span>
                <p className="description">
                  {card.description }
                </p>
              </span>
            </Card>
          </Column>
        ))}
      </ThreeColumnContainer>
      <DecoratorBlob />
    </Container>
  );
};
