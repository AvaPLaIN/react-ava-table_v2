import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { HeaderContainer } from "./Header.styles";
var Header = function (_a) {
    var columns = _a.columns;
    return (_jsx(HeaderContainer, { children: columns.map(function (column, index) { return (_jsxs("div", { children: [_jsx("p", { children: column.headerName }), _jsx("div", { children: "|" })] }, index)); }) }));
};
export default Header;
//# sourceMappingURL=Header.js.map