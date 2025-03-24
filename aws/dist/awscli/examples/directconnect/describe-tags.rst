<<<<<<< HEAD
**To describe tags for your AWS Direct Connect resources**

The following command describes the tags for the connection ``dxcon-abcabc12``.

Command::

  aws directconnect describe-tags --resource-arns arn:aws:directconnect:us-east-1:123456789012:dxcon/dxcon-abcabc12

Output::

  {
    "resourceTags": [
        {
            "resourceArn": "arn:aws:directconnect:us-east-1:123456789012:dxcon/dxcon-abcabc12", 
            "tags": [
                {
                    "value": "VAConnection", 
                    "key": "Name"
                }
            ]
        }
    ]
=======
**To describe tags for your AWS Direct Connect resources**

The following command describes the tags for the connection ``dxcon-abcabc12``.

Command::

  aws directconnect describe-tags --resource-arns arn:aws:directconnect:us-east-1:123456789012:dxcon/dxcon-abcabc12

Output::

  {
    "resourceTags": [
        {
            "resourceArn": "arn:aws:directconnect:us-east-1:123456789012:dxcon/dxcon-abcabc12", 
            "tags": [
                {
                    "value": "VAConnection", 
                    "key": "Name"
                }
            ]
        }
    ]
>>>>>>> e0e62a74754755ef19912bd622dbb081f288b898
  }