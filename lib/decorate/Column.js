"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Column = void 0;
var Metadata_1 = require("./util/Metadata");
function Column(options) {
    if (options === void 0) { options = {}; }
    return function (target, name) {
        (0, Metadata_1.Metadata)(target.constructor).addMetadata({
            primary: options.primary || false,
            column: String(name),
            transformer: options.transformer || [],
        });
    };
}
exports.Column = Column;
