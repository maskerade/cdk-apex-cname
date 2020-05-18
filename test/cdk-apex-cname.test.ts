//import { expect as expectCDK, haveResource, SynthUtils } from '@aws-cdk/assert';
import '@aws-cdk/assert/jest';
import * as cdk from '@aws-cdk/core';
import {CdkApexCname} from '../lib/index';

const CdkApexCnameProps = {
    apexName: 'apex.com',
    recordName: 'cname.example.com',
    hostedZoneId: 'ZONE1234',
    apexCnameRuleCron: "cron(0 * ? * * *)"
};

test('Lambda Function Created', () => {
  const app = new cdk.App();
  const stack = new cdk.Stack(app, "TestStack");
  // WHEN
  new CdkApexCname(stack, 'MyTestConstruct', CdkApexCnameProps);
  // THEN

  expect(stack).toHaveResource("AWS::Lambda::Function");
});


test('Event Rule Created', () => {
    const app = new cdk.App();
    const stack = new cdk.Stack(app, "TestStack");
    // WHEN
    new CdkApexCname(stack, 'MyTestConstruct', CdkApexCnameProps);
    // THEN
    expect(stack).toHaveResource("AWS::Events::Rule", {
        "ScheduleExpression": CdkApexCnameProps.apexCnameRuleCron
    });
});
