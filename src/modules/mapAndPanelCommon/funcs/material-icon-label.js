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
 * Created by Deng XiaoLong on 22/10/2018.
 */
import L from "leaflet";
import { c_ } from "modules/mapAndPanelCommon";

(function (window, document) {
    L.MaterialIconWithLabel = {};

    L.MaterialIconWithLabel.version = "2.0.1";

    L.MaterialIconWithLabel.Icon = L.Icon.extend({
        options: {
            iconSize: [32, 32],
            iconAnchor:   [17, 42],
            popupAnchor: [1, -32],
            shadowAnchor: [10, 12],
            shadowSize: [36, 16],
            className: "awesome-marker",
            prefix: "glyphicon",
            spinClass: "fa-spin",
            extraClasses: "",
            icon: "home",
            markerColor: "blue",
            iconColor: "white"
        },

        initialize: function (options) {
            options = L.Util.setOptions(this, options);
        },

        createIcon: function () {
            const div = document.createElement("div"),
                options = this.options;
            div.className = "material-icons";
            if (options.icon) {
                div.innerHTML = this._createInner();
            }

            if (options.bgPos) {
                div.style.backgroundPosition =
                    (-options.bgPos.x) + "px " + (-options.bgPos.y) + "px";
            }

            this._setIconStyles(div, "icon-" + options.markerColor);
            return div;
        },

        _createInner: function() {
            const {
                label: labelInfo,
                imageUrl = "",
                markerColor,
                icon,
                iconImg = "icon"
            } = this.options;
            let label = "";
            if (labelInfo) {
                label = c_.label(labelInfo);
            }
            return `<div
                        class="map_icon_maker"
                        style="background-image: url(${iconImg !== "icon" ? imageUrl : ""});"
                    >
                        <span
                            class="material-icons"
                            title="${labelInfo}"
                            style="color: ${markerColor}; display: ${(iconImg === "icon" || !imageUrl) ? "block" : "none"}"
                        >${icon}</span>
                        <div
                            class="map_maker_label"
                            style="display: ${label ? "block" : "none"}"
                        >${label}</div>
                        <div
                            class="map_maker_triangle"
                            style="display: ${label ? "block" : "none"}"
                        ></div>
                    </div>`;
        },

        _setIconStyles: function (img, name) {
            let options = this.options,
                size = L.point(options[name === "shadow" ? "shadowSize" : "iconSize"]),
                anchor;

            if (name === "shadow") {
                anchor = L.point(options.shadowAnchor || options.iconAnchor);
            } else {
                anchor = L.point(options.iconAnchor);
            }

            if (!anchor && size) {
                anchor = size.divideBy(2, true);
            }

            img.className = "awesome-marker-" + name + " " + options.className;

            if (anchor) {
                img.style.marginLeft = (-anchor.x) + "px";
                img.style.marginTop  = (-anchor.y) + "px";
            }

            if (size) {
                img.style.width  = size.x + "px";
                img.style.height = size.y + "px";
            }
        },

        createShadow: function () {
            const div = document.createElement("div");

            this._setIconStyles(div, "shadow");
            return div;
        }
    });
        
    L.MaterialIconWithLabel.icon = function (options) {
        return new L.MaterialIconWithLabel.Icon(options);
    };

}(this, document));



