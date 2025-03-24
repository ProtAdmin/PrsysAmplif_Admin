<<<<<<< HEAD
**To list the resources of a given type**

The following ``list-resources`` example lists the AWS::Kinesis::Stream resources provisioned in your AWS account. ::

    aws cloudcontrol list-resources \
        --type-name AWS::Kinesis::Stream
 
Output::

=======
**To list the resources of a given type**

The following ``list-resources`` example lists the AWS::Kinesis::Stream resources provisioned in your AWS account. ::

    aws cloudcontrol list-resources \
        --type-name AWS::Kinesis::Stream
 
Output::

>>>>>>> e0e62a74754755ef19912bd622dbb081f288b898
    {
        "TypeName": "AWS::Kinesis::Stream", 
        "ResourceDescriptions": [
            {
                "Identifier": "MyKinesisStream", 
                "Properties": "{\"Name\":\"MyKinesisStream\"}"
            }, 
            {
                "Identifier": "AnotherStream", 
                "Properties": "{\"Name\":\"AnotherStream\"}"
            }
        ]
<<<<<<< HEAD
    }

=======
    }

>>>>>>> e0e62a74754755ef19912bd622dbb081f288b898
For more information, see `Discovering resources <https://docs.aws.amazon.com/cloudcontrolapi/latest/userguide/resource-operations-list.html>`__ in the *Cloud Control API User Guide*.