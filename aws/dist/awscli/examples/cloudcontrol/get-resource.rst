<<<<<<< HEAD
**To get the current state of a resource**

The following ``get-resource`` example returns the current state of the AWS::Kinesis::Stream resource named ResourceExample. ::

    aws cloudcontrol get-resource \
        --type-name AWS::Kinesis::Stream \
        --identifier ResourceExample

Output::

=======
**To get the current state of a resource**

The following ``get-resource`` example returns the current state of the AWS::Kinesis::Stream resource named ResourceExample. ::

    aws cloudcontrol get-resource \
        --type-name AWS::Kinesis::Stream \
        --identifier ResourceExample

Output::

>>>>>>> e0e62a74754755ef19912bd622dbb081f288b898
    {
        "TypeName": "AWS::Kinesis::Stream", 
        "ResourceDescription": {
            "Identifier": "ResourceExample", 
            "Properties": "{\"Arn\":\"arn:aws:kinesis:us-west-2:099908667365:stream/ResourceExample\",\"RetentionPeriodHours\":168,\"Name\":\"ResourceExample\",\"ShardCount\":3}"
        }
<<<<<<< HEAD
    }

=======
    }

>>>>>>> e0e62a74754755ef19912bd622dbb081f288b898
For more information, see `Reading a resource's current state <https://docs.aws.amazon.com/cloudcontrolapi/latest/userguide/resource-operations-read.html>`__ in the *Cloud Control API User Guide*.