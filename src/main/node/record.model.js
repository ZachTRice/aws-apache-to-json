
import * as moment from 'moment';
import {GeoLocation} from './geolocation.model';
import {UserAgent} from './user-agent.model';

export class Record {
  constructor(obj) {
    if (obj) {
      this.agent = obj.userAgent ? Record.stripQuotes(obj.userAgent) : null;
      this.auth = obj.auth ? obj.auth : null;
      this.bytes = Record.convertNumber(obj.bytes);
      this.clientIp = Record.extractForwardedIp(obj.forwardedFor, obj.clientIp);
      this.cn = Record.stripQuotes(obj.certificateSubject);
      this.env = Record.stripQuotes(obj.environment);
      this.httpVersion = obj.httpVersion;
      this.inputType = 'log';
      this.instanceId = Record.stripQuotes(obj.instanceId);
      this.port = Record.convertNumber(Record.stripQuotes(obj.forwardedPort));
      this.protocol = Record.stripQuotes(obj.forwardedProtocol);
      this.proxyIp = obj.clientIp;
      this.referer = Record.stripQuotes(obj.referer);
      this.request = obj.request;
      this.response = Record.convertNumber(obj.response);
      this.responseTime = Record.convertNumber(obj.responseTime);
      this['@timestamp'] = moment(obj.timestamp, 'DD/MMM/YYYY:HH:mm:ss.SSS Z', true).toISOString();;
      this.verb = obj.verb;
    }
    this.tags = [];
  }

  static convertNumber(str) {
    if (str) {
      const n = parseInt(str);
      return isNaN(n) ? -1 : n;
    }
    return -1;
  }

  static extractForwardedIp(forwardedFor, clientIp) {
    if (forwardedFor) {
      const unquoted = Record.stripQuotes(forwardedFor);
      const words = unquoted.split(',');
      if (words.length > 0) {
        if (words[0] == '-') {
          return clientIp;
        }
        return words[0];
      }
      return unquoted;
    }
    return null;
  }

  static stripQuotes(quotedString) {
    return quotedString ? quotedString.replace (/(^")|("$)/g, '') : null;
  }

}
