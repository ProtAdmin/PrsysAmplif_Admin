<<<<<<< HEAD
**To untag a resource**

The following ``untag-resource`` example removes a ``tag-keys`` parameter with the key-value pair of ``Environment Application`` from its association with a monitor named ``Example_NetworkMonitor``. ::

    aws networkmonitor untag-resource \
        --resource-arn arn:aws:networkmonitor:region:012345678910:monitor/Example_NetworkMonitor \
        --tag-keys Environment Application

This command produces no output.

=======
**To untag a resource**

The following ``untag-resource`` example removes a ``tag-keys`` parameter with the key-value pair of ``Environment Application`` from its association with a monitor named ``Example_NetworkMonitor``. ::

    aws networkmonitor untag-resource \
        --resource-arn arn:aws:networkmonitor:region:012345678910:monitor/Example_NetworkMonitor \
        --tag-keys Environment Application

This command produces no output.

>>>>>>> e0e62a74754755ef19912bd622dbb081f288b898
For more information, see `How Amazon CloudWatch Network Monitor Works <https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/nw-monitor-how-it-works.html>`__ in the *Amazon CloudWatch User Guide*.