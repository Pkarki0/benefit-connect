import benefitModel from "../models/benefitModel.js";
import eligibilityDataModel from "../models/eligibilityDataModel.js";
import mongoose from "mongoose";
import userModel from "../models/userModel.js";

const matchEligibleBenefits = async (eligibilityData) => {
  const matchedBenefits = [];
  const benefits = await benefitModel.find({});
  if (eligibilityData && benefits.length > 0) {
    benefits.forEach((benefit) => {
      let matchCount = 0;

      if (
        eligibilityData?.isTaxFiled &&
        benefit?.isTaxFilingRequired &&
        benefit?.isTaxFilingRequired.toLowerCase() == "yes" &&
        eligibilityData?.isTaxFiled.toLowerCase() == "no"
      ) {
        return;
      }
      matchCount++;

      if (
        eligibilityData?.isPregnant &&
        benefit?.isPregnant &&
        benefit?.isPregnant.toLowerCase() == "yes" &&
        eligibilityData?.isPregnant.toLowerCase() == "yes"
      ) {
        matchedBenefits.push(benefit)
        return;
      }
      
    
      if (benefit?.age && benefit?.age.toLowerCase() == "none") {
        matchCount++;
      } else if (
        eligibilityData?.age &&
        benefit?.age &&
        eligibilityData?.age.toLowerCase() === benefit?.age.toLowerCase()
      ) {
        matchedBenefits.push(benefit)
        return;
        
      }

     

      if (
        eligibilityData?.isVisionCareRequired &&
        benefit?.isVisionCareRequired &&
        eligibilityData?.isVisionCareRequired.toLowerCase() ==
          benefit?.isVisionCareRequired.toLowerCase()
      ) {
        matchCount++;
      }

      if (
        eligibilityData?.isPrescriptionDrugCostly &&
        benefit?.isPrescriptionDrugCostly &&
        eligibilityData?.isPrescriptionDrugCostly.toLowerCase() ===
          benefit?.isPrescriptionDrugCostly.toLowerCase()
      ) {
        matchCount++;
      }

      if (
        eligibilityData?.employerHealthCoverage &&
        benefit?.employerHealthCoverage &&
        eligibilityData?.employerHealthCoverage.toLowerCase() ===
          benefit?.employerHealthCoverage.toLowerCase()
      ) {
        matchCount++;
      }

      

      if (benefit?.immigrationStatus.toLowerCase() == "any") {
        matchCount++;
      } else if (
        eligibilityData?.immigrationStatus &&
        benefit?.immigrationStatus &&
        eligibilityData?.immigrationStatus.toLowerCase() ===
          benefit?.immigrationStatus.toLowerCase()
      ) {
        matchCount++;
      }

      if (eligibilityData?.employmentStatus && benefit?.employmentStatus) {
        const eligibilityEmployment = eligibilityData?.employmentStatus.map(
          (item) => item.toLowerCase()
        );
        const benefitEmployment = benefit?.employmentStatus.map((item) =>
          item.toLowerCase()
        );
        const commonEmployment = eligibilityEmployment.filter((item) =>
          benefitEmployment.includes(item)
        );
        if (benefitEmployment.includes("any")) {
          matchCount++;
        } else if (commonEmployment.length > 0) {
          matchCount++;
        }
      }

      if (benefit?.income && benefit?.income.toLowerCase() == "not required") {
        matchCount++;
      } else if (
        eligibilityData?.income &&
        benefit?.income &&
        eligibilityData?.income.toLowerCase() === benefit?.income.toLowerCase()
      ) {
        matchCount++;
      }

      if (
        benefit?.familySize &&
        benefit?.familySize.toLowerCase() == "not required"
      ) {
        matchCount++;
      } else if (
        eligibilityData?.familySize &&
        benefit?.familySize &&
        eligibilityData?.familySize.toLowerCase() ===
          benefit?.familySize.toLowerCase()
      ) {
        matchCount++;
      }

      if (
        eligibilityData?.careForChildrenUnder18 &&
        benefit?.careForChildrenUnder18 &&
        eligibilityData?.careForChildrenUnder18.toLowerCase() ===
          benefit?.careForChildrenUnder18.toLowerCase()
      ) {
        matchCount++;
      }

      if (
        eligibilityData?.isAnyoneDisable &&
        benefit?.isAnyoneDisable &&
        eligibilityData?.isAnyoneDisable.toLowerCase() ===
          benefit?.isAnyoneDisable.toLowerCase()
      ) {
        matchCount++;
      }

      if (
        eligibilityData?.isDiabeticOrSurgery &&
        benefit?.isDiabeticOrSurgery &&
        eligibilityData?.isDiabeticOrSurgery.toLowerCase() ===
          benefit?.isDiabeticOrSurgery.toLowerCase()
      ) {
        matchCount++;
      }

      if (
        benefit?.livingCondition &&
        benefit?.livingCondition.toLowerCase() == "not required"
      ) {
        matchCount++;
      } else if (
        eligibilityData?.livingCondition &&
        benefit?.livingCondition &&
        eligibilityData?.livingCondition.toLowerCase() ===
          benefit?.livingCondition.toLowerCase()
      ) {
        matchCount++;
      }

      

      if (
        benefit?.lengthOfStay &&
        benefit?.lengthOfStay.toLowerCase() == "not required"
      ) {
        matchCount++;
      } else if (
        eligibilityData?.lengthOfStay &&
        benefit?.lengthOfStay &&
        eligibilityData?.lengthOfStay.toLowerCase() ===
          benefit?.lengthOfStay.toLowerCase()
      ) {
        matchCount++;
      }

      if (matchCount >= 5) {
        matchedBenefits.push(benefit);
      }
    });
  }

  return matchedBenefits;
};

const storeUserEligibleBenefits = async (userId, matchedBenefits) => {
  if (userId && matchedBenefits.length > 0) {
    const user = await userModel.findByIdAndUpdate(
      userId,
      {
        isEligible: true,
        eligibleBenefits: matchedBenefits,
      },
      { new: true, runValidators: true }
    );
    return 1;
  }

  return 0;
};

const processUserEligibility = async (userId) => {
  let result = [];
  if (userId) {
    const eligibilityData = await eligibilityDataModel.findOne({
      userId: new mongoose.Types.ObjectId(userId),
    });

    if (eligibilityData) {
      const matchedBenefits = await matchEligibleBenefits(eligibilityData);
      console.log(matchedBenefits);
      if (matchedBenefits.length > 0) {
        const output = await storeUserEligibleBenefits(userId, matchedBenefits);
        if (output == 1) {
          result = matchedBenefits;
        }
      }
    }
  }
  return result;
};

export { processUserEligibility };
