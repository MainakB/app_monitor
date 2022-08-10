import { styled } from "@mui/material";
import Box from "@mui/material/Box";
import { useState } from "react";

import { MiniChartWidget } from "~/components/HomeDashboardWidgets";

interface IMiniWidgetProps {
  name: string;
  count: string | number;
  footerText: string;
  pathName: string;
  // footerIcon: OverridableComponent<SvgIconTypeMap<{}, "svg">> & {
  //   muiName: string;
  // };
  change: number;
  changeType: string;
}

interface IGeneralDashboardWidgetsLayoutProps {
  data: IMiniWidgetProps[];
  pdfDwldCart: string[];
  //   title?: string;
  // any props that come into the component
}

export const GeneralDashboardWidgetsLayout = (
  props: IGeneralDashboardWidgetsLayoutProps
) => {
  const [cart, setCart] = useState<string[]>([]);

  return (
    <StyledWrapperBox>
      {props.data.map((widget: IMiniWidgetProps) => (
        <MiniChartWidget
          key={widget.name}
          widget={widget}
          // cart={cart}
          // setCart={setCart}
          pdfDwldCart={props.pdfDwldCart}
        />
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
