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
const tl = require("azure-pipelines-task-lib/task");
const { spawn } = require('child_process');
function run() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            console.log('Betterscan scan');
            let dir = __dirname;
            let mount = dir + ":" + dir;
            console.log(mount);
            const bs1 = spawn("docker run -e " + dir + " -v " + mount + " -i scanmycode/scanmycode3-ce:worker-cli /bin/sh -c 'cd " + dir + " && checkmate init'", {
                shell: true
            });
            bs1.stderr.on('data', (data) => {
                console.log(data.toString());
            });
            bs1.stdout.on('data', (data) => {
                console.log(data.toString());
            });
            const bs2 = spawn("docker run -e " + dir + " -v " + mount + " -i scanmycode/scanmycode3-ce:worker-cli /bin/sh -c 'cd " + dir + " && checkmate git init'", {
                shell: true
            });
            bs2.stderr.on('data', (data) => {
                console.log(data.toString());
            });
            bs2.stdout.on('data', (data) => {
                console.log(data.toString());
            });
            const bs3 = spawn("docker run -e " + dir + " -v " + mount + " -i scanmycode/scanmycode3-ce:worker-cli /bin/sh -c 'cd " + dir + " && checkmate git analyze --branch `git rev-parse --abbrev-ref HEAD` && checkmate issues html '", {
                shell: true
            });
            bs3.stderr.on('data', (data) => {
                console.log(data.toString());
            });
            bs3.stdout.on('data', (data) => {
                console.log(data.toString());
            });
        }
        catch (err) {
            tl.setResult(tl.TaskResult.Failed, err.message);
        }
    });
}
run();
