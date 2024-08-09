import { v4 as uuidv4 } from "uuid";

import Card from "../Card/Card";

const text =
  "Choosing Luna Edge, you can be sure that a team of experienced experts will work on the implementation of your idea.  We guarantee not only high-quality and timely work, but also established communication and feedback, and checking the quality of the work performed is one of our professional principles.";

export const CARROUSEL_INFORMATION = [
  {
    key: uuidv4(),
    content: <Card title="Professionalism 0" text={text} />,
  },
  {
    key: uuidv4(),
    content: <Card title="Professionalism 1" text={text} />,
  },
  {
    key: uuidv4(),
    content: <Card title="Professionalism 2" text={text} />,
  },
  {
    key: uuidv4(),
    content: <Card title="Professionalism 3" text={text} />,
  },
  {
    key: uuidv4(),
    content: <Card title="Professionalism 4" text={text} />,
  },
  {
    key: uuidv4(),
    content: <Card title="Professionalism 5" text={text} />,
  },
];
