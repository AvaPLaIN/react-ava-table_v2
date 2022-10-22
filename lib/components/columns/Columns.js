import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { ColumnsContainer } from "./Columns.styles";
import Children from "./components/children/Children";
import Header from "./components/header/Header";
var Columns = function (_a) {
    var columns = _a.columns, columnGrouping = _a.columnGrouping;
    var childrenColumnsWithGrouping = columnGrouping
        ? columns.map(function (column) { return column.children; }).flat()
        : columns;
    return (_jsxs(_Fragment, { children: [_jsx(ColumnsContainer, { children: columnGrouping && _jsx(Header, { columns: columns }) }), _jsx(Children, { columns: childrenColumnsWithGrouping })] }));
};
export default Columns;
//# sourceMappingURL=Columns.js.map