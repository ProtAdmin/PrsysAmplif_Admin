<<<<<<< HEAD
**To describe global replication groups**

The following ``describe-global-replication-groups`` example returns details of a Global datastore. ::

    aws elasticache describe-global-replication-groups \
        --global-replication-group-id my-grg        

Output::

    {
        "GlobalReplicationGroups": [
            {
                "GlobalReplicationGroupId": "my-grg",
                "GlobalReplicationGroupDescription": "my-grg",
                "Status": "creating",
                "CacheNodeType": "cache.r5.large",
                "Engine": "redis",
                "EngineVersion": "5.0.6",
                "ClusterEnabled": false,
                "AuthTokenEnabled": false,
                "TransitEncryptionEnabled": false,
                "AtRestEncryptionEnabled": false
            }
        ]
    }

=======
**To describe global replication groups**

The following ``describe-global-replication-groups`` example returns details of a Global datastore. ::

    aws elasticache describe-global-replication-groups \
        --global-replication-group-id my-grg        

Output::

    {
        "GlobalReplicationGroups": [
            {
                "GlobalReplicationGroupId": "my-grg",
                "GlobalReplicationGroupDescription": "my-grg",
                "Status": "creating",
                "CacheNodeType": "cache.r5.large",
                "Engine": "redis",
                "EngineVersion": "5.0.6",
                "ClusterEnabled": false,
                "AuthTokenEnabled": false,
                "TransitEncryptionEnabled": false,
                "AtRestEncryptionEnabled": false
            }
        ]
    }

>>>>>>> e0e62a74754755ef19912bd622dbb081f288b898
For more information, see `Replication Across AWS Regions Using Global Datastore <https://docs.aws.amazon.com/AmazonElastiCache/latest/red-ug/Redis-Global-Datastore.html>`__ in the *Elasticache User Guide*.