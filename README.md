# CDK Apex Cname - Route53

A CDK utility construct that allows you to set an domain apex (in Route53) to redirect to a cname records of a resource 
not in Route 53. 

## Usage
### Typescript

First install the package 
```
npm install @maskerade/cdk-apex-cname
```


Then you can use the Apex CNAME in your code:

```ts
import { CdkApexCname } from "@maskerade/cdk-apex-cname";

new CdkApexCname(this, 'CdkApexCname', {
    apexName: 'apex.com',
    recordName: 'cname.example.com',
    hostedZoneId: 'ZONE1234',
    apexCnameRuleCron: "cron(0 * ? * * *)"
});
```
