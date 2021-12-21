"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Metadata = void 0;
var has_1 = require("./has");
function Metadata(target) {
    return (0, has_1.returnIfHas)(target.prototype, 'Metadata', useMetadata);
}
exports.Metadata = Metadata;
function useMetadata() {
    var cell = [];
    var addMetadata = function (option) {
        if (!option.primary) {
            return cell.push(option);
        }
        if (findPrimary()) {
            throw new Error('发现存在多条PrimaryColumn');
        }
        return cell.push(option);
    };
    var findPrimary = function () {
        return cell.find(function (cell) { return cell.primary; });
    };
    return {
        addMetadata: addMetadata,
        findPrimary: findPrimary,
    };
}
