<<<<<<< HEAD
**To disassociate client devices from a core device**

The following ``batch-disassociate-client-device-from-core-device`` example disassociates two client devices from a core device. ::

    aws greengrassv2 batch-disassociate-client-device-from-core-device \
      --core-device-thing-name MyGreengrassCore \
      --entries thingName=MyClientDevice1 thingName=MyClientDevice2

Output::

    {
        "errorEntries": []
    }

=======
**To disassociate client devices from a core device**

The following ``batch-disassociate-client-device-from-core-device`` example disassociates two client devices from a core device. ::

    aws greengrassv2 batch-disassociate-client-device-from-core-device \
      --core-device-thing-name MyGreengrassCore \
      --entries thingName=MyClientDevice1 thingName=MyClientDevice2

Output::

    {
        "errorEntries": []
    }

>>>>>>> e0e62a74754755ef19912bd622dbb081f288b898
For more information, see `Interact with local IoT devices <https://docs.aws.amazon.com/greengrass/v2/developerguide/interact-with-local-iot-devices.html>`__ in the *AWS IoT Greengrass V2 Developer Guide*.