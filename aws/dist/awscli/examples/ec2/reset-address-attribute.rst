<<<<<<< HEAD
**To reset the domain name attribute associated with an elastic IP address**

The following ``reset-address-attribute`` examples reset the domain name attribute of an elastic IP address.

Linux::

    aws ec2 reset-address-attribute \
        --allocation-id eipalloc-abcdef01234567890 \
        --attribute domain-name

Windows::

    aws ec2 reset-address-attribute ^
        --allocation-id eipalloc-abcdef01234567890 ^
        --attribute domain-name

Output::

    {
        "Addresses": [
            {
                "PublicIp": "192.0.2.0",
                "AllocationId": "eipalloc-abcdef01234567890",
                "PtrRecord": "example.com."
                "PtrRecordUpdate": {
                    "Value": "example.net.",
                    "Status": "PENDING"
            }
        ]
    }

=======
**To reset the domain name attribute associated with an elastic IP address**

The following ``reset-address-attribute`` examples reset the domain name attribute of an elastic IP address.

Linux::

    aws ec2 reset-address-attribute \
        --allocation-id eipalloc-abcdef01234567890 \
        --attribute domain-name

Windows::

    aws ec2 reset-address-attribute ^
        --allocation-id eipalloc-abcdef01234567890 ^
        --attribute domain-name

Output::

    {
        "Addresses": [
            {
                "PublicIp": "192.0.2.0",
                "AllocationId": "eipalloc-abcdef01234567890",
                "PtrRecord": "example.com."
                "PtrRecordUpdate": {
                    "Value": "example.net.",
                    "Status": "PENDING"
            }
        ]
    }

>>>>>>> e0e62a74754755ef19912bd622dbb081f288b898
To monitor the pending change, see `describe-addresses-attribute <https://docs.aws.amazon.com/cli/latest/reference/ec2/describe-addresses-attribute.html>`__ in the *AWS CLI Command Reference*.