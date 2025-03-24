<<<<<<< HEAD
**To signal a resource**

The following ``signal-resource`` example signals ``success`` to fulfill the wait condition named ``MyWaitCondition`` in the stack named ``my-stack``. ::

    aws cloudformation signal-resource \
        --stack-name my-stack \
        --logical-resource-id MyWaitCondition \
        --unique-id 1234 \
        --status SUCCESS

=======
**To signal a resource**

The following ``signal-resource`` example signals ``success`` to fulfill the wait condition named ``MyWaitCondition`` in the stack named ``my-stack``. ::

    aws cloudformation signal-resource \
        --stack-name my-stack \
        --logical-resource-id MyWaitCondition \
        --unique-id 1234 \
        --status SUCCESS

>>>>>>> e0e62a74754755ef19912bd622dbb081f288b898
This command produces no output.