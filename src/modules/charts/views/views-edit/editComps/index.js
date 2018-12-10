/*
 * =========================================================================
 *  Copyright (C)2018 NCS Pte. Ltd. All Rights Reserved
 *
 *  This software is confidential and proprietary to NCS Pte. Ltd. You shall
 *  use this software only in accordance with the terms of the license
 *  agreement you entered into with NCS.  No aspect or part or all of this
 *  software may be reproduced, modified or disclosed without full and
 *  direct written authorisation from NCS.
 *
 *  NCS SUPPLIES THIS SOFTWARE ON AN "AS IS" BASIS. NCS MAKES NO
 *  REPRESENTATIONS OR WARRANTIES, EITHER EXPRESSLY OR IMPLIEDLY, ABOUT THE
 *  SUITABILITY OR NON-INFRINGEMENT OF THE SOFTWARE. NCS SHALL NOT BE LIABLE
 *  FOR ANY LOSSES OR DAMAGES SUFFERED BY LICENSEE AS A RESULT OF USING,
 *  MODIFYING OR DISTRIBUTING THIS SOFTWARE OR ITS DERIVATIVES.
 *
 *  =========================================================================
 */
/**
 * Created by KaiDi on 25/05/2018.
 */

//import common component
import Type from "./common/builder-type";
import Time from "./common/builder-time";
import Title from "./common/builder-title";
import Theme from "./common/builder-theme";
import Source from "./common/builder-source";
import SwitchXY from "./common/builder-switchXY";
import DataZoom from "./common/builder-dataZoom";
import AutoRefresh from "./common/builder-refresh";
import Format from "./common/builder-datetimeFormat";
import GaugeMinMax from "./common/builder-gaugeMinMax";
import GaugeThreshold from "./common/builder-gaugeThresh";
import LegendPosition from "./common/builder-legendPosition";

//import statistic component
import ResourceList from "./statistic/builder-resourceList";

//import KPI component
import KPIcontainer from "./KPI/builder-kpiContainer";
import ServiceList from "./KPI/builder-serviceSelecter";
import { SelectXdata, SelectYdata } from "./KPI/builder-kpiDataColumn";

//import device reading component
import Device from "./deviceReading/builder-device";
import MarkLine from "./deviceReading/builder-markLine";
import Grouping from "./deviceReading/builder-grouping";
import Interval from "./deviceReading/builder-interval";
import Parameter from "./deviceReading/builder-parameter";
import SinglePara from "./deviceReading/builder-singlePara";
import Aggregation from "./deviceReading/builder-aggregation";
import legendLabel from "./deviceReading/builder-legendLabel";
import FuncInterval from "./deviceReading/builder-funcInterval";
import ReadingLabel from "./deviceReading/builder-readingLabel";
import CombineYaxis from "./deviceReading/builder-combineYaxis";
import Customize from "./deviceReading/builder-customizeReading";
import LocalAggregation from "./deviceReading/builder-localAggregation";

//export statistic builder
export { ResourceList };

//export KPI builder
export { KPIcontainer, ServiceList, SelectXdata, SelectYdata };

//export common builder
export { Type, Time, Title, Theme, Format, Source, LegendPosition, GaugeMinMax, GaugeThreshold, SwitchXY, AutoRefresh };
export { DataZoom };

//export device reading builder
export { Device, Aggregation, Grouping, Interval, Parameter, SinglePara, legendLabel };
export { LocalAggregation, FuncInterval, MarkLine, Customize, ReadingLabel, CombineYaxis };
