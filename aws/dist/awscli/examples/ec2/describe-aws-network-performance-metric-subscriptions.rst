<<<<<<< HEAD
**To describe your metric subscriptions**

The following ``describe-aws-network-performance-metric-subscriptions`` example describes your metric subscriptions. ::

    aws ec2 describe-aws-network-performance-metric-subscriptions

Output::

    {
        "Subscriptions": [
            {
                "Source": "us-east-1",
                "Destination": "eu-west-1",
                "Metric": "aggregate-latency",
                "Statistic": "p50",
                "Period": "five-minutes"
            }
        ]
    }

=======
**To describe your metric subscriptions**

The following ``describe-aws-network-performance-metric-subscriptions`` example describes your metric subscriptions. ::

    aws ec2 describe-aws-network-performance-metric-subscriptions

Output::

    {
        "Subscriptions": [
            {
                "Source": "us-east-1",
                "Destination": "eu-west-1",
                "Metric": "aggregate-latency",
                "Statistic": "p50",
                "Period": "five-minutes"
            }
        ]
    }

>>>>>>> e0e62a74754755ef19912bd622dbb081f288b898
For more information, see `Manage subscriptions <https://docs.aws.amazon.com/network-manager/latest/infrastructure-performance/nmip-subscriptions-cw.html>`__ in the *Infrastructure Performance User Guide*.