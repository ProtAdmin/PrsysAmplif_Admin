<<<<<<< HEAD
**To remove tags from a resource**

The following ``remove-tags-from-resource`` example removes tags from a resource. ::

    aws rds remove-tags-from-resource \
        --resource-name arn:aws:rds:us-east-1:123456789012:db:mydbinstance \
        --tag-keys Name Environment

This command produces no output.

=======
**To remove tags from a resource**

The following ``remove-tags-from-resource`` example removes tags from a resource. ::

    aws rds remove-tags-from-resource \
        --resource-name arn:aws:rds:us-east-1:123456789012:db:mydbinstance \
        --tag-keys Name Environment

This command produces no output.

>>>>>>> e0e62a74754755ef19912bd622dbb081f288b898
For more information, see `Tagging Amazon RDS resources <https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/USER_Tagging.html>`__ in the *Amazon RDS User Guide* and `Tagging Amazon RDS resources <https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/USER_Tagging.html>`__ in the *Amazon Aurora User Guide*.