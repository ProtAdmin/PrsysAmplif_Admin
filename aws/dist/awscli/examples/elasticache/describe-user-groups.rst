<<<<<<< HEAD
**To describe user-groups**

The following ``describe-user-groups`` example returns a list of user groups. ::

    aws elasticache describe-user-groups 

Output::

    {
        "UserGroups": [
            {
                "UserGroupId": "myusergroup",
                "Status": "active",
                "Engine": "redis",
                "UserIds": [
                    "default"
                ],
                "ReplicationGroups": [],
                "ARN": "arn:aws:elasticache:us-west-2:xxxxxxxxxx52:usergroup:myusergroup"
            }
        ]
    }

=======
**To describe user-groups**

The following ``describe-user-groups`` example returns a list of user groups. ::

    aws elasticache describe-user-groups 

Output::

    {
        "UserGroups": [
            {
                "UserGroupId": "myusergroup",
                "Status": "active",
                "Engine": "redis",
                "UserIds": [
                    "default"
                ],
                "ReplicationGroups": [],
                "ARN": "arn:aws:elasticache:us-west-2:xxxxxxxxxx52:usergroup:myusergroup"
            }
        ]
    }

>>>>>>> e0e62a74754755ef19912bd622dbb081f288b898
For more information, see `Authenticating Users with Role-Based Access Control (RBAC) <https://docs.aws.amazon.com/AmazonElastiCache/latest/red-ug/Clusters.RBAC.html>`__ in the *Elasticache User Guide*.