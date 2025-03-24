<<<<<<< HEAD
**To describe account attributes**

The following ``describe-account-attributes`` example lists the attributes for your AWS account. ::

    aws dms describe-account-attributes

Output::

    {
        "AccountQuotas": [
            {
                "AccountQuotaName": "ReplicationInstances",
                "Used": 1,
                "Max": 20
            },
            {
                "AccountQuotaName": "AllocatedStorage",
                "Used": 5,
                "Max": 10000
            },

            ...remaining output omitted...
    
        ],
        "UniqueAccountIdentifier": "cqahfbfy5xee"
    }
=======
**To describe account attributes**

The following ``describe-account-attributes`` example lists the attributes for your AWS account. ::

    aws dms describe-account-attributes

Output::

    {
        "AccountQuotas": [
            {
                "AccountQuotaName": "ReplicationInstances",
                "Used": 1,
                "Max": 20
            },
            {
                "AccountQuotaName": "AllocatedStorage",
                "Used": 5,
                "Max": 10000
            },

            ...remaining output omitted...
    
        ],
        "UniqueAccountIdentifier": "cqahfbfy5xee"
    }
>>>>>>> e0e62a74754755ef19912bd622dbb081f288b898
