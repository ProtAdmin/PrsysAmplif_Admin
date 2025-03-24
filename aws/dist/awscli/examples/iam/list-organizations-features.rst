<<<<<<< HEAD
**To list the centralized root access features enabled for your organization**

The following ``list-organizations-features`` command lists the centralized root access features enabled for your organization. ::

    aws iam list-organizations-features

Output::

    {
        "EnabledFeatures": [
            "RootCredentialsManagement",
            "RootSessions"
        ]
        "OrganizationId": "o-aa111bb222"
    }

=======
**To list the centralized root access features enabled for your organization**

The following ``list-organizations-features`` command lists the centralized root access features enabled for your organization. ::

    aws iam list-organizations-features

Output::

    {
        "EnabledFeatures": [
            "RootCredentialsManagement",
            "RootSessions"
        ]
        "OrganizationId": "o-aa111bb222"
    }

>>>>>>> e0e62a74754755ef19912bd622dbb081f288b898
For more information, see `Centrally manage root access for member accounts <https://docs.aws.amazon.com/IAM/latest/UserGuide/id_root-user.html#id_root-user-access-management>`__ in the *AWS IAM User Guide*.