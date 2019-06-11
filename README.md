# AWS Kinesis Firehose Apache Log to JSON Processor

A Node.JS processor that converts Apache logs in combined log format into JSON.
These files can be sent to AWS Elasticsearch.

### Getting started

Before you begin, you will need to rename the `resources.yml.sample` file at 
the top-level directory of this project to `resources.yml`. This is a simple 
YAML file that includes the log groups, log streams, and S3 buckets that you 
want to allow the deployed AWS Lambda function to access.

### Install
#### Dependencies
The following dependencies will need to be installed first to build this package:

- [Node.js](https://nodejs.org/en/) v8.11.0 or later
- [Serverless Framework](https://serverless.com/framework/docs/getting-started#choose-your-compute-provider)

After dependencies have been installed, run the following from a bash terminal:
```bash
npm install  
```

### Usage
```bash 
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
