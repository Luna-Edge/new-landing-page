import luxus from "../../../app/libs/images/caseStudies/luxus.png";
import wulk from "../../../app/libs/images/caseStudies/wulk.png";
import schoolHack from "../../../app/libs/images/caseStudies/schoolHack.png";

export const caseStudies = [
  {
    title: "Luxus",
    description:
      "Jewelry investment platform aimed at providing users with a convenient and secure method to invest in high-value jewelry.",
    technologies: [
      "React",
      "Next.js",
      "TypeScript",
      "HTML",
      "SCSS",
      "MUI",
      "Strapi",
    ],
    achievements: [
      "Implemented visually appealing and user-friendly interfaces for the platform, enhancing the overall user experience.",
      "Refactored and rewrote legacy code to align with modern standards, improving code quality, maintainability, and scalability.",
      "Led the migration of the platform to Next.js, optimizing performance and development efficiency.",
      "Successfully integrated a new design across the entire website within a tight deadline, contributing to a refreshed and modern user interface.",
      "Developed and managed complex, dynamic user forms using React Hook Form, streamlining user interactions.",
      "Implemented responsive design principles, significantly improving accessibility and user experience on mobile devices.",
      "Integrated Stripe and Plaid, enabling seamless and secure payment processing, enhancing user trust and convenience.",
    ],
    color: "#FFFFFF",
    image: luxus,
  },
  {
    title: "School Hack",
    description:
      "School Hack is a multifunctional social network project that has been developed by our team since 2022. It currently serves 3,140,059 active users globally, with the user base growing daily.",
    technologies: [
      "React.js",
      "Redux.js",
      "Vite.js",
      "axios",
      "date-fns",
      "bootstrap",
      "react-router-dom",
      "cloudinary-react",
      "emoji-picker-react",
      "yup",
      "react-hook-form",
      "lottie-react",
    ],
    achievements: [
      "Integrated an AI assistant to enhance user interaction and support, leveraging our extensive experience in UI development and server API integration.",
      "Developed a real-time messaging system allowing users to engage in private messages, group chats, and feeds, fostering dynamic communication.",
      "Implemented features for quizzes and assessments, enabling users to create and participate in educational activities, adding a dynamic learning component.",
      "Managed media functionality, allowing seamless downloading, storing, and sharing of audio, video files, documents, and images.",
      "Integrated cryptocurrency transaction capabilities, enabling secure and efficient payments within the platform.",
      "Developed comprehensive user profiles and secure authorization mechanisms, ensuring a personalized and safe user experience.",
      "Integrated Stripe Successfully managed the scale and complexity of the project, continuously expanding and enhancing the platform to meet diverse functional requirements.and Plaid, enabling seamless and secure payment processing, enhancing user trust and convenience.",
    ],
    color: "#EEF3FB",
    image: wulk,
  },
  {
    title: "Wult",
    description:
      "The project consists of two parts: a website for attracting clients and a platform for client management.",
    technologies: [
      "Next.js",
      "TypeScript",
      "and modular SCSS, with heavy integration of Ant Design and Axios for frontend functionalities.",
    ],
    achievements: [
      "Developed new pages for the website and created a sitemap to improve SEO and site structure.",
      "Designed and implemented an animated widget that displays a checklist of tasks from Strapi, allowing users to mark tasks as completed and export the checklist in CSV format.",
      "Migrated the platform's CRM system to a new API, replacing all data types with updated versions.",
      "Rewrote a complex component from scratch in two weeks, utilizing the React Flow library, significantly outperforming the previous developer’s timeline of four months.",
      "Implemented EditorJs for writing and editing policy texts on the platform, adding two custom tools using classes and vanilla JavaScript.",
      "Completely overhauled the platform’s navigation and developed several pages without design references, relying solely on the style guide.",
    ],
    color: "#CEDFF7",
    image: schoolHack,
  },
];
