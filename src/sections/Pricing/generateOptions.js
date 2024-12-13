import featureData from "./feature_data.json";
import comingSoon from "./icons/coming-soon.webp";
import React from "react";

function generateOptions(data) {
  console.log("Initial feature data:", data);

  const tiers = {
    "Free": {
      tier: "Personal",
      featured: false,
      monthlyprice: 0,
      yearlyprice: 0,
      byline: "The basics for individuals and organizations",
      byline2: "",
      button: ["Join for Free", "https://cloud.layer5.io"]
    },
    "TeamDesigner": {
      tier: "Team Designer",
      featured: true,
      monthlyprice: 5,
      yearlyprice: 100,
      byline: "Advanced collaboration for declarative DevOps",
      byline2: "Everything included in Free, plus...",
      button: ["Start Free Trial", "https://cloud.layer5.io"],
    },
    "TeamOperator": {
      tier: "Team Operator",
      featured: true,
      monthlyprice: 5,
      yearlyprice: 100,
      byline: "Advanced collaboration for imperative DevOps",
      byline2: "Everything included in Free, plus...",
      button: ["Start Free Trial", "https://cloud.layer5.io"],
    },
    "Enterprise": {
      tier: "Enterprise",
      featured: false,
      monthlyprice: 21,
      yearlyprice: 180,
      pricing_coming_soon: <img src={comingSoon} alt="Coming Soon" />,
      byline: "Flexible deployment, and MSP multi-tenancy.",
      byline2: "Everything included in Team, plus...",
      button: ["Contact Sales", "https://us15.list-manage.com/contact-form?u=6b50be5aea3dfe1fd4c041d80&form_id=d0ffe17c92d8014ede6b721aa16096e8"],
    },
  };

  console.log("Tiers configuration:", tiers);

  const options = Object.entries(tiers).map(([tierName, tierInfo]) => {
    console.log(`Processing tier: ${tierName}`, tierInfo);

    const summary = data
      .filter((item) => {
        const matches = item.subscription_tier === tierName && (item.pricing_page === "true" || item.pricing_page === "X" ) ;
        return matches;
      })
      .map((item, index) => {
        const mappedItem = {
          id: index,
          category: item.function,
          description: item.feature,
          tier: item.subscription_tier,
        };

        console.log("Mapped item:", mappedItem);
        return mappedItem;
      });

    console.log(`Summary for tier ${tierName}:`, summary);

    return {
      ...tierInfo,
      summary: summary.length > 0 ? summary : [],
    };
  });

  console.log("Final generated options:", options);
  return options;
}

const options = generateOptions(featureData);

console.log("Exporting options:", options);

export default options;
