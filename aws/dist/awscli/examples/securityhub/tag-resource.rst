<<<<<<< HEAD
**To assign a tag to a resource**

The following ``tag-resource`` example assigns values for the Department and Area tags to the specified hub resource. ::

=======
**To assign a tag to a resource**

The following ``tag-resource`` example assigns values for the Department and Area tags to the specified hub resource. ::

>>>>>>> e0e62a74754755ef19912bd622dbb081f288b898
    aws securityhub tag-resource \
        --resource-arn "arn:aws:securityhub:us-west-1:123456789012:hub/default" \
        --tags '{"Department":"Operations", "Area":"USMidwest"}'

<<<<<<< HEAD
This command produces no output.

For more information, see `AWS::SecurityHub::Hub <https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-securityhub-hub.html>`__ in the *AWS CloudFormation User Guide*.
=======
This command produces no output.

For more information, see `AWS::SecurityHub::Hub <https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-securityhub-hub.html>`__ in the *AWS CloudFormation User Guide*.
>>>>>>> e0e62a74754755ef19912bd622dbb081f288b898
