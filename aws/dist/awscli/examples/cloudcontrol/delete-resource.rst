<<<<<<< HEAD
**To delete a resource**

The following ``delete-resource`` example deletes a AWS::Kinesis::Stream resource with the identifier ResourceExample from your AWS account. ::

    aws cloudcontrol delete-resource \
        --type-name AWS::Kinesis::Stream \
        --identifier ResourceExample

Output::

=======
**To delete a resource**

The following ``delete-resource`` example deletes a AWS::Kinesis::Stream resource with the identifier ResourceExample from your AWS account. ::

    aws cloudcontrol delete-resource \
        --type-name AWS::Kinesis::Stream \
        --identifier ResourceExample

Output::

>>>>>>> e0e62a74754755ef19912bd622dbb081f288b898
    {
        "ProgressEvent": {
            "TypeName": "AWS::Kinesis::Stream",
            "Identifier": "ResourceExample",
            "RequestToken": "e48f26ff-d0f9-4ab8-a878-120db1edf111",
            "Operation": "DELETE",
            "OperationStatus": "IN_PROGRESS",
            "EventTime": 1632950300.14
        }
<<<<<<< HEAD
    }

=======
    }

>>>>>>> e0e62a74754755ef19912bd622dbb081f288b898
For more information, see `Deleting a resource <https://docs.aws.amazon.com/cloudcontrolapi/latest/userguide/resource-operations-delete.html>`__ in the *Cloud Control API User Guide*.