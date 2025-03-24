<<<<<<< HEAD
**To enable the RootSessions feature in your organization**

The following ``enable-organizations-root-sessions`` command allows the management account or delegated administrator to perform privileged tasks on member accounts in your organization. ::

    aws iam enable-organizations-root-sessions

Output::

    {
        "EnabledFeatures": [
            "RootSessions"
        ]
        "OrganizationId": "o-aa111bb222"
    }

=======
**To enable the RootSessions feature in your organization**

The following ``enable-organizations-root-sessions`` command allows the management account or delegated administrator to perform privileged tasks on member accounts in your organization. ::

    aws iam enable-organizations-root-sessions

Output::

    {
        "EnabledFeatures": [
            "RootSessions"
        ]
        "OrganizationId": "o-aa111bb222"
    }

>>>>>>> e0e62a74754755ef19912bd622dbb081f288b898
For more information, see `Centralize root access for member accounts <https://docs.aws.amazon.com/IAM/latest/UserGuide/id_root-enable-root-access.html>`__ in the *AWS IAM User Guide*.