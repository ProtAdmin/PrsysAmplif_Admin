<<<<<<< HEAD
**To list the available endpoint types**

The following ``describe-endpoint-types`` example lists the MySQL endpoint types that are available. ::

    aws dms describe-endpoint-types \
        --filters "Name=engine-name,Values=mysql"

Output::

    {
        "SupportedEndpointTypes": [
            {
                "EngineName": "mysql",
                "SupportsCDC": true,
                "EndpointType": "source",
                "EngineDisplayName": "MySQL"
            },
            {
                "EngineName": "mysql",
                "SupportsCDC": true,
                "EndpointType": "target",
                "EngineDisplayName": "MySQL"
            }
        ]
    }

For more information, see `Working with AWS DMS Endpoints` <https://docs.aws.amazon.com/dms/latest/userguide/CHAP_Endpoints.html>`__ in the *AWS Database Migration Service User Guide*.
=======
**To list the available endpoint types**

The following ``describe-endpoint-types`` example lists the MySQL endpoint types that are available. ::

    aws dms describe-endpoint-types \
        --filters "Name=engine-name,Values=mysql"

Output::

    {
        "SupportedEndpointTypes": [
            {
                "EngineName": "mysql",
                "SupportsCDC": true,
                "EndpointType": "source",
                "EngineDisplayName": "MySQL"
            },
            {
                "EngineName": "mysql",
                "SupportsCDC": true,
                "EndpointType": "target",
                "EngineDisplayName": "MySQL"
            }
        ]
    }

For more information, see `Working with AWS DMS Endpoints` <https://docs.aws.amazon.com/dms/latest/userguide/CHAP_Endpoints.html>`__ in the *AWS Database Migration Service User Guide*.
>>>>>>> e0e62a74754755ef19912bd622dbb081f288b898
