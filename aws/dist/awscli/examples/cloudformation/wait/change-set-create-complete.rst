<<<<<<< HEAD
**To wait for a change set to finish creating**

The following ``wait change-set-create-complete`` example pauses and resumes only after it can confirm that the specified change set in the specified stack is ready to run. ::

    aws cloudformation wait change-set-create-complete \
        --stack-name my-stack \
        --change-set-name my-change-set

=======
**To wait for a change set to finish creating**

The following ``wait change-set-create-complete`` example pauses and resumes only after it can confirm that the specified change set in the specified stack is ready to run. ::

    aws cloudformation wait change-set-create-complete \
        --stack-name my-stack \
        --change-set-name my-change-set

>>>>>>> e0e62a74754755ef19912bd622dbb081f288b898
This command produces no output.