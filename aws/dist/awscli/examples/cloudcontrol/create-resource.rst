<<<<<<< HEAD
**To create a resource**

The following ``create-resource`` example creates an AWS::Kinesis::Stream resource, named ResourceExample, with a retention period of 168 hours and a shard count of three. ::

    aws cloudcontrol create-resource \
        --type-name AWS::Kinesis::Stream \
        --desired-state "{\"Name\": \"ResourceExample\",\"RetentionPeriodHours\":168, \"ShardCount\":3}" 

Output::

=======
**To create a resource**

The following ``create-resource`` example creates an AWS::Kinesis::Stream resource, named ResourceExample, with a retention period of 168 hours and a shard count of three. ::

    aws cloudcontrol create-resource \
        --type-name AWS::Kinesis::Stream \
        --desired-state "{\"Name\": \"ResourceExample\",\"RetentionPeriodHours\":168, \"ShardCount\":3}" 

Output::

>>>>>>> e0e62a74754755ef19912bd622dbb081f288b898
    {
        "ProgressEvent": {
            "EventTime": 1632506656.706, 
            "TypeName": "AWS::Kinesis::Stream", 
            "OperationStatus": "IN_PROGRESS", 
            "Operation": "CREATE", 
            "Identifier": "ResourceExample", 
            "RequestToken": "20999d87-e304-4725-ad84-832dcbfd7fc5"
        }
<<<<<<< HEAD
    }

=======
    }

>>>>>>> e0e62a74754755ef19912bd622dbb081f288b898
For more information, see `Creating a resource <https://docs.aws.amazon.com/cloudcontrolapi/latest/userguide/resource-operations-create.html>`__ in the *Cloud Control API User Guide*.