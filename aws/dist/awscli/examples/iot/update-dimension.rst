<<<<<<< HEAD
**To update a dimension**

The following ``update-dimension`` example updates a dimension. ::

    aws iot update-dimension \
        --name TopicFilterForAuthMessages \  
        --string-values device/${iot:ClientId}/auth

Output::

    {
        "name": "TopicFilterForAuthMessages",
        "lastModifiedDate": 1585866222.317,
        "stringValues": [
            "device/${iot:ClientId}/auth"
        ],
        "creationDate": 1585854500.474,
        "type": "TOPIC_FILTER",
        "arn": "arn:aws:iot:us-west-2:1234564789012:dimension/TopicFilterForAuthMessages"
    }

=======
**To update a dimension**

The following ``update-dimension`` example updates a dimension. ::

    aws iot update-dimension \
        --name TopicFilterForAuthMessages \  
        --string-values device/${iot:ClientId}/auth

Output::

    {
        "name": "TopicFilterForAuthMessages",
        "lastModifiedDate": 1585866222.317,
        "stringValues": [
            "device/${iot:ClientId}/auth"
        ],
        "creationDate": 1585854500.474,
        "type": "TOPIC_FILTER",
        "arn": "arn:aws:iot:us-west-2:1234564789012:dimension/TopicFilterForAuthMessages"
    }

>>>>>>> e0e62a74754755ef19912bd622dbb081f288b898
For more information, see `Scoping metrics in security profiles using dimensions <https://docs.aws.amazon.com/iot/latest/developerguide/scoping-security-behavior.html>`__ in the *AWS IoT Core Developer Guide*.