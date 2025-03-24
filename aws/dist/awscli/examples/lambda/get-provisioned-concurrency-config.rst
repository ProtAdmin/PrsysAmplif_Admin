<<<<<<< HEAD
**To view a provisioned concurrency configuration**

The following ``get-provisioned-concurrency-config`` example displays details for the provisioned concurrency configuration for the ``BLUE`` alias of the specified function. ::

    aws lambda get-provisioned-concurrency-config \
        --function-name my-function \
        --qualifier BLUE

Output::

    {
        "RequestedProvisionedConcurrentExecutions": 100,
        "AvailableProvisionedConcurrentExecutions": 100,
        "AllocatedProvisionedConcurrentExecutions": 100,
        "Status": "READY",
        "LastModified": "2019-12-31T20:28:49+0000"
    }
=======
**To view a provisioned concurrency configuration**

The following ``get-provisioned-concurrency-config`` example displays details for the provisioned concurrency configuration for the ``BLUE`` alias of the specified function. ::

    aws lambda get-provisioned-concurrency-config \
        --function-name my-function \
        --qualifier BLUE

Output::

    {
        "RequestedProvisionedConcurrentExecutions": 100,
        "AvailableProvisionedConcurrentExecutions": 100,
        "AllocatedProvisionedConcurrentExecutions": 100,
        "Status": "READY",
        "LastModified": "2019-12-31T20:28:49+0000"
    }
>>>>>>> e0e62a74754755ef19912bd622dbb081f288b898
