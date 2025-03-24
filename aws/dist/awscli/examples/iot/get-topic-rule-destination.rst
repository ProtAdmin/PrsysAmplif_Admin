<<<<<<< HEAD
**To get a topic rule destination**

The following ``get-topic-rule-destination`` example gets information about a topic rule destination. ::

    aws iot get-topic-rule-destination \
        --arn "arn:aws:iot:us-west-2:123456789012:ruledestination/http/a1b2c3d4-5678-90ab-cdef-11111EXAMPLE"

Output::

    {
        "topicRuleDestination": {
            "arn": "arn:aws:iot:us-west-2:123456789012:ruledestination/http/a1b2c3d4-5678-90ab-cdef-11111EXAMPLE",
            "status": "DISABLED",
            "httpUrlProperties": {
                "confirmationUrl": "https://example.com"
            }
        }
    }

=======
**To get a topic rule destination**

The following ``get-topic-rule-destination`` example gets information about a topic rule destination. ::

    aws iot get-topic-rule-destination \
        --arn "arn:aws:iot:us-west-2:123456789012:ruledestination/http/a1b2c3d4-5678-90ab-cdef-11111EXAMPLE"

Output::

    {
        "topicRuleDestination": {
            "arn": "arn:aws:iot:us-west-2:123456789012:ruledestination/http/a1b2c3d4-5678-90ab-cdef-11111EXAMPLE",
            "status": "DISABLED",
            "httpUrlProperties": {
                "confirmationUrl": "https://example.com"
            }
        }
    }

>>>>>>> e0e62a74754755ef19912bd622dbb081f288b898
For more information, see `Working with topic rule destinations <https://docs.aws.amazon.com/iot/latest/developerguide/rule-destination.html>`__ in the *AWS IoT Developer Guide*.