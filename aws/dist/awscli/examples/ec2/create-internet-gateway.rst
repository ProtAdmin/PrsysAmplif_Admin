<<<<<<< HEAD
**To create an internet gateway**

The following ``create-internet-gateway`` example creates an internet gateway with the tag ``Name=my-igw``. ::

    aws ec2 create-internet-gateway \
        --tag-specifications ResourceType=internet-gateway,Tags=[{Key=Name,Value=my-igw}]

Output::

    {
        "InternetGateway": {
            "Attachments": [],
            "InternetGatewayId": "igw-0d0fb496b3994d755",
            "OwnerId": "123456789012",
            "Tags": [
                {
                    "Key": "Name",
                    "Value": "my-igw"
                }
            ]
        }
    }

=======
**To create an internet gateway**

The following ``create-internet-gateway`` example creates an internet gateway with the tag ``Name=my-igw``. ::

    aws ec2 create-internet-gateway \
        --tag-specifications ResourceType=internet-gateway,Tags=[{Key=Name,Value=my-igw}]

Output::

    {
        "InternetGateway": {
            "Attachments": [],
            "InternetGatewayId": "igw-0d0fb496b3994d755",
            "OwnerId": "123456789012",
            "Tags": [
                {
                    "Key": "Name",
                    "Value": "my-igw"
                }
            ]
        }
    }

>>>>>>> e0e62a74754755ef19912bd622dbb081f288b898
For more information, see `Internet gateways <https://docs.aws.amazon.com/vpc/latest/userguide/VPC_Internet_Gateway.html>`__ in the *Amazon VPC User Guide*.