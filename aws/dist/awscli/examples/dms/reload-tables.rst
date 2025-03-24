<<<<<<< HEAD
**To refresh the list of tables available at an endpoint**

The following ``reload-tables`` example reloads the list of available tables at an endpoint. ::

    aws dms reload-tables \
        --replication-task-arn "arn:aws:dms:us-east-1:123456789012:task:K55IUCGBASJS5VHZJIINA45FII" \
        --tables-to-reload "SchemaName=prodrep,TableName=ACCT_BAL"

Output::

    {
        "ReplicationTaskArn": "arn:aws:dms:us-east-1:123456789012:task:K55IUCGBASJS5VHZJIINA45FII"
    }
=======
**To refresh the list of tables available at an endpoint**

The following ``reload-tables`` example reloads the list of available tables at an endpoint. ::

    aws dms reload-tables \
        --replication-task-arn "arn:aws:dms:us-east-1:123456789012:task:K55IUCGBASJS5VHZJIINA45FII" \
        --tables-to-reload "SchemaName=prodrep,TableName=ACCT_BAL"

Output::

    {
        "ReplicationTaskArn": "arn:aws:dms:us-east-1:123456789012:task:K55IUCGBASJS5VHZJIINA45FII"
    }
>>>>>>> e0e62a74754755ef19912bd622dbb081f288b898
