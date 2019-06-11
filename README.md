# AWS Kinesis Firehose Apache Log to JSON Processor

A Node.JS processor that converts Apache logs in combined log format into JSON.
These files can be sent to AWS Elasticsearch.

### Getting started

Before you begin, you will need to create a resources.yml file
at the top-level directory of this project. This is a simple YAML file that 
includes the log groups, log streams, and S3 buckets that you want to allow the 
deployed AWS Lambda function to access.

    logGroups:
      - "*"    
    logStreams:
      - "*"    
    s3Buckets:
      - "arn:aws:s3:::some-bucket/*"

#### Dependencies
The following dependencies will need to be installed first to build this package:

- [Node.js](https://nodejs.org/en/) v8.11.0 or later
- [Serverless Framework](https://serverless.com/framework/docs/getting-started#choose-your-compute-provider)

#### Install
```bash
npm install  
sls deploy --stage=dev  
```

This will deploy an AWS Lambda function into the `us-east-1` region. You will 
then need to include the ARN for that AWS Lambda in your Kinesis Firehose 
configuration by enabling data transformation and pointing it at the Lambda function. 

### Acknowledgements
I would like to thank `@uw-it-edm` and the work done on the
`kinesis-firehose-apachelog-to-json` repository which was the starting point for 
this project. Much of the code from this original repository was borrowed and 
refactored.
