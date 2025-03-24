<<<<<<< HEAD
**To create an archive rule for the specified analyzer**

The following ``create-archive-rule`` example creates an archive rule for the specified analyzer in your AWS account. ::

    aws accessanalyzer create-archive-rule \
        --analyzer-name UnusedAccess-ConsoleAnalyzer-organization \
        --rule-name MyRule \
        --filter '{"resource": {"contains": ["Cognito"]}, "resourceType": {"eq": ["AWS::IAM::Role"]}}'

This command produces no output.

=======
**To create an archive rule for the specified analyzer**

The following ``create-archive-rule`` example creates an archive rule for the specified analyzer in your AWS account. ::

    aws accessanalyzer create-archive-rule \
        --analyzer-name UnusedAccess-ConsoleAnalyzer-organization \
        --rule-name MyRule \
        --filter '{"resource": {"contains": ["Cognito"]}, "resourceType": {"eq": ["AWS::IAM::Role"]}}'

This command produces no output.

>>>>>>> e0e62a74754755ef19912bd622dbb081f288b898
For more information, see `Archive rules <https://docs.aws.amazon.com/IAM/latest/UserGuide/access-analyzer-archive-rules.html>`__ in the *AWS IAM User Guide*.