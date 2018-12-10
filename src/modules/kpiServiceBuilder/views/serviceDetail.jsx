import React from "react";
// import PropTypes from "prop-types";
// import { TextField } from "modules/common";
import _ from "lodash";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

const ServiceDetail = props => {
    let { serviceDetail } = props;
    return (
        <div className="kpiQuery-scroll">
            {_.map(serviceDetail, (detail,key) => {
                let columns = ["Prameters","Value"];
                let parameters = Object.keys(detail);
                return (
                    <Table key={key}>
                        <TableHead>
                            <TableRow>{_.map(columns, (item, i) => <TableCell key={i}>{item}</TableCell>)}</TableRow>
                        </TableHead>
                        <TableBody>
                            {_.map(parameters, (n, i) => {
                                return (
                                    <TableRow key={i}>
                                        {_.map(columns, (item, index) => <TableCell key={index}>{item==="Value"?detail[n]:n}</TableCell>)}
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                );
            })}
        </div>
    );
};

export default ServiceDetail;
