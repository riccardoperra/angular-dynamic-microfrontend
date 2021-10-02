"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.build = exports.config = void 0;
// This file contains code that we reuse between our tests.
const fastify_1 = __importDefault(require("fastify"));
const fastify_plugin_1 = __importDefault(require("fastify-plugin"));
const app_1 = __importDefault(require("../src/app"));
// Fill in this config with all the configurations
// needed for testing the application
function config() {
    return __awaiter(this, void 0, void 0, function* () {
        return {};
    });
}
exports.config = config;
// Automatically build and tear down our instance
function build(t) {
    return __awaiter(this, void 0, void 0, function* () {
        const app = (0, fastify_1.default)();
        // fastify-plugin ensures that all decorators
        // are exposed for testing purposes, this is
        // different from the production setup
        void app.register((0, fastify_plugin_1.default)(app_1.default), yield config());
        yield app.ready();
        // Tear down our app after we are done
        t.teardown(() => void app.close());
        return app;
    });
}
exports.build = build;
//# sourceMappingURL=helper.js.map