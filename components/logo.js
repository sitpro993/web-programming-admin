import PropTypes from "prop-types";
import { styled } from "@mui/material/styles";
import Link from "next/link";
import Image from "next/image";

export const Logo = styled((props) => {
  const { variant, ...other } = props;

  const color = variant === "light" ? "#C1C4D6" : "#5048E5";

  return (
    <Link href="/admin/dashboard">
      <a>
        <Image
          src="https://res.cloudinary.com/beeyou/image/upload/v1635431347/logo/logo_q5eftl.webp"
          alt="BeeYou - Thời trang Chất"
          width={80}
          height={80}
          layout="fixed"
        />
      </a>
    </Link>
  );
})``;

Logo.defaultProps = {
  variant: "primary",
};

Logo.propTypes = {
  variant: PropTypes.oneOf(["light", "primary"]),
};
