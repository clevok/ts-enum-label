"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.returnIfHas = void 0;
function returnIfHas(target, key, handle) {
    if (Object.prototype.hasOwnProperty.call(target, key)) {
        return target[key];
    }
    return (target[key] = handle());
}
exports.returnIfHas = returnIfHas;
