<<<<<<< HEAD
**To list the replication set**

The following ``list-replication-set`` example lists the replication set Incident Manager uses to replicate and encrypt data in your AWS account. ::

    aws ssm-incidents list-replication-sets 

Output::

    {
        "replicationSetArns": [
            "arn:aws:ssm-incidents::111122223333:replication-set/c4bcb603-4bf9-bb3f-413c-08df53673b57"
        ]
    }

=======
**To list the replication set**

The following ``list-replication-set`` example lists the replication set Incident Manager uses to replicate and encrypt data in your AWS account. ::

    aws ssm-incidents list-replication-sets 

Output::

    {
        "replicationSetArns": [
            "arn:aws:ssm-incidents::111122223333:replication-set/c4bcb603-4bf9-bb3f-413c-08df53673b57"
        ]
    }

>>>>>>> e0e62a74754755ef19912bd622dbb081f288b898
For more information, see `Using the Incident Manager replication set <https://docs.aws.amazon.com/incident-manager/latest/userguide/replication.html>`__ in the *Incident Manager User Guide*.