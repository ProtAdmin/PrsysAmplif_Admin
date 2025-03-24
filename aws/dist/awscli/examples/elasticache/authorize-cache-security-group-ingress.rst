<<<<<<< HEAD
**To authorize cache security group for ingress**

The following ``authorize-cache-security-group-ingress`` example allows network ingress to a cache security group. ::

    aws elasticache authorize-cache-security-group-ingress \
         --cache-security-group-name  "my-sec-grp" \
         --ec2-security-group-name "my-ec2-sec-grp" \
         --ec2-security-group-owner-id "1234567890"

The command produces no output.

=======
**To authorize cache security group for ingress**

The following ``authorize-cache-security-group-ingress`` example allows network ingress to a cache security group. ::

    aws elasticache authorize-cache-security-group-ingress \
         --cache-security-group-name  "my-sec-grp" \
         --ec2-security-group-name "my-ec2-sec-grp" \
         --ec2-security-group-owner-id "1234567890"

The command produces no output.

>>>>>>> e0e62a74754755ef19912bd622dbb081f288b898
For more information, see `Self-Service Updates in Amazon ElastiCache <https://docs.aws.amazon.com/AmazonElastiCache/latest/red-ug/Self-Service-Updates.html>`__ in the *Elasticache User Guide*.