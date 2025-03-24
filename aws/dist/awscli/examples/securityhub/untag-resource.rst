<<<<<<< HEAD
**To remove a tag value from a resource**

The following ``untag-resource`` example removes the Department tag from the specified hub resource. ::

=======
**To remove a tag value from a resource**

The following ``untag-resource`` example removes the Department tag from the specified hub resource. ::

>>>>>>> e0e62a74754755ef19912bd622dbb081f288b898
    aws securityhub untag-resource \
        --resource-arn "arn:aws:securityhub:us-west-1:123456789012:hub/default" \
        --tag-keys "Department"

<<<<<<< HEAD
This command produces no output.

For more information, see `AWS::SecurityHub::Hub <https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-securityhub-hub.html>`__ in the *AWS CloudFormation User Guide*.
=======
This command produces no output.

For more information, see `AWS::SecurityHub::Hub <https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-securityhub-hub.html>`__ in the *AWS CloudFormation User Guide*.
>>>>>>> e0e62a74754755ef19912bd622dbb081f288b898
