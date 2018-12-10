/*
* =========================================================================
*  Copyright (C)2018 NCS Pte. Ltd. All Rights Reserved
*
*  This software is confidentifyential and proprietary to NCS Pte. Ltd. You shall
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
 * Created by Deng Xiaolong on 28/05/2018.
 */

export const defaultMapData = {
    zoom: 10,
    layer: "HERE.normalDayTransit",
    layerList: ["HERE.normalDayTransit", "HERE.normalDayCustom", "HERE.normalDayGrey"],
    country: "Australia",
    countryData: [
        {
            "countryName": "Australia",
            "center": [150.96095060929656, -33.865232935648514]
        },
        {
            "countryName": "Singapore",
            "center": [103.81805419921876, 1.349133733693114]
        }
    ]
};

// HERE.satelliteDay OpenStreetMap
