<<<<<<< HEAD
**To get the status information of a resource request**

The following ``get-resource-request-status`` example returns status information about the specified resource request. ::

    aws cloudcontrol get-resource-request-status \
        --request-token "e1a6b86e-46bd-41ac-bfba-001234567890"
 
Output::

=======
**To get the status information of a resource request**

The following ``get-resource-request-status`` example returns status information about the specified resource request. ::

    aws cloudcontrol get-resource-request-status \
        --request-token "e1a6b86e-46bd-41ac-bfba-001234567890"
 
Output::

>>>>>>> e0e62a74754755ef19912bd622dbb081f288b898
    {
        "ProgressEvent": {
            "TypeName": "AWS::Kinesis::Stream",
            "Identifier": "Demo",
            "RequestToken": "e1a6b86e-46bd-41ac-bfba-001234567890",
            "Operation": "CREATE",
            "OperationStatus": "FAILED",
            "EventTime": 1632950268.481,
            "StatusMessage": "Resource of type 'AWS::Kinesis::Stream' with identifier 'Demo' already exists.",
            "ErrorCode": "AlreadyExists"
        }
<<<<<<< HEAD
    }

=======
    }

>>>>>>> e0e62a74754755ef19912bd622dbb081f288b898
For more information, see `Managing resource operation requests <https://docs.aws.amazon.com/cloudcontrolapi/latest/userguide/resource-operations-manage-requests.html>`__ in the *Cloud Control API User Guide*.