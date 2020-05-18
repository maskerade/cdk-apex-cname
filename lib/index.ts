import * as cdk from '@aws-cdk/core';
import lambda = require('@aws-cdk/aws-lambda');
import events = require('@aws-cdk/aws-events');
import targets = require('@aws-cdk/aws-events-targets');
import iam = require('@aws-cdk/aws-iam');
import * as fs from "fs";


export interface CdkApexCnameProps {
  /**
   * The properties for the Apex Cname Lambda.
   *
   */
  readonly apexName: string;
  readonly recordName: string;
  readonly hostedZoneId: string;
  readonly apexCnameRuleCron: string;
}


export class CdkApexCname extends cdk.Construct {
  /** @returns the ARN of the Lambda Function  */
  public readonly functionArn: string;

  constructor(scope: cdk.Construct, id: string, props: CdkApexCnameProps) {
    super(scope, id);

    const lambdaPolicyChangeResourceRecordSets = new iam.PolicyStatement({
      actions: [
          "route53:ChangeResourceRecordSets"
      ],
      resources: [`arn:aws:route53:::hostedzone/${props.hostedZoneId}`]
    });

    const apexCnameLambda = new lambda.Function(this, 'apexCnameLambda', {
      code: new lambda.InlineCode(fs.readFileSync(`lib/lambda.js`, { encoding: 'utf-8' })),
      handler: 'index.handler',
      runtime: lambda.Runtime.NODEJS_12_X,
      environment: {
        APEXNAME: props.apexName,
        RECORDNAME: props.recordName,
        HOSTEDZONEID: props.hostedZoneId,
      },
      initialPolicy: [lambdaPolicyChangeResourceRecordSets]
    });

    const apexCnameRule = new events.Rule(this, 'apexCnameRule', {
      schedule: events.Schedule.expression(props.apexCnameRuleCron)
    });

    apexCnameRule.addTarget(new targets.LambdaFunction(apexCnameLambda));

    this.functionArn = apexCnameLambda.functionArn;

  }
}
