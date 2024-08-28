import TestimonialCard from "@/components/ui/TestimonialCard/TestimonialCard";
import { ComponentProps } from "react";
import EstherHowardAvatar from "../images/avatars/esther-howard.png";
import JohnDoeAvatar from "../images/avatars/john-doe.png";
import RobertFoxAvatar from "../images/avatars/robert-fox.png";

export const INTERACTIVE_GRID_BACKGROUND_GRID_SIZE = 10;

export const TESTIMONIALS: ComponentProps<typeof TestimonialCard>[] = [
  {
    testimonial:
      "Working withLuna team is an absolute pleasure! They have a special talent that is really hard to find in the development industry. They have a refined eye for design, and advanced development skills, which has helped deliver bespoke and top quality projects to our clients. Not only knowledgeable at craft, is great at communication, the best attitude.",
    author: {
      avatar: EstherHowardAvatar,
      name: "Esther Howard",
      position: "MS company",
    },
  },
  {
    testimonial:
      "Working withLuna team is an absolute pleasure! Which has helped deliver bespoke and top quality projects to our clients. Not only knowledgeable at craft, is great at communication, the best attitude.",
    author: {
      avatar: JohnDoeAvatar,
      name: "John Doe",
      position: "MS company",
    },
  },
  {
    testimonial:
      "Working withLuna team is an absolute pleasure! They have a special talent that is really hard to find in the development industry. They have a refined eye for design, and advanced development skills, which has helped deliver bespoke and top quality projects to our clients. Not only knowledgeable at craft, is great at communication, the best attitude.",
    author: {
      avatar: RobertFoxAvatar,
      name: "Robert Fox",
      position: "MS company",
    },
  },
];