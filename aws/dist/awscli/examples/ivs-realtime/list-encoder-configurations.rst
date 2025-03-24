<<<<<<< HEAD
**To list composition encoder configurations**

The following ``list-encoder-configurations`` lists all composition encoder configurations for your AWS account, in the AWS region where the API request is processed. ::

    aws ivs-realtime list-encoder-configurations

Output::

    {  
        "encoderConfigurations": [
            {
                "arn": "arn:aws:ivs:ap-northeast-1:123456789012:encoder-configuration/abcdABCDefgh",
                "name": "test-ec-1",
                "tags": {}
            },
            {
                "arn": "arn:aws:ivs:ap-northeast-1:123456789012:encoder-configuration/ABCefgEFGabc",
                "name": "test-ec-2",
                "tags": {}
            }
        ]
    }

=======
**To list composition encoder configurations**

The following ``list-encoder-configurations`` lists all composition encoder configurations for your AWS account, in the AWS region where the API request is processed. ::

    aws ivs-realtime list-encoder-configurations

Output::

    {  
        "encoderConfigurations": [
            {
                "arn": "arn:aws:ivs:ap-northeast-1:123456789012:encoder-configuration/abcdABCDefgh",
                "name": "test-ec-1",
                "tags": {}
            },
            {
                "arn": "arn:aws:ivs:ap-northeast-1:123456789012:encoder-configuration/ABCefgEFGabc",
                "name": "test-ec-2",
                "tags": {}
            }
        ]
    }

>>>>>>> e0e62a74754755ef19912bd622dbb081f288b898
For more information, see `Enabling Multiple Hosts on an Amazon IVS Stream <https://docs.aws.amazon.com/ivs/latest/LowLatencyUserGuide/multiple-hosts.html>`__ in the *Amazon Interactive Video Service User Guide*.