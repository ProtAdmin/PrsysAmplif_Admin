<<<<<<< HEAD
**To list tags for a resource**

The following ``list-tags-for-resource`` example lists all tags for an AWS IoT Greengrass core device. ::

    aws greengrassv2 list-tags-for-resource \
        --resource-arn arn:aws:greengrass:us-west-2:123456789012:coreDevices:MyGreengrassCore

Output::

    {
        "tags": {
            "Owner": "richard-roe"
        }
    }

=======
**To list tags for a resource**

The following ``list-tags-for-resource`` example lists all tags for an AWS IoT Greengrass core device. ::

    aws greengrassv2 list-tags-for-resource \
        --resource-arn arn:aws:greengrass:us-west-2:123456789012:coreDevices:MyGreengrassCore

Output::

    {
        "tags": {
            "Owner": "richard-roe"
        }
    }

>>>>>>> e0e62a74754755ef19912bd622dbb081f288b898
For more information, see `Tag your resources <https://docs.aws.amazon.com/greengrass/v2/developerguide/tag-resources.html>`__ in the *AWS IoT Greengrass V2 Developer Guide*.