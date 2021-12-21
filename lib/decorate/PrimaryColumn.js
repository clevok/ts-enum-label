"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrimaryColumn = void 0;
var Metadata_1 = require("./util/Metadata");
function PrimaryColumn() {
    return function (target, name) {
        (0, Metadata_1.Metadata)(target.constructor).addMetadata({
            primary: true,
            column: String(name),
            transformer: [],
        });
    };
}
exports.PrimaryColumn = PrimaryColumn;
