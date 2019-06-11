import { Record } from './record.model';

// const EXTENDED_COMMON_APACHE_LOG = "%{IPORHOST:clientIp} %{NOTSPACE:ident} %{NOTSPACE:auth} \\[%{HTTPDATE:timestamp}\\] \"(?:%{WORD:verb} %{NOTSPACE:request}(?: HTTP/%{NUMBER:httpVersion})?|%{DATA:rawrequest})\" %{NUMBER:response} (?:%{NUMBER:bytes}|-) %{QUOTEDSTRING:referer} %{QUOTEDSTRING:userAgent} %{NUMBER:responseTime} %{QUOTEDSTRING:forwardedFor} (?<forwardedPort>-|%{QUOTEDSTRING}) (?<forwardedProtocol>-|%{QUOTEDSTRING}) (?<certificateSubject>-|%{QUOTEDSTRING}) (?<environment>-|%{QUOTEDSTRING}) (?<instanceId>-|%{QUOTEDSTRING})";
const EXTENDED_COMMON_APACHE_REGEX = new RegExp('^(\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}) (\\S+) (\\S+) \\[([^\\]]+)\\] \\"(\\S+) (\\S+) HTTP/(.+?)\\" (\\d{1,3}) (\\d+|-) "(.+?)" "(.+?)" (\\d+|-) "(.+?)" "(.+?)" "(.+?)" "(.+?|-)" "(.+?)" "(.+?)"');

export class Parser {
  parse(input) {
    const match = EXTENDED_COMMON_APACHE_REGEX.exec(input);
    if (match != null) {
      const obj = {
        clientIp: match[1],
        ident: match[2],
        auth: match[3],
        timestamp: match[4],
        verb: match[5],
        request: match[6],
        httpVersion: match[7],
        response: match[8],
        bytes: match[9],
        referer: match[10],
        responseTime: match[12],
        forwardedFor: match[13],
        forwardedPort: match[14],
        forwardedProtocol: match[15],
        certificateSubject: match[16],
        environment: match[17],
        instanceId: match[18]
      };

      return new Record(obj);
    } else {
      console.log('Could not match ' + input);
    }

    return null;
  }
}
