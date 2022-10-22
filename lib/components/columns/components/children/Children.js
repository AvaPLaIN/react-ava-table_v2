import { jsx as _jsx } from "react/jsx-runtime";
import { ChildrenContainer } from "./Children.styles";
var Children = function (_a) {
    var columns = _a.columns;
    return (_jsx(ChildrenContainer, { children: columns.map(function (column, index) { return (_jsx("div", { children: column.label }, index)); }) }));
};
export default Children;
//# sourceMappingURL=Children.js.map