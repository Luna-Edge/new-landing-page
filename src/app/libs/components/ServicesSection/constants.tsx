import SoftwareDevelopment from "@/app/libs/images/icons/software_development.svg";
import QA from "@/app/libs/images/icons/qa.svg";
import CloudService from "@/app/libs/images/icons/cloud_services.svg";
import ServiceOutsourcing from "@/app/libs/images/icons/service_outsourcing.png";
import AIServices from "@/app/libs/images/icons/ai_services.svg";
import DesignServices from "@/app/libs/images/icons/design_services.svg";

const screenWidth = window.innerWidth;
const isTablet = screenWidth >= 768 && screenWidth < 1280;
const isMobile = screenWidth < 768;

console.log(isTablet , 'isTablet')
console.log(isMobile , 'isMobile')

export const serviceCardsData  = [
    {
        title: "Software Development",
        image: {
            src: SoftwareDevelopment,
            styles: {
                position: "absolute",
                right: isTablet ? '-50px': isMobile ? '-80px' : "12px",
                bottom: isTablet ? '-50px': isMobile ? '-80px' : "-5px",
                ...(isTablet && { scale:'0.8' }),
                ...(isMobile && { scale:'0.5' }),
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
                right: (isTablet || isMobile) ? '-10px':  "23px",
                bottom: (isTablet || isMobile) ? '0px' : "15px",
                ...((isTablet || isMobile) && { scale:'0.7'  }),

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
                bottom:  (isTablet || isMobile) ? 0 : "7px",
            },
            ...((isTablet || isMobile) && { transform: "translateY(-50%)" , scale:'0.7' }),
        },
        column: isMobile ? "column1" : "column2",
    },
    {
        title: "IT Service Outsourcing",
        image: {
            src: ServiceOutsourcing,
            styles: {
                position: "absolute",
                right:  (isTablet || isMobile) ? '18px': "12px",
                bottom: (isTablet || isMobile) ? '13px': "12px",

            },
        },
        column: isMobile ? "column1" : "column2",
    },
    {
        title: "AI Services",
        image: {
            src: AIServices,
            styles: {
                position: "absolute",
                right: (isTablet || isMobile) ?'-10px' : "21px",
                bottom: (isTablet || isMobile) ? '0px' : "21px",
                ...((isTablet || isMobile) && { scale:'0.7' }),
            },
        },
        column: isMobile ? "column1" : isTablet? 'column1' : "column3",
    },
    {
        title: "Design Services",
        image: {
            src: DesignServices,
            styles: {
                position: "absolute",
                right: isTablet ? '-5px' : isMobile ? '-40px' : "39px",
                bottom: isTablet  ? '-55px' : isMobile ? '-120px' :"-18px",
                ...(isTablet && { scale:'0.8' }),
                ...(isMobile && { scale:'0.5' }),
            },
        },
        column: isMobile ? "column1" : isTablet? 'column2' : "column3",
    },
];