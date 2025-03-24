<<<<<<< HEAD
**To update a custom action**

The following ``update-action-target`` example updates the name of the custom action identified by the specified ARN. ::

=======
**To update a custom action**

The following ``update-action-target`` example updates the name of the custom action identified by the specified ARN. ::

>>>>>>> e0e62a74754755ef19912bd622dbb081f288b898
    aws securityhub update-action-target \
        --action-target-arn "arn:aws:securityhub:us-west-1:123456789012:action/custom/Remediation" \
        --name "Send to remediation" 

<<<<<<< HEAD
This command produces no output.

For more information, see `Creating a custom action and associating it with a CloudWatch Events rule <https://docs.aws.amazon.com/securityhub/latest/userguide/securityhub-cloudwatch-events.html#securityhub-cwe-configure>`__ in the *AWS Security Hub User Guide*.
=======
This command produces no output.

For more information, see `Creating a custom action and associating it with a CloudWatch Events rule <https://docs.aws.amazon.com/securityhub/latest/userguide/securityhub-cloudwatch-events.html#securityhub-cwe-configure>`__ in the *AWS Security Hub User Guide*.
>>>>>>> e0e62a74754755ef19912bd622dbb081f288b898
