import { styled } from "@mui/material";
import Box from "@mui/material/Box";

import { MiniChartWidget } from "~/components/HomeDashboardWidgets";

interface IMiniWidgetProps {
  name: string;
  count: string | number;
  footerText: string;
  // footerIcon: OverridableComponent<SvgIconTypeMap<{}, "svg">> & {
  //   muiName: string;
  // };
  change: number;
  changeType: string;
}

interface IGeneralDashboardWidgetsLayoutProps {
  data: IMiniWidgetProps[];
  //   title?: string;
  // any props that come into the component
}

export const GeneralDashboardWidgetsLayout = (
  props: IGeneralDashboardWidgetsLayoutProps
) => {
  return (
    <StyledWrapperBox>
      {props.data.map((widget: IMiniWidgetProps) => (
        <MiniChartWidget key={widget.name} widget={widget} />
      ))}
    </StyledWrapperBox>
  );
};

const StyledWrapperBox = styled(Box)(({ theme }) => ({
  // display: "flex",
  // flexDirection: "column",
  // flex: 6,
  // padding: "20px",
  // gap: "20px",

  [theme.breakpoints.up("md")]: {
    display: "flex",
    padding: "20px",
    gap: "20px",
    flexDirection: "row",
    flex: 6,
    justifyContent: "space-evenly",
    // width: "1vw",
  },
}));
