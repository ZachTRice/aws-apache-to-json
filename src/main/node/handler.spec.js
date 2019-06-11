import * as fs from 'fs';
import { expect } from 'chai';
import 'mocha';
import { processor } from './handler';

describe('process function', () => {
  it('should handle a record event', () => {
    const content = fs.readFileSync('./src/main/resources/sample.json', 'utf8');
    const event = JSON.parse(content);
    processor(event, null, (_err, response) => {
      const records = response['records'];
      const record = records[0];

      expect(record.result).to.equal('Ok');
      const decoded = (Buffer.from(record.data, 'base64')).toString('utf8');
      const entry = JSON.parse(decoded);
      expect(entry.auth).to.equal('user@domain.com');
      expect(entry.bytes).to.equal(1632489);
    });
  });
});
