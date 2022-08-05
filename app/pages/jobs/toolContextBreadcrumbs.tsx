import * as React from "react";
import { useNavigate, useLocation } from "@remix-run/react";
import { emphasize, styled } from "@mui/material/styles";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import HomeIcon from "@mui/icons-material/Home";
import GroupOutlinedIcon from "@mui/icons-material/GroupOutlined";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import { ROUTEPATHS } from "~/data/constants/nav";

interface IGenericBreadcrumbsProps {
  crumbs: string;
  setCrumbs: Function;
  shouldNavigate?: boolean;
}

export const ToolContextBreadcrumbs = (props: IGenericBreadcrumbsProps) => {
  let navigate = useNavigate();
  let location = useLocation();

  const handleClick = (
    event: React.MouseEvent<Element, MouseEvent>,
    crumbValue: string,
    val: string,
    setCrumbsFn: Function
  ) => {
    event.preventDefault();
    setCrumbsFn(null);
  };

  const getIcon = (title: string) => {
    switch (title) {
      case "Home":
        return <HomeIcon fontSize="small" />;
      default:
        return <GroupOutlinedIcon fontSize="small" />;
    }
  };

  return (
    // <div role="presentation" onClick={handleClick}>
    <Stack spacing={2}>
      <Breadcrumbs
        separator={<NavigateNextIcon fontSize="small" />}
        // separator="›"
        aria-label="breadcrumb"
      >
        {["HOME", props.crumbs].map((val, idx) => (
          <StyledBreadcrumb
            disabled={props.crumbs && idx == 0}
            key={`crumb-tms-${val}-${idx}`}
            component="a"
            href="#"
            label={val}
            icon={getIcon(val)}
            deleteIcon={idx ? <CloseOutlinedIcon fontSize="small" /> : <></>}
            onDelete={
              idx
                ? (event: any) =>
                    handleClick(event, props.crumbs, val, props.setCrumbs)
                : undefined
            }
          />
        ))}
      </Breadcrumbs>
    </Stack>
  );
};

// TypeScript only: need a type cast here because https://github.com/Microsoft/TypeScript/issues/26591
const StyledBreadcrumb = styled(Chip)(({ theme }) => {
  const backgroundColor =
    theme.palette.mode === "light"
      ? theme.palette.grey[100]
      : theme.palette.grey[800];
  return {
    backgroundColor,
    height: theme.spacing(3),
    color: theme.palette.text.primary,
    fontWeight: theme.typography.fontWeightRegular,
    "&:hover, &:focus": {
      backgroundColor: emphasize(backgroundColor, 0.06),
    },
    "&:active": {
      boxShadow: theme.shadows[1],
      backgroundColor: emphasize(backgroundColor, 0.12),
    },
  };
}) as typeof Chip;
