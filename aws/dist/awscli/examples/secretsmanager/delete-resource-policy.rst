<<<<<<< HEAD
**To delete the resource-based policy attached to a secret**

The following ``delete-resource-policy`` example deletes the resource-based policy attached to a secret. ::

    aws secretsmanager delete-resource-policy \
        --secret-id MyTestSecret

Output::

    {
        "ARN": "arn:aws:secretsmanager:us-west-2:123456789012:secret:MyTestSecret-a1b2c3",
        "Name": "MyTestSecret"
    }

=======
**To delete the resource-based policy attached to a secret**

The following ``delete-resource-policy`` example deletes the resource-based policy attached to a secret. ::

    aws secretsmanager delete-resource-policy \
        --secret-id MyTestSecret

Output::

    {
        "ARN": "arn:aws:secretsmanager:us-west-2:123456789012:secret:MyTestSecret-a1b2c3",
        "Name": "MyTestSecret"
    }

>>>>>>> e0e62a74754755ef19912bd622dbb081f288b898
For more information, see `Authentication and access control <https://docs.aws.amazon.com/secretsmanager/latest/userguide/auth-and-access.html>`__ in the *Secrets Manager User Guide*.