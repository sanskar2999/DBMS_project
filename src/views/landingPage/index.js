import React from "react";
import tw from "twin.macro";
// import { css } from "styled-components/macro"; //eslint-disable-line
import AnimationRevealPage from "src/helpers/AnimationRevealPage.js";


import Hero from "src/components/hero/TwoColumnWithFeaturesAndTestimonial.js";
import Features from "src/components/features/ThreeColWithSideImage.js";
import MainFeature from "src/components/features/TwoColWithTwoHorizontalFeaturesAndButton.js";
import FeatureStats from "src/components/features/ThreeColCenteredStatsPrimaryBackground.js";
import Pricing from "src/components/pricing/TwoPlansWithDurationSwitcher.js";
import Blog from "src/components/blogs/GridWithFeaturedPost.js";
import Testimonial from "src/components/testimonials/TwoColumnWithImageAndRating.js";
import FAQ from "src/components/faqs/SingleCol.js";
import GetStarted from "src/components/cta/GetStartedLight.js";
import Footer from "src/components/footers/FiveColumnWithInputForm.js";

const HighlightedText = tw.span`text-blue-500`

const LandingPage = () => {
  return (
    <AnimationRevealPage>   
      <Hero />
      <FeatureStats/>
      <Features 
        heading={<>Amazing <HighlightedText>Features</HighlightedText></>}
      />
      <MainFeature
        heading={<>Cloud built by and for <HighlightedText>Professionals</HighlightedText></>}
      />
      <Testimonial 
        heading={<>Our Clients <HighlightedText>Love Us</HighlightedText></>}
      />
      <Pricing 
        heading={<>Flexible <HighlightedText>Plans</HighlightedText></>}
      />
      <FAQ
        heading={<>Any <HighlightedText>Questions ?</HighlightedText></>}   
      />
      <Blog
        subheading="Blog"
        heading={<>We love <HighlightedText>Writing</HighlightedText></>}
      />
      <GetStarted/>
      <Footer />
    </AnimationRevealPage>
  );
}

export default LandingPage
