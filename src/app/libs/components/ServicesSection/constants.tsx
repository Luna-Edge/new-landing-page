import SoftwareDevelopment from "@/app/libs/images/icons/software_development.svg";
import QA from "@/app/libs/images/icons/qa.svg";
import CloudService from "@/app/libs/images/icons/cloud_services.svg";
import ServiceOutsourcing from "@/app/libs/images/icons/service_outsourcing.png";
import AIServices from "@/app/libs/images/icons/ai_services.svg";
import DesignServices from "@/app/libs/images/icons/design_services.svg";

import tabletServiceOutsourcing from "@/app/libs/images/icons/tablet/tablet_service_outsourcing.svg";
import tabletSoftwareDevelopment from "@/app/libs/images/icons/tablet/tablet_software_development.svg";
import tabletQA from "@/app/libs/images/icons/tablet/tablet_qa.svg";
import tabletAIServices from "@/app/libs/images/icons/tablet/tablet_ai_services.svg";
import tabletCloudService from "@/app/libs/images/icons/tablet/tablet_cloud_services.svg";
import tabletDesignServices from "@/app/libs/images/icons/tablet/tablet_design_services.svg";

import mobileServiceOutsourcing from "@/app/libs/images/icons/mobile/mobile_service_outsourcing.svg";
import mobileSoftwareDevelopment from "@/app/libs/images/icons/mobile/mobile_software_development.svg";
import mobileQA from "@/app/libs/images/icons/mobile/mobile_qa.svg";
import mobileAIServices from "@/app/libs/images/icons/mobile/mobile_ai_services.svg";
import mobileCloudService from "@/app/libs/images/icons/mobile/mobile_cloud_services.svg";
import mobileDesignServices from "@/app/libs/images/icons/mobile/mobile_design_services.svg";

export const getServiceCardsData = ({
  isMobile,
  isTablet,
}: {
  isMobile: boolean;
  isTablet: boolean;
}) => {
  return [
    {
      title: "Software Development",
      image: {
        src: isMobile
          ? mobileSoftwareDevelopment
          : isTablet
            ? tabletSoftwareDevelopment
            : SoftwareDevelopment,
        styles: {
          position: "absolute",
          right: isTablet || isMobile ? "0px" : "12px",
          bottom: isTablet || isMobile ? "0px" : "-5px",
        },
      },
      column: "column1",
    },
    {
      title: "Quality Assurance \n (QA)",
      image: {
        src: isMobile ? mobileQA : isTablet ? tabletQA : QA,
        styles: {
          position: "absolute",
          right: isMobile ? "18.5px" : isTablet ? "22px" : "23px",
          bottom: isMobile ? "24px" : isTablet ? "16px" : "15px",
        },
      },
      column: "column1",
    },
    {
      title: "Cloud Services",
      image: {
        src: isMobile
          ? mobileCloudService
          : isTablet
            ? tabletCloudService
            : CloudService,
        styles: {
          position: "absolute",
          right: "0px",
          bottom: isTablet ? "9px" : isMobile ? "14px" : "7px",
        },
      },
      column: isMobile ? "column1" : "column2",
    },
    {
      title: "IT Service Outsourcing",
      image: {
        src: isMobile
          ? mobileServiceOutsourcing
          : isTablet
            ? tabletServiceOutsourcing
            : ServiceOutsourcing,
        styles: {
          position: "absolute",
          right: isTablet ? "18px" : isMobile ? "14px" : "12px",
          bottom: isTablet ? "14px" : isMobile ? "13px" : "12px",
        },
      },
      column: isMobile ? "column1" : "column2",
    },
    {
      title: "AI Services",
      image: {
        src: isMobile
          ? mobileAIServices
          : isTablet
            ? tabletAIServices
            : AIServices,
        styles: {
          position: "absolute",
          right: isTablet ? "13px" : isMobile ? "19px" : "21px",
          bottom: isTablet ? "18px" : isMobile ? "22px" : "21px",
        },
      },
      column: isMobile ? "column1" : isTablet ? "column1" : "column3",
    },
    {
      title: "Design Services",
      image: {
        src: isMobile
          ? mobileDesignServices
          : isTablet
            ? tabletDesignServices
            : DesignServices,
        styles: {
          position: "absolute",
          right: isTablet ? "33px" : isMobile ? "29px" : "39px",
          bottom: isTablet ? "6px" : isMobile ? "0px" : "-18px",
        },
      },
      column: isMobile ? "column1" : isTablet ? "column2" : "column3",
    },
  ] as const;
};
