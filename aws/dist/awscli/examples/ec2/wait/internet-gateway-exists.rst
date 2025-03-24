<<<<<<< HEAD
**To wait until an internet gateway exists**

The following ``wait internet-gateway-exists`` example pauses and resumes running only after it confirms that the specified internet gateway exists. ::

    aws ec2 wait internet-gateway-exists \
        --internet-gateway-ids igw-1234567890abcdef0

This command produces no output.

=======
**To wait until an internet gateway exists**

The following ``wait internet-gateway-exists`` example pauses and resumes running only after it confirms that the specified internet gateway exists. ::

    aws ec2 wait internet-gateway-exists \
        --internet-gateway-ids igw-1234567890abcdef0

This command produces no output.

>>>>>>> e0e62a74754755ef19912bd622dbb081f288b898
For more information, see `Internet gateways <https://docs.aws.amazon.com/vpc/latest/userguide/VPC_Internet_Gateway.html>`__ in the *Amazon VPC User Guide*.