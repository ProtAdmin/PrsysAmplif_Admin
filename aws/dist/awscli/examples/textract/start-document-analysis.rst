<<<<<<< HEAD
**To start analyzing text in a multi-page document**

The following ``start-document-analysis`` example shows how to start asynchronous analysis of text in a multi-page document. 

Linux/macOS::

    aws textract start-document-analysis \
        --document-location '{"S3Object":{"Bucket":"bucket","Name":"document"}}' \
        --feature-types '["TABLES","FORMS"]' \
        --notification-channel "SNSTopicArn=arn:snsTopic,RoleArn=roleArn"

Windows::

    aws textract start-document-analysis \
        --document-location "{\"S3Object\":{\"Bucket\":\"bucket\",\"Name\":\"document\"}}" \
        --feature-types "[\"TABLES\", \"FORMS\"]" \
        --region region-name \
        --notification-channel "SNSTopicArn=arn:snsTopic,RoleArn=roleArn"

Output::

    {
        "JobId": "df7cf32ebbd2a5de113535fcf4d921926a701b09b4e7d089f3aebadb41e0712b"
    }

For more information, see `Detecting and Analyzing Text in Multi-Page Documents`_ in the *Amazon Textract Developers Guide*

=======
**To start analyzing text in a multi-page document**

The following ``start-document-analysis`` example shows how to start asynchronous analysis of text in a multi-page document. 

Linux/macOS::

    aws textract start-document-analysis \
        --document-location '{"S3Object":{"Bucket":"bucket","Name":"document"}}' \
        --feature-types '["TABLES","FORMS"]' \
        --notification-channel "SNSTopicArn=arn:snsTopic,RoleArn=roleArn"

Windows::

    aws textract start-document-analysis \
        --document-location "{\"S3Object\":{\"Bucket\":\"bucket\",\"Name\":\"document\"}}" \
        --feature-types "[\"TABLES\", \"FORMS\"]" \
        --region region-name \
        --notification-channel "SNSTopicArn=arn:snsTopic,RoleArn=roleArn"

Output::

    {
        "JobId": "df7cf32ebbd2a5de113535fcf4d921926a701b09b4e7d089f3aebadb41e0712b"
    }

For more information, see `Detecting and Analyzing Text in Multi-Page Documents`_ in the *Amazon Textract Developers Guide*

>>>>>>> e0e62a74754755ef19912bd622dbb081f288b898
.. _`Detecting and Analyzing Text in Multi-Page Documents`: https://docs.aws.amazon.com/textract/latest/dg/async.html