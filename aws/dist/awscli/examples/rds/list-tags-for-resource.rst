<<<<<<< HEAD
**To list tags on an Amazon RDS resource**

The following ``list-tags-for-resource`` example lists all tags on a DB instance. ::

    aws rds list-tags-for-resource \
        --resource-name arn:aws:rds:us-east-1:123456789012:db:orcl1

Output::

    {
        "TagList": [
            {
                "Key": "Environment",
                "Value": "test"
            },
            {
                "Key": "Name",
                "Value": "MyDatabase"
            }
        ]
    }

=======
**To list tags on an Amazon RDS resource**

The following ``list-tags-for-resource`` example lists all tags on a DB instance. ::

    aws rds list-tags-for-resource \
        --resource-name arn:aws:rds:us-east-1:123456789012:db:orcl1

Output::

    {
        "TagList": [
            {
                "Key": "Environment",
                "Value": "test"
            },
            {
                "Key": "Name",
                "Value": "MyDatabase"
            }
        ]
    }

>>>>>>> e0e62a74754755ef19912bd622dbb081f288b898
For more information, see `Tagging Amazon RDS Resources <https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/USER_Tagging.html>`__ in the *Amazon RDS User Guide*.