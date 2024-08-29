import SoftwareDevelopment from "@/app/libs/images/icons/software_development.svg";
import QA from "@/app/libs/images/icons/qa.svg";
import CloudService from "@/app/libs/images/icons/cloud_services.svg";
import ServiceOutsourcing from "@/app/libs/images/icons/service_outsourcing.svg";
import AIServices from "@/app/libs/images/icons/ai_services.svg";
import DesignServices from "@/app/libs/images/icons/design_services.svg";



export const serviceCardsData  = [
    {
        title: "Software Development",
        image: {
            src: SoftwareDevelopment,
            styles: {
                position: "absolute",
                right: "12px",
                bottom: "-5px",
            },
        },
        column: "column1",
    },
    {
        title: "Quality Assurance (QA)",
        image: {
            src: QA,
            styles: {
                position: "absolute",
                right: "23px",
                bottom: "15px",
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
                right: "0px",
                bottom: "7px",
            },
        },
        column: "column2",
    },
    {
        title: "IT Service Outsourcing",
        image: {
            src: ServiceOutsourcing,
            styles: {
                position: "absolute",
                right: "12px",
                bottom: "12px",
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
                right: "21px",
                bottom: "21px",
            },
        },
        column: "column3",
    },
    {
        title: "Design Services",
        image: {
            src: DesignServices,
            styles: {
                position: "absolute",
                right: "39px",
                bottom: "-18px",
            },
        },
        column: "column3",
    },
];