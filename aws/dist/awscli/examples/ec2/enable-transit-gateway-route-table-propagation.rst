<<<<<<< HEAD
**To enable a transit gateway attachment to propagate routes to the specified propagation route table**

The following ``enable-transit-gateway-route-table-propagation`` example enables the specified attachment to propagate routes to the specified propagation route table. ::

    aws ec2 enable-transit-gateway-route-table-propagation \
        --transit-gateway-route-table-id tgw-rtb-0a823edbdeEXAMPLE \
        --transit-gateway-attachment-id tgw-attach-09b52ccdb5EXAMPLE

Output::

    {
        "Propagation": {
            "TransitGatewayAttachmentId": "tgw-attach-09b52ccdb5EXAMPLE",
            "ResourceId": "vpc-4d7de228",
            "ResourceType": "vpc",
            "TransitGatewayRouteTableId": "tgw-rtb-0a823edbdeEXAMPLE",
            "State": "disabled"
        }
    }

=======
**To enable a transit gateway attachment to propagate routes to the specified propagation route table**

The following ``enable-transit-gateway-route-table-propagation`` example enables the specified attachment to propagate routes to the specified propagation route table. ::

    aws ec2 enable-transit-gateway-route-table-propagation \
        --transit-gateway-route-table-id tgw-rtb-0a823edbdeEXAMPLE \
        --transit-gateway-attachment-id tgw-attach-09b52ccdb5EXAMPLE

Output::

    {
        "Propagation": {
            "TransitGatewayAttachmentId": "tgw-attach-09b52ccdb5EXAMPLE",
            "ResourceId": "vpc-4d7de228",
            "ResourceType": "vpc",
            "TransitGatewayRouteTableId": "tgw-rtb-0a823edbdeEXAMPLE",
            "State": "disabled"
        }
    }

>>>>>>> e0e62a74754755ef19912bd622dbb081f288b898
For more information, see `Transit gateway route tables <https://docs.aws.amazon.com/vpc/latest/tgw/tgw-route-tables.html>`__ in the *Transit Gateways Guide*.