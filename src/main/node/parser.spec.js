
import { Parser } from './parser';
import { expect } from 'chai';
import 'mocha';
import * as fs from 'fs';
import * as os from 'os';

describe('parse function', () => {

  it('should parse log lines correctly', () => {
    const log = fs.readFileSync('./src/main/resources/sample.log', 'utf8');
    const lines = log.split(os.EOL);
    const line = lines[0];

    const parser = new Parser();
    const result = parser.parse(line);

    //expect(result.auth).to.equal('user@domain.com');
    //expect(result.bytes).to.equal(1632489);
    expect(result.clientIp).to.equal('99.9.99.99');
    expect(result.cn).to.equal('-');
    expect(result.env).to.equal('dev');
    expect(result.httpVersion).to.equal('1.1');
    expect(result.inputType).to.equal('log');
    expect(result.instanceId).to.equal('i-0adece0000000001');
    expect(result.port).to.equal(443);
    expect(result.protocol).to.equal('https');
    expect(result.proxyIp).to.equal('10.0.0.1');
    expect(result.referer).to.equal('https://somedomain.com/referring-page');
    expect(result.request).to.equal('/search/v1/r1');
    expect(result.response).to.equal(200);
    expect(result.responseTime).to.equal(680581);
    expect(result['@timestamp']).to.equal('2018-03-09T13:43:20.527Z');
    expect(result.verb).to.equal('POST');
  });

  it('should not throw an exception if the port is a hyphen', () => {
    const log = fs.readFileSync('./src/main/resources/sample.log', 'utf8');
    const lines = log.split(os.EOL);
    const line = lines[1];

    const parser = new Parser();
    const result = parser.parse(line);

    expect(result.port).to.equal(-1);
  });

  it('should not throw an exception if the forwarded ip address is a hyphen', () => {
    const log = fs.readFileSync('./src/main/resources/sample.log', 'utf8');
    const lines = log.split(os.EOL);
    const line = lines[2];

    const parser = new Parser();
    const result = parser.parse(line);

    expect(result.clientIp).to.equal('10.0.0.1');
  });

});
