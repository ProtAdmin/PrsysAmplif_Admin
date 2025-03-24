<<<<<<< HEAD
**To get a list of live streams and their state**

The following ``list-streams`` example lists all live streams for your AWS account. ::

    aws ivs list-streams

Output::

    {
       "streams": [
            {
                "channelArn": "arn:aws:ivs:us-west-2:123456789012:channel/abcdABCDefgh",
                "state": "LIVE",
                "health": "HEALTHY",
                "streamId": "st-ABCDEfghij01234KLMN5678",
                "viewerCount": 1
            }
        ]
    }

=======
**To get a list of live streams and their state**

The following ``list-streams`` example lists all live streams for your AWS account. ::

    aws ivs list-streams

Output::

    {
       "streams": [
            {
                "channelArn": "arn:aws:ivs:us-west-2:123456789012:channel/abcdABCDefgh",
                "state": "LIVE",
                "health": "HEALTHY",
                "streamId": "st-ABCDEfghij01234KLMN5678",
                "viewerCount": 1
            }
        ]
    }

>>>>>>> e0e62a74754755ef19912bd622dbb081f288b898
For more information, see `Create a Channel <https://docs.aws.amazon.com/ivs/latest/LowLatencyUserGuide/getting-started-create-channel.html>`__ in the *IVS Low-Latency User Guide*.