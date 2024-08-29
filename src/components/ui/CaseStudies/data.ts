import wulk from "../../../app/libs/images/caseStudies/wulk.png";
import schoolHack from "../../../app/libs/images/caseStudies/schoolHack.png";

export const caseStudies = [
  {
    title: "Luxus",
    description:
      "Jewelry investment platform. The project aims to provide users with a convenient and secure method to invest in high-value jewelry.",
    technologies: ["React", "Next.js", "TS", "HTML", "SCSS", "MUI", "Strapi"],
    achievements: [
      "Successfully integrated a new design for the entire website in a short period.",
      "Led the implementation of a responsive design, significantly improving the platform’s accessibility and user experience on mobile devices.",
      "Played a crucial role in the migration of the platform to Next.js.",
      "Integrated Stripe and Plaid for seamless and secure payment processing on the platform, providing users with convenient and reliable payment options.",
    ],
    color: "#FFFFFF",
    image: wulk,
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
