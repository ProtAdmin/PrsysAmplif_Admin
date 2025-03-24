<<<<<<< HEAD
**To add a tag to a resource**

The following ``tag-resource`` example adds an owner tag to a wind turbine asset. This lets you control access to the asset based on who owns it. ::

    aws iotsitewise tag-resource \
        --resource-arn arn:aws:iotsitewise:us-west-2:123456789012:asset/a1b2c3d4-5678-90ab-cdef-33333EXAMPLE \
        --tags Owner=richard-roe

This command produces no output.

=======
**To add a tag to a resource**

The following ``tag-resource`` example adds an owner tag to a wind turbine asset. This lets you control access to the asset based on who owns it. ::

    aws iotsitewise tag-resource \
        --resource-arn arn:aws:iotsitewise:us-west-2:123456789012:asset/a1b2c3d4-5678-90ab-cdef-33333EXAMPLE \
        --tags Owner=richard-roe

This command produces no output.

>>>>>>> e0e62a74754755ef19912bd622dbb081f288b898
For more information, see `Tagging your resources <https://docs.aws.amazon.com/iot-sitewise/latest/userguide/tag-resources.html>`__ in the *AWS IoT SiteWise User Guide*.