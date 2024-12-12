import { startCronJob } from './index.ts';
import fs from 'fs';
import path from 'path';
import { __dirname } from './const.ts';

const args = process.argv.slice(2);

if (args.includes('start')) {
    startCronJob();
} 
else if (args.includes('stop')) {
    const PID_FILE = path.join(__dirname, 'cron.pid');
    if (fs.existsSync(PID_FILE)) {
        const pid = parseInt(fs.readFileSync(PID_FILE, 'utf-8'), 10);
        try {
            // 终止定时任务进程
            process.kill(pid, 'SIGTERM');
            console.log(`Stopped process with PID ${pid}`);
        } catch (error: any) {
            console.error('Failed to stop the process:', error.message);
        }
    } else {
        console.log('No running process found.');
    }
} else {
    console.error('Usage: node cli-tool.ts [start|stop]');
}