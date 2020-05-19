# CDK Apex Cname - Route53

A CDK utility construct to allowing setting an domain apex (in Route53) to resolve to a cname record of a resource 
not in Route 53. 

## Usage
### Typescript

First install the package 
```
npm install cdk-apex-cname
```


Then you can use the Apex CNAME in your code:

```ts
import { CdkApexCname } from "cdk-apex-cname";

new CdkApexCname(this, 'CdkApexCname', {
    apexName: 'apex.com',
    recordName: 'cname.example.com',
    hostedZoneId: 'ZONE1234',
    apexCnameRuleCron: "cron(0 * ? * * *)"
});
```

