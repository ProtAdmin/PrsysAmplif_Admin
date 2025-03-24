<<<<<<< HEAD
**To add a tag to a resource**

The following ``tag-resource`` example adds an owner tag to an AWS IoT Greengrass core device. You can use this tag to control access to the core device based on who owns it. ::

    aws greengrassv2 tag-resource \
        --resource-arn arn:aws:greengrass:us-west-2:123456789012:coreDevices:MyGreengrassCore \
        --tags Owner=richard-roe

This command produces no output.

=======
**To add a tag to a resource**

The following ``tag-resource`` example adds an owner tag to an AWS IoT Greengrass core device. You can use this tag to control access to the core device based on who owns it. ::

    aws greengrassv2 tag-resource \
        --resource-arn arn:aws:greengrass:us-west-2:123456789012:coreDevices:MyGreengrassCore \
        --tags Owner=richard-roe

This command produces no output.

>>>>>>> e0e62a74754755ef19912bd622dbb081f288b898
For more information, see `Tag your resources <https://docs.aws.amazon.com/greengrass/v2/developerguide/tag-resources.html>`__ in the *AWS IoT Greengrass V2 Developer Guide*.