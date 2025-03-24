<<<<<<< HEAD
**To list the resource types that are supported by AWS RAM**

The following ``list-resource-types`` example lists all of the resource types currently supported by AWS RAM. ::

    aws ram list-resource-types

Output::

    {
        "resourceTypes": [
            {
                "resourceType": "route53resolver:FirewallRuleGroup",
                "serviceName": "route53resolver"
            },
            {
                "resourceType": "ec2:LocalGatewayRouteTable",
                "serviceName": "ec2"
            },
            ...OUTPUT TRUNCATED FOR BREVITY...
            {
                "resourceType": "ec2:Subnet",
                "serviceName": "ec2"
            },
            {
                "resourceType": "ec2:TransitGatewayMulticastDomain",
                "serviceName": "ec2"
            }
        ]
    }
=======
**To list the resource types that are supported by AWS RAM**

The following ``list-resource-types`` example lists all of the resource types currently supported by AWS RAM. ::

    aws ram list-resource-types

Output::

    {
        "resourceTypes": [
            {
                "resourceType": "route53resolver:FirewallRuleGroup",
                "serviceName": "route53resolver"
            },
            {
                "resourceType": "ec2:LocalGatewayRouteTable",
                "serviceName": "ec2"
            },
            ...OUTPUT TRUNCATED FOR BREVITY...
            {
                "resourceType": "ec2:Subnet",
                "serviceName": "ec2"
            },
            {
                "resourceType": "ec2:TransitGatewayMulticastDomain",
                "serviceName": "ec2"
            }
        ]
    }
>>>>>>> e0e62a74754755ef19912bd622dbb081f288b898
