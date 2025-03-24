<<<<<<< HEAD
**To pause running until any registered instance is in service**

The following ``wait any-instance-in-service`` command pauses and continues only after it confirms that the specified load balancer has at least one instance in service.

    aws elb wait any-instance-in-service \
        --load-balancer-name my-loadbalancer

This command produces no output.
=======
**To pause running until any registered instance is in service**

The following ``wait any-instance-in-service`` command pauses and continues only after it confirms that the specified load balancer has at least one instance in service.

    aws elb wait any-instance-in-service \
        --load-balancer-name my-loadbalancer

This command produces no output.
>>>>>>> e0e62a74754755ef19912bd622dbb081f288b898
