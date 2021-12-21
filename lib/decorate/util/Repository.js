"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Repository = void 0;
var vue_1 = require("vue");
var Metadata_1 = require("./Metadata");
var has_1 = require("./has");
function Repository(target) {
    return (0, has_1.returnIfHas)(target.prototype, 'Repository', function () {
        var _a;
        return useRepository({
            Constructor: target,
            PrimaryColumnName: (_a = (0, Metadata_1.Metadata)(target).findPrimary()) === null || _a === void 0 ? void 0 : _a.column,
        });
    });
}
exports.Repository = Repository;
function useRepository(options) {
    var PrimaryColumnName = options.PrimaryColumnName, Constructor = options.Constructor;
    var Cache = new Map();
    var getPrimaryValue = function (value) {
        if (!value[PrimaryColumnName]) {
            throw new Error("\u4E3B\u952E" + String(PrimaryColumnName) + "\u4E3A\u7A7A");
        }
        return value[PrimaryColumnName];
    };
    var Get = function (value) {
        return Cache.get(getPrimaryValue(value));
    };
    var Delete = function (value) {
        return Cache.delete(getPrimaryValue(value));
    };
    var Insert = function (value) {
        var proxyValue = (0, vue_1.reactive)(new Constructor());
        Object.assign(proxyValue, filterObjectProperty(value, proxyValue));
        return Cache.set(getPrimaryValue(value), proxyValue), proxyValue;
    };
    var Save = function (value) {
        var result = Get(value);
        if (!result) {
            return Insert(value);
        }
        return Object.assign(result, filterObjectProperty(value, result));
    };
    return {
        Get: Get,
        Delete: Delete,
        Save: Save,
        Insert: Insert,
    };
}
function filterObjectProperty(source, target) {
    var result = {};
    Object.keys(source)
        .filter(function (key) { return Object.keys(target).includes(key); })
        .forEach(function (key) {
        result[key] = source[key];
    });
    return result;
}
