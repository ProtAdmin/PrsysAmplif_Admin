<<<<<<< HEAD
**To tag a contact**

The following ``tag-resource`` example tags a specified contact with the provided tag key value pair. ::

    aws ssm-contacts tag-resource \
        --resource-arn "arn:aws:ssm-contacts:us-east-1:111122223333:contact/akuam" \
        --tags '[{"Key":"group1","Value":"1"}]'

This command produces no output.

=======
**To tag a contact**

The following ``tag-resource`` example tags a specified contact with the provided tag key value pair. ::

    aws ssm-contacts tag-resource \
        --resource-arn "arn:aws:ssm-contacts:us-east-1:111122223333:contact/akuam" \
        --tags '[{"Key":"group1","Value":"1"}]'

This command produces no output.

>>>>>>> e0e62a74754755ef19912bd622dbb081f288b898
For more information, see `Tagging <https://docs.aws.amazon.com/incident-manager/latest/userguide/tagging.html>`__ in the *Incident Manager User Guide*.