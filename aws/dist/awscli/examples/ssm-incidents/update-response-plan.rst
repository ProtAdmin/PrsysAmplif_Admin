<<<<<<< HEAD
**To update a response plan**

The following ``update-response-plan`` example removes a chat channel from the specified response plan. ::

    aws ssm-incidents update-response-plan \
        --arn "arn:aws:ssm-incidents::111122223333:response-plan/Example-Response-Plan" \
        --chat-channel '{"empty":{}}'

This command produces no output.

=======
**To update a response plan**

The following ``update-response-plan`` example removes a chat channel from the specified response plan. ::

    aws ssm-incidents update-response-plan \
        --arn "arn:aws:ssm-incidents::111122223333:response-plan/Example-Response-Plan" \
        --chat-channel '{"empty":{}}'

This command produces no output.

>>>>>>> e0e62a74754755ef19912bd622dbb081f288b898
For more information, see `Incident preparation <https://docs.aws.amazon.com/incident-manager/latest/userguide/incident-response.html>`__ in the *Incident Manager User Guide*.