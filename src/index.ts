import cron from 'node-cron';
import axios from 'axios';
import task from './task.ts'
import fs from 'fs';
import path from 'path';
import { __dirname } from './const.ts';

let cronTask: cron.ScheduledTask | null;

export async function startCronJob() {
    if (!cronTask) {
        // 每5秒执行一次
        cronTask = cron.schedule('*/5 * * * * *', async () =>  {
            task()
            await axios.get('http://172.18.21.44:9999/health.souche').catch((err) => {
                console.log('--1err---', err);
            })
        }, {
            scheduled: false
        });
        cronTask.start();
        // 进程pid存到外部文件
        const PID_FILE = path.join(__dirname, 'cron.pid');
        fs.writeFileSync(PID_FILE, process.pid.toString());
    } else {
        console.log('Cron job is already running');
    }
}
