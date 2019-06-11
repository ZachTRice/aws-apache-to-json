// import { Callback, Context, Handler } from 'aws-lambda';
import { Decorator } from './decorator';
import { Parser } from './parser';

export const processor = (event, context, cb) => {
  let success = 0; // Number of valid entries found
  let failure = 0; // Number of invalid entries found

  const decorator = new Decorator();
  const parser = new Parser();

  const records = event.records;
  const output = records.map((input) => {
    const entry = (Buffer.from(input.data, 'base64')).toString('utf8');
    const record = parser.parse(entry);
    if (record) {
      decorator.decorate(record);
      const payload = (Buffer.from(JSON.stringify(record), 'utf8')).toString('base64');
      success++;

      console.log('Processed ' + JSON.stringify(record));

      return {
        recordId: input.recordId,
        result: 'Ok',
        data: payload
      };
    } else {
      failure++;
      return {
        recordId: input.recordId,
        result: 'ProcessingFailed',
        data: input.data
      };
    }
  });

  console.log(`Processing completed.  Successful records ${success}, Failed records ${failure}.`);
  cb(null, { records: output });
};
