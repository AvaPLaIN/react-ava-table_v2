var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import { jsx as _jsx } from "react/jsx-runtime";
import { useRef } from "react";
import Columns from "../columns/Columns";
import { TableContainer } from "./Table.styles";
var columns = [
    {
        headerName: "Name",
        children: [
            {
                id: "firstname",
                label: "First Name",
            },
            {
                id: "lastname",
                label: "Last Name",
            },
        ],
    },
];
var Table = function () {
    var tableRef = useRef(null);
    return (_jsx(TableContainer, __assign({ ref: tableRef }, { children: _jsx(Columns, { columns: columns, columnGrouping: true }) })));
};
export default Table;
//# sourceMappingURL=Table.js.map