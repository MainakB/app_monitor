import { styled } from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { StackedAreaChart } from "~/components/Charts";
import { MiniChartWidget } from "~/components/HomeDashboardWidgets";
import { FONT_COLORS } from "~/data/constants/colors";
import { GLOBALBOXSHADOW } from "~/data/constants/colors";

interface IMiniWidgetProps {
  name: string;
  count: string | number;
  footerText: string;
  // footerIcon: OverridableComponent<SvgIconTypeMap<{}, "svg">> & {
  //   muiName: string;
  // };
  // change: number;
  // changeType: string;
}

interface IGeneralDashboardWidgetsLayoutProps {
  data: IMiniWidgetProps[];

  //   title?: string;
  // any props that come into the component
}

export const GeneralDashboardChartsLayout = (
  props: IGeneralDashboardWidgetsLayoutProps
) => {
  return (
    <StyledWrapperBox>
      {props.data.map((widget: IMiniWidgetProps) => (
        <StyledMiniWidgetWrapperBox
          isGraph={widget.name === "Jobs Trends"}
          key={widget.name}
        >
          <StyledBoxContentWrapper>
            <StyledTitle>{widget.name}</StyledTitle>
            {widget.name === "Jobs Trends" ? (
              <StackedAreaChart />
            ) : (
              <div>Placeholder widget</div>
            )}
          </StyledBoxContentWrapper>
        </StyledMiniWidgetWrapperBox>
      ))}
    </StyledWrapperBox>
  );
};

const StyledWrapperBox = styled(Box)(({ theme }) => ({
  // display: "flex",
  // flexDirection: "column",
  // padding: "20px",
  // gap: "20px",
  [theme.breakpoints.up("md")]: {
    display: "flex",
    padding: "20px",
    gap: "20px",
    flexDirection: "row",
  },
}));

const StyledMiniWidgetWrapperBox = styled(Box, {
  shouldForwardProp: (prop) => prop !== "isGraph",
})<{ isGraph?: boolean }>(({ theme, isGraph }) => ({
  display: "flex",
  justifyContent: "space-around",
  flex: isGraph ? 4 : 2,
  padding: "5px",
  boxShadow: GLOBALBOXSHADOW,
  borderRadius: "10px",
  height: "100%",
}));

const StyledBoxContentWrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
}));

const StyledTitle = styled(Typography)(({ theme }) => ({
  fontWeight: theme.typography.fontWeightMedium,
  fontSize: "18px",
  color: FONT_COLORS.HEADERS_LABELS_PLACEHOLDERS,
  paddingLeft: "40%",
}));
