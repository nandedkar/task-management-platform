import { appConfig } from '../../config';

export function printBanner() {
  console.log(`
=========================================
${appConfig.name}

Environment : ${appConfig.env}

Port        : ${appConfig.port}
=========================================
`);
}
