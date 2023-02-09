const moment = require('moment-timezone');

function decode(body){
  try {
    const ts = body["ts"];
    const token = body["token"];
    const timezone = body["timezone"];

    const timeNow = Date.now();
    if (ts == null || ts == 0 || ts < timeNow - diffTimeZone(timezone) - 10800000)
      return false;

    // if (token == ts * 17 - 111)
    if (token == ts)
      return true;
    else
      return false;

  } catch (err) {
    return false;
  }
}

function diffTimeZone(clientTimeZone){
  const serverTimeZone = moment.tz.guess();
  // const clientTimeZone = 'Asia/Ho_Chi_Minh';

  const time1 = moment.utc().tz(serverTimeZone);
  const time2 = moment.utc().tz(clientTimeZone);

  const diff = time1.diff(time2);
  return diff;
}

module.exports = decode;