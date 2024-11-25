import StarFilledIcon from "@/../public/star-filled.svg";
import StarOutlineIcon from "@/../public/star-outline.svg";

interface BookMarkStarProps {
  isFilled: boolean;
}

export const BookMarkStar = ({ isFilled }: BookMarkStarProps) => {
  if (isFilled) {
    return <StarFilledIcon />;
  } else {
    return <StarOutlineIcon />;
  }
};
