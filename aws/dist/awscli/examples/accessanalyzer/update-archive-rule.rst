<<<<<<< HEAD
**To update the criteria and values for the specified archive rule**

The following ``update-archive-rule`` example updates the criteria and values for the specified archive rule in your AWS account. ::

    aws accessanalyzer update-archive-rule \
        --analyzer-name UnusedAccess-ConsoleAnalyzer-organization \
        --rule-name MyArchiveRule \
        --filter '{"resource": {"contains": ["Cognito"]}, "resourceType": {"eq": ["AWS::IAM::Role"]}}'

This command produces no output.

=======
**To update the criteria and values for the specified archive rule**

The following ``update-archive-rule`` example updates the criteria and values for the specified archive rule in your AWS account. ::

    aws accessanalyzer update-archive-rule \
        --analyzer-name UnusedAccess-ConsoleAnalyzer-organization \
        --rule-name MyArchiveRule \
        --filter '{"resource": {"contains": ["Cognito"]}, "resourceType": {"eq": ["AWS::IAM::Role"]}}'

This command produces no output.

>>>>>>> e0e62a74754755ef19912bd622dbb081f288b898
For more information, see `Archive rules <https://docs.aws.amazon.com/IAM/latest/UserGuide/access-analyzer-archive-rules.html>`__ in the *AWS IAM User Guide*.