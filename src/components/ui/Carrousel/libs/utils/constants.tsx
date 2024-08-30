import { v4 as uuidv4 } from "uuid";

import CDIcon from "../images/icons/cd.svg";
import TaskSquareIcon from "../images/icons/task-square.svg";
import RankingIcon from "../images/icons/ranking.svg";
import UnlimitedIcon from "../images/icons/unlimited.svg";

export const CARDS = [
  {
    key: uuidv4(),
    title: "Modernity",
    text: "Luna edge develops modern web sites and mobile applications using React, React Native and only the most modern and optimal technologies and solutions to ensure the highest product quality.  We care not only about the perfect visual appearance and reliable functioning, but also about the best possible performance of your website",
    icon: CDIcon,
  },
  {
    key: uuidv4(),
    title: "Preparedness for new challenges",
    text: "At Luna Edge, we believe that there are no easy or difficult tasks, there are only typical and interesting ones.  So if you have an interesting task, it is not a problem for us, but a pleasure. Let's do it!",
    icon: TaskSquareIcon,
  },
  {
    key: uuidv4(),
    title: "Focus on the result",
    text: "Your success is our success.  That is why Luna Edge responsibly approaches every stage of development from planning to final testing (If this is not the last stage, please correct me).",
    icon: RankingIcon,
  },
  {
    key: uuidv4(),
    title: "Continuous improvement",
    text: "In the world of advanced technologies, artificial intelligence and computerization, a flexible mind is absolutely necessary to perform unusual tasks.  Technologies, methodologies, approaches and patterns change almost every day.  That is why it is important to be flexible and to be able to quickly adapt to any conditions, and this is not a problem for us.  Luna Edge does not follow technology - Luna Edge lives it.",
    icon: UnlimitedIcon,
  },
];
