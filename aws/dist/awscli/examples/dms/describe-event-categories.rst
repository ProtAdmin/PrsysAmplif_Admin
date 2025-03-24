<<<<<<< HEAD
**To describe event categories**

The following ``describe-event-categories`` example lists the available event categories. ::

    aws dms describe-event-categories

Output::

    {
        "EventCategoryGroupList": [
            {
                "SourceType": "replication-instance",
                "EventCategories": [
                    "low storage",
                    "configuration change",
                    "maintenance",
                    "deletion",
                    "creation",
                    "failover",
                    "failure"
                ]
            },
            {
                "SourceType": "replication-task",
                "EventCategories": [
                    "configuration change",
                    "state change",
                    "deletion",
                    "creation",
                    "failure"
                ]
            }
        ]
    }

For more information, see `Working with Events and Notifications <https://docs.aws.amazon.com/dms/latest/userguide/CHAP_Events.html>`__ in the *AWS Database Migration Service User Guide*.
=======
**To describe event categories**

The following ``describe-event-categories`` example lists the available event categories. ::

    aws dms describe-event-categories

Output::

    {
        "EventCategoryGroupList": [
            {
                "SourceType": "replication-instance",
                "EventCategories": [
                    "low storage",
                    "configuration change",
                    "maintenance",
                    "deletion",
                    "creation",
                    "failover",
                    "failure"
                ]
            },
            {
                "SourceType": "replication-task",
                "EventCategories": [
                    "configuration change",
                    "state change",
                    "deletion",
                    "creation",
                    "failure"
                ]
            }
        ]
    }

For more information, see `Working with Events and Notifications <https://docs.aws.amazon.com/dms/latest/userguide/CHAP_Events.html>`__ in the *AWS Database Migration Service User Guide*.
>>>>>>> e0e62a74754755ef19912bd622dbb081f288b898
