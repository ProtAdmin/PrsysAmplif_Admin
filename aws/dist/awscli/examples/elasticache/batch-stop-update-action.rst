<<<<<<< HEAD
**To stop a service update**

The following ``batch-stop-update-action`` example applies a service update to a Redis cluster. ::

    aws elasticache batch-stop-update-action \
        --service-update-name elc-xxxxx406-xxx \
        --replication-group-ids test-cluster 

Output::

    {
        "ProcessedUpdateActions": [
            {
                "ReplicationGroupId": "pat-cluster",
                "ServiceUpdateName": "elc-xxxxx406-xxx",
                "UpdateActionStatus": "stopping"
            }
        ],
        "UnprocessedUpdateActions": []
    }

=======
**To stop a service update**

The following ``batch-stop-update-action`` example applies a service update to a Redis cluster. ::

    aws elasticache batch-stop-update-action \
        --service-update-name elc-xxxxx406-xxx \
        --replication-group-ids test-cluster 

Output::

    {
        "ProcessedUpdateActions": [
            {
                "ReplicationGroupId": "pat-cluster",
                "ServiceUpdateName": "elc-xxxxx406-xxx",
                "UpdateActionStatus": "stopping"
            }
        ],
        "UnprocessedUpdateActions": []
    }

>>>>>>> e0e62a74754755ef19912bd622dbb081f288b898
For more information, see `Self-Service Updates in Amazon ElastiCache <https://docs.aws.amazon.com/AmazonElastiCache/latest/red-ug/Self-Service-Updates.html>`__ in the *Elasticache User Guide*.