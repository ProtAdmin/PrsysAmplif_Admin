<<<<<<< HEAD
**To get the CIDRs allocated from an IPAM pool**

The following ``get-ipam-pool-allocations`` example gets the CIDRs allocated from an IPAM pool.

(Linux)::

    aws ec2 get-ipam-pool-allocations \
        --ipam-pool-id ipam-pool-0533048da7d823723 \
        --filters Name=ipam-pool-allocation-id,Values=ipam-pool-alloc-0e6186d73999e47389266a5d6991e6220

(Windows)::

    aws ec2 get-ipam-pool-allocations ^
        --ipam-pool-id ipam-pool-0533048da7d823723 ^
        --filters Name=ipam-pool-allocation-id,Values=ipam-pool-alloc-0e6186d73999e47389266a5d6991e6220

Output::

    {
        "IpamPoolAllocations": [
            {
                "Cidr": "10.0.0.0/16",
                "IpamPoolAllocationId": "ipam-pool-alloc-0e6186d73999e47389266a5d6991e6220",
                "ResourceType": "custom",
                "ResourceOwner": "123456789012"
            }
        ]
=======
**To get the CIDRs allocated from an IPAM pool**

The following ``get-ipam-pool-allocations`` example gets the CIDRs allocated from an IPAM pool.

(Linux)::

    aws ec2 get-ipam-pool-allocations \
        --ipam-pool-id ipam-pool-0533048da7d823723 \
        --filters Name=ipam-pool-allocation-id,Values=ipam-pool-alloc-0e6186d73999e47389266a5d6991e6220

(Windows)::

    aws ec2 get-ipam-pool-allocations ^
        --ipam-pool-id ipam-pool-0533048da7d823723 ^
        --filters Name=ipam-pool-allocation-id,Values=ipam-pool-alloc-0e6186d73999e47389266a5d6991e6220

Output::

    {
        "IpamPoolAllocations": [
            {
                "Cidr": "10.0.0.0/16",
                "IpamPoolAllocationId": "ipam-pool-alloc-0e6186d73999e47389266a5d6991e6220",
                "ResourceType": "custom",
                "ResourceOwner": "123456789012"
            }
        ]
>>>>>>> e0e62a74754755ef19912bd622dbb081f288b898
    }