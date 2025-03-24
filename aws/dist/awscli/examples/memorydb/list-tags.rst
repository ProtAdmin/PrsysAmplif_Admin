<<<<<<< HEAD
**To return a list of tags**

The following `list-tags` returns a list of tags. ::

    aws memorydb list-tags \
        --resource-arn arn:aws:memorydb:us-east-1:491658xxxxxx:cluster/my-cluster

Output::

    {
        "TagList": [
            {
                "Key": "mytag",
                "Value": "myvalue"
            }
        ]
    }

For more information, see `Tagging resources <https://docs.aws.amazon.com/memorydb/latest/devguide/tagging-resources.html>`__ in the *MemoryDB User Guide*.
=======
**To return a list of tags**

The following `list-tags` returns a list of tags. ::

    aws memorydb list-tags \
        --resource-arn arn:aws:memorydb:us-east-1:491658xxxxxx:cluster/my-cluster

Output::

    {
        "TagList": [
            {
                "Key": "mytag",
                "Value": "myvalue"
            }
        ]
    }

For more information, see `Tagging resources <https://docs.aws.amazon.com/memorydb/latest/devguide/tagging-resources.html>`__ in the *MemoryDB User Guide*.
>>>>>>> e0e62a74754755ef19912bd622dbb081f288b898
