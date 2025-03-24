<<<<<<< HEAD
**To turn off automatic rotation for a secret**

The following ``cancel-rotate-secret`` example turns off automatic rotation for a secret. To resume rotation, call ``rotate-secret``. ::

    aws secretsmanager cancel-rotate-secret \
        --secret-id MyTestSecret

Output::

    {
      "ARN": "arn:aws:secretsmanager:us-west-2:123456789012:secret:MyTestSecret-a1b2c3",
      "Name": "MyTestSecret"
    }

=======
**To turn off automatic rotation for a secret**

The following ``cancel-rotate-secret`` example turns off automatic rotation for a secret. To resume rotation, call ``rotate-secret``. ::

    aws secretsmanager cancel-rotate-secret \
        --secret-id MyTestSecret

Output::

    {
      "ARN": "arn:aws:secretsmanager:us-west-2:123456789012:secret:MyTestSecret-a1b2c3",
      "Name": "MyTestSecret"
    }

>>>>>>> e0e62a74754755ef19912bd622dbb081f288b898
For more information, see `Rotate a secret <https://docs.aws.amazon.com/secretsmanager/latest/userguide/rotating-secrets.html>`__ in the *Secrets Manager User Guide*.