import tl = require('azure-pipelines-task-lib/task');
const { spawn } = require('child_process')


async function run() {
    try {
        console.log('Betterscan scan');
	let dir = __dirname;
        let mount = dir+":"+dir;
	console.log(mount)
	const bs1 = spawn("docker run -e "+dir+" -v "+mount+" -i scanmycode/scanmycode3-ce:worker-cli /bin/sh -c 'cd "+dir+" && checkmate init'", {
        shell: true
        })
	bs1.stderr.on('data', (data: any) => {
        console.log(data.toString());
        });
        bs1.stdout.on('data', (data: any) => {
        console.log(data.toString());
        });
        const bs2 = spawn("docker run -e "+dir+" -v "+mount+" -i scanmycode/scanmycode3-ce:worker-cli /bin/sh -c 'cd "+dir+" && checkmate git init'", {
        shell: true
        })
	bs2.stderr.on('data', (data: any) => {
        console.log(data.toString());
        });
	bs2.stdout.on('data', (data: any) => {
        console.log(data.toString());
        });
	const bs3 = spawn("docker run -e "+dir+" -v "+mount+" -i scanmycode/scanmycode3-ce:worker-cli /bin/sh -c 'cd "+dir+" && checkmate git analyze --branch `git rev-parse --abbrev-ref HEAD` && checkmate issues html '", {
        shell: true
        })
	bs3.stderr.on('data', (data: any) => {
        console.log(data.toString());
        });
        bs3.stdout.on('data', (data: any) => {
        console.log(data.toString());
        });








    }
    catch (err) {
        tl.setResult(tl.TaskResult.Failed, err.message);
    }
}

run();
