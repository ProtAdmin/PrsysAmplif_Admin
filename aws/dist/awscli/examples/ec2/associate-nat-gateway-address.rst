<<<<<<< HEAD
**To associate an Elastic IP address with a public NAT gateway**

The following ``associate-nat-gateway-address`` example associates the specified Elastic IP address with the specified public NAT gateway. AWS automatically assigns a secondary private IPv4 address. ::

    aws ec2 associate-nat-gateway-address \
        --nat-gateway-id nat-1234567890abcdef0 \
        --allocation-ids eipalloc-0be6ecac95EXAMPLE

Output::

    {
        "NatGatewayId": "nat-1234567890abcdef0",
        "NatGatewayAddresses": [
            {
                "AllocationId": "eipalloc-0be6ecac95EXAMPLE",
                "NetworkInterfaceId": "eni-09cc4b2558794f7f9",
                "IsPrimary": false,
                "Status": "associating"
            }
        ]
    }

=======
**To associate an Elastic IP address with a public NAT gateway**

The following ``associate-nat-gateway-address`` example associates the specified Elastic IP address with the specified public NAT gateway. AWS automatically assigns a secondary private IPv4 address. ::

    aws ec2 associate-nat-gateway-address \
        --nat-gateway-id nat-1234567890abcdef0 \
        --allocation-ids eipalloc-0be6ecac95EXAMPLE

Output::

    {
        "NatGatewayId": "nat-1234567890abcdef0",
        "NatGatewayAddresses": [
            {
                "AllocationId": "eipalloc-0be6ecac95EXAMPLE",
                "NetworkInterfaceId": "eni-09cc4b2558794f7f9",
                "IsPrimary": false,
                "Status": "associating"
            }
        ]
    }

>>>>>>> e0e62a74754755ef19912bd622dbb081f288b898
For more information, see `NAT gateways <https://docs.aws.amazon.com/vpc/latest/userguide/vpc-nat-gateway.html>`__ in the *Amazon VPC User Guide*.