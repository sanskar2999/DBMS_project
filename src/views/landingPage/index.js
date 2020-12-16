import React from "react";
import tw from "twin.macro";
// import { css } from "styled-components/macro"; //eslint-disable-line
import AnimationRevealPage from "src/helpers/AnimationRevealPage.js";


 import Hero from "src/components/hero/TwoColumnWithFeaturesAndTestimonial.js";
import Features from "src/components/features/ThreeColWithSideImage.js";
import MainFeature from "src/components/features/TwoColWithTwoHorizontalFeaturesAndButton.js";
import FeatureStats from "src/components/features/ThreeColCenteredStatsPrimaryBackground.js";
import Blog from "src/components/blogs/GridWithFeaturedPost.js";
 import Testimonial from "src/components/testimonials/TwoColumnWithImageAndRating.js";
import FAQ from "src/components/faqs/SingleCol.js";
import GetStarted from "src/components/cta/GetStartedLight.js";
import Footer from "src/components/footers/FiveColumnWithInputForm.js";

const HighlightedText = tw.span`text-blue-700`
const Highlighted = tw.span`text-black`
const LandingPage = () => {
  return (
    <AnimationRevealPage>   
      <Hero />
      <FeatureStats/>
      <Features 
        heading={<>Amazing <HighlightedText>Features</HighlightedText></>}
      />
      <MainFeature
        heading={<>Our <HighlightedText>Upcoming Upgrades</HighlightedText></>}
      />
      <Testimonial 
        heading={<>Our <HighlightedText>Team</HighlightedText></>}
      />
      
      <FAQ
        heading={<>Any <Highlighted>Questions ?</Highlighted></>}   
      />
      <Blog
        subheading="TEMPLATES"
        heading={<>We love <HighlightedText>Certifying</HighlightedText></>}
      />
      <GetStarted/>
      <Footer />
    </AnimationRevealPage>
  );
}

export default LandingPage
