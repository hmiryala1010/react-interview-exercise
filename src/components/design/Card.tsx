import React, { PropsWithChildren } from "react";
import { Box, useStyleConfig } from "@chakra-ui/react";

export const CardTheme = {  };

type CardVariants = "rounded" | "smooth";

type CardProps = PropsWithChildren<{
  variant?: CardVariants;       
  borderColor?: string;
}>;

export const Card: React.FC<CardProps> = ({
  variant = "smooth",
  borderColor,
  children,
  ...rest
}) => {
  const styles = useStyleConfig("Card", { variant });
  return (
    <Box className="cs-card" __css={styles} borderColor={borderColor} {...rest}>
      {children}
    </Box>
  );
};
