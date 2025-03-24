<<<<<<< HEAD
**To delete a workgroup**

The following ``delete-work-group`` example deletes the ``TeamB`` workgroup. ::

    aws athena delete-work-group \
        --work-group TeamB

This command produces no output. To confirm the deletion, use ``aws athena list-work-groups``.

=======
**To delete a workgroup**

The following ``delete-work-group`` example deletes the ``TeamB`` workgroup. ::

    aws athena delete-work-group \
        --work-group TeamB

This command produces no output. To confirm the deletion, use ``aws athena list-work-groups``.

>>>>>>> e0e62a74754755ef19912bd622dbb081f288b898
For more information, see `Managing Workgroups <https://docs.aws.amazon.com/athena/latest/ug/workgroups-create-update-delete.html>`__ in the *Amazon Athena User Guide*.