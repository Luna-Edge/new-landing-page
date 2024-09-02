import SoftwareDevelopment from "@/app/libs/images/icons/software_development.svg";
import QA from "@/app/libs/images/icons/qa.svg";
import CloudService from "@/app/libs/images/icons/cloud_services.svg";
import ServiceOutsourcing from "@/app/libs/images/icons/service_outsourcing.png";
import AIServices from "@/app/libs/images/icons/ai_services.svg";
import DesignServices from "@/app/libs/images/icons/design_services.svg";

const screenWidth = window.innerWidth;
const isTablet = screenWidth >= 768 && screenWidth < 1280;


export const serviceCardsData  = [
    {
        title: "Software Development",
        image: {
            src: SoftwareDevelopment,
            styles: {
                position: "absolute",
                right: isTablet ? '-50px': "12px",
                bottom: isTablet ? '-50px': "-5px",
                ...(isTablet && { scale:'0.8' }),
            },
        },
        column: "column1",
    },
    {
        title: "Quality Assurance \n (QA)",
        image: {
            src: QA,
            styles: {
                position: "absolute",
                right: isTablet ? '-10px': "23px",
                bottom: isTablet ? '0px' : "15px",
                ...(isTablet && { scale:'0.7'  }),
            },
        },
        column: "column1",
    },
    {
        title: "Cloud Services",
        image: {
            src: CloudService,
            styles: {
                position: "absolute",
                right:   "0px",
                bottom:  isTablet ? 0 : "7px",
            },
            ...(isTablet && { transform: "translateY(-50%)" , scale:'0.7' }),
        },
        column: "column2",
    },
    {
        title: "IT Service Outsourcing",
        image: {
            src: ServiceOutsourcing,
            styles: {
                position: "absolute",
                right:  isTablet ? '18px': "12px",
                bottom: isTablet ? '13px': "12px",

            },
        },
        column: "column2",
    },
    {
        title: "AI Services",
        image: {
            src: AIServices,
            styles: {
                position: "absolute",
                right: isTablet ?'-10px' : "21px",
                bottom: isTablet ? '0px' : "21px",
                ...(isTablet && { scale:'0.7' }),
            },
        },
        column: isTablet? 'column1' : "column3",
    },
    {
        title: "Design Services",
        image: {
            src: DesignServices,
            styles: {
                position: "absolute",
                right: isTablet ? '-5px' : "39px",
                bottom: isTablet ? '-55px' : "-18px",
                ...(isTablet && { scale:'0.8' }),
            },
        },
        column:  isTablet? 'column2' : "column3",
    },
];