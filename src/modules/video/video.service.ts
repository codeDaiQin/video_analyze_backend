import { Injectable } from '@nestjs/common';
import { getVideoDurationInSeconds } from 'get-video-duration';
import { existsSync, mkdirSync } from 'fs';
import * as ffmpeg from 'ffmpeg';
import { exec } from 'child_process';
import puppeteer from 'puppeteer';
import { v4 } from 'uuid';

const videoExt = ['mp4'];

@Injectable()
export class VideoService {
  private formatTime(seconds: number): `${string}:${string}:${string}` {
    const h = Math.floor(seconds / 3600);
    seconds %= 3600;
    const m = Math.floor(seconds / 60);
    seconds %= 60;

    return `${h > 9 ? h : '0' + h}:${m > 9 ? m : '0' + m}:${
      seconds > 9 ? seconds : '0' + seconds
    }`;
  }

  // 生成视频的关键帧gif
  public async generateKeyFrameGif(name: string) {
    const ext = name.split('.').at(-1);
    const fileName = name.slice(0, name.lastIndexOf('.'));
    if (!videoExt.includes(ext)) {
      throw new Error(`.${ext} is not a legal type`);
    }

    const videoPath = `static/video/${name}`;
    if (!existsSync(videoPath)) {
      throw new Error(`file: ${name} not found`);
    }

    // 获取总时长
    const time = await getVideoDurationInSeconds(videoPath);
    // return time;

    // 截取视频各个时间点的截图帧
    for (let i = 0; i < time; i++) {}

    const staticPath = `static/video/TMP_${fileName}.png`;

    // if (!existsSync(gifPath)) {
    //   mkdirSync(gifPath);
    // }

    // ffmpeg -i capx.mp4 -t 10 -s 320x240 -pix_fmt rgb24 jidu1.gif
    // -t参数表示提取前10秒视频
    // -s 表示按照 320x240的像素提取
    const resolution = '382x216'; // 分辨率
    // const command = `ffmpeg -i ${videoPath} -t ${this.formatTime(
    //   time,
    // )} -s ${resolution} -pix_fmt rgb24 ${gifPath}`;

    // console.log(command);

    // exec(command, (err) => {
    //   console.log(err);
    // });

    // try {
    //   const proess = await new ffmpeg(videoPath);
    //   proess
    //     .setVideoSize(resolution, true, true, '#fff') // 设置视频大小(分辨率, 保持像素纵横比, 保持长宽比例, 填充颜色)
    //     // .setAudioCodec('libfaac') // 设置音频编解码器
    //     // .setAudioChannels(2) // 设置音频频道
    //     // .setVideoFormat('gif')
    //     .save(gifPath, (error, file) => {
    //       if (!error) console.log('Video file: ' + file);
    //     });
    // } catch (e) {
    //   console.log(e, '==== error');
    // }

    // create a browser
    const browser = await puppeteer.launch({
      args: [
        '--disable-web-security', // cors
        // '--ignore-certificate-errors',
        // '--no-sandbox',
        // '--disable-setuid-sandbox',
        // '--disable-gpu',
      ],
      // 如果是访问https页面 此属性会忽略https错误
      ignoreHTTPSErrors: true,
    });

    // ceate a new page
    const page = await browser.newPage();

    // cookies
    const cookies = [
      {
        name: '_uuid',
        value: '1F2C7413-104FA-E1F5-D692-8687C11FC103197286infoc',
      },
      {
        name: 'buvid3',
        value: '9D5AB59F-4FDD-C732-90F2-1F4AFBAEC1EF08127infoc',
      },
      {
        name: 'b_nut',
        value: '1651733309',
      },
      {
        name: 'buvid4',
        value:
          'D37FAF8C-0ECE-C992-ECB2-EB2466F9DDFD08127-022050514-+yHNrXw7i70jDGzCajMVMg%3D%3D',
      },
      {
        name: 'i-wanna-go-back',
        value: '-1',
      },
      {
        name: 'nostalgia_conf',
        value: '-1',
      },
      {
        name: 'rpdid',
        value: `|(J~Rlml~uRY0J'uYlkkl~~Ym`,
      },
      {
        name: 'CURRENT_BLACKGAP',
        value: '0',
      },
      {
        name: 'blackside_state',
        value: '0',
      },
      {
        name: 'buvid_fp_plain',
        value: 'undefined',
      },
      {
        name: 'fingerprint3',
        value: 'fca41752bce0e1bae4c2cfa3c3eb914d',
      },
      {
        name: 'fingerprint',
        value: 'b232604ed8f98f5491ca612c208fadd1',
      },
      {
        name: 'buvid_fp',
        value: '9704b9004d3f56df11d57acaa2d5d429',
      },
      {
        name: 'DedeUserID',
        value: '10091496',
      },
      {
        name: 'DedeUserID__ckMd5',
        value: 'f870cc9b1173825b',
      },
      {
        name: 'SESSDATA',
        value: '54f03724%2C1673014743%2Cb6b87*71',
      },
      {
        name: 'bili_jct',
        value: '2424ac3856df2840e321c7bf4c306da1',
      },
      {
        name: 'b_ut',
        value: '5',
      },
      {
        name: 'PVID',
        value: '1',
      },
      {
        name: 'LIVE_BUVID',
        value: 'AUTO5916578865385112',
      },
      {
        name: 'hit-dyn-v2',
        value: '1',
      },
      {
        name: 'bp_video_offset_10091496',
        value: '692647189711683600',
      },
      {
        name: 'CURRENT_FNVAL',
        value: '4048',
      },

      {
        name: 'sid',
        value: 'fykjgwj4',
      },
      {
        name: 'b_timer',
        value:
          '%7B%22ffp%22%3A%7B%22333.1007.fp.risk_9D5AB59F%22%3A%2218292AE95AD%22%2C%22333.1193.fp.risk_9D5AB59F%22%3A%221829526A5D0%22%2C%22333.337.fp.risk_9D5AB59F%22%3A%2218292AEDC0E%22%2C%22333.788.fp.risk_9D5AB59F%22%3A%2218295269C08%22%7D%7D',
      },
      {
        name: 'innersign',
        value: '0',
      },
      {
        name: 'b_lsid',
        value: '5C82BDE5_1831C688080',
      },
    ];

    await page.setCookie({
      name: 'IDP_S_ID',
      value: '96D3BEBE563A20E9992F335CF89DAAA0',
      domain: 'test-cloud.laiye.com',
    });

    // go to page
    await page.goto(
      'https://test-cloud.laiye.com/idp/idp_layout_model/field?appName=fix_bug&id=AAAAAAAAAAAAAAAAAAAAAIoWWSHI00',
    );

    // wait page onload
    const html = await page.content();

    // 截图
    await page.screenshot({
      path: staticPath,
      fullPage: true,
    });

    await browser.close();

    return html;
  }

  // 上传视频
  public async uploadVideo() {
    const id = v4();

    // 检查用户 资源目录是否存在
    if (!existsSync('./tmp')) {
      mkdirSync('./tmp');
    }

    return {
      id,
    };
  }
}
