<<<<<<< HEAD
**To assign private IP addresses to your private NAT gateway**

The following ``assign-private-nat-gateway-address`` example assigns two private IP addresses to the specified private NAT gateway. ::

    aws ec2 assign-private-nat-gateway-address \
        --nat-gateway-id nat-1234567890abcdef0 \
        --private-ip-address-count 2

Output::

    {
        "NatGatewayId": "nat-1234567890abcdef0",
        "NatGatewayAddresses": [
            {
                "NetworkInterfaceId": "eni-0065a61b324d1897a",
                "IsPrimary": false,
                "Status": "assigning"
            },
            {
                "NetworkInterfaceId": "eni-0065a61b324d1897a",
                "IsPrimary": false,
                "Status": "assigning"
            }
        ]
    }

=======
**To assign private IP addresses to your private NAT gateway**

The following ``assign-private-nat-gateway-address`` example assigns two private IP addresses to the specified private NAT gateway. ::

    aws ec2 assign-private-nat-gateway-address \
        --nat-gateway-id nat-1234567890abcdef0 \
        --private-ip-address-count 2

Output::

    {
        "NatGatewayId": "nat-1234567890abcdef0",
        "NatGatewayAddresses": [
            {
                "NetworkInterfaceId": "eni-0065a61b324d1897a",
                "IsPrimary": false,
                "Status": "assigning"
            },
            {
                "NetworkInterfaceId": "eni-0065a61b324d1897a",
                "IsPrimary": false,
                "Status": "assigning"
            }
        ]
    }

>>>>>>> e0e62a74754755ef19912bd622dbb081f288b898
For more information, see `NAT gateways <https://docs.aws.amazon.com/vpc/latest/userguide/vpc-nat-gateway.html>`__ in the *Amazon VPC User Guide*.