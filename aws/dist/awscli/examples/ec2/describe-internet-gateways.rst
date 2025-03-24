<<<<<<< HEAD
**To describe an internet gateway**

The following ``describe-internet-gateways`` example describes the specified internet gateway. ::

    aws ec2 describe-internet-gateways \
        --internet-gateway-ids igw-0d0fb496b3EXAMPLE

Output::

    {
        "InternetGateways": [
            {
                "Attachments": [
                    {
                        "State": "available",
                        "VpcId": "vpc-0a60eb65b4EXAMPLE"
                    }
                ],
                "InternetGatewayId": "igw-0d0fb496b3EXAMPLE",
                "OwnerId": "123456789012",
                "Tags": [
                    {
                        "Key": "Name",
                        "Value": "my-igw"
                    }
                ]
            }
        ]
    }

=======
**To describe an internet gateway**

The following ``describe-internet-gateways`` example describes the specified internet gateway. ::

    aws ec2 describe-internet-gateways \
        --internet-gateway-ids igw-0d0fb496b3EXAMPLE

Output::

    {
        "InternetGateways": [
            {
                "Attachments": [
                    {
                        "State": "available",
                        "VpcId": "vpc-0a60eb65b4EXAMPLE"
                    }
                ],
                "InternetGatewayId": "igw-0d0fb496b3EXAMPLE",
                "OwnerId": "123456789012",
                "Tags": [
                    {
                        "Key": "Name",
                        "Value": "my-igw"
                    }
                ]
            }
        ]
    }

>>>>>>> e0e62a74754755ef19912bd622dbb081f288b898
For more information, see `Internet gateways <https://docs.aws.amazon.com/vpc/latest/userguide/VPC_Internet_Gateway.html>`__ in the *Amazon VPC User Guide*.