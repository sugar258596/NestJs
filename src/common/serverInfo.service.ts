import { Injectable } from '@nestjs/common';
import * as os from 'os';

@Injectable()
export class ServerInfoService {
  getLocalIP(): string {
    const ifaces = os.networkInterfaces();
    let localIP = '';

    Object.keys(ifaces).forEach((ifname) => {
      ifaces[ifname].forEach((iface) => {
        if (iface.family === 'IPv4' && !iface.internal) {
          localIP = iface.address;
        }
      });
    });
    return localIP + ':' + process.env.SERVET_PORT;
  }
}
