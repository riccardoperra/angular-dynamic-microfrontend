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
Object.defineProperty(exports, "__esModule", { value: true });
const tap_1 = require("tap");
const helper_1 = require("../helper");
(0, tap_1.test)('example is loaded', (t) => __awaiter(void 0, void 0, void 0, function* () {
    const app = yield (0, helper_1.build)(t);
    const res = yield app.inject({
        url: '/example'
    });
    t.equal(res.payload, 'this is an example');
}));
//# sourceMappingURL=example.test.js.map