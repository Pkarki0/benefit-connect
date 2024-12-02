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

      if (eligibilityData?.isPregnant && benefit?.isPregnant) {
        if (
          benefit?.isPregnant.toLowerCase() == "yes" &&
          eligibilityData?.isPregnant.toLowerCase() == "yes"
        ) {
          matchedBenefits.push(benefit);
          return;
        } else if (
          benefit?.isPregnant.toLowerCase() == "yes" &&
          eligibilityData?.isPregnant.toLowerCase() == "no"
        ) {
          return;
        }
        matchCount++;
      }

      if (benefit?.isAnyoneDisable && eligibilityData?.isAnyoneDisable) {
        if (
          benefit?.isAnyoneDisable.toLowerCase() == "yes" &&
          eligibilityData?.isAnyoneDisable.toLowerCase() == "yes"
        ) {
          matchedBenefits.push(benefit);
          return;
        } else if (
          benefit?.isAnyoneDisable.toLowerCase() == "yes" &&
          eligibilityData?.isAnyoneDisable.toLowerCase() == "no"
        ) {
          return;
        }
        matchCount++;
      }

      if (
        eligibilityData?.isVisionCareRequired &&
        benefit?.isVisionCareRequired
      ) {
        if (
          benefit?.isVisionCareRequired.toLowerCase() == "yes" &&
          eligibilityData?.isVisionCareRequired.toLowerCase() == "yes"
        ) {
          matchedBenefits.push(benefit);
          return;
        } else if (
          benefit?.isVisionCareRequired.toLowerCase() == "yes" &&
          eligibilityData?.isVisionCareRequired.toLowerCase() == "no"
        ) {
          return;
        }
        matchCount++;
      }

      if (benefit?.age && benefit?.age.toLowerCase() == "none") {
        matchCount++;
      } else if (
        eligibilityData?.age &&
        benefit?.age &&
        eligibilityData?.age.toLowerCase() != benefit?.age.toLowerCase()
      ) {
        return;
      } else if (
        eligibilityData?.age &&
        benefit?.age &&
        eligibilityData?.age.toLowerCase() === benefit?.age.toLowerCase()
      ) {
        matchedBenefits.push(benefit);
        return;
      }

      // 70+

      if (benefit?.immigrationStatus.toLowerCase() == "any") {
        matchCount++;
      } else if (
        eligibilityData?.immigrationStatus &&
        benefit?.immigrationStatus &&
        eligibilityData?.immigrationStatus.toLowerCase() !=
          benefit?.immigrationStatus.toLowerCase()
      ) {
        return;
      } else if (
        eligibilityData?.immigrationStatus &&
        benefit?.immigrationStatus &&
        eligibilityData?.immigrationStatus.toLowerCase() ===
          benefit?.immigrationStatus.toLowerCase()
      ) {
        matchedBenefits.push(benefit);
        return;
      }

      if (
        benefit?.isPrescriptionDrugCostly &&
        eligibilityData?.isPrescriptionDrugCostly
      ) {
        if (
          benefit?.isPrescriptionDrugCostly.toLowerCase() == "yes" &&
          eligibilityData?.isPrescriptionDrugCostly.toLowerCase() == "yes"
        ) {
          matchedBenefits.push(benefit);
          return;
        } else if (
          benefit?.isPrescriptionDrugCostly.toLowerCase() == "yes" &&
          eligibilityData?.isPrescriptionDrugCostly.toLowerCase() == "no"
        ) {
          return;
        }
        matchCount++;
      }

      if (
        benefit?.employerHealthCoverage &&
        eligibilityData?.employerHealthCoverage
      ) {
        if (
          benefit?.employerHealthCoverage.toLowerCase() == "yes" &&
          eligibilityData?.employerHealthCoverage.toLowerCase() == "yes"
        ) {
          matchedBenefits.push(benefit);
          return;
        } else if (
          benefit?.employerHealthCoverage.toLowerCase() == "yes" &&
          eligibilityData?.employerHealthCoverage.toLowerCase() == "no"
        ) {
          return;
        }
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
          matchedBenefits.push(benefit);
          return;
        }
      }

      if (benefit?.income && benefit?.income.toLowerCase() == "not required") {
        matchCount++;
      } else if (
        eligibilityData?.income &&
        benefit?.income &&
        eligibilityData?.income.toLowerCase() != benefit?.income.toLowerCase()
      ) {
        return;
      } else if (
        eligibilityData?.income &&
        benefit?.income &&
        eligibilityData?.income.toLowerCase() === benefit?.income.toLowerCase()
      ) {
        matchedBenefits.push(benefit);
        return;
      }

      if (
        benefit?.familySize &&
        benefit?.familySize.toLowerCase() == "not required"
      ) {
        matchCount++;
      } else if (
        eligibilityData?.familySize &&
        benefit?.familySize &&
        eligibilityData?.familySize.toLowerCase() !=
          benefit?.familySize.toLowerCase()
      ) {
        return;
      } else if (
        eligibilityData?.familySize &&
        benefit?.familySize &&
        eligibilityData?.familySize.toLowerCase() ===
          benefit?.familySize.toLowerCase()
      ) {
        matchedBenefits.push(benefit);
        return;
      }

      if (
        benefit?.careForChildrenUnder18 &&
        eligibilityData?.careForChildrenUnder18
      ) {
        if (
          benefit?.careForChildrenUnder18.toLowerCase() == "yes" &&
          eligibilityData?.careForChildrenUnder18.toLowerCase() == "yes"
        ) {
          matchedBenefits.push(benefit);
          return;
        } else if (
          benefit?.careForChildrenUnder18.toLowerCase() == "yes" &&
          eligibilityData?.careForChildrenUnder18.toLowerCase() == "no"
        ) {
          return;
        }
        matchCount++;
      }

      if (
        benefit?.isDiabeticOrSurgery &&
        eligibilityData?.isDiabeticOrSurgery
      ) {
        if (
          benefit?.isDiabeticOrSurgery.toLowerCase() == "yes" &&
          eligibilityData?.isDiabeticOrSurgery.toLowerCase() == "yes"
        ) {
          matchedBenefits.push(benefit);
          return;
        } else if (
          benefit?.isDiabeticOrSurgery.toLowerCase() == "yes" &&
          eligibilityData?.isDiabeticOrSurgery.toLowerCase() == "no"
        ) {
          return;
        }
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
        eligibilityData?.livingCondition.toLowerCase() !=
          benefit?.livingCondition.toLowerCase()
      ) {
        return;
      } else if (
        eligibilityData?.livingCondition &&
        benefit?.livingCondition &&
        eligibilityData?.livingCondition.toLowerCase() ===
          benefit?.livingCondition.toLowerCase()
      ) {
        matchedBenefits.push(benefit);
        return;
      }

      if (
        benefit?.lengthOfStay &&
        benefit?.lengthOfStay.toLowerCase() == "not required"
      ) {
        matchCount++;
      } else if (
        eligibilityData?.lengthOfStay &&
        benefit?.lengthOfStay &&
        eligibilityData?.lengthOfStay.toLowerCase() !=
          benefit?.lengthOfStay.toLowerCase()
      ) {
        return;
      } else if (
        eligibilityData?.lengthOfStay &&
        benefit?.lengthOfStay &&
        eligibilityData?.lengthOfStay.toLowerCase() ===
          benefit?.lengthOfStay.toLowerCase()
      ) {
        matchedBenefits.push(benefit);
        return;
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
