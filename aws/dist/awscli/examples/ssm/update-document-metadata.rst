<<<<<<< HEAD
**Example: To approve the latest version of a change template**

The following ``update-document-metadata`` provides an approval for the latest version of a change template that has been submitted for review. ::

    aws ssm update-document-metadata \
        --name MyChangeManagerTemplate \
        --document-reviews 'Action=Approve,Comment=[{Type=Comment,Content=Approved!}]'

This command produces no output.

=======
**Example: To approve the latest version of a change template**

The following ``update-document-metadata`` provides an approval for the latest version of a change template that has been submitted for review. ::

    aws ssm update-document-metadata \
        --name MyChangeManagerTemplate \
        --document-reviews 'Action=Approve,Comment=[{Type=Comment,Content=Approved!}]'

This command produces no output.

>>>>>>> e0e62a74754755ef19912bd622dbb081f288b898
For more information, see `Reviewing and approving or rejecting change templates <https://docs.aws.amazon.com/systems-manager/latest/userguide/change-templates-review.html>`__ in the *AWS Systems Manager User Guide*.