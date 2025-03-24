<<<<<<< HEAD
**To delete a user**

The following ``delete-user`` example deletes a user. ::

    aws memorydb delete-user \
        --user-name my-user

Output::

    {
        "User": {
            "Name": "my-user",
            "Status": "deleting",
            "AccessString": "on ~app::* resetchannels -@all +@read",
            "ACLNames": [
                "my-acl"
            ],
            "MinimumEngineVersion": "6.2",
            "Authentication": {
                "Type": "password",
                "PasswordCount": 1
            },
            "ARN": "arn:aws:memorydb:us-east-1:491658xxxxxx:user/my-user"
        }
    }

For more information, see `Authenticating users with Access Control Lists <https://docs.aws.amazon.com/memorydb/latest/devguide/clusters.acls.html>`__ in the *MemoryDB User Guide*.
=======
**To delete a user**

The following ``delete-user`` example deletes a user. ::

    aws memorydb delete-user \
        --user-name my-user

Output::

    {
        "User": {
            "Name": "my-user",
            "Status": "deleting",
            "AccessString": "on ~app::* resetchannels -@all +@read",
            "ACLNames": [
                "my-acl"
            ],
            "MinimumEngineVersion": "6.2",
            "Authentication": {
                "Type": "password",
                "PasswordCount": 1
            },
            "ARN": "arn:aws:memorydb:us-east-1:491658xxxxxx:user/my-user"
        }
    }

For more information, see `Authenticating users with Access Control Lists <https://docs.aws.amazon.com/memorydb/latest/devguide/clusters.acls.html>`__ in the *MemoryDB User Guide*.
>>>>>>> e0e62a74754755ef19912bd622dbb081f288b898
