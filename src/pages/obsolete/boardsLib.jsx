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
 * Created by wplei on 10/07/18.
 */
import React from "react";
import "./styles/ccms.less";
import { view as View } from "modules/ccmsLibrary";
import Wrap from "commons/components/wrapComponent";
// import { Header } from "modules/header";
// import { Navbar } from "modules/navbar";
// import { Container } from "modules/container";

const CcmsBoard = () => {
    document.title = "ISC-GUI Dashboard Library";
    return (
        <Wrap>
            <View />
        </Wrap>
    );
};

export default CcmsBoard;
