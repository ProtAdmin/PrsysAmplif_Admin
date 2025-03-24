<<<<<<< HEAD
**To wait until a snapshot import task is completed**

The following ``wait snapshot-imported`` example pauses and resumes only after the specified snapshot import task is completed. ::

    aws ec2 wait snapshot-imported \
        --import-task-ids import-snap-1234567890abcdef0

This command produces no output.

=======
**To wait until a snapshot import task is completed**

The following ``wait snapshot-imported`` example pauses and resumes only after the specified snapshot import task is completed. ::

    aws ec2 wait snapshot-imported \
        --import-task-ids import-snap-1234567890abcdef0

This command produces no output.

>>>>>>> e0e62a74754755ef19912bd622dbb081f288b898
For more information, see `Snapshot import <https://docs.aws.amazon.com/vm-import/latest/userguide/vmimport-import-snapshot.html>`__ in the *VM Import/Export User Guide*.