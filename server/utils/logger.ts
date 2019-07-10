import pino from 'pino';
import childProcess from 'child_process';
import stream from 'stream';
import fs from 'fs';

const cwd = process.cwd();
const { env } = process;
const logPath = `${cwd}/logs`;
console.log(`Logs stored at ${logPath}`);

const logThrough = new stream.PassThrough();
const allLogs = fs.createWriteStream(`${logPath}/app.log`);

const logger = pino(
    {
        name: 'local-lib',
        level: 'debug',
        prettyPrint: { colorize: true },
    },
    logThrough
);

const child = childProcess.spawn(
    process.execPath,
    [
        require.resolve('pino-tee'),
        'warn',
        `${logPath}/warn.log`,
        'error',
        `${logPath}/error.log`,
        'fatal',
        `${logPath}/fatal.log`,
    ],
    { cwd, env }
);

logThrough.pipe(child.stdin);
logThrough.pipe(allLogs);

export { logger };
