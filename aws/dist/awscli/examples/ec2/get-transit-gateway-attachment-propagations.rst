<<<<<<< HEAD
**To list the route tables to which the specified resource attachment propagates routes**

The following ``get-transit-gateway-attachment-propagations`` example lists the route table to which the specified resource attachment propagates routes. ::

    aws ec2 get-transit-gateway-attachment-propagations \
        --transit-gateway-attachment-id tgw-attach-09fbd47ddfEXAMPLE

Output::

    {
        "TransitGatewayAttachmentPropagations": [
            {
                "TransitGatewayRouteTableId": "tgw-rtb-0882c61b97EXAMPLE",
                "State": "enabled"
            }
        ]
    }

=======
**To list the route tables to which the specified resource attachment propagates routes**

The following ``get-transit-gateway-attachment-propagations`` example lists the route table to which the specified resource attachment propagates routes. ::

    aws ec2 get-transit-gateway-attachment-propagations \
        --transit-gateway-attachment-id tgw-attach-09fbd47ddfEXAMPLE

Output::

    {
        "TransitGatewayAttachmentPropagations": [
            {
                "TransitGatewayRouteTableId": "tgw-rtb-0882c61b97EXAMPLE",
                "State": "enabled"
            }
        ]
    }

>>>>>>> e0e62a74754755ef19912bd622dbb081f288b898
For more information, see `Transit gateway route tables <https://docs.aws.amazon.com/vpc/latest/tgw/tgw-route-tables.html>`__ in the *Transit Gateways Guide*.