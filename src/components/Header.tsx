import React, { ReactNode } from "react";
import { Box } from "@chakra-ui/react";
import Logo from "../header_logo.png";
import Glob from "./design/Glob";
import { theme } from "@theme/index";

interface HeaderProps {
  children?: ReactNode;   // ✅ declare type
}

const Header: React.FC<HeaderProps> = ({ children }) => (
  <>
    <Box
      overflow="hidden"
      className="globParent"
      position="absolute"
      width="100vw"
      height="100%"
      minHeight="100vh"
      pointerEvents="none"
    >
      {/* <Glob
        size={["65%", "65%"]}
        speed={30}
        globSizes={[[35, 65], [30, 30], [35, 50]]}
        left="2%"
        top="0%"
        opacity={0.5}
        color={theme.colors.brand.green}
      />
      <Glob
        size={["500px", "500px"]}
        left="-80px"
        top="-20px"
        color={theme.colors.brand.green}
      /> */}
 <Glob size={["60%", "60%"]} speed={30} globSizes={[[60, 65], [70, 80], [30, 75]]} left="-10%" top="7%" opacity={0.5} color={theme.colors.brand.green} />
            <Glob size={["600px", "600px"]} left="-50px" top="-65px" color={theme.colors.brand.green} />
    </Box>

    <Box
      className="cs-header"
      position="fixed"
      top="0"
      right="0"
      left="0"
      width="100vw"
      height="80px"
      zIndex={1000}


    >
      <a href="https://characterstrong.com">
        <img className="header-img" src={Logo} alt="CharacterStrong Logo" />
      </a>
      {children}
    </Box>
  </>
);

export default Header;
